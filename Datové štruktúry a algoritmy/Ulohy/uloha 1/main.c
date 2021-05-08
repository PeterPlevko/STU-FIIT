#ifdef _MSC_VER
#define _CRT_SECURE_NO_WARNINGS
#endif
#include<assert.h>
#include<ctype.h>
#include<locale.h>
#include<math.h>
#include<setjmp.h>
#include<signal.h>
#include<stdarg.h>
#include<stdio.h>
#include<stdlib.h>
#include<string.h>
#include<time.h>
int main()
{
    int kamil = 0, flag = 0, predchadzajuce, aktualne = 0, min = 0, i, j, pocet_dni, pocet_scenarov;
    predchadzajuce = 0;
    scanf("%d", &pocet_scenarov);
    for (i = 0; i < pocet_scenarov; i++)
    {
        scanf("%d", &pocet_dni);
        if (pocet_dni == 0)
        {

        }
        else {

            if (pocet_dni == 1) { scanf("%d", &kamil); }
            else
                scanf("%d", &predchadzajuce);
        }
        flag = 0;
        min = 0;
        int zisk = 0;
        for (j = 0; j < pocet_dni - 1; j++)
        {
            scanf("%d", &aktualne);
            if (predchadzajuce < aktualne && flag == 0)// nakup
            {
                min = predchadzajuce;
                flag = 1;
            }
            if (predchadzajuce > aktualne&& flag == 1)//predaj
            {
                zisk = zisk + (predchadzajuce - min);
                flag = 0;
            }

            if (pocet_dni != 1) predchadzajuce = aktualne;
        }
        if (flag == 1)  zisk = zisk + (predchadzajuce - min);
        printf("%d\n", zisk);
    }
}
/*
int main()
{
    int number, i, j;

    number = 1299709;

    int* primes1;
    primes1 = (int*)calloc(100000, sizeof(int));

    int *primes;
    primes = (int*)calloc(2000000 , sizeof(int));

    //populating array with naturals numbers
    for (i = 2; i <= 2000000; i++)
        primes[i] = i;

    i = 2;
    while ((i * i) <= number)
    {
        if (primes[i] != 0)
        {
            for (j = 2; j < number; j++)
            {
                if (primes[i] * j > number)
                    break;
                else
                    // Instead of deleteing , making elemnets 0
                    primes[primes[i] * j] = 0;
            }
        }
        i++;
    }
    j = 0;

    for (i = 2; i <= number; i++)
    {
        //If number is not 0 then it is prime
        if (primes[i] != 0) {

            primes1[j] = primes[i];
            j++;
        }

    }
   //0=prve prvocislo;
    //1 druhe prvocislo;
    int pozicia_cisla;
    while (scanf("%d", &pozicia_cisla) > 0) {

        printf("%d\n", primes1[pozicia_cisla-1]);
    }
    return 0;
}
 */

/*
 long fib(unsigned long n) {
    if (n <= 2) {
        return n;
    }
    else {
        return fib(n - 1) + fib(n - 2);
    }
}
void writeTiles(int* paArr, int paSize, int paShift)
{
    for (int i = 0; i < paSize; i++)
    {
        if (paArr[i] == 1) {
            printf("=");
            i++;
        }
        else printf("|");
    }
    printf("\n");
}
void printTiles(int* arr, int size, int shift, int* iter, int fib)
{
    int pom = 0;
    for (int i = shift; i < size - 1; i++)
    {
        arr[i] = 1;
        arr[i + 1] = 1;
        if (i + 1 != size - 2 && i + 1 != size - 1)
        {
            printTiles(arr, size, i + 2, iter, fib);
        }
        writeTiles(arr, size, shift);
        (*iter)++;
        arr[i] = 0;
        arr[i + 1] = 0;
        pom++;
    }
    if (*iter == fib - 1)  writeTiles(arr, size, shift);
}

int main()
{
    int cislo;
    int* iter = (int*)calloc(1, sizeof(int));
    int pole[100] = {};
    scanf("%d", &cislo);
    printf("%d\n", fib(cislo));
    printTiles(pole, cislo, 0, iter, fib(cislo));
}
 */