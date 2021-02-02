from scapy.all import *
from binascii import hexlify

IP = {
}

VSETKY_ADRESY = {
}

LLC = {
}

ETHER = {
}

TCP = {
}

ICMP = {
}

is_first_tftp = 0
komunikujem = 0
poradove_cislo_ramca = 0
pole_struktur = []
http_zoznam = []
https_zoznam = []
telnet_zoznam = []
ssh_zoznam = []
ftp_riadiace_zoznam = []
ftp_datove_zoznam = []
tftp_zoznam = []
arp_zoznam = []
icmp_zoznam = []
tftp_pole_struktur = []



class Commun:  # class for every tcp protocol
    def __init__(self, source, dest, tcp_source_port, tcp_destination_port):
        self.order = []
        self.packets_of_communication = []
        self.is_complete = 0
        self.source = source
        self.dest = dest
        self.source_port = tcp_source_port
        self.dest_port = tcp_destination_port

    def add_to_packet(self, byte):
        self.packets_of_communication.append(byte)

    def add_order(self, cislo_ramca):
        self.order.append(cislo_ramca)


class tftp:  # tftp class
    def __init__(self, source, destination):
        self.order = []
        self.packets_of_communication = []
        self.is_finished = 0
        self.source_port = source
        self.destination_port = destination

    def add_to_packet(self, byte):
        self.packets_of_communication.append(byte)

    def add_order(self, cislo_ramca):
        self.order.append(cislo_ramca)


class icmp:  # icmp class
    def __init__(self, source, destination):
        self.source = source
        self.destination = destination
        self.request_order = []
        self.request_pole = []
        self.reply_order = []
        self.reply_pole = []
        self.other = []
        self.other_order = []

    def add_request_order(self, cislo_ramca):
            self.request_order.append(cislo_ramca)

    def add_request(self, byte):
            self.request_pole.append(byte)

    def add_reply_order(self, cislo_ramca):
            self.reply_order.append(cislo_ramca)

    def add_reply(self, byte):
            self.reply_pole.append(byte)

    def add_other(self, byte):
        self.other.append(byte)

    def add_other_order(self, poradovece_cislo):
        self.other_order.append(poradovece_cislo)


class arp:  # arp class
    def __init__(self, sender, target):
        self.reply_order = []
        self.reply_array = []
        self.request_order = []
        self.request_array = []
        self.is_finished = 0
        self.sender = sender
        self.target = target

    def add_request_order(self, cislo_ramca):
        self.request_order.append(cislo_ramca)

    def add_request(self, byte):
        self.request_array.append(byte)

    def add_reply_order(self, cislo_ramca):
        self.reply_order.append(cislo_ramca)

    def add_reply(self, byte):
        self.reply_array.append(byte)


    def sender_mac(self, sender):
        self.sender_mac = sender


def print_adres_with_most_packet():  # prints packet that ocured the most
    global VSETKY_ADRESY
    adres_of_most_ocur = 0
    number_of_occurences_of_packet = 0
    for x in VSETKY_ADRESY:
        temp = VSETKY_ADRESY[x]
        if number_of_occurences_of_packet < temp:
            number_of_occurences_of_packet = temp
            adres_of_most_ocur = x
    flag = 0
    print("Adresa uzla s najväčším počtom odoslaných paketov:")

    for y in range(0, 4):
        flag += 1
        print(int((str(hexlify(adres_of_most_ocur[y: y + 1]))[2: -1]), 16), end="")
        if y != 3:
            print(".", end="")

    print("  ", number_of_occurences_of_packet, "packetov")


def print_ipv4(x):  # prints ip in correct format
    flag = 0
    string = ""
    for y in range(0, 4):
        flag += 1
        string = string + str(int((str(hexlify(x[y: y + 1]))[2: -1]), 16))
        print(int((str(hexlify(x[y: y + 1]))[2: -1]), 16), end="")
        if y != 3:
            print(".", end="")
            string = string + "."
    print()
    return string


def get_ipv4(x):  # returns ipv4 in corect format
    flag = 0
    string = ""
    for y in range(0, 4):
        flag += 1
        string = string + str(int((str(hexlify(x[y: y + 1]))[2: -1]), 16))
        if y != 3:
            string = string + "."
    return string


def print_ipv4_adreses():  # prints all ip adreses
    flag = 0
    print("IP adresy vsetkych primacich uzlov")
    global VSETKY_ADRESY
    for x in VSETKY_ADRESY:
        for y in range(0, 4):
            flag += 1
            print(int((str(hexlify(x[y: y + 1]))[2: -1]), 16), end="")
            if y != 3:
                print(".", end="")
        print()


def count_addresses(adresa):  # counts number of adreses
    if adresa in VSETKY_ADRESY:
        value = VSETKY_ADRESY[adresa]
        VSETKY_ADRESY[adresa] = value + 1
    else:
        VSETKY_ADRESY[adresa] = 1


