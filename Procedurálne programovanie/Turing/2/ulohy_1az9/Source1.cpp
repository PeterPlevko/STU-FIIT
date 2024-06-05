#include <stdio.h>

int main()
{

	double x, cislo, i, zaciatok, zaciatok1;
	scanf("%lf", &zaciatok1);
	zaciatok = zaciatok1;
	for (i = 1; i <= zaciatok1; i++)
	{
		scanf("%lf", &cislo);
		if (cislo <= 2 * zaciatok && cislo >= zaciatok / 2) { x = 0; }
		else  x = 1;
		zaciatok = cislo;
	}
	if (x == 0) { printf("Postupnost je spravna"); }
	else printf("Postupnost nie je spravna");




	return 0;
}