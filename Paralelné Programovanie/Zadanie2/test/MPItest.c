#include <stdio.h>
#include <stdlib.h>
#include <mpi.h>


int arr[100][10][3] = {{0}};


int main(int argc, char *argv[]) {

    MPI_Init(&argc, &argv);

    int nthreads, myrank;
    MPI_Comm_size(MPI_COMM_WORLD, &nthreads);
    MPI_Comm_rank(MPI_COMM_WORLD, &myrank);

    int batchsize = 100 / nthreads;
    int offset = 100 % batchsize;

    int custom_arr[100][10][3] = {{0}};
    // int *custom_arr[] = (int***) malloc(batchsize * sizeof(int**));
    // for (int i = 0; i < batchsize; i++) {
    //     custom_arr[i] = (int**) malloc(XSIZE * sizeof(int*));
    //     for (int j = 0; j < 3; j++) {
    //         custom_arr[i][j] = (int*) malloc(3 * sizeof(int));
    //     }
    // }

    int mystart = myrank * batchsize + offset;
    int myend = (myrank + 1) * batchsize + offset;

    for (int i = mystart; i < myend; i++) {
        for (int j = 0; j < 10; j++) {
            custom_arr[i - mystart][j][0] = myrank;
            custom_arr[i - mystart][j][1] = myrank;
            custom_arr[i - mystart][j][2] = myrank;
        }
    }
    
    // MPI_Barrier(MPI_COMM_WORLD);
    MPI_Gather(custom_arr, batchsize * 10 * 3, MPI_INT, arr + offset, batchsize * 10 * 3, MPI_INT, 0, MPI_COMM_WORLD);

    if (myrank == 0) {
        for (int i = 0; i < mystart; i++) {
            for (int j = 0; j < 10; j++) {
                custom_arr[i - mystart][j][0] = myrank;
                custom_arr[i - mystart][j][1] = myrank;
                custom_arr[i - mystart][j][2] = myrank;
            }
        }

        for (int i = 0; i < 100; i++) {
            for (int j = 0; j < 10; j++) {
                printf("%d ", arr[i][j][0] + arr[i][j][1] + arr[i][j][2]);
            }
            printf("\n");
        }
    }

    MPI_Finalize();
    
    return 0;
}
