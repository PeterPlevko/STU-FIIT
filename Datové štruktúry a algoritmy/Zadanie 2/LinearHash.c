#include <stdio.h>
#include <stdlib.h>

#define LOAD_LINEAR(N,M) (((double)(N) / (M) >= 0.75) ? 1:0)                            //pridané macro na výpocet pomeru medzi velkostou tabuľky
#define SIZE_Hash 17                                                                         //a počtom pridaných prvkov

struct DataItem {
    int data;
    int key;
};

struct DataItem** hashArray = NULL;
struct DataItem* item;
int sizeHashForeign = SIZE_Hash;
int elements = 0;

int hashCode(int key)
{
    return key % sizeHashForeign;
}

void init()
{
    for(int i = 0; i < sizeHashForeign; i++)
    {
        hashArray[i] = NULL;
    }
}

struct DataItem *searchHashLinear(int key)
        {
    //get the hash
    int hashIndex = hashCode(key);

    //move in array until an empty
    while(hashArray[hashIndex] != NULL)
    {

        if(hashArray[hashIndex]->key == key)
            return hashArray[hashIndex];

        //go to next cell
        ++hashIndex;

        //wrap around the table
        hashIndex %= sizeHashForeign;
    }

    return NULL;
}

void insertLinearHash();

void rehash()
{
    int oldSize = sizeHashForeign;
    sizeHashForeign *= 2;
    struct DataItem** newArray = (struct DataItem**)malloc(sizeHashForeign* sizeof(struct DataItem*));
    struct DataItem** oldArray = hashArray;
    hashArray = newArray;
    init();
    elements = 0;
    for(int i = 0; i<oldSize;i++)
    {
        if(oldArray[i]!=NULL)
            insertLinearHash(oldArray[i]->key, oldArray[i]->data);
    }
}

void insertLinearHash(int key, int data)
{
    struct DataItem *item = (struct DataItem*) malloc(sizeof(struct DataItem));
    item->data = data;
    item->key = key;

    //get the hash
    int hashIndex = hashCode(key);

    //move in array until an empty or deleted cell
    while(hashArray[hashIndex] != NULL) {
        if(hashArray[hashIndex]->key == key)
        {
            return;
        }
        //go to next cell
        ++hashIndex;

        //wrap around the table
        hashIndex %= sizeHashForeign;
    }

    hashArray[hashIndex] = item;
    elements++;
    if(LOAD_LINEAR(elements, sizeHashForeign))
    {
        rehash();
    }
}



void display() {
    int i = 0;

    for(i = 0; i<sizeHashForeign; i++)
    {

        if(hashArray[i] != NULL)
            printf(" (%d,%d)",hashArray[i]->key,hashArray[i]->data);
        else
            printf(" ~~ ");
    }

    printf("\n");
}

