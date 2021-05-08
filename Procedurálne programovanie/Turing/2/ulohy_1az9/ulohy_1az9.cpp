
#include <stdio.h>

int main()
{

	int i, pocetcisel;
	double maximum, cislo, minimum;
	scanf("%d", &pocetcisel);


	for (i = 1; i <= pocetcisel; i++)
	{

		scanf("%lf", &cislo);
		if (i == 1)
		{
			maximum = cislo;
			minimum = cislo;
		}
		if (cislo > maximum) maximum = cislo;
		if (cislo < minimum)minimum = cislo;
	}
	printf("Minimum: %.2lf\n", minimum);
	printf("Maximum: %.2lf", maximum);

	return 0;
}