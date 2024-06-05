import re

class Tokenizer:
    def __init__(self, input_string):
        self.input_string = input_string
        self.tokens = []
        self.patterns = [
            ("-URLADDRESS-", r"(http://|ftp://|telnet://|mailto::)"), 
            ("-SYMBOL-", r"[/?:@.\+]"), 
            ("-SINGLEDIGIT-", r"\d"), 
            ("-SINGLELETTER-", r"[a-zA-Z]"), 
        ]

    def tokenize(self):
        while self.input_string:
            self.input_string = self.input_string.lstrip()

            for token_type, pattern in self.patterns:
                match = re.match(pattern, self.input_string)
                if match:
                    token_value = match.group()
                    self.tokens.append((token_type, token_value))
                    self.input_string = self.input_string[len(token_value):]
                    break
            if not match:
                raise ValueError("Invalid input string")

        return self.tokens

