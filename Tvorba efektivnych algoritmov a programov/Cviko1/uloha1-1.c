// uloha1-1.c

#include <stdio.h>
#include <stdlib.h>


int compare(const void* a, const void* b) {

    return *(int*)b - *(int*)a;

}


int main() {

    int n, k, m;

    while (scanf("%d %d %d", &n, &k, &m) > 0) {

        int* arr = (int*) malloc(sizeof(int) * m);

        for (int i = 0; i < m; i++) {

            scanf("%d", &(arr[i]));

        }

        qsort(arr, m, sizeof(int), compare);

        int sum = 0;

        for (int i = 0; i < k; i++) {

            sum += arr[i];

        }

        if (sum <= n) {

            printf("Ano\n");

        }
        else {

            printf("Nie\n");
            
        }

    }


    return 0;

}
