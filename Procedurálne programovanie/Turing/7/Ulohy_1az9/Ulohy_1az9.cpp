// uloha7-2.c -- Peter Plevko, 13.11.2019 23:44

#include <stdio.h>
#include <stdlib.h>

// Funkcia zisti, ci retazec str je palindrom. Vrati 1, ak je retazec palindrom, inak 0.
int je_palindrom(char* str)
{
	int l = 0;
	int h = strlen(str) - 1;

	while (h > l)
	{
		if (str[l++] != str[h--])
		{
			return 0;
		}
	}
	return 1;



}

// ukazkovy test (spracovanie vstupu)
int main(void)
{
	char buf[1000];

	// nacitanie vstupu
	while (scanf("%s", buf) > 0)
	{
		if (je_palindrom(buf))
			printf("PALINDROM\n");
		else
			printf("NIE\n");
	}
	return 0;
}