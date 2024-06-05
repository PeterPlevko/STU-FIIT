#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <math.h>

long reverzne_cislo(long x)
{
	int n, r = 0, t;
	n = x;
	t = n;

	while (t != 0)
	{
		r = r * 10;
		r = r + t % 10;
		t = t / 10;
	}

	return r;
}
int main()
{
	int n, r = 0, t;


	while (scanf("%d", &n) >= 1)
	{


		if (reverzne_cislo(n) == n)
		{
			printf("%d\n", reverzne_cislo(n));
			printf("Cislo %d je palindrom\n", n);

		}
		else {
			printf("%d\n", reverzne_cislo(n));
			printf("Cislo %d nie je palindrom\n", n);
		}
	}
	return 0;
}