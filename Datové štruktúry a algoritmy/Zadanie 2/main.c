#include <stdio.h>
#include "AVLTree.c"
#include "BinaryTree.c"
#include "RBTree.c"
#include "ChainHash.c"
#include "LinearHash.c"
#define INITTIME  clock_t start_t, end_t, total_t
#define START start_t = clock()
#define STOP   end_t = clock()

void vlozDoAVL(int *pole)
{
    VRCHOL *vrat = NULL, *root=NULL;
    INITTIME;

    START;
    for (int i = 0; i < 1000000; i++)
    {
        root = vlozAvl(root, pole[i]);
    }
    STOP;

    printf("Cas insertu je: %10f\n", (double)(-start_t + end_t)/ CLOCKS_PER_SEC);

    START;
    for (int i = 0; i < 1000000; i++)
    {
        vrat = hladajAvl(root,pole[i]);
    }
    STOP;

    printf("Cas prehladania je: %10f\n", (double)(-start_t + end_t)/ CLOCKS_PER_SEC);
    printf("\n");
    zmazStrom(root);
}
void vlozDoBinarneho(int *pole)
{
    POINT *vrat = NULL, *root=NULL;
    INITTIME;

    START;
    for (int i = 0; i < 30000; i++)
    {
        root = insertBinary(root, pole[i]);
    }
    STOP;

    printf("Cas insertu je: %10f\n", (double)(-start_t + end_t)/ CLOCKS_PER_SEC);


    START;
    for (int i = 0; i < 30000; i++)
    {
        vrat = searchBinary(root, pole[i]);
    }
    STOP;

    printf("Cas prehladania je: %10f\n", (double)(-start_t + end_t)/ CLOCKS_PER_SEC);
    printf("\n");
    deallocate(root);
}
void vlozDoRB(int *pole)
{
    struct rbNode *vrat = NULL, *root = NULL;
    INITTIME;

    START;
    for (int i = 0; i < 1000000; i++)
    {
        root = insertionRB(root, pole[i]);
    }
    STOP;

    printf("Cas insertu je: %10f\n", (double)(-start_t + end_t)/ CLOCKS_PER_SEC);

    START;
    for (int i = 0; i < 1000000; i++)
    {
        vrat = searchRB(root,pole[i]);
    }
    STOP;

    printf("Cas prehladania je: %10f\n", (double)(-start_t + end_t)/ CLOCKS_PER_SEC);
    printf("\n");
    free(root);
}
void vlozChainHash(int *pole)
{
    TABLEINFO *info = (TABLEINFO*) malloc(sizeof(TABLEINFO));
    info->size=13;
    info->numberOfElements = 0;
    INITTIME;
    double zistiResize;
    BOD ** hashTable, *vrat;

    hashTable = malloc(sizeof(BOD*) * info->size);

    for (int i = 0; i < info->size; i++)
    {
        hashTable[i] = NULL;
    }

    info->table = hashTable;

    START;
    for (int i = 0; i < 1000000; i++)
    {
        insertHashChain(info,pole[i]);
        zistiResize = (double) info->numberOfElements / info->size;
        if (zistiResize >= 1.5)
        {
            hashTable = resizeChainHash(info);
        }
    }
    STOP;

    printf("Cas insertu je: %10f\n", (double)(-start_t + end_t)/ CLOCKS_PER_SEC);

    START;
    for(int i = 0; i < 1000000; i++)
    {
        vrat = searchChainHash(info, pole[i]);
    }
    STOP;

    printf("Cas searchu je: %10f\n", (double)(-start_t + end_t)/ CLOCKS_PER_SEC);
    printf("\n");
    freeTable(&info);
}
void vlozLinearHash(int *pole)
{
    INITTIME;
    struct  DataItem *vrat;

    hashArray = (struct DataItem**) malloc(SIZE_Hash *  sizeof(struct DataItem));
    init();

    START;
    for (int i = 0; i < 1000000; i++)
    {
        insertLinearHash(pole[i], 1);
    }
    STOP;

    printf("Cas insertu je: %10f\n", (double)(-start_t + end_t)/ CLOCKS_PER_SEC);

    START;
    for (int i = 0; i < 1000000; i++)
    {
        vrat= searchHashLinear(pole[i]);
    }
    STOP;

    printf("Cas searchu je: %10f\n", (double)(-start_t + end_t)/ CLOCKS_PER_SEC);
    printf("\n");
    sizeHashForeign=17;
}
int* zeroToTenMilion()
{
    int *pole = malloc(10000000 * sizeof(int));
    for (int i = 0; i < 10000000; i++)
    {
        pole[i] = i;
    }
    return pole;
}
int* tenMilionToZero()
{
    int *pole = malloc(10000000 * sizeof(int));
    for (int i = 10000000,j=0; i > 0; i--,j++)
    {
        pole[j] = i;
    }
    return pole;
}
int* BigNSmallN()
{
    int j=0;
    int *pole = malloc(10000000 * sizeof(int));
    for(int i = 0; i < 5000000; i++)
    {
        pole[j]=i;
        j++;
        pole[j]=10000000-i;
        j++;
    }
    return pole;
}
int* nahodneN()
{
    srand(42);
    int *pole = malloc(10000000 * sizeof(int));
    int random;
    for (int i = 0; i < 10000000; i++)
    {
        random=rand()*rand();
        pole[i]=random;
    }
    return pole;
}
int main()
{
    int *poleZeroToTenMilion, *poleTenMilionToZero,*poleBigNSmallN, *poleNahodneN;

    poleZeroToTenMilion = zeroToTenMilion();
    poleTenMilionToZero = tenMilionToZero();
    poleBigNSmallN = BigNSmallN();
    poleNahodneN = nahodneN();


    printf("avl z vyvazovanim\n");
    printf("toto je test zero to ten milion\n");
    vlozDoAVL(poleZeroToTenMilion);
    printf("toto je test 10 milion to zero \n");
    vlozDoAVL(poleTenMilionToZero);
    printf("toto je test small n big n\n");
    vlozDoAVL(poleBigNSmallN);
    printf("toto je random test\n");
    vlozDoAVL(poleNahodneN);



    printf("avl bez vyvazovania\n");
    printf("toto je test zero to 10 milion prvych 30 tisic cisel\n");
    vlozDoBinarneho(poleZeroToTenMilion);
    printf("toto je test 10 milion to zero prvych 30 tisic cisel \n");
    vlozDoBinarneho(poleTenMilionToZero);
    printf("toto je test small n big n prvych 30 tisic cisel\n");
    vlozDoBinarneho(poleBigNSmallN);
    printf("toto je random test prvych 30 tisic cisel\n");
    vlozDoBinarneho(poleNahodneN);



    printf("RB z vyvazovanim\n");
    printf("toto je test zero to ten milion\n");
    vlozDoRB(poleZeroToTenMilion);
    printf("toto je test 10 milion to zero \n");
    vlozDoRB(poleTenMilionToZero);
    printf("toto je test small n big n\n");
    vlozDoRB(poleBigNSmallN);
    printf("toto je random test\n");
    vlozDoRB(poleNahodneN);



    printf("chain hash\n");
    printf("toto je test zero to ten milion\n");
    vlozChainHash(poleZeroToTenMilion);
    printf("toto je test 10 milion to zero \n");
    vlozChainHash(poleTenMilionToZero);
    printf("toto je test small n big n\n");
    vlozChainHash(poleBigNSmallN);
    printf("toto je random test\n");
    vlozChainHash(poleNahodneN);



    printf("linear hash\n");
    printf("toto je test zero to ten milion\n");
    vlozLinearHash(poleZeroToTenMilion);
    printf("toto je test 10 milion to zero \n");
    vlozLinearHash(poleTenMilionToZero);
    printf("toto je test small n big n\n");
    vlozLinearHash(poleBigNSmallN);
    printf("toto je random test\n");
    vlozLinearHash(poleNahodneN);



    return 0;
}
