
#include <stdio.h>

int main()
{
	double priemer, a, b, c;
	priemer = 0;
	scanf("%lf %lf %lf", &a, &b, &c);
	priemer = (a + b + c) / 3;

	printf("Priemer cisel %g %g %g je: %g\n", a, b, c, priemer);

	return 0;
}