def load_database():  # tato funkcia mi nacita vsetky slovniky zo suboru
    with open('LLC.txt', 'r') as file:
        for line in file:
            x, y = line.split(":", 1)
            x = int(x)
            y = y[0: -1]
            LLC[x] = y

    with open('ETHER.txt', 'r') as file:
        for line in file:
            x, y = line.split(":", 1)
            x = int(x)
            y = y[0: -1]
            ETHER[x] = y

    with open('ipprotocol.txt', 'r') as file:
        for line in file:
            x, y = line.split(":", 1)
            x = int(x)
            y = y[0: -1]
            IP[x] = y

    with open('tcp.txt', 'r') as file:
        for line in file:
            x, y = line.split(":", 1)
            x = int(x)
            y = y[0: -1]
            TCP[x] = y

    with open('icmp.txt', 'r') as file:
        for line in file:
            x, y = line.split(":", 1)
            x = int(x)
            y = y[0: -1]
            ICMP[x] = y


def print_protocol_ether_type(decimal):  # prints ether type protocol
    try:
        x = ETHER[decimal]
        print(x)
    except:
        print("Type unknown")


def protocol_ip_type(decimal):  # returns ip protocol
    try:
        x = IP[decimal]
        return x
    except:
        return 0


def tcp_well_known_port(decimal):  # returns well known port
    try:
        x = TCP[decimal]
        print(x)
        return x
    except:
        return 0


def print_protocol_LLC_type(decimal):  # prints llc type
    try:
        x = LLC[decimal]
        print(x)
    except:
        print("Type unknown")


def print_icmp(decimal):  # prints icmp type
    try:
        x = ICMP[decimal]
        print(x)
    except:
        print("Type unknown")


def print_addresses(adres):  # prints adreses in corect format
    print("Zdrojová MAC adresa: ", end="")
    flag = 0
    for x in range(6, 12):
        flag += 1
        print(str(hexlify(adres[x:x + 1]))[2: -1], end="")
        print(" ", end="")
    print()

    print("Cieľová MAC adresa: ", end="")
    flag = 0
    for x in range(6):
        flag += 1
        print(str(hexlify(adres[x:x + 1]))[2: -1], end="")
        print(" ", end="")
    print()


def print_sizes(size):  # prints sizes
    print("dĺžka rámca poskytnutá pcap API – ", len(size), "B")
    if len(size) < 60:
        print("dĺžka rámca prenášaného po médiu – 64 B", )
    else:
        print("dĺžka rámca prenášaného po médiu", len(size) + 4, "B")


def print_hexa(hexa):  # prints whole packet in hexadecimal
    flag = 0
    for x in range(len(hexa)):
        if flag % 8 == 0 and flag > 2:
            print(" ", end="")
        if flag % 16 == 0 and flag > 2:
            print("\n", end="")
        flag += 1
        print(str(hexlify(hexa[x:x+1]))[2: -1], end="")
        print(" ", end="")
    print()


def uloha_1_az_3(packet):  # vypis uloh 1 az 3

    global poradove_cislo_ramca
    poradove_cislo_ramca += 1
    print("Ramec", poradove_cislo_ramca)

    print("dĺžka rámca poskytnutá pcap API – ", len(packet), "B")
    if len(packet) < 60:
        print("dĺžka rámca prenášaného po médiu – 64 B", )
    else:
        print("dĺžka rámca prenášaného po médiu", len(packet) + 4, "B")
    num_dec = int(str(hexlify(packet[12:14]))[2: -1], 16)
    if num_dec > 1500:
        print("Ethernet II")
        print_addresses(packet)
        print_protocol_ether_type(num_dec)
        if num_dec == 2048:
            ip_protocol = protocol_ip_type(int(str(hexlify(packet[23:24]))[2: -1], 16))
            count_addresses(packet[30:34])
            offset = int(str(hexlify(packet[14:15]))[3: -1], 16) * 4 + 14
            if ip_protocol == "TCP":
                print("Zdrojova IP adresa: ", end="")
                print_ipv4(packet[26:30])
                print("Cielova IP adresa: ", end="")
                print_ipv4(packet[30:34])
                print(ip_protocol)
                tcp_source_port = int(str(hexlify(packet[offset:offset + 2]))[2: -1], 16)
                tcp_destination_port = int(str(hexlify(packet[offset + 2:offset + 4]))[2: -1], 16)
                if tcp_source_port < tcp_destination_port:
                    well_known = tcp_well_known_port(tcp_source_port)
                else:
                    well_known = tcp_well_known_port(tcp_destination_port)
                print("zdrojovy port:", tcp_source_port)
                print("cielovy port:", tcp_destination_port)
                if well_known == "http":
                    http_zoznam.append(packet)
                if well_known == "https (ss1)":
                    https_zoznam.append(packet)
                if well_known == "telnet":
                    telnet_zoznam.append(packet)
                if well_known == "ssh":
                    ssh_zoznam.append(packet)
                if well_known == "ftp-control":
                    ftp_riadiace_zoznam.append(packet)
                if well_known == "ftp-data":
                    ftp_datove_zoznam.append(packet)

            elif ip_protocol == "UDP":
                print_ipv4(packet[26:30])
                print_ipv4(packet[30:34])
                tcp_source_port = int(str(hexlify(packet[offset:offset + 2]))[2: -1], 16)
                tcp_destination_port = int(str(hexlify(packet[offset + 2:offset + 4]))[2: -1], 16)
                print("zdrojovy port:", tcp_source_port)
                print("cielovy port:", tcp_destination_port)
            elif ip_protocol == "ICMP":
                print_ipv4(packet[26:30])
                print_ipv4(packet[30:34])
                print("ICMP")

    else:
        if str(hexlify(packet[14:16]))[2: -1] == "ffff":
            print("IEEE 802.3 – Raw")
            print_addresses(packet)
            print("IPX")
        elif str(hexlify(packet[14:15]))[2: -1] == "aa":
            print("IEEE 802.3 – SNAP")
            print_addresses(packet)
            num_dec = int(str(hexlify(packet[20:22]))[2: -1], 16)
            print_protocol_ether_type(num_dec)
        else:
            num_dec = int(str(hexlify(packet[14:15]))[2: -1], 16)
            print("IEEE 802.3 LLC")
            print_addresses(packet)
            print_protocol_LLC_type(num_dec)
    print_hexa(packet)


