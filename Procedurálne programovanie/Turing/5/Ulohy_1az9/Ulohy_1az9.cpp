#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <stdlib.h>

int main() {
	FILE* fp;
	int i;
	fp = fopen("nasobky.txt", "w+");
	double cislo, nasobok;
	scanf("%lf", &cislo);
	for (i = 1; i <= 10; i++)
	{
		nasobok = cislo * i;
		fprintf(fp, "%d %s %.2f %s %.2f\n", i, "*", cislo, "=", nasobok);
	}

	fclose(fp);

	return(0);
}