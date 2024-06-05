
#include <stdio.h>
#include <math.h>
int main()
{

	double cislo;
	scanf("%lf", &cislo);

	printf("%.0lf %.0lf", floor(cislo), round(cislo));



	return 0;
}