def napln_listy(packet):  # naplni mi vsetky polia pozadovanymi protokolmi
    global poradove_cislo_ramca
    global arp_zoznam
    poradove_cislo_ramca += 1
    num_dec = int(str(hexlify(packet[12:14]))[2: -1], 16)
    if num_dec == 2048:
        ip_protocol = protocol_ip_type(int(str(hexlify(packet[23:24]))[2: -1], 16))
        offset = int(str(hexlify(packet[14:15]))[3: -1], 16) * 4 + 14
        if ip_protocol == "TCP":
            tcp_source_port = int(str(hexlify(packet[offset:offset + 2]))[2: -1], 16)
            tcp_destination_port = int(str(hexlify(packet[offset + 2:offset + 4]))[2: -1], 16)
            well_known = ""
            if tcp_source_port < tcp_destination_port:
                try:
                    well_known = TCP[tcp_source_port]
                except:
                    print(end="")
            else:
                try:
                    well_known = TCP[tcp_destination_port]
                except:
                    print(end="")

            if well_known == "http":
                http_zoznam.append([poradove_cislo_ramca, packet])
            if well_known == "https (ss1)":
                https_zoznam.append(([poradove_cislo_ramca, packet]))
            if well_known == "telnet":
                telnet_zoznam.append(([poradove_cislo_ramca, packet]))
            if well_known == "ssh":
                ssh_zoznam.append(([poradove_cislo_ramca, packet]))
            if well_known == "ftp-control":
                ftp_riadiace_zoznam.append(([poradove_cislo_ramca, packet]))
            if well_known == "ftp-data":
                ftp_datove_zoznam.append(([poradove_cislo_ramca, packet]))


    if num_dec == 2054:
        arp_zoznam.append([poradove_cislo_ramca, packet])


