#include <stdio.h>

void mocnina(double x, int n)
{
	double s = 1, nakolku = 1;
	int i, j;

	for (i = 0; i < n; i++)
	{
		for (j = 1; j <= s; j++)
		{
			nakolku = nakolku * x;
		}

		printf("%.2lf^%.0lf = %.2lf\n", x, s, nakolku);
		s = s + 1;
		nakolku = 1;
	}

}
int main()
{
	double cislo, mocnina1;
	scanf("%lf %lf", &cislo, &mocnina1);
	mocnina(cislo, mocnina1);

	return 0;

}