// uloha11-8.c -- Peter Plevko, 4.12.2019 08:35

#include <stdio.h>
#include <stdlib.h>

unsigned invert(unsigned x, int i, int n)
{

	int counter = 0, copy = x;
	while (copy > 0)
	{
		copy >>= 1;
		counter++;
	}
	for (int j = counter - i - n; j < counter - i; j++)
	{
		x ^= 1 << j;
	}
	return x;
}



void print_bin(unsigned int x)
{
	int i, j;
	for (j = 0, i = 31; i >= 0; i--)
	{
		if (x & (1 << i))
			j = 1;
		if (j)
		{
			if (x & (1 << i))
				printf("1");
			else
				printf("0");
		}
	}
}

int main()
{
	int x, ii, nn;

	scanf("%d %d %d", &x, &ii, &nn);

	printf("x = %d ", x);
	printf("(");
	print_bin(x);
	printf(")\n");

	printf("invert(x, %d, %d)\n", ii, nn);
	x = invert(x, ii, nn);

	printf("x: %d ", x);
	printf("(");
	print_bin(x);
	printf(")\n");

	return 0;
}