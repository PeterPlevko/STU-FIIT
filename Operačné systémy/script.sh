#! /bin/bash
#
# Meno: <Peter Plevko> 
# Kruzok: <STV16-00>
# Datum: <7.12.2020>
# Zadanie: zadanie02
#
# Text zadania:
#
# V zadanych textovych suboroch uvedenych ako argumenty najdite najdlhsi riadok
# (riadky) zo vsetkych a vypiste ho (ich). Dlzka riadku je jeho dlzka v znakoch.
# Ak nebude uvedeny ako argument ziadny subor, prehladava sa standardny vstup
# (a jeho meno je -).
#
# Syntax:
# zadanie.sh [-h] [cesta ...]
#
# Vystup ma tvar:
# Output: '<subor>: <cislo riadku v subore> <dlzka riadku> <riadok>'
#
# Priklad vystupu (parametrami boli subory nahodny ine/lorem_ipsum
# v adresari /public/testovaci_adresar/testdir2):
# Output: 'ine/lorem_ipsum: 11 98 eu ipsum. Aliquam viverra vestibulum pretium...
# Output: 'nahodny: 3 98 UtRybYIDDPudgG!YUC?NTpgo,M!vsb.wFrTQtoacxOxnQtDVDzOfnPad...
# Output: 'nahodny: 4 98 UtRybYIDDPudgG!YUC?NTpgo,M!vsb.wFrTQtoacxOxnQtDVDzOfnPad...
#
#
# Program musi osetrovat pocet a spravnost argumentov. Program musi mat help,
# ktory sa vypise pri zadani argumentu -h a ma tvar:
# Meno programu (C) meno autora
#
# Usage: <meno_programu> <arg1> <arg2> ...
#       <arg1>: xxxxxx
#       <arg2>: yyyyy
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
# Debug: vypis .
#
# Poznamky: (sem vlozte pripadne poznamky k vypracovanemu zadaniu)
#
# Riesenie:
#!/bin/bash


# vypise help 
print_help ()
{
	echo "Zadanie2 (C) Peter Plevko"
	echo "Usage: <zadanie2> <arg1> <arg2> ..."
        echo "<subor>: najde najldhsi riadok zo suboru"
	echo "<-h>: vypise help"
}


# ak uzivatel nezadal ziadne argumenty citaj zo standardneho vstupu 
if [ $# -eq 0 ]; then

	# zmaz subor 
	# ak subor neexistuje ignoruj 
	rm vstup.txt 2> /dev/null
	
	# citaj kazdy riadok zo vstupu a zapis ho do suboru 
	while IFS=$'\n' read -r line; do
		
		if [[ -z $line ]]
			then
				break
		fi
			echo "$line" >> vstup.txt
	done
		max=$(awk 'BEGIN{max=0} max<length{ max=length } END{print max}' vstup.txt)
		awk -v x="$max" -v file="-" 'x==length { print "Output: \047"file":",NR,length,$0"\047" }' vstup.txt

	# vymaz vstup 
	rm vstup.txt
	exit 0
fi


# prejde vsetky argumenty
while (( $# )); do
	
	case "$1" in 
		
		# ak mam v argumente na niektorom mieste -h vypise sa help
     	-h)  
		print_help
        exit 0
		
	esac


	# skontrolujem ci existuje subor
	if [ -e "$1" ]; then
		
		# skontrolujem ci sa jedna o regularny subor
		# regularny = to znamena ze sa nejedna o priecinok
		if [ -f "$1" ]; then
			
		
			# skontrolujem ci dany subor ma read prava
			if [ -r "$1" ]; then
		
				max=$(awk 'BEGIN{max=0} max<length{ max=length } END{print max}' "$1")
				awk -v x="$max" -v file="$1" 'x==length { print "Output: \047"file":",NR,length,$0"\047" }' "$1"
		
				else 
				
					echo "Error: '$1': subor nema read pravomoc" 1>&2
		
			fi
				
		else 
			echo "Error: '$1': zadal si priecinok nie subor" 1>&2
				
		fi
		
	else

		echo "Error: '$1': subor neeexistuje " 1>&2		

	fi
	
	shift

done

