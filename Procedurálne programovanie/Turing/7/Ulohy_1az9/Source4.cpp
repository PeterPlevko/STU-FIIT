// uloha7-6.c -- Peter Plevko, 14.11.2019 15:39
#include <stdio.h>
#include <stdlib.h>

// Funkcia vygeneruje postupku do retazca str: zacinajucu znakom z, dlzky len.
void postupka(char* str, char z, int len)
{

	int i;
	for (i = 0; i < len; i++)
	{
		str[i] = z++;
		if (z == 'z' + 1)
			z = 'a';
		if (z == 'Z' + 1)
			z = 'A';
	}
	str[i] = 0;
	return str;


}

// ukazkovy test (spracovanie vstupu)
int main(void)
{
	char z[2], * buf;
	int n;

	// nacitanie vstupu
	while (scanf("%s %d", z, &n) == 2)
	{
		buf = malloc(n + 1); // vyhradim n+1 znakov pre retazec
		postupka(buf, z[0], n);
		printf("%s\n", buf);
		free(buf); // uvolnim vyhradene miesto
	}
	return 0;
}