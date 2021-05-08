// uloha5-4.c -- Peter Plevko, 6.11.2019 19:01

#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
int main()
{

	char str[20];
	int countL = 0;
	int  countU;
	int counter;
	int s = 0;
	FILE* Fread;
	char c;

	Fread = fopen("text.txt", "r");





	while ((c = fgetc(Fread)) != EOF)
	{
		if (c == ' ')s++;
		if (c == '#' || c == '$' || c == '&')printf("Precital som riadiaci znak\n");
		if (c == 'x' || c == 'X') printf("Precital som X\n");
		if (c == 'y' || c == 'Y') printf("Precital som Y\n");
		if (c == '*')
		{
			printf("Koniec\n");
			printf("Pocet precitanych medzier: %d", s);
			return 0;
		}
	}







	fclose(Fread);


	return 0;
}