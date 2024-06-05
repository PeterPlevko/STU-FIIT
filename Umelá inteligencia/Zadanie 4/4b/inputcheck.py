# Function to get proper input format within range
def input_check(values, message, value_error="Out of range", format_error="Wrong format", format=lambda x: x):

    while True:

        try:

            inp = format(input(message))

            if inp in values:
                return inp

            else:
                print(value_error)
                print(values)

        except:
            print(format_error)
