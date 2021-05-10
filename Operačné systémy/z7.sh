#! /bin/bash
#
# Text zadania:
#
# V zadanych adresaroch uvedenych ako argumenty najdite textove subory,
# v ktorych obsahu sa vyskytuje ich meno. Prehladavajte vsetky zadane adresare
# a aj ich podadresare.
# Ak nebude uvedena ako argument ziadna cesta, prehladava sa aktualny pracovny
# adresar (teda .).
# Ak bude skript spusteny s prepinacom -d <hlbka>, prehlada adresare len do
# hlbky <hlbka> (vratane). Hlbka znamena pocet adresarov na ceste medzi
# startovacim adresarom a spracovavanym suborom. Hlbka 1 znamena, ze bude
# prezerat subory len v priamo zadanych adresaroch.
#
# Syntax:
# zadanie.sh [-h][-d <hlbka>] [cesta ...]
#
# Vystup ma tvar:
# Output: '<cesta k najdenemu suboru> <pocet riadkov s menom suboru>'
#
# Priklad vystupu:
# Output: '/public/testovaci_adresar/testdir1/test 19'
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

print_help (){
	echo "Zadanie 7 (C) "
	echo ""
	echo "Usage: $0 [-h] [-d <hlbka>] [cesta ...]"
	echo "[-h]: 		vypise tuto spravu"
	echo "[-d <hlbka>]: nastavy maximalnu hlbku prehladavania do hlbky <hlbka>"	
	echo "[cesta ...]:	adresare na prehladavanie"
}

depth=''
paths=()

# nacitavanie argumentov a ich kontorola
while (( "$#" )); do
    case "$1" in
        -d)
            shift		# nastavenie hlbky ak je
			number="^[0-9]+$"
			if [[ $1 =~ $number ]] ; then
				depth=$1
			else
				echo "Error: '$1' not a positive decimal integernumber" 1>/dev/stderr
				exit 1
			fi
            ;;
        -h)
            print_help	# vypisanie helpu
			exit 0
            ;;
		-*)
			echo "Error: '$1' invalid option" 1>/dev/stderr
			exit 1
			;;
        *)	
			if [[ -d $1 ]] ; then
				paths+=("$1")		# nacitanie
			else
				echo "Error: '$1' no such directory" 1>/dev/stderr
				exit 1
			fi
            ;;
    esac
    shift
done


# ak su nie su ziadne adresare, nastavy na bodku
if [ "${#paths[@]}" -eq 0 ]; then
	paths=(".")
fi

# najde vsetky textove subory
files=()
for path in "${paths[@]}"; do
	# ak nie je zadana hlbka
	if [ -z "$depth" ]; then
		temp=$IFS
		IFS=$'\n'
		files=()
		
		while IFS= read -r -d '' file ; do
			if grep -q "find: " <<< "$file"; then
				directory=$(head -n 1 <<< "${file#*\'}")
				echo "Error: '"$directory"" 1>/dev/stderr
			else
				if file "$file" | grep -q text; then
					if [ -r "$file" ]; then
						files+=("$file")
					fi
				fi
			fi
		done < <(find "$path" -type f -print0 2>&1)
		IFS=$temp
	# ak je zadana hlbka
	else
		temp=$IFS
		IFS=$'\n'
		files=()
		
		while IFS= read -r -d '' file ; do
			if grep -q "find: " <<< "$file"; then
				directory=$(head -n 1 <<< "${file#*\'}")
				echo "Error: '"$directory""  1>/dev/stderr
			else
				if file "$file" | grep -q text; then
					if [ -r "$file" ]; then
						files+=("$file")
					fi
				fi
			fi
		done < <(find "$path" -maxdepth "$depth" -type f -print0 2>&1)
		IFS=$temp
	fi
	
done

# spocita vyskyt nazvu suboru
for file in "${files[@]}"; do
	temp=$IFS
	IFS=$'\n'
	name=$(basename "$file")
	count=$(grep -ce "$name" "$file")
	if [[ $count -gt 0 ]]; then
		echo "Output: '$file $count'"
	fi
	IFS=$temp
done




