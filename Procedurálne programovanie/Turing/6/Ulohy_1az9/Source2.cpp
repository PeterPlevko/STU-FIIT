// uloha6-3.c -- Peter Plevko, 30.10.2019 09:31

#include <stdio.h>

int delitele(int x[], int pocetx, int y[], int k)

{
	int i = 0, j = 0, s = 0;


	for (i = 0; i < pocetx; i++)
	{
		if (x[i] != 0) {
			if (k % x[i] == 0)

			{
				y[j] = x[i];
				j++;
				s++;
			}
		}

	}

	return s;



}

int main()
{
	int i, x[10], pocetx;
	scanf("%d", &pocetx);
	for (i = 0; i < pocetx; i++)
		scanf("%d", &x[i]);

	int y[10];
	int pocety = delitele(x, pocetx, y, 24);
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