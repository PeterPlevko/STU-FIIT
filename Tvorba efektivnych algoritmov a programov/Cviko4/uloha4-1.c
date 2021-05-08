// uloha4-1.c

#include <stdio.h>


typedef enum { true = 1, false = 0 } boolean;


typedef struct hills {
    long goods;
    long bads;
} hills;


void copy(hills* previous, hills* current) {

    for (int i = 0; i < 202; i++) {

        previous[i].bads = current[i].bads;
        previous[i].goods = current[i].goods;
    }
}


int main() {

    int n;
    scanf("%d", &n);

    for (int i = 0; i < n; i++) {

        int height, width;
        hills previous[202], current[202];

        scanf("%d %d", &width, &height);

        for (int i = 0; i < 202; i++) {

            previous[i].bads = 0;
            previous[i].goods = 0;
            current[i].bads = 0;
            current[i].goods = 0;
        }

        if (height == 1) {
            previous[1].goods = 1;
        }
        else {
            previous[1].bads = 1;
        }


        // Go through them one by one
        for (int i = 0; i < width - 2; i++) {

            for (int j = 1; true; j++) {

                if (j == height) {

                    current[j].goods = previous[j].goods;
                    current[j].goods += previous[j - 1].goods;
                    current[j].goods += previous[j - 1].bads;
                    break;
                }

                long temp = previous[j].goods + previous[j - 1].goods + previous[j + 1].goods;
                current[j].goods = temp % 100000007;
                temp = previous[j].bads + previous[j - 1].bads + previous[j + 1].bads;
                current[j].bads = temp % 100000007;
            }

            copy(previous, current);
        }

        printf("%ld\n", current[1].goods);
    }

    return 0;
}