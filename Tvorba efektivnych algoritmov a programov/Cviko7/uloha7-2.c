// uloha7-2.c

#include <stdio.h>
#include <math.h>


long long dynamo[10][1000];


void rec(int depth, int length, int mod) {

    // End
    if (depth > (length - 1) / 2) {

        return;
    }

    int start = 0;

    if (depth == (length - 1) / 2) {

        start = 1;
    }

    // Initial
    if (depth == 0) {

        // Odd length
        if (length & 1) {

            for (int i = start; i < 10; i++) {

                int remainder = (i * (long long) pow(10, length / 2)) % mod;
                dynamo[depth][remainder] += 1;
            }
        }
        // Even length
        else {

            for (int i = start; i < 10; i++) {

                int remainder = (i * (long long) pow(10, length / 2) + i * (long long) pow(10, length / 2 - 1)) % mod;
                dynamo[depth][remainder] += 1;
            }
        }
    }
    // Step
    else {

        for (int i = start; i < 10; i++) {

            int l_remainder = (i * (long long) pow(10, length / 2 + depth)) % mod;
            int r_remainder = (i * (long long) pow(10, (length - 1) / 2 - depth)) % mod;
            int remainder = (l_remainder + r_remainder) % mod;

            for (int j = 0; j < mod; j++) {

                int new_remainder = (remainder + j) % mod;
                dynamo[depth][new_remainder] += dynamo[depth - 1][j];
            }            
        }
    }

    rec(depth + 1, length, mod);
}


void out(int x, int y) {

    for (int i = 0; i < x; i++) {

        for (int j = 0; j < y; j++) {

            printf("%lld ", dynamo[i][j]);
        }

        printf("\n");
    }
}


int main() {

    int n;

    scanf("%d", &n);

    for (int i = 0; i < n; i++) {

        int M, N;
        scanf("%d %d", &M, &N);

        for (int i = 0; i < 10; i++) {
            for (int j = 0; j <= M; j++) {

                dynamo[i][j] = 0;
            }
        }

        rec(0, N, M);

        printf("%lld\n", dynamo[(N - 1) / 2][0]);
    }


    return 0;
}
