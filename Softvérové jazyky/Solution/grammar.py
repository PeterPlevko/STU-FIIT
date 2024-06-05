symbols_terminal_set = ("http://", "ftp://", "telnet://", "mailto::", ":", "@", ".", "+", "/", "?", "$")

alphabet_terminal_set = (
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 
    'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 
    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
)

numeric_terminal_set = (
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
)
TERMINALS = symbols_terminal_set + alphabet_terminal_set + numeric_terminal_set

NONTERMINALS = (
    "URL", "HTTPADDRESS", "SUFPATHSEARCH", "SUFSEARCH", "FTPADDRESS", "TELNETADDRESS", "MAILTOADDRESS", "LOGIN", 
    "SUFPASSHOST", "HOSTPORT", "SUFPORT", "HOSTNAME", "DOTHOSTNAME", "PORT", "PATH", "SLASHPATH", "SEARCH", "PLUSSEARCH", 
    "USER", "PASSWORD", "SEGMENT", "XALPHAS", "MOREXALPHAS", "XALPHA", "DIGITS", "MOREDIGITS", "ALPHA", "DIGIT"
)

initial_state = 'URL'

original_rules = {
    "URL": ["HTTPADDRESS", "FTPADDRESS", "TELNETADDRESS", "MAILTOADDRESS"], 
    "HTTPADDRESS": ["http:// HOSTPORT SUFPATHSEARCH"], 
    "SUFPATHSEARCH": ["/ PATH SUFSEARCH", "? SEARCH", "ε"], 
    "SUFSEARCH": ["? SEARCH", "ε"], 
    "FTPADDRESS": ["ftp:// LOGIN / PATH"], 
    "TELNETADDRESS": ["telnet:// LOGIN"], 
    "MAILTOADDRESS": ["mailto:: XALPHAS @ HOSTNAME"], 
    "LOGIN": ["USER SUFPASSHOST"], 
    "SUFPASSHOST": ["@ HOSTPORT", ": PASSWORD @ HOSTPORT"], 
    "HOSTPORT": ["HOSTNAME SUFPORT"], 
    "SUFPORT": [": PORT", "ε"], 
    "HOSTNAME": ["XALPHAS DOTHOSTNAME"], 
    "DOTHOSTNAME": [". HOSTNAME", "ε"], 
    "PORT": ["DIGITS"], 
    "PATH": ["SEGMENT SLASHPATH"], 
    "SLASHPATH": ["/ PATH", "ε"], 
    "SEARCH": ["XALPHAS PLUSSEARCH"], 
    "PLUSSEARCH": ["+ SEARCH", "ε"], 
    "USER": ["XALPHAS"], 
    "PASSWORD": ["XALPHAS"], 
    "SEGMENT": ["XALPHA SEGMENT", "ε"], 
    "XALPHAS": ["XALPHA MOREXALPHAS"], 
    "MOREXALPHAS": ["XALPHAS", "ε"], 
    "XALPHA": ["ALPHA", "DIGIT"], 
    "DIGITS": ["DIGIT MOREDIGITS"], 
    "MOREDIGITS": ["DIGITS", "ε"], 
    "ALPHA": [alphabet_terminal_set], 
    "DIGIT": [numeric_terminal_set],
}

first = {
    "URL": ['http://', 'ftp://', 'telnet://', 'mailto::'], 
    "HTTPADDRESS": ["http://"], 
    "SUFPATHSEARCH": ["/", "?", "ε"], 
    "SUFSEARCH": ["?", "ε"], 
    "FTPADDRESS": ["ftp://"], 
    "TELNETADDRESS": ["telnet://"], 
    "MAILTOADDRESS": ["mailto::"], 
    "LOGIN": [alphabet_terminal_set, numeric_terminal_set], 
    "SUFPASSHOST": ["@", ":"], 
    "HOSTPORT": [alphabet_terminal_set, numeric_terminal_set], 
    "SUFPORT": [":", "ε"], 
    "HOSTNAME": [alphabet_terminal_set, numeric_terminal_set], 
    "DOTHOSTNAME": [".", "ε"], 
    "PORT": [numeric_terminal_set], 
    "PATH": ["/", alphabet_terminal_set, numeric_terminal_set, "ε"], 
    "SLASHPATH": ["/", "ε"], 
    "SEARCH": [alphabet_terminal_set, numeric_terminal_set], 
    "PLUSSEARCH": ["+", "ε"], 
    "USER": [alphabet_terminal_set, numeric_terminal_set], 
    "PASSWORD": [alphabet_terminal_set, numeric_terminal_set], 
    "SEGMENT": [alphabet_terminal_set, numeric_terminal_set, "ε"], 
    "XALPHAS": [alphabet_terminal_set, numeric_terminal_set], 
    "MOREXALPHAS": [alphabet_terminal_set, numeric_terminal_set, "ε"], 
    "XALPHA": [alphabet_terminal_set, numeric_terminal_set], 
    "DIGITS": [numeric_terminal_set], 
    "MOREDIGITS": [numeric_terminal_set, "ε"], 
    "ALPHA": [alphabet_terminal_set], 
    "DIGIT": [numeric_terminal_set],
}

