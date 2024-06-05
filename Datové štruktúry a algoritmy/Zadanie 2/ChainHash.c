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
// moj struct chainu
typedef struct bod
{
    int key;
    struct bod *next;
}BOD;
//moj struct tabulky
typedef struct tableinfo
{
    BOD **table;
    int size;
    int numberOfElements;
}TABLEINFO;
//fukncia na zistenie prvocisla
int isPrime(int n)
{
    if (n <= 1)  return 0;
    if (n <= 3)  return 1;
    if (n%2 == 0 || n%3 == 0) return 0;
    for (int i=5; i*i<=n; i=i+6)
        if (n%i == 0 || n%(i+2) == 0)
            return 0;
    return 1;
}
//funkcia na najdenie najblizsieho prvocisla
int nextPrime(int N)
{
    if (N <= 1) return 2;
    int prime = N;
    int found = 0;
    while (!found)
    {
        prime++;
        if (isPrime(prime)) found = 1;
    }
    return prime;
}
//vloz do tabulky
void insertHashChain(TABLEINFO *info, int key)
{
    int hashfunction = key % info->size;
    BOD **hashTable = info->table;
    info->numberOfElements++;
    BOD *TEMP;
    BOD *posledna = hashTable[hashfunction];

    if (hashTable[hashfunction]==NULL)
    {
        hashTable[hashfunction] = malloc(sizeof(BOD));
        hashTable[hashfunction]->key = key;
        hashTable[hashfunction]->next = NULL;
    }
    else
    {
        TEMP=malloc(sizeof(BOD));
        TEMP->key=key;
        TEMP->next=NULL;
        while (posledna->next != NULL)
        {
            if(posledna->key==key) return;
            posledna = posledna->next;
        }
        if(posledna->key==key) return;
        posledna->next = TEMP;
    }
    info->table=hashTable;
}
//funkcia na resize
BOD** resizeChainHash(TABLEINFO *info)
{
    int starySize = info->size;
    int novy_size = nextPrime(starySize*2);

    BOD **staraTabulka = info->table;
    int hashfunction = 0, key = 0;
    int i, pocet_prvkov = 0;

    BOD **new_hash_table;

    new_hash_table = malloc(sizeof(BOD*)*novy_size);
    info->table=new_hash_table;
    info->size=novy_size;
    info->numberOfElements=0;
    for (int i=0;i<novy_size;i++)
    {
        new_hash_table[i]=NULL;
    }

    for(i=0;i<starySize;i++)
    {
        if (staraTabulka[i]!=NULL)
        {

            if (staraTabulka[i]->next == NULL)
            {
                key = staraTabulka[i]->key;
                hashfunction = key % novy_size;
                insertHashChain(info,key);
            }
            else
            {
                while (staraTabulka[i] != NULL)
                {
                    key=staraTabulka[i]->key;
                    hashfunction = key % novy_size;
                    insertHashChain(info,key);
                    staraTabulka[i]=staraTabulka[i]->next;
                }
            }
        }
        else if (staraTabulka[i]==NULL)
        {
        }
    }
    return new_hash_table;
}
//hladaj v hash tabulke
BOD* searchChainHash(TABLEINFO *info, int key)
{
    BOD **TEMP = info->table;
    int hashfunction = key%info->size;
    BOD *POSUN = TEMP[hashfunction];
      while(1)
      {
          if (POSUN->key == key)
          {
              return POSUN;
          }
          else
              {
                  if (POSUN->next == NULL) break;
                  POSUN = POSUN->next;
             }
      }


}
//uvolni tabulku
void freeTable(TABLEINFO **table)
{
    BOD *temp, *next;
    for (int i = 0; i < (*table)->size; i++)
    {
        temp = (*table)->table[i];
        while (temp != NULL)
        {
            next = temp->next;
            free(temp);
            temp = next;
        }
    }
    free(*table);
    *table = NULL;
}
//vypis tabulku
void print_hash(TABLEINFO *info)
{
    BOD *vypis;
    for(int i=0;i<info->size;i++)
    {
        if(info->table[i]!=NULL)
        {
            vypis = info->table[i];
            if(info->table[i]->next==NULL) printf("%d",info->table[i]->key);
            else
            {
                while(vypis->next!=NULL)
                {
                    printf("%d", vypis->key);
                    printf("->");
                    vypis = vypis->next;
                }
                printf("%d", vypis->key);
            }
        }
        else
        {
            printf("NULL");
        }
        printf("\n");
    }
}
