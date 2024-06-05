// uloha7-8.c -- Peter Plevko, 13.11.2019 23:44

#include <stdio.h>
#include <string.h>
int strdelete(char* str, int n, int offset)
{
	char pole[169];
	int j = 0, i;

	if (strlen(str) < n + offset) { return 1; }

	for (i = offset; i < offset + n; i++)
	{
		str[i] = '0';
	}
	for (i = 0; i < strlen(str); i++)
	{
		if (str[i] != '0') { pole[j] = str[i]; j++; }
	}
	pole[j] = 0;
	strcpy(str, pole);
	return 0;
}


int main()
{
	char str[100];
	int n, offset;
	scanf("%s %d %d", str, &n, &offset);
	if (strdelete(str, n, offset))
		printf("Nepodarilo sa vymazat znaky.\n");
	else
		printf("%s", str);
	return 0;
}