// uloha7-3.c -- Peter Plevko, 13.11.2019 23:44

#include <stdio.h>

void vloz_do_stredu(char* str, char c)
{
	int i;

	for (i = strlen(str); i >= strlen(str) / 2; i--)
	{
		str[i + 1] = str[i];
	}
	str[strlen(str) / 2] = c;

}

int main()
{
	char buf[1000], znak[10];
	while (scanf("%s %s", buf, znak) == 2)
	{
		vloz_do_stredu(buf, znak[0]);
		printf("%s\n", buf);
	}
	return 0;
}