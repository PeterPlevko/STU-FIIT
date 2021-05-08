// uloha4-2.c

#include <stdio.h>
#include <string.h>


int test7(char* list) {

    for (int i = 0; i < 44; i++) {

        if (strchr("QWRTPSDFGHJKLZXCVBNM", list[i]) != NULL &&
        strchr("QWRTPSDFGHJKLZXCVBNM", list[i+1]) != NULL &&
        strchr("QWRTPSDFGHJKLZXCVBNM", list[i+2]) != NULL &&
        strchr("QWRTPSDFGHJKLZXCVBNM", list[i+3]) != NULL &&
        list[i+4] == '?' &&
        strchr("AEIOUY", list[i+5]) != NULL &&
        strchr("AEIOUY", list[i+6]) != NULL
        ) return 2;

        if (strchr("AEIOUY", list[i]) != NULL &&
        strchr("AEIOUY", list[i+1]) != NULL &&
        list[i+2] == '?' &&
        strchr("QWRTPSDFGHJKLZXCVBNM", list[i+3]) != NULL &&
        strchr("QWRTPSDFGHJKLZXCVBNM", list[i+4]) != NULL &&
        strchr("QWRTPSDFGHJKLZXCVBNM", list[i+5]) != NULL &&
        strchr("QWRTPSDFGHJKLZXCVBNM", list[i+6]) != NULL
        ) return 2;
    }

    return 1;
}

int test9(char* list) {

    for (int i = 0; i < 42; i++) {

        if (strchr("AEIOUY", list[i]) != NULL &&
        strchr("AEIOUY", list[i+1]) != NULL &&
        list[i+2] == '?' &&
        strchr("QWRTPSDFGHJKLZXCVBNM", list[i+3]) != NULL &&
        strchr("QWRTPSDFGHJKLZXCVBNM", list[i+4]) != NULL &&
        strchr("QWRTPSDFGHJKLZXCVBNM", list[i+5]) != NULL &&
        list[i+6] == '?' && 
        strchr("AEIOUY", list[i+7]) != NULL &&
        strchr("AEIOUY", list[i+8]) != NULL
        ) return 2;
    }

    return 1;
}

int test11(char* list) {

    for (int i = 0; i < 39; i++) {

        if (strchr("QWRTPSDFGHJKLZXCVBNM", list[i]) != NULL &&
        strchr("QWRTPSDFGHJKLZXCVBNM", list[i+1]) != NULL &&
        strchr("QWRTPSDFGHJKLZXCVBNM", list[i+2]) != NULL &&
        strchr("QWRTPSDFGHJKLZXCVBNM", list[i+3]) != NULL &&
        list[i+4] == '?' &&
        strchr("AEIOUY", list[i+5]) != NULL &&
        list[i+6] == '?' && 
        strchr("QWRTPSDFGHJKLZXCVBNM", list[i+7]) != NULL &&
        strchr("QWRTPSDFGHJKLZXCVBNM", list[i+8]) != NULL &&
        strchr("QWRTPSDFGHJKLZXCVBNM", list[i+9]) != NULL &&
        strchr("QWRTPSDFGHJKLZXCVBNM", list[i+10]) != NULL
        ) return 2;
    }

    return 1;
}


int rec(char* list, int depth) {

    // Final destination
    if (list[depth] == '-') {

        int out = 1;
        int consecutive = 0;

        // Spoluhlaska
        for (int i = 0; i < 50; i++) {

            if (list[i] == '-') {
                break;
            }

            if (strchr("QWRTPSDFGHJKLZXCVBNM", list[i]) != NULL) {
                consecutive++;
            }
            else {
                consecutive = 0;
            }

            if (consecutive == 5) {
                out = 2;
                break;
            }
        }

        consecutive = 0;
        // Samohlaska
        for (int i = 0; i < 50; i++) {

            if (list[i] == '-') {
                break;
            }

            if (strchr("AEIOUY", list[i]) != NULL) {
                consecutive++;
            }
            else {
                consecutive = 0;
            }

            if (consecutive == 3) {
                out = 2;
                break;
            }
        }

        return out;
    }

    if (list[depth] == '?') {

        list[depth] = 'A';
        int out = rec(list, depth + 1);

        if (out == 1) {
            list[depth] = '?';
            return 1;
        }

        list[depth] = 'X';
        out = rec(list, depth + 1);
        list[depth] = '?';
        return out;
    }
    else {
        return rec(list, depth + 1);
    }
}


int resolve(char* list) {

    int sam = 0, spo = 0;
    int out = 0;
    int consecutive = 0;

    // Spoluhlaska
    for (int i = 0; i < 50; i++) {

        if (list[i] == '-') {
            break;
        }

        if (strchr("QWRTPSDFGHJKLZXCVBNM", list[i]) != NULL) {
            consecutive++;
            spo++;
        }
        else {
            consecutive = 0;
        }

        if (consecutive == 5) {
            out = 2;
            break;
        }
    }

    consecutive = 0;
    // Samohlaska
    for (int i = 0; i < 50; i++) {

        if (consecutive == 3) {
            out = 2;
            break;
        }

         if (list[i] == '-') {
            break;
        }

        if (strchr("AEIOUY", list[i]) != NULL) {
            consecutive++;
            sam++;
        }
        else {
            consecutive = 0;
        }

        if (consecutive == 3) {
            out = 2;
        }
    }

    if (out == 2) {
        return out;
    }

    consecutive = 0;
    // Maybe spoluhlaska
    for (int i = 0; i < 50; i++) {
        
        if (list[i] == '-') {
            break;
        }

        if (strchr("QWRTPSDFGHJKLZXCVBNM?", list[i]) != NULL) {
            consecutive++;
        }
        else {
            consecutive = 0;
        }

        if (consecutive == 5) {
            out = 1;
            break;
        }
    }

    consecutive = 0;
    // Maybe samohlaska
    for (int i = 0; i < 50; i++) {

        if (list[i] == '-') {
            break;
        }

        if (strchr("AEIOUY?", list[i]) != NULL) {
            consecutive++;
        }
        else {
            consecutive = 0;
        }

        if (consecutive == 3) {
            out = 1;
            break;
        }
    }

    if (out == 0) {
        return out;
    }

    if (test7(list) == 2) {
        return 2;
    }

    if (test9(list) == 2) {
        return 2;
    }

    if (test11(list) == 2) {
        return 2;
    }

    // MAYBE
    int c = 0;

    for (int i = 0; i < 50; i++) {
        if (list[i] == '?') {
            c++;
        }
    }

    if (sam > 0 && spo > 3 && c < 17) {
        int i = 0;
        while (list[i] == '?') {
            i++;
        }
        out = rec(list, i);
    }
    
    return out;
}


int main() {

    char c, breaking = 0;

    while (!breaking) {

        if (scanf("%c", &c) < 1) {
            break;
        }

        char list[50];

        for (int i = 0; i < 50; i++) {

            list[i] = '-';
        }

        int ii = 0;

        while (c != '\n' && !breaking) {

            list[ii] = c;
            ii++;            

            // End
            if (scanf("%c", &c) < 1) {
                breaking = 1;
            }
        }

        int out = resolve(list);

        if (out == 2) {
            printf("paci\n");
        }
        else if (out == 1) {
            printf("neviem\n");
        }
        else {
            printf("nepaci\n");
        }
    }

    return 0;
}
