####    !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!    ####
####    SOURCE: https://github.com/tirfil/PySipFullProxy/blob/master/sipfullproxy.py    ####
####    !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!    ####

#    Copyright 2014 Philippe THIRION
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
import socketserver
import time
import re

class UDPHandler(socketserver.BaseRequestHandler): 
    logging = None
    registrar = {}
    message = {
        '200': '200 Vpoho',
        '400': '400 Zla Poziadavka',
        '406': '406 Neakceptovatelne',
        '480': '480 Docasne Nedostupne',
        '488': '488 Neakceptovatelne Tu',
        '500': '500 Chyba Na Strane Servera'
    }

    states = {
        "100 Trying": "100 Pokus",
        "180 Ringing": "180 Zvonim",
        "181 Call is Being Forwarded": "181 Hovor je presmerovany",
        "182 Queued": "182 Ste v poradi",
        "183 Session Progress": "183 Stav relacie",
        "199 Early Dialog Terminated": "199 Terminovany",
        "200 OK": message["200"],
        "200 Ok": message["200"],
        "202 Accepted": "202 Akceptovany",
        "204 No Notification": "204 Ziadne notifikacie",
        "300 Multiple Choices": "300 Viacej moznosti",
        "301 Moved Permanently": "301 Permanentne presunute",
        "302 Moved Temporarily": "302 Docasne presunute",
        "305 Use Proxy": "305 Pouzi proxy",
        "380 Alternative Service": "380 Ina sluzba",
        "400 Bad Request": "400 Zla poziadavka",
        "401 Unauthorized": "401 Neautorizovane",
        "402 Payment Required": "402 Vyzadovana platbna",
        "403 Forbidden": "403 Nepovolene",
        "404 Not Found": "404 Nenajdene",
        "405 Method Not Allowed": "405 Nedovolena metoda",
        "406 Not Acceptable": "406 Neakceptovatelne",
        "407 Proxy Authentication Required": "407 Vyzadovana proxy autentifikacia",
        "408 Request Timeout": "408 Poziadavka vyprsala",
        "409 Conflict": "409 Konflikt",
        "410 Gone": "410 Papa",
        "411 Length Required": "411 Dlzka",
        "412 Conditional Request Failed": "412 Podmienka zlyhala",
        "413 Request Entity Too Large": "413 Moc velke",
        "414 Request-URI Too Long": "414 Zas moc velke",
        "415 Unsupported Media Type": "415 Nepodporovane sorry",
        "416 Unsupported URI Scheme": "416 Opat nepodporovane",
        "417 Unknown Resource-Priority": "417 Neznama priorita",
        "420 Bad Extension": "420 Zla pripona",
        "421 Extension Required": "421 Pripona vyzadovana",
        "422 Session Interval Too Small": "422 Maly interval",
        "423 Interval Too Brief": "423 Interval",
        "424 Bad Location Information": "424 Zla informacia",
        "425 Bad Alert Message": "425 Zle upozornenie",
        "428 Use Identity Header": "428 Pouzi inu hlavicku",
        "429 Provide Referrer Identity": "429 Poskytni co mas",
        "430 Flow Failed": "430 Control flow",
        "433 Anonymity Disallowed": "433 Anonymous tu nieje povoleny",
        "436 Bad Identity-Info": "436 Zle informacie",
        "437 Unsupported Certificate": "437 Zly certifikat",
        "438 Invalid Identity Header": "438 Zla hlavicka",
        "439 First Hop Lacks Outbound Support": "439 Prvy skok atd",
        "440 Max-Breadth Exceeded": "440 Presiahnute",
        "469 Bad Info Package": "469 Zle informacie balik",
        "470 Consent Needed": "470 Vyzadovany suhlas",
        "480 Temporarily Unavailable": "480 Docasne nedostupne",
        "481 Call/Transaction Does Not Exist": "481 Nieco neexistuje",
        "482 Loop Detected": "482 Detekovany cyklus",
        "483 Too Many Hops": "483 Privela skokov",
        "484 Address Incomplete": "484 Adresa zla",
        "485 Ambiguous": "485 Urcite jednoznacne",
        "486 Busy Here": "486 Obsadeno",
        "487 Request Terminated": "487 Poziadavka urcite vyhovena",
        "488 Not Acceptable Here": "488 Urcite akceptovatelne",
        "489 Bad Event": "489 Zla udalost",
        "491 Request Pending": "491 Poziadavka caka",
        "493 Undecipherable": "493 Nedesifrovatelne",
        "494 Security Agreement Required": "494 Bezpecnost ved vies",
        "500 Internal Server Error": "500 Nikto nieje dokonaly",
        "501 Not Implemented": "501 A uz vobec nikto nieje sto percentny",
        "502 Bad Gateway": "502 Zle branka",
        "503 Service Unavailable": "503 Sluzba je zarucene dostupna",
        "504 Server Time-out": "504 Nejako nestiham",
        "505 Version Not Supported": "505 To aku verziu mas",
        "513 Message Too Large": "513 Skus vacsiu spravu to pomoze",
        "555 Push Notification Service Not Supported": "555 Notifikacie for the win",
        "580 Precondition Failure": "580 Som mamlas",
        "600 Busy Everywhere": "600 Vsetci maju plne ruky prace",
        "603 Decline": "603 Nevolaj tak rychlo znovu",
        "604 Does Not Exist Anywhere": "604 Thanos was here",
        "606 Not Acceptable": "606 Neakceptovatelne",
        "607 Unwanted": "607 Nechcene",
        "608 Rejected": "608 Odmietnute"
    }

    rx_register = re.compile("^REGISTER")
    rx_invite = re.compile("^INVITE")
    rx_ack = re.compile("^ACK")
    rx_prack = re.compile("^PRACK")
    rx_cancel = re.compile("^CANCEL")
    rx_bye = re.compile("^BYE")
    rx_options = re.compile("^OPTIONS")
    rx_subscribe = re.compile("^SUBSCRIBE")
    rx_publish = re.compile("^PUBLISH")
    rx_notify = re.compile("^NOTIFY")
    rx_info = re.compile("^INFO")
    rx_message = re.compile("^MESSAGE")
    rx_refer = re.compile("^REFER")
    rx_update = re.compile("^UPDATE")
    rx_from = re.compile("^From:")
    rx_cfrom = re.compile("^f:")
    rx_to = re.compile("^To:")
    rx_cto = re.compile("^t:")
    rx_tag = re.compile(";tag")
    rx_contact = re.compile("^Contact:")
    rx_ccontact = re.compile("^m:")
    rx_uri = re.compile("sip:([^@]*)@([^;>$]*)")
    rx_addr = re.compile("sip:([^ ;>$]*)")
    rx_code = re.compile("^SIP/2.0 ([^ ]*)")
    rx_request_uri = re.compile("^([^ ]*) sip:([^ ]*) SIP/2.0")
    rx_route = re.compile("^Route:")
    rx_contentlength = re.compile("^Content-Length:")
    rx_ccontentlength = re.compile("^l:")
    rx_via = re.compile("^Via:")
    rx_cvia = re.compile("^v:")
    rx_branch = re.compile(";branch=([^;]*)")
    rx_rport = re.compile(";rport$|;rport;")
    rx_contact_expires = re.compile("expires=([^;$]*)")
    rx_expires = re.compile("^Expires: (.*)$")
    
    def debugRegister(self):
        self.server.logging.debug("*** REGISTRAR ***")
        self.server.logging.debug("*****************")
        for key in self.registrar.keys():
            self.server.logging.debug("%s -> %s" % (key,self.registrar[key][0]))
        self.server.logging.debug("*****************")
    
    def showtime(self):
        self.server.logging.debug(time.strftime("(%H:%M:%S)", time.localtime()))
        
    def quotechars( chars ):
        return ''.join( ['.', c][c.isalnum()] for c in chars )
        
    def hexdump(self, chars, sep, width):
        while chars:
            line = chars[:width]
            chars = chars[width:]
            line = line.ljust( width, '\000' )
            self.server.logging.debug("%s%s%s" % ( sep.join( "%02x" % ord(c) for c in line ),sep, self.quotechars( line )))

    def changeRequestUri(self):
        md = self.rx_request_uri.search(self.data[0])
        if md:
            method = md.group(1)
            uri = md.group(2)
            if uri in self.registrar:
                uri = "sip:%s" % self.registrar[uri][0]
                self.data[0] = "%s %s SIP/2.0" % (method,uri)
        
    def removeRouteHeader(self):
        data = []
        for line in self.data:
            if not self.rx_route.search(line):
                data.append(line)
        return data
    
    def addTopVia(self):
        branch= ""
        data = []
        for line in self.data:
            if self.rx_via.search(line) or self.rx_cvia.search(line):
                md = self.rx_branch.search(line)
                if md:
                    branch=md.group(1)
                    via = "%s;branch=%sm" % (self.server.topvia, branch)
                    data.append(via)
                if self.rx_rport.search(line):
                    text = "received=%s;rport=%d" % self.client_address
                    via = line.replace("rport",text)   
                else:
                    text = "received=%s" % self.client_address[0]
                    via = "%s;%s" % (line,text)
                data.append(via)
            else:
                data.append(line)
        return data
                
    def removeTopVia(self):
        data = []
        for line in self.data:
            if self.rx_via.search(line) or self.rx_cvia.search(line):
                if not line.startswith(self.server.topvia):
                    data.append(line)
            else:
                data.append(line)
        return data
        
    def checkValidity(self,uri):
        _, _, _, validity = self.registrar[uri]
        now = int(time.time())
        if validity > now:
            return True
        else:
            del self.registrar[uri]
            self.server.logging.warning("registration for %s has expired" % uri)
            return False
    
    def getSocketInfo(self,uri):
        _, socket, client_addr, _ = self.registrar[uri]
        return (socket,client_addr)
        
    def getDestination(self):
        destination = ""
        for line in self.data:
            if self.rx_to.search(line) or self.rx_cto.search(line):
                md = self.rx_uri.search(line)
                if md:
                    destination = "%s@%s" %(md.group(1),md.group(2))
                break
        return destination
                
    def getOrigin(self):
        origin = ""
        for line in self.data:
            if self.rx_from.search(line) or self.rx_cfrom.search(line):
                md = self.rx_uri.search(line)
                if md:
                    origin = "%s@%s" %(md.group(1),md.group(2))
                break
        return origin

    def senddata(self, text, client):
        for state in self.states.keys():
            text = text.replace(state, self.states[state])
        
        data = text.encode("utf-8")
        self.socket.sendto(data, client)
        
    def sendResponse(self,code):
        request_uri = "SIP/2.0 " + code
        self.data[0]= request_uri
        index = 0
        data = []
        for line in self.data:
            data.append(line)
            if self.rx_to.search(line) or self.rx_cto.search(line):
                if not self.rx_tag.search(line):
                    data[index] = "%s%s" % (line,";tag=123456")
            if self.rx_via.search(line) or self.rx_cvia.search(line):
                if self.rx_rport.search(line):
                    text = "received=%s;rport=%d" % self.client_address
                    data[index] = line.replace("rport",text) 
                else:
                    text = "received=%s" % self.client_address[0]
                    data[index] = "%s;%s" % (line,text)      
            if self.rx_contentlength.search(line):
                data[index]="Content-Length: 0"
            if self.rx_ccontentlength.search(line):
                data[index]="l: 0"
            index += 1
            if line == "":
                break
        data.append("")
        text = "\r\n".join(data)
        self.senddata(text, self.client_address)
        self.showtime()
        self.server.logging.info("<<< %s" % data[0])
        self.server.logging.debug("---\n<< server send [%d]:\n%s\n---" % (len(text),text))
        
    def processRegister(self):
        fromm = ""
        contact = ""
        contact_expires = ""
        header_expires = ""
        expires = 0
        validity = 0
        for line in self.data:
            if self.rx_to.search(line) or self.rx_cto.search(line):
                md = self.rx_uri.search(line)
                if md:
                    fromm = "%s@%s" % (md.group(1),md.group(2))
            if self.rx_contact.search(line) or self.rx_ccontact.search(line):
                md = self.rx_uri.search(line)
                if md:
                    contact = md.group(2)
                else:
                    md = self.rx_addr.search(line)
                    if md:
                        contact = md.group(1)
                md = self.rx_contact_expires.search(line)
                if md:
                    contact_expires = md.group(1)
            md = self.rx_expires.search(line)
            if md:
                header_expires = md.group(1)
                
        if len(contact_expires) > 0:
            expires = int(contact_expires)
        elif len(header_expires) > 0:
            expires = int(header_expires)
            
        if expires == 0:
            if fromm in self.registrar:
                del self.registrar[fromm]
                self.sendResponse(self.message['200'])
                return
        else:
            now = int(time.time())
            validity = now + expires
            
    
        self.server.logging.info("From: %s - Contact: %s" % (fromm,contact))
        self.server.logging.debug("Client address: %s:%s" % self.client_address)
        self.server.logging.debug("Expires= %d" % expires)
        self.registrar[fromm]=[contact,self.socket,self.client_address,validity]
        self.debugRegister()
        self.sendResponse(self.message['200'])
        
    def processInvite(self):
        self.server.logging.debug("-----------------")
        self.server.logging.debug(" INVITE received ")
        self.server.logging.debug("-----------------")
        origin = self.getOrigin()
        if len(origin) == 0 or not origin in self.registrar:
            self.sendResponse(self.message['400'])
            return
        destination = self.getDestination()
        if len(destination) > 0:
            self.server.logging.info("destination %s" % destination)
            if destination in self.registrar and self.checkValidity(destination):
                socket,claddr = self.getSocketInfo(destination)
                self.data = self.addTopVia()
                data = self.removeRouteHeader()
                data.insert(1,self.server.recordroute)
                text = "\r\n".join(data)
                self.senddata(text , claddr)
                self.showtime()
                self.server.logging.info("<<< %s" % data[0])
                self.server.logging.debug("---\n<< server send [%d]:\n%s\n---" % (len(text),text))
            else:
                self.sendResponse(self.message['480'])
        else:
            self.sendResponse(self.message['500'])
                
    def processAck(self):
        self.server.logging.debug("--------------")
        self.server.logging.debug(" ACK received ")
        self.server.logging.debug("--------------")
        destination = self.getDestination()
        if len(destination) > 0:
            self.server.logging.info("destination %s" % destination)
            if destination in self.registrar:
                socket,claddr = self.getSocketInfo(destination)
                self.data = self.addTopVia()
                data = self.removeRouteHeader()
                data.insert(1,self.server.recordroute)
                text = "\r\n".join(data)
                self.senddata(text,claddr)
                self.showtime()
                self.server.logging.info("<<< %s" % data[0])
                self.server.logging.debug( "---\n<< server send [%d]:\n%s\n---" % (len(text),text))
                
    def processNonInvite(self):        
        self.server.logging.debug("----------------------")
        self.server.logging.debug(" NonInvite received   ")
        self.server.logging.debug("----------------------")
        origin = self.getOrigin()
        if len(origin) == 0 or not origin in self.registrar:
            self.sendResponse(self.message['400'])
            return
        destination = self.getDestination()
        if len(destination) > 0:
            self.server.logging.info("destination %s" % destination)
            if destination in self.registrar and self.checkValidity(destination):
                socket,claddr = self.getSocketInfo(destination)
                self.data = self.addTopVia()
                data = self.removeRouteHeader()
                data.insert(1,self.server.recordroute)
                text = "\r\n".join(data)
                self.senddata(text , claddr)
                self.showtime()
                self.server.logging.info("<<< %s" % data[0])
                self.server.logging.debug("---\n<< server send [%d]:\n%s\n---" % (len(text),text)) 
            else:
                self.sendResponse(self.message['406'])
        else:
            self.sendResponse(self.message['500'])
                
    def processCode(self):
        origin = self.getOrigin()
        if len(origin) > 0:
            self.server.logging.debug("origin %s" % origin)
            if origin in self.registrar:
                socket,claddr = self.getSocketInfo(origin)
                self.data = self.removeRouteHeader()
                data = self.removeTopVia()
                text = "\r\n".join(data)
                self.senddata(text,claddr)
                self.server.logging.info("<<< %s" % data[0])
                self.server.logging.debug("---\n<< server send [%d]:\n%s\n---" % (len(text),text))
                
                
    def processRequest(self):
        if len(self.data) > 0:
            request_uri = self.data[0]
            if self.rx_register.search(request_uri):
                self.processRegister()
            elif self.rx_invite.search(request_uri):
                self.processInvite()
            elif self.rx_ack.search(request_uri):
                self.processAck()
            elif self.rx_bye.search(request_uri):
                self.processNonInvite()
            elif self.rx_cancel.search(request_uri):
                self.processNonInvite()
            elif self.rx_options.search(request_uri):
                self.processNonInvite()
            elif self.rx_info.search(request_uri):
                self.processNonInvite()
            elif self.rx_message.search(request_uri):
                self.processNonInvite()
            elif self.rx_refer.search(request_uri):
                self.processNonInvite()
            elif self.rx_prack.search(request_uri):
                self.processNonInvite()
            elif self.rx_update.search(request_uri):
                self.processNonInvite()
            elif self.rx_subscribe.search(request_uri):
                self.sendResponse(self.message['200'])
            elif self.rx_publish.search(request_uri):
                self.sendResponse(self.message['200'])
            elif self.rx_notify.search(request_uri):
                self.sendResponse(self.message['200'])
            elif self.rx_code.search(request_uri):
                self.processCode()
    
    def handle(self):
        data = self.request[0].decode("utf-8")
        self.data = data.split("\r\n")
        self.socket = self.request[1]
        request_uri = self.data[0]
        if self.rx_request_uri.search(request_uri) or self.rx_code.search(request_uri):
            self.showtime()
            self.server.logging.info(">>> %s" % request_uri)
            self.server.logging.debug("---\n>> server received [%d]:\n%s\n---" %  (len(data),data))
            self.server.logging.debug("Received from %s:%d" % self.client_address)
            self.processRequest()
        else:
            if len(data) > 4:
                self.showtime()
                self.server.logging.warning("---\n>> server received [%d]:" % len(data))
                self.hexdump(data,' ',16)
                self.server.logging.warning("---")
