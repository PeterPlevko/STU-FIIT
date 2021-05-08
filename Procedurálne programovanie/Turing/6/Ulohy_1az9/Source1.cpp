// uloha6-2.c -- Peter Plevko, 30.10.2019 08:01

#include <stdio.h>

int nasobky(int x[], int pocetx, int y[], int k)
{
	int i = 0, j = 0, s = 0;

	for (i = 0; i < pocetx; i++)
	{
		if (k != 0) {
			if (x[i] % k == 0)

			{
				y[j] = x[i];
				j++;
				s++;
			}
		}
		else
		{
			if (x[i] == 0) {
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
	int pocety = nasobky(x, pocetx, y, 2);
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