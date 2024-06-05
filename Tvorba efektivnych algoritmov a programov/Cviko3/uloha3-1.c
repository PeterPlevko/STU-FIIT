// uloha3-1.c

#include <stdio.h>
#include <stdlib.h>
/*
printf("1\n");
printf("6\n");
printf("0\n");
printf("3\n");
printf("0\n");
printf("1\n");
printf("1\n");
printf("3\n");
printf("21\n");
printf("120\n");
printf("635745396\n");
printf("3268760\n");
printf("4457400\n");
printf("3796297200\n");
printf("0\n");
printf("6\n");
printf("1\n");
printf("2079\n");
printf("0\n");
printf("1365\n");
printf("488\n");
printf("6\n");
printf("8806\n");
printf("23068\n");
printf("48846\n");
printf("1676056044\n");
printf("2707475148\n");
printf("3562467300\n");
printf("3796297200\n");
printf("3247943160\n");
printf("219\n");
printf("1\n");
printf("1\n");
printf("4\n");
printf("64\n");
printf("0\n");
printf("10\n");
printf("196\n");
printf("40\n");
printf("1\n");
printf("0\n");
printf("0\n");
printf("9\n");
printf("0\n");
printf("11368\n");
printf("276\n");
printf("966\n");
printf("0\n");
printf("1715\n");
printf("2\n");
printf("1715\n");
printf("81\n");
printf("0\n");
printf("54\n");
printf("0\n");
printf("0\n");
printf("0\n");
printf("1\n");
printf("0\n");
printf("47549970\n");
printf("3247943160\n");
printf("30888\n");
printf("3796297200\n");*/
/*
long long int combination(long long int n, long long int k)
{
    if (k > n)
        return 0;
    if (k == 0)
        return 1;

    long long int v = n--;

    for (int i = 2; i < k + 1; ++i, --n)
        v = v * n / i;

    return v;
}

char is_same_oper_minus(char* arr, int length) {
    for (int i = 0; i < length; i++) {
        if (arr[i] != 45)
            return 0;
    }
    return 1;
}

char is_same_oper_others(char* arr, int length) {
    for (int i = 0; i < length; i++) {
        if (!(arr[i] == 43 || arr[i] == 47 || arr[i] == 42))
            return 0;
    }
    return 1;
}

long long int partition(char* arrNum, int lenArrNum, char* arrOper, int lenArrOper) {
    if (lenArrOper == 0 && lenArrNum != 0) {
        return 1;
    }
    if (lenArrOper == 1) {
        if (arrOper[0] == 45) {
            return lenArrNum;
        } else {
            if (lenArrNum == 1)
                return 0;
            return lenArrNum-1;
        }
    }
    long long int res = 0;
    if (arrOper[0] == 45) {
        if (is_same_oper_minus(arrOper, lenArrOper)) {
            return combination(lenArrNum, lenArrOper);
        }
    } else {
        if (is_same_oper_others(arrOper, lenArrOper)) {
            return combination(lenArrNum-1, lenArrOper);
        }
    }

    for (int i = 0; i <= lenArrNum - lenArrOper; i++) {
        res += partition(arrNum, lenArrNum - (i + 1), arrOper + 1, lenArrOper - 1);
    }
    return res;
}

int find_n_group(char* array, int length, int numberGroups) {
    int groups = 0, group = 1, j;
    for (j = 0; j < length; j++) {
        if (!((array[j] >= 48) && (array[j] < 58))) {
            if (group == 0) {
                groups++;
                group = 1;
                if (groups == numberGroups)
                    break;
            }
        } else {
            group = 0;
        }
    }
    return j;
}

int how_many_operators(char* array, int length) {
    int res = 0;
    for (int j = 0; j < length; j++) {
        if (!((array[j] >= 48) && (array[j] < 58))) {
            res++;
        } else
            return res;
    }
    return res;
}

long long int divide(char* array, int length, int groups) {
    int opers = how_many_operators(array, length);
    if (groups == 1) {
        return partition( array+opers, length-opers, array, opers);
    }
    long long int res = 1;
    for (int i = 0; i < groups-1; i++) {
        int temp = find_n_group(array, length, i+1);
        if (opers == 1)
            res *= partition( array+opers, temp-opers, array, opers);
        else
            res *= divide(array+1, temp-1, i+1);
        res *= divide(array+temp, length-temp, groups - (i+1));
        temp++;
    }
    return res;
}


char arr[120]= {' ', ' ', ' ', ' ', ' '};
long long int count = 0;

void expression(int pos, int stack) {
    int char1, char2;
    char1 = arr[pos];
    char2 = arr[pos-1];
    while (char1 != 32) {
        if ((char1 >= 48) && (char1 <= 57)) {
            if ((char2 >= 48) && (char2 <= 57)) {
                expression(pos - 1, stack + 1);
                pos--;
                char1 = arr[pos];
                char2 = arr[pos - 1];
                continue;
            } else {
                if (char2 == 45) {
                    expression(pos - 2, stack + 1);

                    pos--;
                    stack++;
                    char1 = arr[pos];
                    char2 = arr[pos - 1];
                    continue;
                } else {
                    pos--;
                    stack++;
                    char1 = arr[pos];
                    char2 = arr[pos-1];
                    continue;
                }
            }
        } else {
            if (stack >= 2) {
                stack--;
                pos--;
                char1 = arr[pos];
                char2 = arr[pos-1];
                continue;
            } else {
                return;
            }
        }
    }

    if (stack == 1) {
        count++;
    }
}
*/

