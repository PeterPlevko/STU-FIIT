class Parser:
    def __init__(self, input_url, tokens, parsing_table, initial_state, original_rules, nonterminals, terminals, print_rules, silent_mode):
        self.input_url = input_url
        self.tokens = tokens
        self.parsing_table = parsing_table
        self.current_state = initial_state
        self.original_rules = original_rules
        self.nonterminals = nonterminals
        self.terminals = terminals
        self.print_rules = print_rules
        self.silent_mode = silent_mode
        self.rules = self.expand_rules()
        self.stack = [initial_state]

    def expand_rules(self):
        # Expand rules from original form to list of lists

        rules = {}
        counter = 1
        for nonterminal in self.nonterminals:
            for rule in self.original_rules[nonterminal]:
                if type(rule) == str:
                    rules[counter] = rule.split(" ")
                else:
                    rules[counter] = rule
                counter += 1
        
        if self.print_rules:
            print("\nExpanded rules: ")
            for rule in rules:
                print(f"{rule}: {rules[rule]}")

        return rules
    
    def print_accepted_tokens(self, accepted_tokens, error = False):
        # Print accepted tokens and original input URL if error

        if error:
            print("\nThese tokens were accepted before the error: ")
        else:
            print("\nAccepted tokens: ")

        for token in accepted_tokens:
            print(token, end="")
        print()
        if error:
            print(f"Original input URL: \n{self.input_url}")

    def parse(self):
        # Parse input URL

        # Stack contains start symbol and initial state
        stack = ['-START-', self.current_state]
        counter = 0
        accepted_tokens = []

        # While stack is not empty
        while stack:
            counter += 1

            if not self.silent_mode:
                print(f"\nStep: {counter}")
                print(f"Stack: {stack}")
                print(f"Tokens: {self.tokens}")

            # Get current state and token
            current_state = stack.pop()
            # If stack is empty, set current token to end of input
            if len(self.tokens) == 0:
                current_token = "$"
                current_token_type = "END"
            else:
                current_token = self.tokens[0][1]
                current_token_type = self.tokens[0][0]

            if not self.silent_mode:
                print(f"Current state: {current_state}")
                print(f"Current token: {current_token}")

            # If current state is epsilon, skip it
            if current_state == 'ε':
                current_state = stack.pop()
                if not self.silent_mode:
                    print("Epsilon detected, skipping...")
                    print(f"Current state {counter}: {current_state}")
            
            # If current state is a terminal, check if it matches current token
            if current_state in self.terminals:
                if current_state == current_token:
                    self.tokens.pop(0)
                    accepted_tokens.append(current_token)
                else:
                    print("\nError - terminal mismatch")
                    self.print_accepted_tokens(accepted_tokens, error = True)
                    return False
            # If current state is a nonterminal, check if
            elif current_state in self.nonterminals:
                # If current token type is in parsing table, apply rule from parsing table (letters and digits are treated as terminals)
                if current_token_type in self.parsing_table[current_state]:
                    rule_number = self.parsing_table[current_state][current_token_type]
                    rule = self.rules[rule_number]

                    if not self.silent_mode:
                        print(f"Applying rule {rule_number}: {rule}")

                    # If rule is a tuple, it means it contains letters and digits, so we don't need to append all of them only the current token, if it's in the tuple
                    if isinstance(rule, tuple):
                        if current_token in rule:
                            stack.append(current_token)
                    # If rule is a string, it means it contains only terminals and standard nonterminals, so we need to append all of them in reverse order
                    else:
                        for symbol in reversed(rule):
                                stack.append(symbol)
                # If current token is in parsing table, apply rule from parsing table
                elif current_token in self.parsing_table[current_state]:
                    rule_number = self.parsing_table[current_state][current_token]
                    rule = self.rules[rule_number]

                    if not self.silent_mode:
                        print(f"Applying rule {rule_number}: {rule}")

                    # Append rule to stack in reverse order
                    for symbol in reversed(rule):
                        stack.append(symbol)
                # If current token is not in parsing table, error
                else:
                    print("\nError - no rule found")
                    self.print_accepted_tokens(accepted_tokens, error = True)
                    return False
            # If current state is start symbol, success
            elif current_state == "-START-":
                if len(self.tokens) != 0:
                    print("\nError - tokens left")
                    self.print_accepted_tokens(accepted_tokens, error = True)
                    return False
                print("\nSuccess - valid URL")
                self.print_accepted_tokens(accepted_tokens)
                return True
            # If current state is not a terminal, nonterminal or start symbol, error
            else:
                print("\nError - invalid state")
                self.print_accepted_tokens(accepted_tokens, error = True)
                return False