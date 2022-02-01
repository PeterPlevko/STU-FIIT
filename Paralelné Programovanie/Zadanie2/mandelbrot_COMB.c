#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include <process.h>
#include <time.h>
#include <mpi.h>
#include <omp.h>


#define XSIZE 6000
#define YSIZE 4000

// global array to save result
int arr[YSIZE][XSIZE][3] = {{0}};


// https://stackoverflow.com/a/6930407/13000953
typedef struct {
    double r;       // a fraction between 0 and 1
    double g;       // a fraction between 0 and 1
    double b;       // a fraction between 0 and 1
} rgb;

typedef struct {
    double h;       // angle in degrees
    double s;       // a fraction between 0 and 1
    double v;       // a fraction between 0 and 1
} hsv;


rgb hsv2rgb(hsv in)
{
    double      hh, p, q, t, ff;
    long        i;
    rgb         out;

    if(in.s <= 0.0) {       // < is bogus, just shuts up warnings
        out.r = in.v;
        out.g = in.v;
        out.b = in.v;
        return out;
    }
    hh = in.h;
    if(hh >= 360.0) hh = 0.0;
    hh /= 60.0;
    i = (long)hh;
    ff = hh - i;
    p = in.v * (1.0 - in.s);
    q = in.v * (1.0 - (in.s * ff));
    t = in.v * (1.0 - (in.s * (1.0 - ff)));

    switch(i) {
    case 0:
        out.r = in.v;
        out.g = t;
        out.b = p;
        break;
    case 1:
        out.r = q;
        out.g = in.v;
        out.b = p;
        break;
    case 2:
        out.r = p;
        out.g = in.v;
        out.b = t;
        break;

    case 3:
        out.r = p;
        out.g = q;
        out.b = in.v;
        break;
    case 4:
        out.r = t;
        out.g = p;
        out.b = in.v;
        break;
    case 5:
    default:
        out.r = in.v;
        out.g = p;
        out.b = q;
        break;
    }
    return out;     
}


void saveFile() {

    FILE *fp;
    char *filename = "out.ppm";
    char *comment = "# ";

    const int MaxColorComponentValue = 255;
    static unsigned char color[3];

    fp = fopen(filename, "wb");
    fprintf(fp, "P6\n %s\n %d\n %d\n %d\n", comment, XSIZE, YSIZE, MaxColorComponentValue);

    for (int iY = 0; iY < YSIZE; iY++) {
        for (int iX = 0; iX < XSIZE; iX++) {
            color[0] = arr[iY][iX][0];
            color[1] = arr[iY][iX][1];
            color[2] = arr[iY][iX][2];

            fwrite(color, 1, 3, fp);
        }
    }

    fclose(fp);
}


// https://rosettacode.org/wiki/Mandelbrot_set#C
int main(int argc, char *argv[]) {

    const double CxMin = -2;
    const double CxMax = 1;
    const double CyMin = -1;
    const double CyMax = 1;

    double PixelWidth = (CxMax - CxMin) / XSIZE;
    double PixelHeight = (CyMax - CyMin) / YSIZE;

    const int IterationMax = 255;

    const double EscapeRadius = 2;
    double ER2 = EscapeRadius * EscapeRadius;

    clock_t start = clock();

    // MPI
    MPI_Init(&argc, &argv);

    int nthreads, myrank;
    MPI_Comm_size(MPI_COMM_WORLD, &nthreads);
    MPI_Comm_rank(MPI_COMM_WORLD, &myrank);

    int batchsize = YSIZE / nthreads;
    int offset = YSIZE % batchsize;

    // int private_arr[YSIZE][XSIZE][3] = {{0}};
    int (*private_arr)[XSIZE][3] = malloc(batchsize * XSIZE * 3 * sizeof(int*));

    int mystart = myrank * batchsize + offset;
    int myend = (myrank + 1) * batchsize + offset;

    for (int iY = mystart; iY < myend; iY++) {
        double Cy = CyMin + iY * PixelHeight;

        if (fabs(Cy) < PixelHeight / 2) {
            Cy = 0.0;
        }
        
        #pragma omp parallel for num_threads(2)
        // #pragma omp parallel for num_threads(2)
        // #pragma omp parallel for num_threads(6)
        // #pragma omp parallel for num_threads(12)
        // #pragma omp parallel for
        for (int iX = 0; iX < XSIZE; iX++) {
            double Cx = CxMin + iX * PixelWidth;
            double Zx = 0.0;
            double Zy = 0.0;
            double Zx2 = Zx * Zx;
            double Zy2 = Zy * Zy;

            int Iteration;

            for (Iteration = 0; Iteration < IterationMax && ((Zx2 + Zy2) < ER2); Iteration++) {
                Zy = 2 * Zx * Zy + Cy;
                Zx = Zx2 - Zy2 + Cx;
                Zx2 = Zx * Zx;
                Zy2 = Zy * Zy;
            };

            hsv hsv_in = {.h = (double) Iteration / 255 * 360, .s = 1, .v = Iteration == IterationMax ? 0 : 1};
            rgb rgb_color = hsv2rgb(hsv_in);

            private_arr[iY - mystart][iX][0] = (int) (rgb_color.r * 255);
            private_arr[iY - mystart][iX][1] = (int) (rgb_color.g * 255);
            private_arr[iY - mystart][iX][2] = (int) (rgb_color.b * 255);
        }
    }

    MPI_Gather(private_arr, batchsize * XSIZE * 3, MPI_INT, arr + offset, batchsize * XSIZE * 3, MPI_INT, 0, MPI_COMM_WORLD);

    if (myrank == 0) {

        // Finish extra
        for (int iY = 0; iY < mystart; iY++) {
            double Cy = CyMin + iY * PixelHeight;

            if (fabs(Cy) < PixelHeight / 2) {
                Cy = 0.0;
            }
            
            for (int iX = 0; iX < XSIZE; iX++) {
                double Cx = CxMin + iX * PixelWidth;
                double Zx = 0.0;
                double Zy = 0.0;
                double Zx2 = Zx * Zx;
                double Zy2 = Zy * Zy;

                int Iteration;

                for (Iteration = 0; Iteration < IterationMax && ((Zx2 + Zy2) < ER2); Iteration++) {
                    Zy = 2 * Zx * Zy + Cy;
                    Zx = Zx2 - Zy2 + Cx;
                    Zx2 = Zx * Zx;
                    Zy2 = Zy * Zy;
                };

                hsv hsv_in = {.h = (double) Iteration / 255 * 360, .s = 1, .v = Iteration == IterationMax ? 0 : 1};
                rgb rgb_color = hsv2rgb(hsv_in);

                arr[iY][iX][0] = (int) (rgb_color.r * 255);
                arr[iY][iX][1] = (int) (rgb_color.g * 255);
                arr[iY][iX][2] = (int) (rgb_color.b * 255);
            }
        }
        
        clock_t total = clock() - start;
        printf("Total time %d.%ds", total / 1000, total % 1000);

        saveFile();
    }

    MPI_Finalize();

    return 0;
}
