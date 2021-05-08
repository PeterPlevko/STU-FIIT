// uloha1-2.c
#include <stdio.h>
#include <stdlib.h>


int compare(const void* a, const void* b) {

    return *(int*)b - *(int*)a;

}


int all_ones(int* arr, int size) {

    for (int i = 0; i < size; i++) {

        if (arr[i] != 1) {

            return 0;

        }

    }

    return 1;

}


int main() {

    int n;

    while (scanf("%d", &n) > 0) {

        int* arr = (int*) malloc(sizeof(int) * n);
        int* arc = (int*) malloc(sizeof(int) * n);

        for (int i = 0; i < n; i++) {

            scanf("%d", &(arr[i]));
            arc[i] = 0;

        }

        qsort(arr, n, sizeof(int), compare);

        int out = 0;

        while (!all_ones(arc, n)) {

            int sum = 0;

            for (int i = 0; i < n; i++) {

                // Not yet accounted for
                if (arc[i] == 0) {
                    
                    // Take box
                    if (sum + arr[i] <= 300) {

                        sum += arr[i];
                        arc[i] = 1;

                    }

                }
            }

            out += 1;

        }

        printf("%d\n", out);

    }
  
    return 0;

}