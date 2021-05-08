#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <math.h>

int armstrong(int x)
{
	int zvysok = 0, vysledok = 0, mocnina = 0, cislo1, j = 0, cislo, i, pocetcisel;
	cislo = x;
	cislo1 = cislo;
	while (cislo1 > 0)
	{
		mocnina = mocnina + 1;
		cislo1 = cislo1 / 10;
	}
	cislo1 = cislo;
	for (j = 0; j < mocnina; j++)
	{
		zvysok = cislo1 % 10;
		vysledok = vysledok + pow(zvysok, mocnina);
		cislo1 = cislo1 / 10;
	}
	if (vysledok == cislo) 	return 1;
	else return 0;





}


int main()
{
	int zvysok = 0, vysledok = 0, mocnina = 0, cislo1, j = 0, cislo, i, pocetcisel;
	scanf("%d", &pocetcisel);
	for (i = 0; i < pocetcisel; i++)
	{
		scanf("%d", &cislo);
		armstrong(cislo);
		if (armstrong(cislo) == 1) printf("%d je Armstrongove cislo\n", cislo);
		else printf("%d nie je Armstrongove cislo\n", cislo);
	}



	return 0;
}