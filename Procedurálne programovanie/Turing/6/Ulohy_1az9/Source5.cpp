#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdio.h>
#include <ctype.h>
#define N ('Z' - 'A' + 1)

int main() {
	int x = 0, i;
	char hist[N], slovo[1000];
	char nazovsuboru[1000];
	gets(nazovsuboru);

	FILE* Fread;

	Fread = fopen(nazovsuboru, "r");

	for (i = 0; i < N; i++)
		hist[i] = 0;

	i = 0;

	printf("  ");
	for (i = 0; i < N; i++)
	{
		printf(" %2c", i + 'A');
	}
	printf("\n");

	while (fgets(slovo, 1000, Fread) != NULL)
	{

		for (i = 0; i < N; i++)
		{
			hist[i] = 0;
		}
		i = 0;

		while (slovo[i] != '\0') {
			hist[toupper(slovo[i]) - 'A']++;
			i++;
		}

		x++;

		printf("%2d", x);

		for (i = 0; i < N; i++)
		{
			printf(" %2d", hist[i]);
		}
		printf("\n");
	}

	//printf("\n");
	fclose(Fread);



	return 0;
}