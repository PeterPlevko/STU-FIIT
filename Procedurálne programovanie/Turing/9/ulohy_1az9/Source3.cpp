// uloha9-5.c -- Peter Plevko, 22.11.2019 15:36

#include <stdio.h>
#include <stdlib.h>

typedef struct Polozka
{
	int cislo;
	struct Polozka* dalsi;
} POLOZKA;

POLOZKA* nacitaj();
void vypis(POLOZKA* prvy);

void otoc(POLOZKA** prvy)
{

	POLOZKA* prev = NULL;
	POLOZKA* current = *prvy;
	POLOZKA* next = NULL;
	while (current != NULL) {

		next = current->dalsi;


		current->dalsi = prev;
		prev = current;
		current = next;
	}
	*prvy = prev;

}

int main()
{
	POLOZKA* prvy;
	prvy = nacitaj(); // nacitaj zoznam
	otoc(&prvy);
	vypis(prvy); // vypis zoznam
	return 0;
}