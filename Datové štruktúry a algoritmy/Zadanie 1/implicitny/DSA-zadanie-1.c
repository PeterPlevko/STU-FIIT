#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include <string.h>
#include <time.h>
void *start; //pointer na zaciatok pamäte
/*
 * memory_init() - inicializácia pamäte
 * uloží adresu začiatku pamäti do globálnej premennej start
 * na začiatok pamäte uloži veľkosť následujúceho bloku a info o tom či je volný
   (využívam znamienko, kladné číslo znamená že blok je voľny, záporné že blok je
   zabratý).
 * koniec pamäte označí  0
 * (nie je nutné) nastavi zatial nevyužívané hodnoty v pamäte na -2
 */
void memory_init(void *ptr, unsigned int size)
{
    for(int i = 0;i<size;i++)
        *((char*)ptr+i)=-2;
    start=ptr;
    *((int*)ptr) = size-2*sizeof(int);
    *((int*)(ptr+size- sizeof(int))) = 0;
}

/* pomocne funkcie pre memory_alloc */
int is_splittable(void* block, unsigned int size)
{
    if(size+ sizeof(int)<*((int *) block))
        return 1;
    return 0;
}

void split(void *block, unsigned int size)
{
    int block_size = *((int *) block);
    *((int *) block) = size; //zapis pozadovanej velkosti na povodny blok
    void *new = block;
    new += sizeof(int) + *((int *) block); //vytvorenie noveho bloku
    *((int *) new) = block_size - size- sizeof(int); //zapis velkosti noveho bloku
}

/*
 * memory_alloc()-sluzi na alokovanie pamati
 * najdenie vhodneho bloku (best fit algoritmus)
 * split - rozdelenie bloku
 */
void *memory_alloc(unsigned int size)
{
    void *curr=start;
    void *out=NULL;
    int diff, diff_found;
    int is_found = 0;
    while(*((int*)curr)!=0)
    {
        diff = *((int *) curr) - size;
        if(diff==0)  //ak sa najde uplne vhodny blok netreba prehladavat dalej (
        {
            out = curr;
            break;
        }
        if(diff >= 0 && (!is_found || diff < diff_found)) //pokym nieje najdeny ziadny blok, nevyhodnocuje sa cast podmienky diff<diff_found
        {
            is_found=1;
            out = curr;
            diff_found = diff;
        }
        curr += abs(*((int*)curr))+sizeof(int); //posun na dalsiu hlavicku
    }
    if(out == NULL)
        return NULL;
    //SPLIT
    if(is_splittable(out,size))
        split(out,size);

    *((int *) out) *= -1;       //oznaci blok ako alokovany
    return out+sizeof(int);     //+sizeof(int) - aby uzivatel dostal priestor kde moze zapisovat, nie hlavicku
}

/*pomocne funkcie pre memory_free*/
int is_last(void *ptr)  //vstupuje datova cast bloku, nie hlavicka
{
    if( *((char*)ptr + *((int *) ptr - 1)) != 0)
        return 0;
    return 1;
}

int is_first(void *ptr) //vstupuje datova cast bloku, nie hlavicka
{
    if(start != (ptr- sizeof(int)))
        return 0;
    return 1;
}

int is_mergeable(void *ptr)
{
    if (*((int *) ptr) > 0)
        return 1;
    return 0;
}

void *find_prev(void *curr) //vstupuje datova cast bloku, nie hlavicka
{
    void *out = start;
    while ((out + abs(*((int *) out)) + sizeof(int)) != (curr - sizeof(int)))
        out += abs(*((int *) out)) + sizeof(int);
    return out;
}

void *find_next(void *curr) //vstupuje datova cast bloku, nie hlavicka
{
    void *out = curr + *((int *) curr - 1);
    return out;
}

void merge_prev(void *curr, void *prev)
{
    *((int *) prev) += *((int *) curr - 1) + sizeof(int);
    *((int *) curr - 1) = 0;
}

void merge_next(void *curr, void *next)
{
    *((int *) curr - 1) += *((int *) next) + sizeof(int);
    *((int *) next) = 0;
}

/*
 * memory_free()
 * uvolnenie bloku
 * merge - spojenie volnych blokov do jedneho vacsieho ak su volne bloky vedla seba
 */
int memory_free(void *ptr)
{
    if(ptr==NULL || *((int*)ptr-1)>0)
        return 1;
    *((int *) ptr - 1) *= -1;  //zmeni znamienko bloku - uvolni ho

    //MERGE
    //s nasledujucim blokom
    if(!is_last(ptr)) {
        void *next = find_next(ptr);
        if (is_mergeable(next))
            merge_next(ptr,next);
    }
    //s predchadzajucim blokom
    if(!is_first(ptr)){
        void* prev = find_prev(ptr);
        if (is_mergeable(prev))
            merge_prev(ptr,prev);
    }
    return 0;
}

int memory_check(void *ptr)
{
    void *curr = start;
    while(*((int*)curr)!=0) {
        if(curr+ sizeof(int)==ptr && *((int*)curr)<0)
            return  1;
        curr += abs(*((int *) curr)) + sizeof(int);
    }
    return 0;
}

int get_random(int lower, int upper)
{
        int num = (rand() % (upper - lower + 1)) + lower;
        return num;
}

int main()
{

    //UKAZKOVY TEST
    char region[50]; //celkový blok pamäte o veľkosti 50 bytov
    memory_init(region, 50);
    char* pointer = (char*) memory_alloc(10); //alokovaný blok o veľkosti 10 bytov
    if (pointer)
        memset(pointer, 0, 10);
    if (pointer)
        memory_free(pointer);

    return 0;
}
