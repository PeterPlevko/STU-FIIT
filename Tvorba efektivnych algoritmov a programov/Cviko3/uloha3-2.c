// uloha3-2.c

#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include <string.h>


int binary_length(long num) {

    int length = 0;

    while (num > 0) {

        num >>= 1;
        length++;
    }

    return length;
}


char* long_to_binary_string(long num) {

    char* out = (char*) malloc(sizeof(char) * 51);

    while (num > 0) {

        out[binary_length(num) - 1] = num % 2 + '0';
        num >>= 1;
    }

    return out;
}


int compare_strings(char* string1, char* string2) {

    int max_length = strlen(string1) > strlen(string2) ? strlen(string2) : strlen(string1);

    for (int i = 0; i < max_length; i++) {

        if (string1[i] != string2[i]) {

            return 0;
        }
    } 

    return 1;
}


int split(char* s, char** array, int length) {

    // Test all numbers from biggest to smallest
    for (int i = length - 1; i >= 0; i--) {

        // Too big
        if (strlen(array[i]) > strlen(s)) {

            continue;
        }

        // I fits, I sits
        if (compare_strings(array[i], s)) {

            // Exactly the same
            if (strlen(array[i]) == strlen(s)) {

                return 1;
            }

            else {

                int rest = split(s + strlen(array[i]), array, length);

                if (rest == -1) {

                    continue;
                }

                else {

                    return 1 + rest;
                }
            }
        }
    }

    return -1;
}


int main() {

    char s[51];

    int array_length = 0;

    while (pow(2, 51) > pow(5, ++array_length));

    char* array[22];

    for (int i = 0; i < array_length; i++) {

        array[i] = long_to_binary_string((long) pow(5, i));
    }

    while (scanf("%s", s) > 0) {

        int out = split(s, array, array_length);

        printf("%d\n", out);
    }
    
    return 0;
}