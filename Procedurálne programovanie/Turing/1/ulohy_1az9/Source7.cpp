#include <stdio.h>

int main()
{
	double a, b, c;
	scanf("%lf %lf %lf", &a, &b, &c);

	printf("Objem: %.3lf", a * b * c);

	return 0;
}