#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <stdlib.h>

int main() {
	FILE* fr, * fw;
	int i;
	char vstup, c, durhyznak;

	fr = fopen("znak.txt", "r+");
	fw = fopen("novy.txt", "w");
	double cislo, nasobok;

	scanf("%c", &vstup);



	while ((c = getc(fr)) != EOF)
	{
		if (vstup == 's') {



			putc(c, fw);
		}
		else 	putchar(c);
	}





	fclose(fw);
	fclose(fr);







	return(0);
}