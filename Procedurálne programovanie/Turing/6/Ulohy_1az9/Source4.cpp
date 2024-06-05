#include <stdio.h>

int main()
{

	char a[100], b[100];
	int c = 1, d = 1;

	FILE* fa = fopen("prvy.txt", "rt");
	FILE* fb = fopen("druhy.txt", "rt");
	FILE* fc = fopen("treti.txt", "wt");

	while (c == 1 || d == 1)
	{
		if (c > 0)
			c = fscanf(fa, "%s", a);
		if (d > 0)
			d = fscanf(fb, "%s", b);
		if (c <= 0 && d <= 0)
			break;

		if (c > 0)
			fprintf(fc, "+%s ", a);
		if (d > 0)
			fprintf(fc, "-%s ", b);
	}

	fclose(fa);
	fclose(fb);
	fclose(fc);

	return 0;
}