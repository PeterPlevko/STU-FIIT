// uloha9-3.c -- Peter Plevko, 22.11.2019 15:35

#include <stdio.h>
#include <stdlib.h>

typedef struct Polozka
{
	int cislo;
	struct Polozka* dalsi;
} POLOZKA;

POLOZKA* nacitaj();
void vypis(POLOZKA* prvy);

void zmaz(POLOZKA** prvy, int k)
{


	if (*prvy == NULL)
		return;

	POLOZKA* temp = *prvy;


	if (k == 0)
	{
		*prvy = temp->dalsi;
		free(temp);
		return;
	}


	for (int i = 0; temp != NULL && i < k - 1; i++)
		temp = temp->dalsi;

	if (temp == NULL || temp->dalsi == NULL)
		return;

	POLOZKA* dalsi = temp->dalsi->dalsi;


	free(temp->dalsi);

	temp->dalsi = dalsi;

}





int main()
{
	int k;
	POLOZKA* prvy;
	scanf("%d", &k);
	prvy = nacitaj(); // nacitaj zoznam
	zmaz(&prvy, k);
	vypis(prvy); // vypis zoznam
	return 0;
}