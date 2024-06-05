// uloha12-2.c -- Peter Plevko, 11.12.2019 08:32

#include <stdio.h>
#include <stdlib.h>

int is_magic(int** a, int n)
{
	int x = 0, y = 0, z = 0, i, j;
	for (i = 0; i < n - 1; i++) {
		for (j = 0; j < n; j++) {
			x += a[i][j];
			y += a[i + 1][j];
		}
		z = x;
		if (x != y) return 0;
		x = 0;
		y = 0;
	}
	for (j = 0; j < n; j++) {
		for (i = 0; i < n; i++) {
			x += a[i][j];
		}
		if (x != z) return 0;
		x = 0;
	}

	for (i = 0; i < n; i++) {
		for (j = 0; j < n; j++) {
			if (i == j)
				x += a[i][j];
			if ((n - i - 1) == j)y += a[i][j];
		}
	}
	if (x != z || y != z) return 0;
	return 1;
}


int main()
{
	int i, j, ** s, n;

	scanf("%d", &n);
	s = (int**)malloc(n * sizeof(int*));
	for (i = 0; i < n; i++)
		s[i] = (int*)malloc(n * sizeof(int));

	for (i = 0; i < n; i++)
		for (j = 0; j < n; j++)
			scanf("%d ", &s[i][j]);

	if (is_magic(s, n))
		printf("Je magicky.\n");
	else
		printf("NIE JE magicky!\n");

	return 0;
}