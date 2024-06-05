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
/*
struct Strom
{
    int pocet;
    struct Vrchol *koren;
};

struct Vrchol
{
    int hodnota;
    struct Vrchol *lavy, *pravy;
};

struct Strom *strom_vytvor()
{

    struct Strom *s=(struct Strom *) malloc(sizeof(struct Strom));
    s->pocet=0;
    s->koren=NULL;
    return s;
}

int main(void)
{
    struct Strom *s=strom_vytvor();
    int i;
    for (i=0;i<50;i++)
        strom_pridaj(s, rand()%1000)

        strom_vypis(s);
    return 0;
}
*/

///3-1 uloha

typedef struct point{
    int value;
    struct point* left;
    struct point* right;
}POINT;

POINT *root = NULL;

void create(POINT** paAct, int paVal)
{
    if (root == NULL) {
        root = malloc(sizeof(POINT));
        root->value = paVal;
        root->left = NULL;
        root->right = NULL;
        return;
    }
    else
    {
        *paAct = malloc(sizeof(POINT));
        (*paAct)->value = paVal;
        (*paAct)->left = NULL;
        (*paAct)->right = NULL;
    }
}

void insert(int paValue)
{
    POINT *act = root;
    int depth = 0;
    if (root == NULL)
    {
        create(root, paValue);
        printf("%d\n", depth);
        return;
    }
    while (1) {
        if (act->value == paValue) {
            printf("%d\n", depth);
            return;
        }
        if ((act->value < paValue) && (act->right != NULL))
        {
            act = act->right;
            depth++;
        }
        if ((act->value < paValue) && (act->right == NULL)) {
            create(&act->right, paValue);
            printf("%d\n", ++depth);
            return;
        }
        if ((act->value > paValue) && (act->left != NULL))
        {
            act = act->left;
            depth++;
        }
        if ((act->value > paValue) && (act->left == NULL)) {
            create(&act->left, paValue);
            printf("%d\n", ++depth);
            return;
        }
    }
}

int main() {
    int num;
    while(scanf("%d", &num) == 1)
        insert(num);
    return 0;
}


 /// 3-2 uloha
/*
 #include <stdio.h>

long long pocetStromov(long long n)
{
    long long res = 1;
    for (int i = 2, j = 1; i<=n+1; i++, j += 2)
    {
        res *= (j*2);
        res /= i;
    }
    return res;
}

int main() {
    long long num = 0;
    while (scanf("%d", &num) == 1)
        printf("%lld\n", pocetStromov(num));
    return 0;
}
 */