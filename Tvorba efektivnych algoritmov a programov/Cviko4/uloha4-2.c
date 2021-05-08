// uloha4-2.c
#include <stdio.h>
#include <string.h>


void add(char* list, char c) {

    list[0] = list[1];
    list[1] = list[2];
    list[2] = list[3];
    list[3] = list[4];
    list[4] = list[5];
    list[5] = list[6];
    list[6] = c;
}


int check(char* list) {

    int vowels = 0, consonants = 0, question_marks = 0, possible = 0;

    for (int i = 2; i < 7; i++) {

        // It's a consonant
        if (strchr("QWRTPSDFGHJKLZXCVBNM", list[i]) != NULL) {
            consonants++;
        }

        if (list[i] == '?') {
            question_marks++;
        }
    }

    if (consonants == 5) {
        return 2;
    }

    if (consonants + question_marks == 5) {
        possible = 1;
    }

    question_marks = 0;

    for (int i = 4; i < 7; i++) {

        // It's a vowel
        if (strchr("AEIOUY", list[i]) != NULL) {
            vowels++;
        }

        if (list[i] == '?') {
            question_marks++;
        }
    }

    if (vowels == 3) {
        return 2;
    }

    if (vowels + question_marks == 3) {
        possible = 1;
    }

    // Weird-ass specials
    if (strchr("AEIOUY", list[0]) != NULL && strchr("AEIOUY", list[1]) != NULL) {
        if (list[2] == '?') {
            consonants = 0;
            for (int i = 3; i < 7; i++) {
                if (strchr("QWRTPSDFGHJKLZXCVBNM", list[i]) != NULL) {
                    consonants++;
                }
            }
            if (consonants == 4) {
                return 2;
            }
        }
    }

    if (strchr("AEIOUY", list[6]) != NULL && strchr("AEIOUY", list[5]) != NULL) {
        if (list[4] == '?') {
            consonants = 0;
            for (int i = 3; i >= 0; i--) {
                if (strchr("QWRTPSDFGHJKLZXCVBNM", list[i]) != NULL) {
                    consonants++;
                }
            }
            if (consonants == 4) {
                return 2;
            }
        }
    }

    if (possible) {
        return 1;
    }

    return 0;
}


int main() {

    char c, breaking = 0;

    while (!breaking) {

        if (scanf("%c", &c) < 1) {
            break;
        }

        int checker = 0, next = 0;
        char list[7] = {'-', '-', '-', '-', '-', '-', '-'};

        while (c != '\n' && !breaking) {

            if (checker != 2) {

                add(list, c);
                next = check(list);

                if (next > checker) {
                    checker = next;
                }
            }

            // End
            if (scanf("%c", &c) < 1) {
                breaking = 1;
            }
        }

        if (checker == 2) {
            printf("paci\n");
        }

        if (checker == 1) {
            printf("neviem\n");
        }

        if (checker == 0) {
            printf("nepaci\n");
        }
    }

    return 0;
}
