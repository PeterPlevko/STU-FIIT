// uloha7-1.c

#include <stdio.h>


int big_arr[10][1024][10];
char arr[10][10];
int n, m, k;


int rec(int x, int y, int z) {

    if (z == k) {
        return 1;
    }

    if (x == n) {
        return 0;
    }

    if (big_arr[x][y][z] != -1) {
        return big_arr[x][y][z];
    }

    int total = rec(x + 1, y, z);

    for (int w = 0; w < m; w++) {
        if (arr[x][w] == 'Y' && ((y >> w) & 1) == 0) {
            total += rec(x + 1, y | (1 << w), z + 1);
        }
    }

    big_arr[x][y][z] = total;

    return total;
}


int main() {

    while (scanf("%d", &k) > 0) {

        scanf("%d %d", &n, &m);
        char c;

        for (int i = 0; i < n; i++) {
            scanf("%c", &c);
            for (int j = 0; j < m; j++) {
                scanf("%c", &(arr[i][j]));
            }
        }

        for (int i = 0; i < 10; i++){
            for (int ii = 0; ii < 1024; ii++) {
                for (int iii = 0; iii < 10; iii++) {
                    big_arr[i][ii][iii] = -1;
                }
            }
        }

        int out = rec(0, 0, 0);
        printf("%d\n", out);
    }

    return 0;
}
