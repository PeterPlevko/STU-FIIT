#include <stdio.h>

int main()
{
	int kokes, k, menic, j, i, pocet;

	scanf("%d", &pocet);

	if (pocet < 1 || pocet>15 || pocet % 2 == 0) {
		printf("zly vstup");

	}

	kokes = 1;
	menic = 1;
	for (i = 1; i <= pocet + pocet - 1; i++)
	{
		for (j = 1; j <= menic; j++)
		{
			printf("*");
		}
		for (k = pocet; k > menic; k--)
		{
			printf("");
		}
		kokes = kokes + 1;
		if (kokes <= pocet) menic = menic + 1;
		else menic = menic - 1;
		printf("\n");
	}