def uloha_4a(protokol):  # vypis ulohy 4a
    global pole_struktur
    offset = 0
    for packet in protokol:

        offset = int(str(hexlify(packet[1][14:15]))[3: -1], 16) * 4 + 14  # ofset pouzivam na spravne posuvanie sa v bytoch
        source = get_ipv4(packet[1][26:30])  # source ip
        dest = get_ipv4(packet[1][30:34])  # dest ip
        tcp_source_port = int(str(hexlify(packet[1][offset:offset + 2]))[2: -1], 16)  # tcp source port
        tcp_destination_port = int(str(hexlify(packet[1][offset + 2:offset + 4]))[2: -1], 16)  # tcp dest port
        first = Commun(source, dest, tcp_source_port, tcp_destination_port)

        if len(pole_struktur) == 0:
            first.packets_of_communication.append(packet[1])
            first.add_order(packet[0])
            pole_struktur.append(first)


        else:
            urobene = 0
            for x in pole_struktur:
                if (x.source == dest and x.source_port == tcp_destination_port and x.dest == source and x.dest_port == tcp_source_port)\
                        or (x.source == source and x.source_port == tcp_source_port and x.dest == dest and x.dest_port == tcp_destination_port):  # trosku zvacsit podmienku
                    x.add_order(packet[0])
                    x.add_to_packet(packet[1])
                    urobene = 1
                    break
            if urobene == 0:
                first.packets_of_communication.append(packet[1])
                first.add_order(packet[0])
                pole_struktur.append(first)

    counter_kde_som = 0
    for x in pole_struktur:
        if len(x.packets_of_communication) < 3:
            pole_struktur[counter_kde_som] = 0
            counter_kde_som += 1
        else:
            offset1, offset2, offset3, zaciatok1, zaciatok2, zaciatok3, koniec1, koniec2, koniec3, koniec4 = 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
            offset1 = int(str(hexlify(x.packets_of_communication[0][14:15]))[3: -1], 16) * 4 + 14
            offset2 = int(str(hexlify(x.packets_of_communication[1][14:15]))[3: -1], 16) * 4 + 14
            offset3 = int(str(hexlify(x.packets_of_communication[2][14:15]))[3: -1], 16) * 4 + 14
            zaciatok1 = int(str(hexlify(x.packets_of_communication[0][offset1 + 13: offset + 14]))[2: -1], 16)
            zaciatok2 = int(str(hexlify(x.packets_of_communication[1][offset2 + 13: offset + 14]))[2: -1], 16)
            zaciatok3 = int(str(hexlify(x.packets_of_communication[2][offset3 + 13: offset + 14]))[2: -1], 16)

            if (zaciatok1 == 2 and zaciatok2 == 18 and zaciatok3 == 16):
                x.packets_of_communication = x.packets_of_communication
                counter_kde_som += 1
            else:
                pole_struktur[counter_kde_som] = 0
                counter_kde_som += 1


    for x in pole_struktur:
        if x == 0:
            continue
        offset1,offset2,offset3,zaciatok1,zaciatok2,zaciatok3,koniec1,koniec2,koniec3,koniec4=0,0,0,0,0,0,0,0,0,0
        offset1 = int(str(hexlify(x.packets_of_communication[0][14:15]))[3: -1], 16) * 4 + 14
        offset2 = int(str(hexlify(x.packets_of_communication[1][14:15]))[3: -1], 16) * 4 + 14
        offset3 = int(str(hexlify(x.packets_of_communication[2][14:15]))[3: -1], 16) * 4 + 14

        zaciatok1 = int(str(hexlify(x.packets_of_communication[0][offset1 + 13: offset + 14]))[2: -1], 16)

        zaciatok2 = int(str(hexlify(x.packets_of_communication[1][offset2 + 13: offset + 14]))[2: -1], 16)

        zaciatok3 = int(str(hexlify(x.packets_of_communication[2][offset3 + 13: offset + 14]))[2: -1], 16)

        if len(x.packets_of_communication) >= 4:
            koniec1 = int(str(hexlify(x.packets_of_communication[-1][offset1 + 13: offset + 14]))[2: -1], 16)
            koniec2 = int(str(hexlify(x.packets_of_communication[-2][offset2 + 13: offset + 14]))[2: -1], 16)
            koniec3 = int(str(hexlify(x.packets_of_communication[-3][offset3 + 13: offset + 14]))[2: -1], 16)
            koniec4 = int(str(hexlify(x.packets_of_communication[-4][offset3 + 13: offset + 14]))[2: -1], 16)

        if (zaciatok1 == 2 and zaciatok2 == 18 and zaciatok3 == 16) and ((koniec1 == 4) or (koniec1 == 20) or (koniec1 == 16 and koniec2 == 17 and koniec3 == 17) or (koniec1 == 16 and koniec2 == 17 and koniec3 == 16 and koniec4 == 17)):
            x.is_complete = 1
        else:
            x.is_complete = 0

    vypisana_nespravna = 0
    vypisana_spravna = 0
    counter_spravna = 0
    counter_nespravna = 0
    counter_ramca = 0
    for x in pole_struktur:
        if x == 0:
            continue
        if x.is_complete == 1 and vypisana_spravna == 0:
            print("Vypis kompletnej komunikacie")
            for y in x.packets_of_communication:
                counter_spravna += 1
                vypisana_spravna = 1
                if (len(x.packets_of_communication) > 20 and counter_spravna > 10) and len(x.packets_of_communication) - counter_spravna >= 10:
                    counter_ramca += 1
                    continue
                print("Ramec ", x.order[counter_ramca], ": ", sep="")
                print("dĺžka rámca poskytnutá pcap API – ", len(y), "B")
                if len(y) < 60:
                    print("dĺžka rámca prenášaného po médiu – 64 B", )
                else:
                    print("dĺžka rámca prenášaného po médiu", len(y) + 4, "B")
                counter_ramca += 1
                num_dec = int(str(hexlify(y[12:14]))[2: -1], 16)
                if num_dec > 1500:
                    print("Ethernet II")
                    print_addresses(y)
                    print_protocol_ether_type(num_dec)
                    if num_dec == 2048:
                        ip_protocol = protocol_ip_type(int(str(hexlify(y[23:24]))[2: -1], 16))
                        count_addresses(y[30:34])
                        offset = int(str(hexlify(y[14:15]))[3: -1], 16) * 4 + 14
                        if ip_protocol == "TCP":
                            print("Zdrojova IP adresa: ", end="")
                            source = print_ipv4(y[26:30])
                            print("Cielova IP adresa: ", end="")
                            dest = print_ipv4(y[30:34])
                            print(ip_protocol)
                            tcp_source_port = int(str(hexlify(y[offset:offset + 2]))[2: -1], 16)
                            tcp_destination_port = int(str(hexlify(y[offset + 2:offset + 4]))[2: -1], 16)
                            if tcp_source_port < tcp_destination_port:
                                tcp_well_known_port(tcp_source_port)
                            else:
                                tcp_well_known_port(tcp_destination_port)
                            print("zdrojovy port:", tcp_source_port)
                            print("cielovy port:", tcp_destination_port)
    counter_ramca = 0
    for x in pole_struktur:
        if x == 0:
            continue
        if x.is_complete == 0 and vypisana_nespravna == 0:
            print("Vypis nekompletnej komunikacie")
            for y in x.packets_of_communication:
                counter_nespravna += 1
                vypisana_nespravna = 1
                if (len(x.packets_of_communication) > 20 and counter_nespravna > 10) and len(x.packets_of_communication) - counter_nespravna >= 10:
                    counter_ramca += 1
                    continue
                print("Ramec ", x.order[counter_ramca], ": ", sep="")
                print("dĺžka rámca poskytnutá pcap API – ", len(y), "B")
                if len(y) < 60:
                    print("dĺžka rámca prenášaného po médiu – 64 B", )
                else:
                    print("dĺžka rámca prenášaného po médiu", len(y) + 4, "B")
                counter_ramca += 1
                num_dec = int(str(hexlify(y[12:14]))[2: -1], 16)
                if num_dec > 1500:
                    print("Ethernet II")
                    print_addresses(y)
                    print_protocol_ether_type(num_dec)
                    if num_dec == 2048:
                        ip_protocol = protocol_ip_type(int(str(hexlify(y[23:24]))[2: -1], 16))
                        count_addresses(y[30:34])
                        offset = int(str(hexlify(y[14:15]))[3: -1], 16) * 4 + 14
                        if ip_protocol == "TCP":
                            print("Zdrojova IP adresa: ", end="")
                            print_ipv4(y[26:30])
                            print("Cielova IP adresa: ", end="")
                            print_ipv4(y[30:34])
                            print(ip_protocol)
                            tcp_source_port = int(str(hexlify(y[offset:offset + 2]))[2: -1], 16)
                            tcp_destination_port = int(str(hexlify(y[offset + 2:offset + 4]))[2: -1], 16)
                            if tcp_source_port < tcp_destination_port:
                                tcp_well_known_port(tcp_source_port)
                            else:
                                tcp_well_known_port(tcp_destination_port)
                            print("zdrojovy port:", tcp_source_port)
                            print("cielovy port:", tcp_destination_port)
    if vypisana_spravna == 0:
        print("v tomto pakete sa nenachadza kompletna komunikacia")
    if vypisana_nespravna ==0:
        print("V tomto pakete sa nenachadza nekompletna komunikacia")


