#include <stdio.h>

int main()
{
	int pocethviezd, i, j;
	scanf("%d", &pocethviezd);

	for (j = 0; j < pocethviezd; j++)
	{
		for (i = 0; i < pocethviezd; i++)
		{
			if ((i == pocethviezd / 2) || (j == pocethviezd / 2) || (i == j) || (i == pocethviezd - j - 1))
				printf("*");
			else
				printf("-");
		}
		printf("\n");
	}
	return 0;
}