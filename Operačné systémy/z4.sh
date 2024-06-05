#! /bin/bash
#
# Meno: Samuel Schmidt
# Kruzok: Stvrtok 16.00
# Datum: 7.12.2020
# Zadanie: zadanie04
#
# Text zadania:
#
# V zadanych adresaroch uvedenych ako argumenty najdite symbolicke linky,
# ktorych cielova cesta ma zo vsetkych najviac komponentov - to znamena, ze sa
# na ceste k cielovemu suboru nachadza najviac adresarov. Prehladavajte vsetky
# zadane adresare a aj ich podadresare.
# Ak nebude uvedena ako argument ziadna cesta, prehladava sa aktualny pracovny
# adresar (teda .).
# Ak bude skript spusteny s prepinacom -d <hlbka>, prehlada adresare len do
# hlbky <hlbka> (vratane). Hlbka znamena pocet adresarov na ceste medzi
# startovacim adresarom a spracovavanym suborom. Hlbka 1 znamena, ze bude
# prezerat subory len v priamo zadanych adresaroch.
#
# Syntax:
# zadanie.sh [-h] [-d <hlbka>] [cesta ...]
#
# Vystup ma tvar:
# Output: '<cesta k najdenej linke> -> <cielova cesta>'
#
# Priklad vystupu:
# Output: 'testdir3/lvl1_2/lvl2_2/symlink_4 -> ../../lvl1_1/lvl2_1/testfile_17'
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
# Debug: vypis ...
#
# Poznamky: (sem vlozte pripadne poznamky k vypracovanemu zadaniu)
#
# Riesenie:

unset depth
unset pathlist
unset check
while(($#)); do
	case "$1" in
		-d)#Zadanie/kontrola hlbky
			if [ $# -lt 2 ]
			then
				echo "Error: Nedostatok argumentov pre -d!"
				exit 1
			fi

			if [ `echo "$2" | grep ^[0-9]*$ | wc -l` -eq 0 ]
			then
				echo "Error '-d "$2"': Prepinac -d vyzaduje cislo!"
				exit 1
			fi
			
			if [ $2 -lt 1 ]
			then
				echo "Error '-d "$2"': Hlbka nemoze byt mensia ako 1!"
				exit 1
			fi
			
			shift
			depth=$1
			;;
		-h)#Vypis pre help
			echo -e "ZADANIE 4 Samuel Schmidt ID:103120 \nUsage: \tz4.sh -d (N), -h, dir1 dir2 ... \n\t-d (N): Je mozne zadat hlbku (prirodzene cislo vacsie ako 0), oddelene medzerou, sluzi na urcenie do akej maximalnej hlbky ma script hladat\n\t-h: Sluzi na vypis helpu\n\t<dir1 dir2 ...>: je mozne zadavat adresere oddedele medzerou  v akych ma script hladat, pri nezadani script prehladava aktualny adresar."
			exit 0

			;;
		
		-*)#Zadanie zleho prepinaca
			>&2 echo "Error: '"$1"': Neznamy prepinac!"
			exit 1
			;;

		*)#Skontrolovanie ci poznam zadany adresar
			if [ -d "$1" ]
			then	
				check=0
				for path in "${pathlist[@]}"
				do
					if [[ `realpath "$path"` == `realpath "$1"` ]];
					then
						check=1
						break
					fi
				done
				if [ $check -eq 0 ]
				then
					pathlist=(${pathlist} "$1")
				fi
			else
				>&2 echo "Error '"$1"': Neznamy adresar!"
				exit 1
			fi
			;;
		
	esac
	shift
done

[ -z "$pathlist" ] && pathlist=("`pwd`")


for path in "${pathlist[@]}" #prejdem vsetky zadane adresare
do
	echo "Symlinky v adresari: $path"
	unset symlinklist
	unset readlinklist	
	IFS=$'\n'
	
	if [ -z $depth ]
	then

		symlinklist=(${symlinklist[@]} `find "$path" -type l`) #najdem cestu k symlinku
		readlinklist=(${readlinklist[@]} `find "$path" -type l -exec readlink {} +`) #najdem kam symlink ukazuje
	else	
		symlinklist=(${symlinklist[@]} `find "$path" -maxdepth "$depth" -type l`)
		readlinklist=(${readlinklist[@]} `find "$path" -maxdepth "$depth" -type l -exec readlink {} +`)
	fi

	unset IFS
	unset longest
	longest=0
	for (( i=0 ; i < ${#readlinklist[@]} ; i++ )) #najdem najdlhsiu cielovu cestu symlinku
	do
		if [ `echo "${readlinklist[$i]}" | grep -o "/" | wc -l` -gt $longest ];
		then
			longest=`echo "${readlinklist[$i]}" | grep -o "/" | wc -l` #zapisem si aka najdlhsia cielova cesta existuje
		fi
	done

	for (( i=0 ; i < ${#symlinklist[@]} ; i++ )) #vypisem symlinky s najdlhsou cielovou cestou
	do
		if [ `echo "${readlinklist[$i]}" | grep -o "/" | wc -l` -eq $longest ];
		then
			echo ""${symlinklist[$i]}" -> "${readlinklist[$i]}""
		fi
	done
done
