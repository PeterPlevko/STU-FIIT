// uloha5-1.c

#include <stdio.h>
#include <stdlib.h>
#include <math.h>


int* checknth(int* arr, int n, int k, int* n_final) {

    int* out = (int*) malloc(sizeof(int) * n);

    for (int i = 0; i < n - 1; i++) {

        if (abs(arr[i] - arr[n - 1]) >= k) {

            out[(*n_final)++] = i + 1;
        }
    }

    return out;
}


int main() {

    int n, k;

    while (scanf("%d %d", &n, &k) > 0) {

        int* arr = (int*) malloc(sizeof(int) * n);

        // Load all
        for (int i = 0; i < n; i++) {

            scanf("%d", &(arr[i]));
        }

        // Too little
        if (n < 3) {
            printf("%d\n", n);
            continue;
        }

        int success = 0;

        for (int i = 2; i <= n; i++) {

            int n_out = 0;
            int* out = checknth(arr, i, k, &n_out);

            if (n_out != 0) {

                int best = 100;

                for (int j = 0; j < n_out; j++) {

                    int temp = floor(out[j] / 2) + 1 + ceil((float) (i - out[j]) / 2);

                    if (temp < best) {

                        best = temp;
                    }
                }

                printf("%d\n", best);
                success = 1;
                break;
            }
        }

        if (success != 1) {

            printf("%d\n", n);
        }
    }


    return 0;
}