# Zadanie 1 – SIP Proxy (telefónna ústredňa)
## Michal Minar
## [GitHub](https://github.com/Mino21M/fiit-mtaa-sip-proxy)
## [Zadanie](./doc/MTAA2022_-_Zadanie_1.pdf)

## Základné informácie
Hlavná knižnica použitá pre implementáciu vlastnej SIP proxy je zo [zdroja](https://github.com/tirfil/PySipFullProxy/blob/master/sipfullproxy.py) a je uvedená pod licenciou GNU General Public License. 

## Úprava knižnice
Knižnica, uvedená vyššie obsahovala chyby, ktoré znemožnili jej spustenie v najnovšej verzii python (3.10). Na základe analýzy knižnice uvádzam zoznam upravených chýb:
  1. `if registrar.has_key(origin)` -> `if origin in registrar`,
  2. `string.join(data,"\r\n")` -> `"\r\n".join(data).encode("utf-8")`,
  3. `data = self.request[0]` -> `data = self.request[0].decode("utf-8")`

Ďalej som triedu `UDPHandler` upravil tak, aby sa dala volať z `main.py` bez dodatočných importov. Uvedené som docielil pomocou:
  1. Z globálnych premenných `registrar`, `recordroute`, `topvia`, vrátane všetkých `rx_*` som spravil premenné triedy `UDPHandler`,
  2. Podobnú úpravu som urobil aj pre funkcie: `hexdump(...)`, `quotechars(...)` a `showtime(...)`.

Na záver som poskytnuté volanie celej knižnice upravil do vlastnej funkcie `starter`, do ktorej som dorobil aj riadne ukončenie serveru pomocou nasledovného kódu.
```python
    thread = threading.Thread(None, server.serve_forever)
    thread.daemon = True
    thread.start()
    while(input("Type 'exit' to stop SIP PROXY: ") != "exit"):
        continue
    server.shutdown()
    server.server_close()
    thread.join()
    exit(0)
```

## Povinná funkcionalita

- Registrácia účastníka (bez nutnosti autentifikácie)
  - [pcap](./wireshark/register.pcapng)
- Vytočenie hovoru a zvonenie na druhej strane
  - [pcap](./wireshark/ringing.pcapng)
- Prijatie hovoru druhou stranou, fungujúci hlasový hovor
  - [pcap](./wireshark/answer.pcapng)
- Ukončenie hlasového hovoru (prijatého (1.) aj neprijatého (2.))
  - [pcap](./wireshark/denied.pcapng)

## Nepovinná funkcionalita
### **✔** Možnosť zrealizovať konferenčný hovor (aspoň 3 účastníci).
  - Uvedenú funkcionalitu poskytuje knižnica bez potrebných modifikácii,
  - [pcap](./wireshark/conference.pcapng)
### **✔** Možnosť presmerovať hovor.
  - Uvedenú funkcionalitu poskytuje knižnica bez potrebných modifikácii,
  - [pcap](./wireshark/transfer.pcapng)
### **✔** Možnosť realizovať videohovor.
  - Uvedenú funkcionalitu poskytuje knižnica bez potrebných modifikácii,
  - [pcap](./wireshark/video.pcapng)
### **✖** Logovanie “denníka hovorov” – kto kedy komu volal, kedy bol ktorý hovor prijatý, kedy bol ktorý hovor ukončený, do ľubovoľného textového súboru v ľubovoľnom formáte.
### **✔** Úprava SIP stavových kódov z zdrojovom kóde proxy, napr. “486 Busy Here” zmeníte na “486  Obsadené”
  - Vlastné stavové kódy som do knižnice dorobil pomocou premennej `message` a nahradením všetkých volaní hard-coded stringov, ako napríklad `self.sendResponse("500 Server Internal Error")` za `self.sendResponse(self.message['500'])`.
  - Ostatné stavové kódy, ktoré neboli priamo poskytované proxy som zhrnul do vlastnej premennej `states`. Zdroj uvedených kodov bola [wikipedia](https://en.wikipedia.org/wiki/List_of_SIP_response_codes) - dôvod výberu wikipédie bol formát zápisu, ktorý sa pomocou `bash` dal ľahko upraviť do python dictionary.
  - Zmenené stavové kódy je možné vidieť v nasledovných súboroch:
    - [Konferenčný hovor](./wireshark/conference.pcapng)
    - [Presmerovaný hovor](./wireshark/transfer.pcapng)
    - [Video hovor](./wireshark/video.pcapng)
```sh
grep '^[0-9][0-9][0-9]' states.txt | sed 's/^/"/g' | sed 's/\r$//g' | sed 's/$/": "",/g' > states3.txt
```