def uloha_4h_load(packet1):  # nacitanie ulohy 4h
    global pole_struktur
    global poradove_cislo_ramca
    poradove_cislo_ramca += 1


    num_dec = int(str(hexlify(packet1[12:14]))[2: -1], 16)
    if num_dec > 1500:
        if num_dec == 2048:

            ip_protocol = protocol_ip_type(int(str(hexlify(packet1[23:24]))[2: -1], 16))
            offset = int(str(hexlify(packet1[14:15]))[3: -1], 16) * 4 + 14
            if  ip_protocol == "ICMP":
                source = get_ipv4(packet1[26:30])
                dest = get_ipv4(packet1[30:34])
                icmp_type = int(str(hexlify(packet1[offset: offset + 1]))[2: -1], 16)

                first = icmp(source, dest)

                if len(pole_struktur) == 0:

                    if icmp_type == 8:
                        first.add_request(packet1)
                        first.add_request_order(poradove_cislo_ramca)

                    elif icmp_type == 0:
                        first.add_reply(packet1)
                        first.add_reply_order(poradove_cislo_ramca)

                    else:
                        first.add_other(packet1)
                        first.add_other_order(poradove_cislo_ramca)

                    pole_struktur.append(first)


                else:
                    urobene = 0
                    for x in pole_struktur:
                        if (x.source == source and x.destination == dest) or (x.source == dest and x.destination == source):
                            if icmp_type == 8:
                                x.add_request(packet1)
                                x.add_request_order(poradove_cislo_ramca)

                            elif icmp_type == 0:
                                x.add_reply(packet1)
                                x.add_reply_order(poradove_cislo_ramca)
                            else:
                                x.add_other(packet1)
                                x.add_other_order(poradove_cislo_ramca)

                            urobene = 1
                            break
                    if urobene == 0:
                        if icmp_type == 8:
                            first.add_request(packet1)
                            first.add_request(poradove_cislo_ramca)

                        elif icmp_type == 0:
                            first.add_reply(packet1)
                            first.add_reply_order(poradove_cislo_ramca)
                        else:
                            first.add_other(packet1)
                            first.add_other_order(poradove_cislo_ramca)

                        pole_struktur.append(first)


