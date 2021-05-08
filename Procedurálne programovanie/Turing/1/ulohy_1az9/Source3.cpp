#include <stdio.h>

int main()
{
	double vyska, hmotnost;
	scanf("%lf %lf", &vyska, &hmotnost);
	printf("BMI: %.3lf", hmotnost / ((vyska / 100) * vyska / 100));


	return 0;
}