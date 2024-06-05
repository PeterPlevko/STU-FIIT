#! /bin/bash
#
# Text zadania:
#
# Zistite, ktori pouzivatelia sa prihlasuju na server OS v noci (teda cas prihlasenia
# je od 22:00 do 05:00). Do uvahy berte len ukoncene spojenia za poslednu dobu
# (odkedy system zaznamenava tieto informacie).
# Ak bude skript spusteny s prepinacom -n <pocet>, zistite, ktori pouzivatelia
# sa prihlasili v noci viac ako <pocet> krat.
# Dodrzte format vystupu uvedeny v priklade.
# Pomocka: pouzite prikaz last a udaje zo suboru /public/samples/wtmp.2020
#
# Syntax:
# zadanie.sh [-h] [-n <pocet>]
#
# Format vypisu bude nasledovny:
# Output: '<meno pouzivatela> <pocet nocnych prihlaseni> <datum a cas posledneho nocneho prihlasenia>'
#
# Priklad vystupu:
# Output: 'sedlacek 5 03-23 23:12'
# Output: 'tubel 2 03-23 22:55'
# Output: 'kubikm 4 03-23 02:31'
#
#
# Program musi osetrovat pocet a spravnost argumentov. Program musi mat help,
# ktory sa vypise pri zadani argumentu -h a ma tvar:
# Meno programu (C) meno autora
#
# Usage: <meno_programu> <arg1> <arg2> ...
#    <arg1>: xxxxxx
#    <arg2>: yyyyy
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
# Poznamky: (sem vlozte pripadne poznamky k vypracovanemu zadaniu)
#
# Riesenie:

#pomocna premenna pre idetifikaciu cisel na vstupe
cislo='^[0-9]+$'
#prepinac -h vypise help
if [[ $1 == "-h" && $2 == "" ]]
then
    echo -e "z6 (C) Radovan Cyprich\n"
    echo -e "z6.sh [-h] [-n <pocet>]"
    echo -e "\t-h: vypise help pre program"
    echo -e "\t-n <pocet>: vypise len tych pouzivatelov, ktori sa v danom casovom intervale prihlasili viac ako <pocet>-krat"
#pokial uzivatel zadal prepinac -n a za nim kladne cislo za ktorym uz nic nenasleduje
#alebo nezadal pri spusteni skriptu ziaden prepinac resp. argument spusti sa program
elif [[ $1 == "-n" && $2 =~ $cislo && $3 == "" ]] || [[ $1 == "" ]]
then
    #data v 5 a 6 v subore wtmp.2020 si zoradim a zmenim format mesiacov zo slov na cisla pomocou sedu kvoli vypisu zo zadania a nasledne pomocou awk prehladavam jednotlive zaznamy prihlaseni
    last -f /public/samples/wtmp.2020 | head -n -2 | sed 's/Jan/01/g;s/Feb/02/g;s/Mar/03/g;s/Apr/04/g;s/May/05/g;s/Jun/06/g;s/Jul/07/g;s/Aug/08/g;s/Sep/09/g;s/Oct/10/g;s/Nov/11/g;s/Dec/12/g' | sort -n -k5 -k6 | awk -v min="$2" '
    	#v niektorych pripadoch su argumenty  posunute o jedno miesto doprava a preto to musim osetrovat
	#klasicky format
        $7 == "-" {
            datum = $4"-"$5
            cas = $6
        }
	#posunuty format
        $7 != "-" {
            datum = $5"-"$6
            cas = $7
        }
	#pomocou premennej cas vyfiltrujem pouzivatelov prihlasenych od 22 hod do 5 hod rano 
        cas >= "22" || cas < "05" {
            pole[$1]=datum" "cas
            pocet[$1]++
        }
	#na zaver vypisujem jednotlive data v zadanom formate, popripade v -n mode kontrolujem aj pocty prihlaseni
	#a nasledne vypisujem
        END {
            for (x in pole)
                if (min == "" || min < pocet[x])
			printf "Output: \047"x" "pocet[x]" "pole[x]"\047\n"
    	    }
    '
else
	#pokial uzivatel zadal chybne argumenty vypisem chybu
	echo "Error: Chybny vstup" 1>&2
	exit 0
fi
exit 1



