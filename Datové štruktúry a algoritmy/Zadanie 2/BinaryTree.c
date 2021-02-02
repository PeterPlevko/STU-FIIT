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
typedef struct point{
    int value;
    struct point* left;
    struct point* right;
}POINT;
//funkcia na free stromu
void deallocate (POINT *node)
{
    if (node==NULL) return;
    deallocate(node->left);
    deallocate(node->right);
    free(node);
    node = NULL;
}
//vytvorenie stromu
POINT *create (int paCislo)
{
    POINT *node = malloc(sizeof(POINT));
    node->value = paCislo;
    node->left = NULL;
    node->right = NULL;
    return(node);
}
//vloz prvok
POINT *insertBinary(POINT *node, int paValue)
{
    POINT *act = node;
    int depth = 0;

    if (node == NULL) {
        return (create(paValue));
    }

    while (1) {
        if (act->value == paValue) {
            return node;
        }
        if ((act->value < paValue) && (act->right != NULL))
        {
            act = act->right;
        }
        if ((act->value < paValue) && (act->right == NULL)) {

            act->right= create(paValue);
            return node;
        }
        if ((act->value > paValue) && (act->left != NULL))
        {
            act = act->left;

        }
        if ((act->value > paValue) && (act->left == NULL)) {

            act->left= create(paValue);
            return node;
        }
    }
}
//hladaj v strome
POINT *searchBinary (POINT *node, int paCislo)
{
    POINT *act_root = node;
    POINT *vrat;

    if(node==NULL) return NULL;
    if(paCislo<node->value) return searchBinary(node->left, paCislo);
    else if(paCislo>node->value)return searchBinary(node->right, paCislo);
    else return node;


}
