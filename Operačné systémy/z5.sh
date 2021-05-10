#! /bin/bash
#
# Meno: Martin Pazicky
# Kruzok: Lastinec stvrtok 14.00
# Datum: 8.12.2020
# Zadanie: zadanie05
#
# Text zadania:
#
# Zistite, ktori pouzivatelia sa prihlasuju na server OS z viac ako 10tich roznych
# strojov za poslednu dobu (odkedy system zaznamenava tieto informacie).
# Ak bude skript spusteny s prepinacom -n <pocet>, zistite, ktori pouzivatelia
# sa hlasia z viac ako <pocet> strojov.
# Ignorujte prihlasenia, pre ktore nepoznate IP adresu stroja.
# Pomocka: pouzite prikaz last a udaje zo suboru /public/samples/wtmp.2020
#
# Syntax:
# zadanie.sh [-h][-n <pocet>]
#
# Format vypisu bude nasledovny:
# Output: '<meno pouzivatela> <pocet roznych strojov, z ktorych sa hlasil>'
#
# Priklad vystupu:
# Output: 'login1 25'
# Output: 'login2 24'
# Output: 'login3 23'
#
#
# Program musi osetrovat pocet a spravnost argumentov. Program musi mat help,
# ktory sa vypise pri zadani argumentu -h a ma tvar:
# Meno programu (C) meno autora
#
# Usage: <meno_programu> <arg1> <arg2> ...
# <arg1>: xxxxxx
# <arg2>: yyyyy
#
# Parametre uvedene v <> treba nahradit skutocnymi hodnotami.
# Ked ma skript prehladavat adresare, tak vzdy treba prehladat vsetky zadane
# adresare a vsetky ich podadresare do hlbky.
# Pri hladani maxim alebo minim treba vzdy najst maximum (minimum) vo vsetkych
# zadanych adresaroch (suboroch) spolu. Ked viacero suborov (adresarov, ...)
# splna maximum (minimum), treba vypisat vsetky.
#
# Korektny vystup programu musi ist na standardny vystup (stdout).
# Chybovy vystup programu by mal ist na chybovy vystup (stderr).
# Chybovy vystup musi mat tvar (vratane apostrofov):
# Error: 'adresar, subor, ... pri ktorom nastala chyba': popis chyby ...
# Ak program pouziva nejake pomocne vypisy, musia mat tvar:
# Debug: vypis ...
#
# Poznamky: Na zaciatku sa v cykle pomocou switchu spracuju argumenty. 
# V hlavnej casti skriptu najprv precitam subor wtmp.2020, pomocou awk vyfiltrujem len stlpce,
# ktore ma zaujimaju. Pomocou grepu vyfiltrujem aj nezname adresy
# - adresa "0.0.0.0" predstavuje prihlasenia, pre ktore nie je adresa znama.
# Z takto upraveneho vstupu vytiahnem unikatne riadky, ktore pozostavaju z mena a ip adresy.
# Potom staci znova pouzit uniq na prvy stlpec, tentokrat s prepinacom -c 
# a dostanem riadky s pouzivatelskym menom a poctom prihlaseni s unikatnymi adresami. 
# Na zaver vystup usporiadam zostupne podla poctu (moja volba, usporiadanie nebolo v zadani specifikovane) 
# a pomocou awk vypisem riadky ktore splnaju podmienku 
# (pocet je vacsi ako hranicny pocet zadany uzivatelom).
# Riesenie:  
n=10	
FILE=/public/samples/wtmp.2020

if [ ! -f "$FILE" ]; then
	echo "Error: 'subor wtmp.2020 so zaznamami nebol najdeny'"
	exit 1
fi

# spracovanie argumentov
while (( "$#" )); do
        case "$1" in
                -n)
                rgx='^[0-9]+$'
                shift
                if [[ "$1" =~ $rgx ]] ; then
                        n=$1
                else
                        echo "Error: 'nespravny format argumentu'" >&2
                        exit 1
			fi
                ;;

                -h)
                        echo -e "z5.sh (C) Martin Pazicky\n\nUsage: z5.sh [-n <pocet>] [-h]\n[-n]: vypis pouzivatelov, ktory sa prihlasili z viac ako n strojov\n[-h]: help"
                exit 0
                ;;

                *)
                echo "Error: 'neznamy argument'" >&2
                exit 1
                ;;
        esac
        shift
done
# hlavna cast skriptu
last -f $FILE  -w -i | awk '{print $1, $3}' | head -n -2 | grep -v "0.0.0.0" | sort | uniq | cut -d' ' -f1  | uniq -c  | sort -rn |  awk -v n=$n '{if ($1  > n) print "Output: \047" $2, $1 "\047"}'
exit 0