def uloha_4h_print():  # vypis ulohy 4h
    global pole_struktur
    counter_reply = 0
    counter_request = 0
    counter_other = 0
    counter_all=0
    icmp_type = 0
    z = 0
    for x in pole_struktur:
        counter_all += 1
        print("Dvojica cislo:", counter_all)
        for y, z in zip(x.request_pole, x.reply_pole):

            num_dec = int(str(hexlify(y[12:14]))[2: -1], 16)
            if num_dec > 1500:
                if num_dec == 2048:
                    ip_protocol = protocol_ip_type(int(str(hexlify(y[23:24]))[2: -1], 16))
                    offset = int(str(hexlify(y[14:15]))[3: -1], 16) * 4 + 14
                    if ip_protocol == "ICMP":
                        print("Ramec ", x.request_order[counter_request], ": ", sep="")
                        print("dĺžka rámca poskytnutá pcap API – ", len(y), "B")
                        if len(y) < 60:
                            print("dĺžka rámca prenášaného po médiu – 64 B", )
                        else:
                            print("dĺžka rámca prenášaného po médiu", len(y) + 4, "B")
                        counter_request += 1
                        print("Ethernet II")
                        print_addresses(y)
                        print_protocol_ether_type(num_dec)
                        source = get_ipv4(y[26:30])
                        dest = get_ipv4(y[30:34])
                        icmp_type = int(str(hexlify(y[offset: offset + 1]))[2: -1], 16)
                    print_icmp(icmp_type)
            print()
            num_dec = int(str(hexlify(z[12:14]))[2: -1], 16)
            if num_dec > 1500:
                if num_dec == 2048:
                    ip_protocol = protocol_ip_type(int(str(hexlify(z[23:24]))[2: -1], 16))
                    offset = int(str(hexlify(z[14:15]))[3: -1], 16) * 4 + 14
                    if ip_protocol == "ICMP":
                        print("Ramec ", x.reply_order[counter_reply], ": ", sep="")
                        print("dĺžka rámca poskytnutá pcap API – ", len(z), "B")
                        if len(z) < 60:
                            print("dĺžka rámca prenášaného po médiu – 64 B", )
                        else:
                            print("dĺžka rámca prenášaného po médiu", len(z) + 4, "B")
                        counter_reply += 1
                        print("Ethernet II")
                        print_addresses(z)
                        print_protocol_ether_type(num_dec)
                        source = get_ipv4(z[26:30])
                        dest = get_ipv4(z[30:34])
                        icmp_type = int(str(hexlify(z[offset: offset + 1]))[2: -1], 16)
                    print_icmp(icmp_type)
            print()
        print("Ostatne")
        for u in x.other:
            num_dec = int(str(hexlify(z[12:14]))[2: -1], 16)
            if num_dec > 1500:
                if num_dec == 2048:
                    ip_protocol = protocol_ip_type(int(str(hexlify(z[23:24]))[2: -1], 16))
                    offset = int(str(hexlify(z[14:15]))[3: -1], 16) * 4 + 14
                    if ip_protocol == "ICMP":
                        print("Ramec ", x.other_order[counter_other], ": ", sep="")
                        print("dĺžka rámca poskytnutá pcap API – ", len(z), "B")
                        if len(z) < 60:
                            print("dĺžka rámca prenášaného po médiu – 64 B", )
                        else:
                            print("dĺžka rámca prenášaného po médiu", len(z) + 4, "B")
                        counter_other += 1
                        print("Ethernet II")
                        print_addresses(z)
                        print_protocol_ether_type(num_dec)
                        source = get_ipv4(z[26:30])
                        dest = get_ipv4(z[30:34])
                        icmp_type = int(str(hexlify(z[offset: offset + 1]))[2: -1], 16)
                    print_icmp(icmp_type)
            print()


def uloha_4g_nacitaj(packet):   # nacitanie ulohy 4g
    global poradove_cislo_ramca
    global is_first_tftp
    poradove_cislo_ramca += 1
    global komunikujem
    destination_port = 0
    source_port = 0

    num_dec = int(str(hexlify(packet[12:14]))[2: -1], 16)
    if num_dec == 2048:
        ip_protocol = protocol_ip_type(int(str(hexlify(packet[23:24]))[2: -1], 16))
        offset = int(str(hexlify(packet[14:15]))[3: -1], 16) * 4 + 14
        if ip_protocol == "UDP":
            source_port = int(str(hexlify(packet[offset :offset + 2]))[2: -1], 16)
            destination_port = int(str(hexlify(packet[offset + 2:offset + 4]))[2: -1], 16)

            if destination_port == 69:
                is_first_tftp = 1
                if komunikujem == 1:
                    komunikujem = 0
                if komunikujem == 0:
                    komunikujem = 1

                firt = tftp(source_port, destination_port)
                firt.packets_of_communication.append(packet)
                firt.add_order(poradove_cislo_ramca)
                tftp_pole_struktur.append(firt)
                return
        if ip_protocol == "UDP":
            for x in tftp_pole_struktur:
                if is_first_tftp == 1:
                    if komunikujem and (x.source_port == destination_port or x.source_port == source_port):#kukam iba jeden chcel by som obidva
                        if int(str(hexlify(packet[offset + 8:offset + 10]))[2: -1], 16) == 5:
                            x.packets_of_communication.append(packet)
                            x.add_order(poradove_cislo_ramca)
                            komunikujem = 0
                            break
                        else:
                            x.destination_port = source_port
                            x.add_order(poradove_cislo_ramca)
                            x.packets_of_communication.append(packet)
                else:
                    if komunikujem and ((x.source_port == source_port and x.destination_port == destination_port) or x.source_port == destination_port and x.destination_port == source_port):#kukam iba jeden chcel by som obidva
                        if int(str(hexlify(packet[offset + 8:offset + 10]))[2: -1], 16) == 5:
                            x.packets_of_communication.append(packet)
                            x.add_order(poradove_cislo_ramca)
                            komunikujem = 0
                            break
                        else:
                            x.add_order(poradove_cislo_ramca)
                            x.packets_of_communication.append(packet)


