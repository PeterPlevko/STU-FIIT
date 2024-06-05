// uloha2-1.c

#include <stdio.h>
#include <stdlib.h>


typedef enum { true = 1, false = 0 } boolean;


int main() {

    // Loading
    int n;

    while (scanf("%d", &n) > 0) {

        int *moves = (int*) malloc(sizeof(int) * n);

        for (int i = 0; i < n; i++) {

            scanf("%d", moves + i);

        }

        int A, B;
        scanf("%d %d", &A, &B);

        // Some magic
        boolean *winning = (boolean*) malloc(sizeof(boolean) * (B + 1));

        winning[0] = false;

        // Populate array
        for (int i = 1; i <= B; i++) {
            
            // First possible
            winning[i] = !winning[i-1];

            // Already has winning option
            if (winning[i]) {

                continue;

            }
            
            else {

                // Rest of the options
                for (int j = 1; j < n; j++) {

                    // Can move
                    if (moves[j] <= i) {

                        winning[i] = !winning[i - moves[j]];

                        // Found the winning situation
                        if (winning[i]) {
                            break;
                        }

                    }

                }

            }

        }

        int out = 0;

        // Calculate all winnings in interval
        for (int i = A; i <= B; i++) {

            if (winning[i]) {

                out++;

            }

        }

        printf("%d\n", out);

        free(winning);
        free(moves);

    }
    
}
