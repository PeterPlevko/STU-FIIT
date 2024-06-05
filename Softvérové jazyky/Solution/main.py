from tokenizer import *
from grammar import *
from parser import *
import argparse

def parse_input(input_url, print_tokens = False, print_rules = False, print_parsing_table = False, print_nonterminals = False, print_terminals = False, silent_mode = False):
    # Parse input URL

    print("*" * 50)
    print(f"Input URL: {input_url}")

    tokenizer = Tokenizer(input_url)

    try:
        tokens = tokenizer.tokenize()
    except Exception as e:
        print("\nError - invalid URL - tokenizer error - unsupported character")
        return

    if print_tokens:
        print("\nTokens:")
        for token in tokens:
            print(token)
    
    if print_parsing_table:
        print("\nParsing table:")
        for nonterminal in parsing_table:
            print(f"{nonterminal}: {parsing_table[nonterminal]}")
    
    if print_nonterminals:
        print("\nNonterminals:")
        for nonterminal in NONTERMINALS:
            print(nonterminal)

    if print_terminals:
        print("\nTerminals:")
        for terminal in TERMINALS:
            print(terminal)

    # Perform semantic analysis based on the tokens and grammar rules
    parser = Parser(input_url, tokens, parsing_table, initial_state, original_rules, NONTERMINALS, TERMINALS, print_rules, silent_mode)
    parser.parse()


def parse_arguments():
    # Parse command line arguments

    parser = argparse.ArgumentParser(description='Your program description')

    parser.add_argument('-t', '--print_tokens', action='store_true', help='Print tokens')
    parser.add_argument('-r', '--print_rules', action='store_true', help='Print rules')
    parser.add_argument('-p', '--print_parsing_table', action='store_true', help='Print parsing table')
    parser.add_argument('-n', '--print_nonterminals', action='store_true', help='Print nonterminals')
    parser.add_argument('-m', '--print_terminals', action='store_true', help='Print terminals')
    parser.add_argument('-s', '--silent_mode', action='store_true', help='Run in silent mode')
    parser.add_argument('-f', '--file', type=str, help='Path to the file. If not specified, run in interactive mode.')

    args = parser.parse_args()

    return args

def main():
    # Main function

    # Parse command line arguments
    args = parse_arguments()

    print_tokens = args.print_tokens
    print_rules = args.print_rules
    print_parsing_table = args.print_parsing_table
    print_nonterminals = args.print_nonterminals
    print_terminals = args.print_terminals
    silent_mode = args.silent_mode

    # If file is specified, read from file, otherwise run in interactive mode
    if args.file:
        file_name = args.file
        print(f"Reading from file {file_name}")
        with open(file_name) as file:
            line = file.readline()
            while line:
                parse_input(line.strip(), print_tokens, print_rules, print_parsing_table, print_nonterminals, print_terminals, silent_mode)
                line = file.readline()
    else:
        while True:
            input_url = input('\nEnter the URL: ')
            parse_input(input_url.strip(), print_tokens, print_rules, print_parsing_table, print_nonterminals, print_terminals, silent_mode)

if __name__ == "__main__":
    main()
