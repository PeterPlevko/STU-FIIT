#include <stdio.h>
#include <string.h>
#include <stdio.h>
#include <stdlib.h>

char *memory; // globalny smernik

void *memory_alloc(unsigned int size) // moja funkcia malloc
{
    char *memory_char = (char *) memory;
    int hlavicka;
    hlavicka = *memory;
    memory_char = memory;
    if (size == hlavicka)
    {
        *( (int*) memory_char) = -size;
        memory_char =  memory_char + size+ sizeof(int);
        *( (int*) memory_char) = -size;
    }

if (size==0) return NULL;

    while(1)
    {
        if (hlavicka > 0 && hlavicka >= size)
        {

            *( (int*) memory_char) = -size;
              memory_char =  memory_char + size + sizeof (int);
            *( (int*) memory_char) = -size;
            memory_char=memory_char+ sizeof(int);

int pocet=hlavicka - size - 2 * sizeof(int);

if ( pocet <= 0)
{

    memory_char = memory_char - sizeof (int);
    memory_char = memory_char + *( (int *) memory_char ) - sizeof (int);
    hlavicka=*( (int *) memory_char );
    *( (int *) memory_char) = hlavicka - size;

    memory_char =  memory_char  - *( (int *) memory_char ) + sizeof(int);
    *( (int *) memory_char ) = hlavicka - size;
    memory_char = memory_char + *( (int *) memory_char ) ;

    return memory_char;
}


else
    {
    *( (int*) memory_char ) = hlavicka - size - 2 * sizeof (int);
    memory_char = memory_char + *( (int *) memory_char ) + sizeof (int);
    *( (int*) memory_char) = hlavicka - size - 2 * sizeof(int);

    memory_char = memory_char - *((int *) memory_char) - 2 * sizeof(int) - size;
    return memory_char;
    }

        }

        else if (hlavicka < 0)
        {
        memory_char = memory_char - (hlavicka) + 2*sizeof(int);
        hlavicka = *memory_char;
        }

        else
        {
        printf("Nepodarilo sa alokovat pozadovany blok");
        return NULL;
        }

    }

}

int memory_free(void *valid_ptr)
{
    char * memory_char = (char*) memory;

    char * char_ptr=(char*) valid_ptr;
    char_ptr=char_ptr- sizeof(int);
    *( (int*) char_ptr )=- *( (int*) char_ptr );
    char_ptr=char_ptr + *( (int*) char_ptr ) + sizeof(int);
    *( (int*) char_ptr ) = - *( (int*) char_ptr );
    char_ptr = (char*) valid_ptr;
    char_ptr = char_ptr - sizeof(int);

int velkost_bloku;
char * predosly_char_ptr=0;
char* aktualny_char_ptr;
char* nasledujuci_char_ptr;

aktualny_char_ptr = valid_ptr - sizeof(int);

predosly_char_ptr=aktualny_char_ptr- sizeof(int);

if (*( (int*) predosly_char_ptr )<=0)
{
    if (*(predosly_char_ptr+ sizeof(int))==*memory)
    {}
    else{
        predosly_char_ptr = predosly_char_ptr + *((int *) predosly_char_ptr) - sizeof(int);
    }
}
    else
    {
    predosly_char_ptr = predosly_char_ptr - *((int *) predosly_char_ptr) - sizeof(int);
}

nasledujuci_char_ptr = aktualny_char_ptr + *( (int*) aktualny_char_ptr )+ 2*sizeof(int);
///1 moznost ktora moze nastat pri spajani blokov
if (*predosly_char_ptr > 0 && *aktualny_char_ptr > 0 && *nasledujuci_char_ptr > 0)/// volny volny volny
{
velkost_bloku=*( (int*) predosly_char_ptr )+2* sizeof(int)+*( (int*) aktualny_char_ptr )+2* sizeof(int)+*( (int*) nasledujuci_char_ptr );
    *( (int *) predosly_char_ptr)=velkost_bloku;
    predosly_char_ptr=predosly_char_ptr+velkost_bloku+ sizeof(int);
    *( (int *) predosly_char_ptr)=velkost_bloku;
}
///2 moznost
else if (*predosly_char_ptr<=0&&*aktualny_char_ptr>0&&*nasledujuci_char_ptr>0) /// plny volny volny
{
    velkost_bloku=*( (int*) aktualny_char_ptr )+2* sizeof(int)+*( (int*) nasledujuci_char_ptr );
    *( (int *) aktualny_char_ptr)=velkost_bloku;
    aktualny_char_ptr=aktualny_char_ptr+velkost_bloku+ sizeof(int);
    *( (int *) aktualny_char_ptr)=velkost_bloku;
}
/// tretia moznost
else if (*predosly_char_ptr>0&&*aktualny_char_ptr>0&&*nasledujuci_char_ptr<=0) ///volny volny plny
{
    velkost_bloku=*( (int*) predosly_char_ptr )+2* sizeof(int)+*( (int*) aktualny_char_ptr );
    *( (int *) predosly_char_ptr)=velkost_bloku;
    predosly_char_ptr=predosly_char_ptr+velkost_bloku+ sizeof(int);
    *( (int *) predosly_char_ptr)=velkost_bloku;
}

    return 0;
}

