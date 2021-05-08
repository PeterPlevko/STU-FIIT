#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include<math.h>
int main()
{
	double vysledok, cislo, kamil;
	int i;
	scanf("%lf %lf", &cislo, &kamil);
	for (i = 1; i <= kamil; i++)
	{
		vysledok = cislo * i;
		printf("%.2lf * %d = %.2lf \n", cislo, i, vysledok);

	}

	return 0;

}