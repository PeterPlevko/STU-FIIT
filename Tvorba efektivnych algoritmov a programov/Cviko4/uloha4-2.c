//// uloha4-2.c
//
//#include <stdio.h>
//#include <math.h>
//
//int res = 0;
//int partition(char* arr, int length, int act) {
//    if (act == length) {
//        char stackA = 0, stackG = 0;
//        for (int i = 0; i < length; i++) {
//            if (arr[i] == 65 || arr[i] == 69 || arr[i] == 73 || arr[i] == 79 || arr[i] == 85 || arr[i] == 89) {
//                stackA++;
//                stackG = 0;
//                if (stackA == 3) {
//                    return 1;
//                }
//            } else {
//                stackG++;
//                stackA = 0;
//                if (stackG == 5) {
//                    return 1;
//                }
//            }
//        }
//        return 0;
//    }
//    while (arr[act] != 63) {
//        if (act == length)
//            return partition(arr, length, act);
//        act++;
//    }
//    arr[act] = 'A';
//    res += partition(arr, length, act);
//    arr[act] = 'B';
//    res += partition(arr, length, act);
//    arr[act] = '?';
//    return res;
//}
//
//
//
//int main() {
//    char arr[50];
//    int length = 1;
//    while (scanf("%c", &arr[0]) >= 1) {
//        while (scanf("%c", &arr[length]) >= 1) {
//            if (arr[length] == '\n') {
//                break;
//            }
//            length++;
//        }
//        double otazCount = 0;
//        for (int i = 0; i < length; i++) {
//            if (arr[i] == 63) {
//                otazCount++;
//            }
//        }
//        int count = (int)round(pow(2.0, otazCount));
//        int final = partition(arr, length, 0);
//        if (final == count) {
//            printf("paci\n");
//        } else {
//            if (final == 0)
//                printf("nepaci\n");
//            else
//                printf("neviem\n");
//        }
//        res = 0;
//        length = 1;
//    }
//    return 0;
//}

#include <stdio.h>
#include <math.h>
#include <stdlib.h>

int isAlwaysGood(char* arr, int length) {
    char stackA = 0, stackG = 0;
    for (int i = 0; i < length; i++) {
        if (arr[i] == 0) {
            stackA++;
            stackG = 0;
            if (stackA == 3) {
                return 1;
            }
        }
        if (arr[i] == 1) {
            stackG++;
            stackA = 0;
            if (stackG == 5) {
                return 1;
            }
        }
    }
    return 0;
}

int isThereOnePossibilityOfGood(char* arr, int length) {
    char stackA = 0, stackG = 0, stackOtaz = 0;
    for (int i = 0; i < length; i++) {
        if (arr[i] == 0) {
            stackA++;

            if (stackG != 0) {
                int j = i-1;
                stackOtaz = 0;
                while (arr[j] == 2) {
                    stackOtaz++;
                    j--;
                    if (j == -1)
                        break;
                }
            }

            if (stackA + stackOtaz >= 3)
                return 1;
            stackG = 0;
        }
        if (arr[i] == 1) {
            stackG++;

            if (stackA != 0) {
                int j = i-1;
                stackOtaz = 0;
                while (arr[j] == 2) {
                    stackOtaz++;
                    j--;
                    if (j == -1)
                        break;
                }
            }

            if (stackG + stackOtaz >= 5)
                return 1;
            stackA = 0;
        }
        if (arr[i] == 2) {
            stackOtaz++;
            if (stackOtaz >= 3 && arr[i] == 2 && arr[i-1] == 2 && arr[i-2] == 2)
                return 1;
            if (stackG + stackOtaz >= 5)
                return 1;
            if (stackA != 0 && stackA + stackOtaz >= 3)
                return 1;
        }
    }
    return 0;
}

char* returnGreedyFalse(char* arr, int length) {
    char stackA = 0, stackG = 0;
    char* greedy = (char*) malloc(length*sizeof(char));
    for (int i = 0; i < length; ++i) {
        greedy[i] = arr[i];
    }
    for (int i = 0; i < length; i++) {
        if (greedy[i] == 0) {
            stackA++;
            stackG = 0;
        }
        if (greedy[i] == 1) {
            stackG++;
            stackA = 0;
        }
        if (greedy[i] == 2) {
            if (i == 0) {
                if (i + 1 < length && greedy[i + 1] == 0)
                    greedy[i] = 1;
                if (i + 1 < length && greedy[i + 1] == 1)
                    greedy[i] = 0;
            } else {
                if (stackA >= 2) {
                    stackA = 0;
                    stackG = 1;
                    greedy[i] = 1;
                } else if (stackG >= 4) {
                    stackA = 1;
                    stackG = 0;
                    greedy[i] = 0;
                } else {
                    if (i - 1 >= 0 && greedy[i - 1] == 0) {
                        if (i + 1 < length && (greedy[i + 1] == 0 || greedy[i + 1] == 2)) {
                            greedy[i] = 1;
                            stackA = 0;
                            stackG++;
                        } else {
                            if (i + 1 < length && greedy[i + 1] == 1) {
                                greedy[i] = 0;
                                stackA++;
                            }
                        }
                    }
                    if (i - 1 >= 0 && greedy[i - 1] == 1) {
                        if (i + 1 < length && (greedy[i + 1] == 1 || greedy[i + 1] == 2)) {
                            greedy[i] = 0;
                            stackG = 0;
                            stackA++;
                        } else {
                            if (i + 1 < length && greedy[i + 1] == 0) {
                                greedy[i] = 1;
                                stackG++;
                            }
                        }
                    }

                }
            }
        }
        int f = greedy[i];
    }
    return greedy;
}

int main() {
    char arr[55];
    int length = 1;
    while (scanf("%c", &arr[0]) >= 1) {
        if (arr[0] == 65 || arr[0] == 69 || arr[0] == 73 || arr[0] == 79 || arr[0] == 85 || arr[0] == 89) {
            arr[0] = 0;
        } else {
            if (arr[0] == 63) {
                arr[0] = 2;
            } else {
                arr[0] = 1;
            }
        }
        while (scanf("%c", &arr[length]) >= 1) {
            if (arr[length] == '\n') {
                break;
            }
            if (arr[length] == 65 || arr[length] == 69 || arr[length] == 73 || arr[length] == 79 || arr[length] == 85 ||
                arr[length] == 89) {
                arr[length] = 0;
            } else {
                if (arr[length] == 63) {
                    arr[length] = 2;
                } else {
                    arr[length] = 1;
                }
            }

            length++;
        }
        if (isAlwaysGood(returnGreedyFalse(arr, length), length) == 1) {
            printf("paci\n");
        } else {
            if (isThereOnePossibilityOfGood(arr, length))
                printf("neviem\n");
            else
                printf("nepaci\n");
        }
//        printf("%d\n", isAlwaysGood(returnGreedyFalse(arr, length), length));
        for (int i = 0; i < 55; ++i) {
            arr[i] = -1;
        }
        length = 1;
    }
    return 0;
}
