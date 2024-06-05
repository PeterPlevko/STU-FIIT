#    Copyright 2022
#
#    This program is free software: you can redistribute it and/or modify
#    it under the terms of the GNU General Public License as published by
#    the Free Software Foundation, either version 3 of the License, or
#    (at your option) any later version.

#    This program is distributed in the hope that it will be useful,
#    but WITHOUT ANY WARRANTY; without even the implied warranty of
#    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#    GNU General Public License for more details.

#    You should have received a copy of the GNU General Public License
#    along with this program.  If not, see <http://www.gnu.org/licenses/>.

from siplib import UDPHandler
import socketserver
import socket
import time
import logging
import threading


def starter():
    INADDRESS, PORT = '0.0.0.0', 5060
    ipaddress = socket.gethostbyname(socket.gethostname())
    
    logging.basicConfig(format='%(asctime)s:%(levelname)s:%(message)s',filename='proxy.log',level=logging.INFO,datefmt='%H:%M:%S')
    logging.info(time.strftime("%a, %d %b %Y %H:%M:%S ", time.localtime()))
    logging.info(socket.gethostname())
    
    server = socketserver.UDPServer((INADDRESS, PORT), UDPHandler)
    server.recordroute = "Record-Route: <sip:%s:%d;lr>" % (ipaddress,PORT)
    server.topvia = "Via: SIP/2.0/UDP %s:%d" % (ipaddress,PORT)
    server.logging = logging
    
    thread = threading.Thread(None, server.serve_forever)
    thread.daemon = True
    thread.start()
    while(input("Type 'exit' to stop SIP PROXY: ") != "exit"):
        continue
    server.shutdown()
    server.server_close()
    thread.join()
    exit(0)
    
if __name__ == "__main__": 
    starter()