def uloha_4g_vypis():  # vypis ulohy 4g
    counter = 0
    counter_poradove_cislo_ramca = 0
    for x in tftp_pole_struktur:
        counter_poradove_cislo_ramca = 0
        counter += 1
        print("Toto je komunikacia cislo:", counter)
        counter_spravna = 0
        for y in x.packets_of_communication:
            counter_spravna += 1
            if (len(x.packets_of_communication) > 20 and counter_spravna > 10) and len(x.packets_of_communication) - counter_spravna >= 10:
                counter_poradove_cislo_ramca += 1
                continue
            print("Ramec ", x.order[counter_poradove_cislo_ramca], ": ", sep="")
            print("dĺžka rámca poskytnutá pcap API – ", len(y), "B")
            if len(y) < 60:
                print("dĺžka rámca prenášaného po médiu – 64 B", )
            else:
                print("dĺžka rámca prenášaného po médiu", len(y) + 4, "B")
            counter_poradove_cislo_ramca += 1
            num_dec = int(str(hexlify(y[12:14]))[2: -1], 16)
            if num_dec > 1500:
                print("Ethernet II")
                print_addresses(y)
                print_protocol_ether_type(num_dec)
                if num_dec == 2048:
                    ip_protocol = protocol_ip_type(int(str(hexlify(y[23:24]))[2: -1], 16))
                    count_addresses(y[30:34])
                    offset = int(str(hexlify(y[14:15]))[3: -1], 16) * 4 + 14
                    if ip_protocol == "UDP":
                        print("TFTP")
                        print("Zdrojova IP adresa: ", end="")
                        print_ipv4(y[26:30])
                        print("Cielova IP adresa: ", end="")
                        print_ipv4(y[30:34])
                        print(ip_protocol)
                        tcp_source_port = int(str(hexlify(y[offset:offset + 2]))[2: -1], 16)
                        tcp_destination_port = int(str(hexlify(y[offset + 2:offset + 4]))[2: -1], 16)
                        print("zdrojovy port:", tcp_source_port)
                        print("cielovy port:", tcp_destination_port)
        print()


def uloha_4i():  #vypise ulohu 4i
    global arp_zoznam
    y = 0
    packet = 0
    for packet in arp_zoznam:
        sender_ip_adress = get_ipv4(packet[1][28:32])
        target_ip_adress = get_ipv4(packet[1][38:42])
        sender_mac_adress = str(hexlify(packet[1][22:28]))[2: -1]
        target_mac_adres = str(hexlify(packet[1][32:38]))[2: -1]
        Opcode = (int(str(hexlify(packet[1][21:22]))[2: -1], 16))
        first = arp(sender_ip_adress, target_ip_adress)

        if len(pole_struktur) == 0:
            if Opcode == 1:
                first.add_request(packet[1])
                first.add_request_order(packet[0])
            if Opcode == 2:
                first.add_reply(packet[1])
                first.add_reply_order(packet[0])
                first.is_finished = 1

            first.sender_mac(sender_mac_adress)
            pole_struktur.append(first)

        else:
            urobene = 0
            for x in pole_struktur:
                if (((x.sender == sender_ip_adress and x.target == target_ip_adress) or (x.sender == target_ip_adress and x.target == sender_ip_adress)) and (x.sender_mac == sender_mac_adress or x.sender_mac == target_mac_adres)):
                    if Opcode == 1:
                        x.add_request(packet[1])
                        x.add_request_order(packet[0])
                    if Opcode == 2:
                        x.add_reply(packet[1])
                        x.add_reply_order(packet[0])
                        x.is_finished = 1
                    urobene = 1
                    break
            if urobene == 0:
                if Opcode == 1:
                    first.add_request(packet[1])
                    first.add_request_order(packet[0])
                if Opcode == 2:
                    first.add_reply(packet[1])
                    first.add_reply_order(packet[0])
                    first.is_finished = 1
                first.sender_mac(sender_mac_adress)
                pole_struktur.append(first)

    dvojica_counter = 0
    counter_reply = 0
    counter_request = 0
    counter_other = 0
    counter_all = 0
    counter = 0
    counter_poradove_cislo_ramca = 0
    counter_order = 0
    counter_reply = 0
    for x in pole_struktur:
        counter_order = 0
        counter_poradove_cislo_ramca = 0
        counter += 1
        print("Komunikacia", counter)
        counter_spravna = 0
        for y in x.request_array:

            print("ARP-request IP adresa:", get_ipv4(y[38:42]), "MAC adresa ???")
            print("Zdrojova ip:", get_ipv4(y[28:32]), "Cielova ip:", get_ipv4(y[38:42]))
            print("Ramec ", x.request_order[counter_order], ": ", sep="")
            counter_order += 1
            word = str(hexlify(y[32:38]))[2: -1]
            counter_word = 0
            print("dĺžka rámca poskytnutá pcap API – ", len(packet), "B")
            if len(packet) < 60:
                print("dĺžka rámca prenášaného po médiu – 64 B", )
            else:
                print("dĺžka rámca prenášaného po médiu", len(packet) + 4, "B")
            print("Ethernet II")
            print("ARP")

            print("Zdrojova mac adresa ", end="")
            word = str(hexlify(y[22:28]))[2: -1]
            counter_word = 0
            for z in word:
                if counter_word % 2 == 0 and counter_word > 1:
                    print(" ", end="")
                print(z, end="")
                counter_word += 1
            print()

            print("Cielova mac adresa ", end="")
            word = str(hexlify(y[32:38]))[2: -1]
            counter_word = 0
            for z in word:
                if counter_word % 2 == 0 and counter_word > 1:
                    print(" ", end="")
                print(z, end="")
                counter_word += 1
            print()
            print()
            print_hexa(y)
            print()
        for z in (x.reply_array):

            print("ARP-reply IP adresa:", get_ipv4(z[38:42]), "MAC adresa", end="")
            word = str(hexlify(z[32:38]))[2: -1]
            counter_word = 0
            for u in word:
                if counter_word % 2 == 0 and counter_word > 1:
                    print(" ", end="")
                print(u, end="")
                counter_word += 1
            print()
            print("Zdrojova ip:", get_ipv4(z[28:32]), "Cielova ip:", get_ipv4(z[38:42]))
            print("Ramec ", x.reply_order[counter_reply], ": ", sep="")
            counter_reply += 1
            word = str(hexlify(z[32:38]))[2: -1]
            counter_word = 0

            print("dĺžka rámca poskytnutá pcap API – ", len(packet), "B")
            if len(packet) < 60:
                print("dĺžka rámca prenášaného po médiu – 64 B", )
            else:
                print("dĺžka rámca prenášaného po médiu", len(packet) + 4, "B")
            print("Ethernet II")
            print("ARP")

            print("Zdrojova mac adresa ", end="")
            word = str(hexlify(z[22:28]))[2: -1]
            counter_word = 0
            for u in word:
                if counter_word % 2 == 0 and counter_word > 1:
                    print(" ", end="")
                print(u, end="")
                counter_word += 1
            print()

            print("Cielova mac adresa ", end="")
            word = str(hexlify(z[32:38]))[2: -1]
            counter_word = 0
            for u in word:
                if counter_word % 2 == 0 and counter_word > 1:
                    print(" ", end="")
                print(u, end="")
                counter_word += 1
            print()
            print()
            print_hexa(z)
            print()


