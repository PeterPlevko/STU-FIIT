#! /bin/bash
#
# Text zadania:
#
# Vypiste vsetkych pouzivatelov, ktori neboli za poslednu dobu (odkedy system
# zaznamenava tieto informacie) prihlaseni. Ignorujte pouzivatelov, ktori
# nemaju povolene prihlasovanie.
# Ak bude skript spusteny s prepinacom -g <group>, vypise len pouzivatelov,
# ktori neboli za poslednu dobu prihlaseni a patria do skupiny <group>, ktora
# je zadana ako cislo.
# Pomocka: pouzite prikaz last a informacie zo suborov
# /public/samples/wtmp.2020 /public/samples/passwd.2020.
#
# Syntax:
# zadanie.sh [-h] [-g <group>]
#
# Format vypisu bude nasledovny:
# Output: '<login_name> <group>'
#
# Priklad vystupu:
# Output: 'cernicka 520'
# Output: 'chudik 520'
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
IFS='
'
passwd=/public/samples/passwd.2020
wtmp=/public/samples/wtmp.2020
# otestujem ci existuje passwd a subor pre last
if [ ! -f $passwd ]; then
	echo "Error: '/public/samples/passwd.2020': no such file" 1>&2
	exit 1
fi

if [ ! -f $wtmp ]; then
	echo "Error: '/public/samples/wtmp.2020': no such file" 1>&2
	exit 1
fi

# v premennej help sa nachadza help pre skript
help="$0 (C) Matej Delincak

Usage: $0 [-h] [-g <group>]
  -h: displays help
  -g <group>: displays only the users that belong to the <group>
"


# spracovanie parametrov skriptu
group_name=""
while [ "$#" != "0" ]; do
	case "$1" in
		-g)
			# parameter -g nastavi premennej group_name nazov skupiny, 
			# ktora sa ma hladat
            		shift
			number="^[0-9]+$"

			# ak je cislo tak nastav group
			if [[ "$1" =~ $number ]]; then
				group_name=$1
			else 
				if [ "$1" == "" ]; then
					echo "Error: '$1' no parameter after -g" 1>&2
				else
					echo "Error: '$1' not a number after -g" 1>&2
				fi
				exit 1
           		fi
			;;
        	-h)
			# vypise help pre tento skript
            		echo "$help"
            		exit 0
            		;;
        	-*)
			# neznamy prepinac
            		echo "Error: '$1': unknown option" 1>&2
            		exit 1
            		;;
        	*)
			# neznamy parameter
			echo "Error: '$1': unknown parameter" 1>&2
              		exit 1
			;;
	esac
	shift
done

# vytvorenie poli prihlasenych uzivatelov 
# prikaz declare som nasiel na stranke https://linuxhint.com/bash_declare_command/ 
# a vytvori mi to v podstate hash tabulku
declare -A array_of_login
for login in $(last -w -f $wtmp | sort | cut -d ' ' -f1 | uniq); do
	array_of_login[$login]=1
done

# vytvori pole uzivatelov, ktory maju pristup do systemu a maju moznost sa normalne prihlasit
array_of_passwd=($(grep -Ev "login$|false$" $passwd))

# pre kazdeho uzivatela, ktory ma pristup, nieco urob
for line in "${array_of_passwd[@]}"; do
	user=$(cut -d ':' -f1 <<< "$line")

	# ak bol prihlaseny, tak ho nevypisem
	if [ ! ${array_of_login[$user]} ]; then
		# zistim group pre uzivatela
		group=$(cut -d ':' -f4 <<< "$line")
		if [ "$group_name" != "" ]; then
			if [ "$group" == "$group_name" ]; then
				echo "Output: '$user $group'"
			fi
		else 
			echo "Output: '$user $group'"
		fi
	fi
done
