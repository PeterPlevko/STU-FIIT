# Zadanie - strelnica

Na strelnicu prichádzajú záujemci (každé štyri sekundy prídu dvaja), dokopy 25 ľudí. Keď príde záujemca na strelnicu, okamžite si zoberie luk alebo kušu. Ak je voľný luk, tak si ho zoberie, ináč si vezme kušu.
Lukov je obmedzený počet (3), ale kuší je neobmedzený počet.

Potom sa presunie na strelnicu. Na strelnici môže byť naraz 5 strelcov. Sú dva stavy - strieľanie, a zbieranie šípov. Ak niekto strieľa, tak nikto nemôže ísť zbierať šípy, a ak niekto zbiera šípy, nikto nemôže strielať.

Strieľanie z kuše trvá 5s, z luku 2s. Zbieranie šípov trvá podľa toho, na ktorom mieste strelec strieľa (ak je na prvej pozícii, tak má najbližšie terč, a trvá mu to 1s, ak je na druhej pozícii, terč má ďalej, zbieranie trvá 2s, ak je na tretej, 3s ...). Každý záujemca si volí najnižšiu možnú pozíciu.

Každý strelec najskôr strieľa, potom zbiera šípy, a následne odloží luk/kušu a odchádza.

- Ošetrite, aby bol maximálny počet strelcov naraz 5
- Ošetrite, aby mohli prísť ďalší strelci počas toho, ako už niektorí strieľajú
- Ošetrite, aby si strelci správne zvolili svoju pozíciu
- Doplňte do programu počítadlo, ktoré počíta počet strelcov, ktorý použili luk a kušu (každé samostatne)
- Doplňte do programu počítadlo, ktoré počíta počet strelcov pre každé strelecké miesto