int memory_check(void *ptr)
{
    char * hlavicka;
    char * peticka;
    hlavicka=(char*) ptr;
    hlavicka=hlavicka- sizeof(int);
    peticka=hlavicka - (*(int*)hlavicka)+ sizeof(int);
    char * char_ptr = (char*) ptr;
    if ( *hlavicka > 0 || *peticka > 0) // ked hlavicka alebo peticka su vacsie nule znamena to ze blok pamete nieje alokovany cize smernik je zly
    {return 0;}
   if ((*hlavicka==*peticka)&& (*hlavicka < 0 && *peticka < 0) )// ak toto splnaju smernik je platny
   {return 1;}

}

void memory_init(void *ptr, unsigned int size)
{
    memory =(char*) ptr;
    char *  memory_char = (char*) memory;
    int * memory_int = (int*) memory;

    *( (int*) memory_char ) = size - 2 * sizeof (int);

    memory_char = memory_char +size- sizeof(int) ;

    *( (int*) memory_char ) = size - 2 * sizeof (int);

}

int main() {
/*
    char region[100]; //celkový blok pamäte o veľkosti 100 bytov

    for (int i = 0; i < 100; i++)
    {
        region[i] = 0; // vynuloval som az je to prehladnejsie
    }

    memory_init(region, 100);
*/
    /// test nuly
    /*
    char* pointer1 = (char*) memory_alloc(0);
    */
    /// idealny pripad
/*
  char* pointer1 = (char*) memory_alloc(92);
*/
     /// kontrola vstupu pre volny volny plny
/*
    char* pointer1 = (char*) memory_alloc(5);
          memset(pointer1, 1, 5);

    char* pointer2 = (char*) memory_alloc(10);
          memset(pointer2, 2, 10);

    char* pointer3 = (char*) memory_alloc(15);
          memset(pointer3, 3, 15);

    memory_free(pointer1);
    memory_free(pointer2);
*/

/// kontrola vstupu pre plny volny volny
/*
      char* pointer1 = (char*) memory_alloc(5);
            memset(pointer1, 1, 5);

      char* pointer2 = (char*) memory_alloc(10);
            memset(pointer2, 2, 10);

      char* pointer3 = (char*) memory_alloc(15);
            memset(pointer3, 3, 15);

      char* pointer4 = (char*) memory_alloc(15);
            memset(pointer4, 4, 15);

      memory_free(pointer3);
      memory_free(pointer2);
*/

/// kontrola vstupu pre volny volny volny funguje
/*
    char* pointer1 = (char*) memory_alloc(5);
          memset(pointer1, 1, 5);

    char* pointer2 = (char*) memory_alloc(6);
          memset(pointer2, 2, 6);

    char* pointer3 = (char*) memory_alloc(7);
          memset(pointer3, 3, 7);

    char* pointer4 = (char*) memory_alloc(8);
          memset(pointer4, 4, 8);

    char* pointer5 = (char*) memory_alloc(9);
          memset(pointer5, 5, 9);

    memory_free(pointer2);
    memory_free(pointer4);
    memory_free(pointer3);
*/

/// situacia uvolnujem volny na zaciatku volny plny
/*
    char* pointer1 = (char*) memory_alloc(8);
          memset(pointer1, 1, 8);

    char* pointer2 = (char*) memory_alloc(9);
          memset(pointer2, 2, 9);

    char* pointer3 = (char*) memory_alloc(10);
          memset(pointer3, 3, 10);

    memory_free(pointer1);
    memory_free(pointer2);
*/

/// test merge na konci + ukazka fragmentacie mojho kodu uzivatel chce iba 8 ale kvoli nedostatku zvyskovej pameti mu musim dat 16
/*
    char* pointer1 = (char*) memory_alloc(50);
    memset(pointer1, 1, 50);

    char* pointer2 = (char*) memory_alloc(10);
    memset(pointer2, 2, 10);

    char* pointer3 = (char*) memory_alloc(8);
    memset(pointer3, 3, 8);

    memory_free(pointer2);
    memory_free(pointer3);
*/

/// memory check skontrolovane
/*
char* pointer1 = (char*) memory_alloc(50);
    memset(pointer1, 1, 50);
memory_check(pointer1);
memory_free(pointer1);
memory_check(pointer1);
*/

/// uvodny test
/*
    char region[50]; //celkový blok pamäte o veľkosti 50 bytov

    for (int i = 0; i < 100; i++)
    {
        region[i] = i;
    }

    memory_init(region, 50);
    char* pointer = (char*) memory_alloc(10); //alokovaný blok o veľkosti 10 bytov
    if (pointer)
        memset(pointer, 0, 10);
    if (pointer)
        memory_free(pointer);
    return 0;
*/

return 0;
}

/// x/100fb memory