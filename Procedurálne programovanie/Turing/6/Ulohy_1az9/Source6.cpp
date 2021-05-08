// uloha6-7.c -- Peter Plevko, 13.11.2019 22:18

#include <stdio.h>

int main()
{

	int c;
	int pole[100], pocitadlo = 0;
	FILE* cisla, * cisla_2, * vysledok;
	cisla = fopen("cisla1.txt", "r");
	cisla_2 = fopen("cisla2.txt", "r");
	vysledok = fopen("vysledok.txt", "a");

	while (fscanf(cisla, "%d", &c) == 1)
	{
		pole[pocitadlo] = c;
		pocitadlo++;
	}
	while (fscanf(cisla_2, "%d", &c) == 1)
	{
		pole[pocitadlo] = c;
		pocitadlo++;
	}
	//printf("%d",pocitadlo);
	int pomocna;
	for (int i = 0; i < pocitadlo - 1; i++)
	{
		for (int j = 0; j < pocitadlo - i - 1; j++)
		{
			if (pole[j] > pole[j + 1])
			{
				pomocna = pole[j];
				pole[j] = pole[j + 1];
				pole[j + 1] = pomocna;
			}
		}
	}

	for (int i = 0; i < pocitadlo; i++) fprintf(vysledok, "%d ", pole[i]);
	fclose(cisla);
	fclose(cisla_2);
	fclose(vysledok);
	return 0;
}