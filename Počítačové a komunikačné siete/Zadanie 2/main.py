import binascii
import math
import os
import socket
import struct
import threading
import time
import random

thread_status = True 


def keep_alive(client_sock, server_addr, interval):
    while True:
        if not thread_status:
            return
        client_sock.sendto(str.encode('4'), server_addr)
        data = client_sock.recv(1500)
        info = str(data.decode())

        if info == '4':
            print("Connection is working")
        else:
            print("connection ended")
            break
        time.sleep(interval)


def start_thread(client_sock, server_addr, interval):
    thread = threading.Thread(target=keep_alive, args=(client_sock, server_addr, interval))
    thread.daemon = True
    thread.start()
    return thread


# here ends tread function
########################################################################################################################


# this logs you as client
def client_login():
    while True:
        try:
            client_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
            address = input("Input IP address of server (localhost): ")
            port = input("Input port: ")
            server_address = (address, int(port))
            client_socket.sendto(str.encode(""), server_address)
            client_socket.settimeout(60)
            data, address = client_socket.recvfrom(1500)
            data = data.decode()
            if data == "1":
                print("Connected to address:", server_address)
                client(client_socket, server_address)
        except (socket.timeout, socket.gaierror) as e:
            print(e)
            print("Connection not working try again")
            continue


# logs you as server
def server_login():
    server_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    port = input("Input port: ")
    server_socket.bind(("", int(port)))
    data, address = server_socket.recvfrom(1500)
    server_socket.sendto(str.encode("1"), address)
    print("Established connection from address:", address)
    server(server_socket, address)


# this functions switches roles
def switch_users(change_socket, address):
    while True:
        print("1 for client")
        print("2 for server")
        print("3 to exit")
        choice_switch = input()
        if choice_switch == '1':
            client(change_socket, address)
        elif choice_switch == '2':
            server(change_socket, address)
        else:
            print("Try to input something different")


# this function receives message
def receive_message(number_of_all_packets, server_socket, file_message):
    number_of_all_received_packets = 0
    number_of_packets = 0
    full_message = []

    while True:
        if number_of_packets == int(number_of_all_packets):
            break

        while True:
            if number_of_packets == int(number_of_all_packets):
                break

            data, address = server_socket.recvfrom(64965)
            message = data[7:]
            length, packet_number, crc_received = struct.unpack("HHH", data[1:7])
            header = struct.pack("c", str.encode("2")) + struct.pack("HH", len(message), packet_number)
            crc = binascii.crc_hqx(header + message, 0)

            if crc == crc_received:
                print(f"Packet number {number_of_packets} was accepted")
                number_of_packets += 1
                number_of_all_received_packets += 1

                if file_message == "t":
                    full_message.append(message.decode())

                if file_message == "f":
                    full_message.append(message)

                server_socket.sendto(str.encode("5"), address)

            else:
                print(f"Packet number {number_of_packets} was rejected")
                server_socket.sendto(str.encode("3"), address)
                number_of_all_received_packets += 1

    print("number of damaged packets:", number_of_all_received_packets - number_of_packets)
    print("number of all received packets", number_of_all_received_packets)
    print("Number of accepted packets: " + str(number_of_packets))

    if file_message == "t":
        print("Message:", ''.join(full_message))

    if file_message == "f":
        file_name = "photo_receive.jpg"
        file = open(file_name, "wb")

        for frag in full_message:
            file.write(frag)
        file.close()
        size = os.path.getsize(file_name)
        print("Name:", file_name, "Size:", size, "B")
        print("Absolute path:", os.path.abspath(file_name))


# this functions acts like server
def server(server_socket, address):
    while True:
        print("1 for exit")
        print("2 for switch roles")
        print("Input anything to continue")
        choice_server = input()

        if choice_server == '1':
            return

        if choice_server == "2":
            switch_users(server_socket, address)

        else:
            print("Server is running")

        try:
            server_socket.settimeout(60)

            while True:

                while True:
                    data = server_socket.recv(1500)
                    info = str(data.decode())

                    if info == '4':
                        print("Keep alive received, Connection is on")
                        server_socket.sendto(str.encode("4"), address)
                        info = ''
                        break
                    else:
                        break

                typ = info[:1]
                if typ == '1':  # text message
                    number_of_packets = info[1:]
                    print("Incoming message will consist of " + number_of_packets + " packets")
                    receive_message(number_of_packets, server_socket, "t")
                    break

                if typ == '2':  # file message
                    number_of_packets = info[1:]
                    print("Incoming file will consist of " + number_of_packets + " packets\n")
                    receive_message(number_of_packets, server_socket, "f")
                    break

        except socket.timeout:
            print("Client is inactive shutting down")
            server_socket.close()
            return