#define isNumber(x) ((arr[x] >= 48) && (arr[x] < 58))


unsigned long long int notation(char* arr, int length) {
    unsigned long long int** memory = (unsigned long long int**) malloc(length * sizeof(unsigned long long int*));
    for (int i = 0; i < length; ++i) {
        memory[i] = (unsigned long long int*) calloc(length, sizeof(unsigned long long int));
    }

    // vypln hlavnu diagonalu podla pravidiel pre dlzku 1
    for (int i = 0; i < length; ++i) {
        if (isNumber(i)) {
            memory[i][i] = 1;
        } else {
            memory[i][i] = 0;
        }
    }

    // vypln diagonalu podla pravidiel pre dlzku 2
    for (int i = 0; i < length-1; ++i) {
        if ((isNumber(i) || arr[i] == 45) && isNumber(i+1)) {
            memory[i][i+1] = 1;
        } else {
            memory[i][i+1] = 0;
        }
    }

    // vypln ostatne diagonaly podla pravidiel pre dlzku 3..n
    for (int i = 3; i < length+1; ++i) {
        for (int j = 0; j < length - i + 1; ++j) {
            if (isNumber(j)) {
                int good = 1;
                int now = j;
                while (now <= j+i-1) {
                    if(!isNumber(now)) {
                        good = 0;
                        break;
                    }
                    now++;
                }
                memory[j][j+i-1] = good;
            } else {
                unsigned long long int count = 0;
                for (int k = 0; k < i-2; ++k) {
                    count += memory[j+1][j+1+k]*memory[j+2+k][j+i-1];
                }
                if (arr[j] == 45) {
                    int good = 1;
                    int now = j+1;
                    while (now <= j+i-1) {
                        if(!isNumber(now)) {
                            good = 0;
                            break;
                        }
                        now++;
                    }
                    count += good;
                }
                memory[j][j+i-1] = count;
            }
        }
    }
    for (int l = 0; l < length; ++l) {
        for (int j = 0; j < length; ++j) {
            printf("%2lld ", memory[l][j]);
        }
        printf("\n");
    }
    printf("\n");
    unsigned long long int res = memory[0][length-1];
    for (int i = 0; i < length; ++i) {
        free(memory[i]);
    }
    free(memory);
    return res;
}



int main() {
    char arr[50];
    while (scanf("%s", arr) >= 1) {
        int length = -1;
        while (arr[++length] != 0) {}
        printf("%lld\n", notation(arr, length));
    }


    return 0;
}