load_database()  # nacita mi vsetky slovniky ktore potrebujem
print("Analyzator packetov")
print("Autor: Peter Plevko")
print("priklad cesty: vzorky_pcap_na_analyzu/trace-27.pcap")
file_name = input("zadaj cestu k suboru : ")
choice = int(input("Stlac 1 pre vypis do suboru a hocico ine pre vypis na monitor: "))
print("Zadaj 0 pre ukoncenie programu")
print("Zadaj 1 pre vypis uloh 1-3")
print("Zadaj 4a pre analyzu HTTP")
print("Zadaj 4b pre analyzu HTTPS")
print("Zadaj 4c pre analyzu TELNET")
print("Zadaj 4d pre analyzu SSH")
print("Zadaj 4e pre analyzu FTP riadiace")
print("Zadaj 4f pre analyzu FTP datove")
print("Zadaj 4g pre analyzu TFTP")
print("Zadaj 4h pre analyzu ICMP")
print("Zadaj 4i pre analyzu ARP")

user_input = input("Zadaj vyber ulohy: ")
packets = rdpcap(file_name)
counter = 1
if choice == 1:  # vzorky_pcap_na_analyzu/trace-27.pcap
    output = open("vystup.txt", "w")
    sys.stdout = output

for packet in packets:
    raw_data = raw(packet)
    #  sem mi zacina user gui
    if user_input == "1":
        uloha_1_az_3(raw_data)
        if counter == len(packets):
            print_ipv4_adreses()
            print_adres_with_most_packet()
        counter += 1

    if user_input == "4a":  #HTTP
        napln_listy(raw_data)
        if counter == len(packets):
            uloha_4a(http_zoznam)
        counter += 1

    if user_input == "4b":  #HTTPS
        napln_listy(raw_data)

        if counter == len(packets):
            uloha_4a(https_zoznam)
        counter += 1

    if user_input == "4c":  #TELNET
        napln_listy(raw_data)
        if counter == len(packets):
            uloha_4a(telnet_zoznam)
        counter += 1

    if user_input == "4d":  #SSH
        napln_listy(raw_data)
        if counter == len(packets):
            uloha_4a(ssh_zoznam)
        counter += 1

    if user_input == "4e":  #FTP RIADIACE
        napln_listy(raw_data)
        if counter == len(packets):
            uloha_4a(ftp_riadiace_zoznam)
        counter += 1

    if user_input == "4f":  #FTP DATOVE
        napln_listy(raw_data)
        if counter == len(packets):
            uloha_4a(ftp_datove_zoznam)
        counter += 1

    if user_input == "4g":  #TFTP
        uloha_4g_nacitaj(raw_data)
        if counter == len(packets):
            uloha_4g_vypis()
        counter += 1

    if user_input == "4h":  #ICMP
        uloha_4h_load(raw_data)
        if counter == len(packets):
            uloha_4h_print()
        counter += 1

    if user_input == "4i":  #ARP
        napln_listy(raw_data)
        if counter == len(packets):
            uloha_4i()
        counter += 1

    if user_input == "0":
        break