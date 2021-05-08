
#include <stdio.h>

int main()
{
	int a, b, c, d, e, f, g;
	scanf("%d %d %d %d %d", &a, &b, &c, &d, &e);

	f = e / --a * b++ / c++;
	scanf("%d %d %d %d %d", &a, &b, &c, &d, &e);
	g = a %= b = d = 1 + e / 2;
	printf("%d\n", f);
	printf("%d", g);
	return 0;
}