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
#include <stdio.h>
#include <stdlib.h>

//moj struct
typedef struct vrchol
{
    int hodnota;
    struct vrchol *lavy;
    struct vrchol *pravy;
    int vyska;
}VRCHOL;
//funkcia na free stromu
void zmazStrom (VRCHOL *node)
{
    if (node==NULL) return;
    zmazStrom(node->lavy);
    zmazStrom(node->pravy);
    free(node);
    node=NULL;
}
//funkcia na vypis stromu
void vypisSTROM (VRCHOL *paRoot, int space)
{
    if (paRoot == NULL)
    {
        return;
    }

    space = space + 10;

    vypisSTROM(paRoot->pravy, space);

    printf("\n");

    for (int i = 10; i < space; i++)
    {
        printf(" ");
    }

    printf("%d", paRoot->vyska);

    vypisSTROM(paRoot->lavy, space);
}
//funkcia ktora nastavy vysku stromu
int nastavVYSKU (VRCHOL *hlavicka)
{
    int vyska_laveho, vyska_praveho;

    if (hlavicka->lavy != NULL)
    {
        vyska_laveho = hlavicka->lavy->vyska;
    }

    if (hlavicka->lavy==NULL)
    {
        vyska_laveho = 0;
    }

    if (hlavicka->pravy != NULL)
    {
        vyska_praveho = hlavicka->pravy->vyska;
    }

    if (hlavicka->pravy == NULL)
    {
        vyska_praveho = 0;
    }

    if (vyska_laveho > vyska_praveho)
    {
        return vyska_laveho;
    }

    if (vyska_praveho > vyska_laveho)
    {
        return vyska_praveho;
    }

    if(vyska_laveho == vyska_praveho)
    {
        return vyska_laveho;
    }

}
//funkcia na zistenie balancu
int zistiBalanc (VRCHOL *node)
{
    if (node==NULL) return 0;

    int vyska_laveho, vyska_praveho;

    if (node->lavy != NULL)
    {
        vyska_laveho = node->lavy->vyska;
    }

    if (node->lavy == NULL)
    {
        vyska_laveho = 0;
    }

    if (node->pravy != NULL)
    {
        vyska_praveho = node->pravy->vyska;
    }

    if (node->pravy==NULL) vyska_praveho = 0;

    return vyska_laveho - vyska_praveho;

}
//rightrotation
VRCHOL *rightotation (VRCHOL *staryRoot)
{
    VRCHOL *novyRoot = staryRoot->lavy;
    VRCHOL *ukonciZretazenie = novyRoot->pravy;

    novyRoot->pravy = staryRoot;
    staryRoot->lavy = ukonciZretazenie;

    staryRoot->vyska = nastavVYSKU(staryRoot) + 1;
    novyRoot->vyska = nastavVYSKU(novyRoot) + 1;

    return novyRoot;
}
//leftrotation
VRCHOL *leftRotation (VRCHOL *staryRoot)
{
    VRCHOL *novyRoot = staryRoot->pravy;
    VRCHOL *ukonciZretazenie = novyRoot->lavy;

    novyRoot->lavy = staryRoot;
    staryRoot->pravy = ukonciZretazenie;

    staryRoot->vyska = nastavVYSKU(staryRoot) + 1;
    novyRoot->vyska = nastavVYSKU(novyRoot) + 1;

    return novyRoot;
}
//funkcia na vytvorenie noveho uzla
VRCHOL *vytvor (int paCislo)
{
    VRCHOL *node = malloc(sizeof(VRCHOL));
    node->hodnota = paCislo;
    node->lavy = NULL;
    node->pravy = NULL;
    node->vyska = 1;
    return(node);
}
//funkcia na vlozenie do avl stromu
VRCHOL *vlozAvl (VRCHOL *node , int paCislo)
{
    int jeVybalancovany;

    if (node == NULL)
    {
        return (vytvor(paCislo));
    }

    if (paCislo < node->hodnota)
    {
        node->lavy = vlozAvl(node->lavy, paCislo);
    }
    else if (paCislo > node->hodnota)
    {
        node->pravy = vlozAvl(node->pravy, paCislo);
    }
    else
        {
        return node;
        }

    node->vyska = 1 + nastavVYSKU(node);
    jeVybalancovany = zistiBalanc(node);

    if (jeVybalancovany > 1)
    {
        if (paCislo < node->lavy->hodnota)
        {                             ///    30
            return rightotation(node);///  20
        }                            ///10
        else if (paCislo > node->lavy->hodnota)
        {                                         ///  20
            node->lavy = leftRotation(node->lavy);///10
            return rightotation(node);           ///  30
        }
    }

    if (jeVybalancovany < -1)
    {
        if (paCislo > node->pravy->hodnota)
        {                             ///10
            return leftRotation(node);///  20
        }                            ///    30
        else if (paCislo < node->pravy->hodnota)
        {                                           ///20
            node->pravy = rightotation(node->pravy);///  30
            return leftRotation(node);              ///10
        }
    }
    return node;
}
//funkcia na hladanie avl stromu
VRCHOL *hladajAvl (VRCHOL *node , int paCislo)
{
    if (node==NULL) return NULL;
    if (paCislo<node->hodnota) return hladajAvl(node->lavy,paCislo);
    else if (paCislo>node->hodnota) return hladajAvl(node->pravy,paCislo);
    else return node;
}