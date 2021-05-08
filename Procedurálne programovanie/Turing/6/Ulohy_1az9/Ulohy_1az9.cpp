// uloha6-1.c -- Peter Plevko, 30.10.2019 08:00

#include <stdio.h>

int parne(int x[], int pocetx, int y[])
{
	int j = 0, i = 0;
	for (i = 0; i < pocetx; i++)
		if (x[i] % 2 == 0)
		{
			y[j] = x[i];
			j = j + 1;
		}

	return j;
}

int main()
{
	int i, x[10], pocetx;
	scanf("%d", &pocetx);
	for (i = 0; i < pocetx; i++)
		scanf("%d", &x[i]);

	int y[10];
	int pocety = parne(x, pocetx, y);
	printf("pocety: %d\ny: {", pocety);
	for (i = 0; i < pocety; i++)
	{
		if (i > 0)
			printf(", ");
		printf("%d", y[i]);
	}
	printf("}\n");
	return 0;
}