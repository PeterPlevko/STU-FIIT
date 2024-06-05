// uloha7-4.c -- Peter Plevko, 13.11.2019 23:44
#include <stdio.h>
#include <string.h>

#include <stdio.h>
#include <ctype.h>
#include <stdio.h>


void odstran_male_pismena(char* str)
{
	char pole[100];
	// sem napis svoje riesenie
	int i, j = 0;
	for (i = 0; i < strlen(str); i++)
	{
		if (isupper(str[i]) == 0)str[i] = '0';
	}

	for (i = 0; i < strlen(str); i++)
	{
		if (isupper(str[i]) != 0)
		{
			pole[j] = str[i];
			j++;

		}
		pole[j] = 0;
	}

	strcpy(str, pole);


}

int main()
{
	char buf[1000];




	while (scanf("%s", buf) == 1)
	{
		odstran_male_pismena(buf);
		printf("%s\n", buf);
	}
	return 0;
}