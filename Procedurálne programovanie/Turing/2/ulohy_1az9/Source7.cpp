#include <stdio.h>
int main()
{
	int n, p, a, b, c, d;
	scanf("%d %d", &n, &p);

	for (a = 0; a < n; a++)
	{
		for (b = 0; b < p; b++)
		{
			for (c = 0; c < n; c++)
				for (d = 0; d < p; d++)
					if ((a % 2 == 0 && (c % 2) == 0) || (!(a % 2) == 0 && !(c % 2) == 0))
						printf("*");
					else printf("-");
			printf("\n");
		}
	}

	return 0;
}