#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdio.h>
#include <ctype.h>
#include <stdio.h>

#include <stdio.h>

double tyzdenna_mzda(double h_mzda, double hod)
{
	double dokopy = 0;
	if (hod < 40) dokopy = h_mzda * hod;
	if (hod > 40 && hod < 60) dokopy = (hod - 40) * (h_mzda * 1.5) + h_mzda * 40;
	if (hod > 60) dokopy = (hod - 60) * (h_mzda * 2) + (h_mzda * 1.5) * 20 + h_mzda * 40;
	printf("Hod. mzda: %.2lf Euro/hod, hodin: %.2lf, spolu: %.2lf Euro\n", h_mzda, hod, dokopy);
	return dokopy;
}

int main()
{
	int pocetvstupov;
	double mzda, hod, spolu = 0;
	scanf("%d", &pocetvstupov);
	for (int i = 0; i < pocetvstupov; i++)
	{
		scanf("%lf %lf", &mzda, &hod);
		spolu = spolu + tyzdenna_mzda(mzda, hod);

	}
	printf("Celkova mzda: %.2lf Euro", spolu);
	return 0;
}