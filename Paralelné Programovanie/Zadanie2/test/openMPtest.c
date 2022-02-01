#include <stdio.h>
#include <omp.h>


int main() {

    #pragma omp parallel for
    for (int i = 0; i < 100; i++) {
        printf("Hello from thread: %d.\n", omp_get_thread_num());
    }

    return 0;
}
