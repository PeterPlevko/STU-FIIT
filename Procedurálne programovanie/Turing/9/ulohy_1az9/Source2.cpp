// uloha9-4.c -- Peter Plevko, 22.11.2019 15:36

#include <stdio.h>
#include <stdlib.h>

typedef struct Polozka
{
	int cislo;
	struct Polozka* dalsi;
} POLOZKA;

POLOZKA* nacitaj();
void vypis(POLOZKA* prvy);

void zmaz_delitelne(POLOZKA** prvy, int k)
{


	POLOZKA* predosly, * aktualny;

	while (*prvy != NULL && (((*prvy)->cislo) % k) == 0)
	{
		predosly = *prvy;

		*prvy = (*prvy)->dalsi;

		free(predosly);



	}

	predosly = NULL;
	aktualny = *prvy;

	while (aktualny != NULL)
	{

		if (aktualny->cislo % k == 0)
		{

			if (predosly != NULL)
			{
				predosly->dalsi = aktualny->dalsi;
			}

			free(aktualny);
			aktualny = predosly->dalsi;


		}

		else
		{
			predosly = aktualny;
			aktualny = aktualny->dalsi;
		}

	}



}

int main()
{
	int k;
	POLOZKA* prvy;
	scanf("%d", &k);
	prvy = nacitaj(); // nacitaj zoznam
	zmaz_delitelne(&prvy, k);
	vypis(prvy); // vypis zoznam
	return 0;
}