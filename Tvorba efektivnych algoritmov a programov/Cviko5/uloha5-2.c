// uloha5-2.c

#include <stdio.h>
#include <math.h>
char result[50];

void resetResult() {
    for (int i = 0; i < 50; i++) {
        result[i] = '.';
    }
}

long long int toNumber(char* arr, int length) {
    long long int res = 0;
    for (int i = 0; i < length; i++) {
        if (arr[i] == '<') {
            res = res << 1;
            res += 1;
        }
        if (arr[i] == '>') {
            res = res << 1;
        }
    }
    return res;
}

char isOldLeftGood(long long int num, int i) {
    if (i == 0)
        return 1;
    if (num == 0)
        return 0;
    int count = 0;
    while (num > 0) {
        int temp = num%2;
        num = num >> 1;
        if (temp == 0)
            count++;
        else
            break;
    }
    if (count % 2 == 0) {
        return 1;
    } else
        return 0;
}

long long int myPow(int x,int n)
{
    int i; /* Variable used in loop counter */
    long long int number = 1;

    for (i = 0; i < n; ++i)
        number *= x;

    return(number);
}

char isLeftGood(long long int num, int length) {
    if (length == 0)
        return 1;
    long long int index;
    if (num < pow(2.0,(double) length-1)) {
        index = 0;
    } else {
        index = myPow(2, length - 1) ;
    }
    long long int section = (myPow(2, length - 1))/4;
    while (section >= 2) {
        if (num < index + 3*section && num >= index+2*section) {
            return 1;
        } else {
            if (num < index + 4*section && num >= index+3*section) {
                index = index + 3*section;
                section/=4;
                continue;
            }
            if (num < index + 2*section && num >= index+1*section) {
                index = index + 1*section;
                section/=4;
                continue;
            }
            if (num < index + 1*section && num >= index+0*section) {
                index = index + 0*section;
                section/=4;
                continue;
            }
        }
    }
    if (num % 2 == 1)
        return 1;
    else
        return 0;
}

char isRightGood(long long int num, int length) {
    if (length == 0)
        return 1;
    if (num < pow(2.0,(double) length-1)) {
        return 1;
    } else {
        long long int index = myPow(2, length - 1);
        long long int section = index/4;
        index--;
        while (section >= 2) {
            if (num <= index + 3*section && num > index+2*section) {
                return 1;
            } else {
                if (num <= index + 4*section && num > index+3*section) {
                    index = index + 3*section;
                    section/=4;
                    continue;
                }
                if (num <= index + 2*section && num > index+1*section) {
                    index = index + 1*section;
                    section/=4;
                    continue;
                }
                if (num <= index + 1*section && num > index+0*section) {
                    index = index + 0*section;
                    section/=4;
                    continue;
                }
            }
        }
        return 0;
    }
}

void recursion(char* arr, int length) {
    for (int i = 0; i < length; i+=2) {
        long long int first_part = toNumber(arr, i);
        if (!(isLeftGood(first_part, i))) {
            first_part = -1;
        }
        long long int second_part = toNumber(arr+i+1, length-i-1);
        if (!(isRightGood(second_part, length-i-1))) {
            second_part = -1;
        }
        if (first_part != -1 && second_part != -1)
            result[i] = 'o';
    }
}

int main() {
    char arr[50];
    int length = 1;
    while (scanf("%c", &arr[0]) >= 1) {
        while (scanf("%c", &arr[length]) >= 1) {
            if (arr[length] == '\n') {
                break;
            }
            length++;
        }
        resetResult();
        recursion(arr, length);
        for (int i = 0; i < length; i++) {
            printf("%c", result[i]);
        }
        printf("\n");
        length = 1;
        resetResult();
    }
    return 0;
}
