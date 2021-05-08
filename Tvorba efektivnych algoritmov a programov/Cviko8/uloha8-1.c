// uloha8-1.c

#include <stdio.h>
#include <stdlib.h>


// https://stackoverflow.com/questions/3893937/sorting-an-array-in-c#answer-3893967:~:text=52-,In%20C%2C%20you%20can%20use%20the%20built%20in%20qsort%20command%3A,-int
int compare( const void* a, const void* b)
{
     int int_a = * ( (int*) a );
     int int_b = * ( (int*) b );

     if ( int_a == int_b ) return 0;
     else if ( int_a < int_b ) return 1;
     else return -1;
}


int main() {

    int n, m;

    while (scanf("%d %d", &n, &m) > 0) {

        int* n_arr = (int*) malloc(n * sizeof(int));
        int* m_arr = (int*) malloc(m * sizeof(int));

        for (int i = 0; i < n; i++) {

            scanf("%d", n_arr + i);
        }

        for (int i = 0; i < m; i++) {

            scanf("%d", m_arr + i);
        }

        qsort(n_arr, n, sizeof(int), compare);
        qsort(m_arr, m, sizeof(int), compare);

        if (n_arr[0] > m) {
            printf("0\n");
            continue;
        }

        int breaker = 0;

        // Solve
        for (int i = 0; i < n; i++) {

            for (int j = 0; j < n_arr[i]; j++) {

                if (m_arr[j] == 0) {

                    printf("0\n");
                    breaker = 1;
                    break;
                }

                m_arr[j]--;
            }

            if (breaker) {

                break;
            }

            qsort(m_arr, m, sizeof(int), compare);
        }

        if (!breaker) {

            printf("1\n");
        }
    }
    
    return 0;
}