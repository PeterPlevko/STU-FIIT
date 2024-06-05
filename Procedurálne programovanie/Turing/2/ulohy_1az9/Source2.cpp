#include <stdio.h>

int main()
{

	int x, s, d, i, j, rows;

	scanf("%d", &rows);
	d = rows;
	s = 0;
	x = 1;
	for (i = rows; i >= 1; --i, x++)
	{
		d = rows;
		d = d - s;

		s = s + 1;

		printf("%d", x);
		printf(": ");

		for (j = 1; j <= i; ++j, d--)
		{
			printf("%d ", d);
		}

		printf("\n");
	}


	return 0;
}