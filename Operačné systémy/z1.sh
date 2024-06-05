#! /bin/bash
#
# Text zadania:
#
# V zadanych adresaroch uvedenych ako argumenty najdite adresare, v ktorych
# je suma poctov riadkov vsetkych obycajnych suborov najvacsia. Prehladavajte
# vsetky zadane adresare a aj ich podadresare. Sumy pocitajte len pre subory,
# ktore su priamo v adresari.
# Ak nebude uvedena ako argument ziadna cesta, prehladava sa aktualny pracovny
# adresar (teda .).
# Ak bude skript spusteny s prepinacom -w, najde adresare, v ktorych je suma
# poctov slov obycajnych suborov najvacsia.
# Ak bude skript spusteny s prepinacom -c, najde adresare, v ktorych je suma
# poctov znakov obycajnych suborov najvacsia.
#
# Syntax:
# zadanie.sh [-h] [-c] [-w] [cesta ...] 
#
# Vystup ma tvar:
# Output: '<cesta k najdenemu adresaru> <celkovy pocet riadkov>'
#
# Priklad vystupu (zadanie1.sh /public/testovaci_adresar /public/ucebnove):
# Output: '/public/testovaci_adresar/testdir1 30'
# Output: '/public/testovaci_adresar/testdir2 30'
# Output: '/public/ucebnove/historia 30'
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
# Debug: vypis .
#
# Poznamky: (sem vlozte pripadne poznamky k vypracovanemu zadaniu)
#
# Riesenie:

debug_print () {
    if [[ -v debug ]]; then echo -e "Debug: $@"; fi
}

print_help() {
	echo -e "\nzadanie01 (C) Samuel Rericha"
	echo "Usage: z1.sh [-h] [-c] [-w] [path(s) (optional)]"
	echo "The script finds (a) directory/directories, in which the sum"
	echo "of the number of lines found in regular files is the highest."
	echo "It searches in directories provided as arguments,"
	echo "or in the current directory if none are provided."
	echo ""
	echo "-h: print help (you're reading it now)"
	echo "-c: when ran with this argument, instead of the number"
	echo "    of lines it considers the number of characters"
	echo "-w: when ran with this argument, instead of the number"
	echo "    of lines it considers the number of words"
}

# debug used for prints of useful info during the writing of the script,
# but unwanted during regular use, debug variable declared here controls it
unset debug
#debug=''
debug_print "all parameters: $@"
src_mode="-l"
directories=()

# runs through the list of arguments, makes sure they are correct
while (( "$#" )); do
    debug_print "parameter $1"
    case "$1" in
	-h) 
		print_help
		exit 0
	    ;;
	-c)
	    if [[ "$src_mode" == "-w" ]]; then
			echo "Contradictory arguments (cannot use both -c and -w)."
			echo "Use \"-h\" to see usage."
			exit 0
	    else src_mode="-c"
	    fi
	    ;;
	-w)	
	    if [[ "$src_mode" == "-c" ]]; then
			echo "Contradictory arguments (cannot use both -c and -w)."
			echo "Use \"-h\" to see usage."
	        exit 0	
	    else src_mode="-w"
	    fi
	    ;;
	-*)
	    echo "Unknown parameter \"$1\""
	    echo "Use \"-h\" to see usage."
	    exit 0
		;;
	*)	
		if [[ ! -d "$1" || ! -r "$1" ]]; then
			echo "\"$1\" is not a directory or is not readable"
			exit 0
		fi
	    directories+=("$1");;
	esac			
    shift
done

# if the user provided no directories as arguments, current one is set
debug_print "directory list length: ${#directories[@]}"
if [[ "${#directories[@]}" == "0" ]]; then
    debug_print "Only search ."
    directories=(.) 
fi

# finds all directories found in the provided directories and stores them
# in a temporary list (to prevent modifying the list it iterates over)
temp_directories=()
for item in "${directories[@]}"; do 
	unset new_directories
	readarray -d$'\n' -t new_directories < <(find "$item" -mindepth 1 -type d 2>&1)
	for dir in "${new_directories[@]}"; do
		if grep -q "find:" <<< $dir; then
			temp="$(cut -d"'" -f2 <<< "$dir")"
			echo "Error: '$temp': Permission denied" 1>&2
			continue
		fi
		temp_directories+=("$dir")
	done
done 
# append the temporary list to the actual list
for dir in "${temp_directories[@]}"; do
	directories+=("$dir")
done

# iterates over the directory list and for each counts the number
# of lines (or words/characters) found in files directly in the directory
stats=()
debug_print "directories len: ${#directories[@]}"
for item in "${directories[@]}"; do
    debug_print "directory_search $item"
	
	if [[ ! -r "$item" ]]; then
		echo "Error: '$item': Permission denied" 1>&2
		continue
	fi
	
	curr_count=0
	readarray -d$'\n' -t files_found < <(find "$item" -maxdepth 1 -type f)
	for file in "${files_found[@]}"; do
		if [[ ! -r "$file" ]]; then
			echo "Error: '$file': Permission denied" 1>&2
		else 
			unset increment
			increment=$(wc "$src_mode" "$file" 2>&1)
			if grep -q "wc:" <<< $increment; then
				temp="$(cut -d$'\n' -f1 <<< "$increment")"
				temp="$(cut -d':' -f2- <<< "$temp")"
				echo "Error:$temp" 1>&2
			else
				increment=$(awk '{print $1}' <<< "$increment")
				curr_count=$(($curr_count + $increment))
			fi
		fi
	done
    
	
	# debug print of individual files' number of searched things, doesnt check permissions
	if [[ -v debug ]]; then
		find "$item" -maxdepth 1 -type f -exec wc "$src_mode" {} \; | while read -d$'\n' fil; do
			debug_print "\t\t\t$fil"
		done
	fi
	
	stats+=("$curr_count $item")
done

# sorts the stat list
IFS=$'\n' 
stats=($(for stat in ${stats[@]}; do echo $stat; done | sort -nr))
unset IFS
# debug print
if [[ -v debug ]]; then
	debug_print "stat list length: ${#stats[@]}"
	for stat in "${stats[@]}"; do
		debug_print "final count $stat"
	done
fi

# iterates over sorted stat list, prints until the current item's value is lesser than first
i=0
for stat in "${stats[@]}"; do
	curr=$(echo "$stat" | cut -d' ' -f1)
	if [[ "$i" == "0" ]]; then
		first=$curr
	elif [[ $curr -lt $first ]]; then
		break
	fi
	i=1
	echo $stat | awk '{print "Output: \047" $2, $1 "\047"}'
done