# this function sends message
def send_message(client_socket, server_address, file_text, even_packet):
    message = 0
    file_name = 0
    message_to_send = 0

    if file_text == "t":
        message = input("Enter the message: ")
    if file_text == "f":
        file_name = input("Input file name: ")
    fragment = int(input("Input fragment size: "))

    while fragment >= 64965 or fragment <= 0:
        print("Maximum is 64965 B")
        fragment = int(input("Try to input something different"))

    if file_text == "t":
        number_of_packets = math.ceil(len(message) / fragment)

        print("Number of fragments is:", number_of_packets)

        if even_packet:
            number_of_packets = math.floor(number_of_packets / 2)

        start_of_communication = ("1" + str(number_of_packets))
        start_of_communication = start_of_communication.encode('utf-8').strip()
        client_socket.sendto(start_of_communication, server_address)

    if file_text == "f":
        size = os.path.getsize(file_name)
        print("File name:", file_name, "Size:", size, "B")
        print("Absolute path:", os.path.abspath(file_name))
        file = open(file_name, "rb")
        file_size = os.path.getsize(file_name)
        number_of_packets = math.ceil(file_size / fragment)

        print("Number of fragments is:", number_of_packets)

        if even_packet:
            number_of_packets = math.floor(number_of_packets / 2)

        message = file.read()
        start_of_communication = ("2" + str(number_of_packets))
        start_of_communication = start_of_communication.encode('utf-8').strip()
        client_socket.sendto(start_of_communication, server_address)

    packet_number = 0
    number_of_errors = 0

    add_error = input("Do you want errors ? 1 Yes 2 No: ")
    if add_error == "1":
        number_of_errors = int(input("Input maximum number of errors: "))

    while True:
        if len(message) == 0:
            break
        while True:
            if len(message) == 0:
                break

            if file_text == "t":
                message_to_send = message[:fragment]
                message_to_send = str.encode(message_to_send)

            if file_text == "f":
                message_to_send = message[:fragment]

            header = struct.pack("c", str.encode("2")) + struct.pack("HH", len(message_to_send), packet_number)
            crc = binascii.crc_hqx(header + message_to_send, 0)

            if add_error == "1":
                if number_of_errors != 0:
                    if random.random() < 0.5:
                        crc += 1
                        number_of_errors -= 1

            header = struct.pack("c", str.encode("2")) + struct.pack("HHH", len(message_to_send), packet_number, crc)

            if even_packet:
                if packet_number % 2 == 0:
                    client_socket.sendto(header + message_to_send, server_address)
                else:
                    packet_number += 1
                    message = message[fragment:]
                    continue
            else:
                client_socket.sendto(header + message_to_send, server_address)

            data, address = client_socket.recvfrom(1500)

            try:
                client_socket.settimeout(10.0)
                data = data.decode()
                if data == "5":
                    packet_number += 1
                    message = message[fragment:]
                else:
                    pass

            except (socket.timeout, socket.gaierror) as e:
                print(e)
                print("Something went wrong")
                return


# this function acts as client
def client(client_socket, server_address):
    global thread_status
    interval = 10
    thread = None

    while True:
        print("0 for exit")
        print("1 for text message")
        print("2 for file message")
        print("3 for keep alive ON")
        print("4 for keep alive OFF")
        print("5 for switching role")
        choice_client = input()

        if choice_client == '0':
            if thread is not None:
                thread_status = False
                thread.join()
            return

        elif choice_client == '1':
            if thread is not None:
                thread_status = False
                thread.join()
            even = input("1 for even packets only: ")
            if even == "1":
                send_message(client_socket, server_address, "t", 1)
            else:
                send_message(client_socket, server_address, "t", 0)

        elif choice_client == '2':
            if thread is not None:
                thread_status = False
                thread.join()

            even = input("1 for even packets only: ")
            if even == "1":
                send_message(client_socket, server_address, "f", 1)
            else:
                send_message(client_socket, server_address, "f", 0)

        elif choice_client == '3':
            thread_status = True
            thread = start_thread(client_socket, server_address, interval)
            print("Keep alive ON")

        elif choice_client == '4':
            if thread is not None:
                thread_status = False
                thread.join()
                print("Keep alive OFF")

        elif choice_client == '5':
            if thread is not None:
                thread_status = False
                thread.join()
            switch_users(client_socket, server_address)

        else:
            print("Try to input something different")


# Main
while True:
    print("1 for client")
    print("2 for server")
    print("3 to exit")
    choice = input()
    if choice == '1':
        client_login()
    elif choice == '2':
        server_login()
    elif choice == '3':
        break
    else:
        print("Try to input something different")