follow = {
    "URL": ['$'], 
    "HTTPADDRESS": ['$'], 
    "SUFPATHSEARCH": ['$'], 
    "SUFSEARCH": ['$'], 
    "FTPADDRESS": ['$'], 
    "TELNETADDRESS": ['$'], 
    "MAILTOADDRESS": ['$'], 
    "LOGIN": ["/", '$'], 
    "SUFPASSHOST": ["/", '$'], 
    "HOSTPORT": ["/", "?", '$'], 
    "SUFPORT": ["/", "?", '$'], 
    "HOSTNAME": [":", "/", "?", '$'], 
    "DOTHOSTNAME": [":", "/", "?", '$'], 
    "PORT": ["/", "?", '$'], 
    "PATH": ["?", '$'], 
    "SLASHPATH": ["?", '$'], 
    "SEARCH": ['$'], 
    "PLUSSEARCH": ['$'], 
    "USER": ["@"], 
    "PASSWORD": ["/", "?"], 
    "SEGMENT": ["/", "?", '$'], 
    "XALPHAS": [":", "@", ".", "+", "/", "?", '$'], 
    "MOREXALPHAS": [":", "@", ".", "+", "/", "?", '$'], 
    "XALPHA": [alphabet_terminal_set, numeric_terminal_set, ":", "@", ".", "+", "/", "?", '$'], 
    "DIGITS": ["/", "?", '$'], 
    "MOREDIGITS": ["/", "?", '$'], 
    "ALPHA": [alphabet_terminal_set, numeric_terminal_set, ":", "@", ".", "+", "/", "?", '$'], 
    "DIGIT": [alphabet_terminal_set, numeric_terminal_set, ":", "@", ".", "+", "/", "?", '$'], 
}

any_number_terminal = "-SINGLEDIGIT-"
any_letter_terminal = "-SINGLELETTER-"

parsing_table = {
    "URL": {"http://": 1, "ftp://": 2, "telnet://": 3, "mailto::": 4},
    "HTTPADDRESS": {"http://": 5},
    "SUFPATHSEARCH": {"/": 6, "?": 7, "$": 8},
    "SUFSEARCH": {"?": 9, "$": 10},
    "FTPADDRESS": {"ftp://": 11},
    "TELNETADDRESS": {"telnet://": 12},
    "MAILTOADDRESS": {"mailto::": 13},
    "LOGIN": {any_letter_terminal: 14, any_number_terminal: 14},
    "SUFPASSHOST": {":": 16, "@": 15},
    "HOSTPORT": {any_letter_terminal: 17, any_number_terminal: 17},
    "SUFPORT": {":": 18, "/": 19, "?": 19, "$": 19},
    "HOSTNAME": {any_letter_terminal: 20, any_number_terminal: 20},
    "DOTHOSTNAME": {":": 22, ".": 21, "/": 22, "?": 22, "$": 22},
    "PORT": {any_number_terminal: 23},
    "PATH": {any_letter_terminal: 24, any_number_terminal: 24, "/": 24, "?": 24, "$": 24},
    "SLASHPATH": {"/": 25, "?": 26, "$": 26},
    "SEARCH": {any_letter_terminal: 27, any_number_terminal: 27},
    "PLUSSEARCH": {"+": 28, "$": 29},
    "USER": {any_letter_terminal: 30, any_number_terminal: 30},
    "PASSWORD": {any_letter_terminal: 31, any_number_terminal: 31},
    "SEGMENT": {any_letter_terminal: 32, any_number_terminal: 32, "/": 33, "?": 33, "$": 33},
    "XALPHAS": {any_letter_terminal: 34, any_number_terminal: 34},
    "MOREXALPHAS": {any_letter_terminal: 35, any_number_terminal: 35, ":": 36, "@": 36, ".": 36, "+": 36, "/": 36, "?": 36, "$": 36},
    "XALPHA": {any_letter_terminal: 37, any_number_terminal: 38},
    "DIGITS": {any_number_terminal: 39},
    "MOREDIGITS": {any_number_terminal: 40, "/": 41, "?": 41, "$": 41},
    "ALPHA": {any_letter_terminal: 42},
    "DIGIT": {any_number_terminal: 43},
}

