// uloha5-3.c -- Peter Plevko, 23.10.2019 09:31
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
	int c;
	FILE* Fread;
	FILE* Fwrite;

	Fread = fopen("vstup.txt", "r");

	Fwrite = fopen("cisla.txt", "a+");



	while (fgets(str, 20, Fread) != NULL)
	{

		for (counter = 0; str[counter] != NULL; counter++) {
			if (str[counter] >= 'a' && str[counter] <= 'z')
				countL++;



		}
		fprintf(Fwrite, "%s", str);
		fprintf(Fwrite, "%d", countL);
		fprintf(Fwrite, "\n");



		countL = 0;

	}







	fclose(Fwrite);
	fclose(Fread);


	return 0;
}