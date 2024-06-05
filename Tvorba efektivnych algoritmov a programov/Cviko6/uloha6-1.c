// uloha6-1.c
#include <stdio.h>


void combinations(int max_n, int current_n, int k, int out) {

    if (current_n == max_n) {

        int reverse = 0;

        while (out > 0) {

            reverse *= 10;
            reverse += out % 10;
            out /= 10;
        }

        while (reverse > 0) {

            printf("%d ", reverse % 10);
            reverse /= 10;
        }

        printf("\n");
        return;
    }

    for (int i = 0; i < k; i++) {

        combinations(max_n, current_n + 1, k, out * 10 + i + 1);
    }
}


int main() {

    int n, k;

    scanf("%d %d", &n, &k);

    combinations(n, 0, k, 0);

    return 0;
}
