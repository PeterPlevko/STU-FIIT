// uloha7-5.c -- Peter Plevko, 13.11.2019 23:44

#include <stdio.h>
#include<string.h> 
char najcastejsi_znak(char* str)
{
	int i, len;
	int max = -1;

	int freq[26] = { 0 };




	len = strlen(str);

	for (i = 0; i < len; i++)
	{
		if (str[i] >= 'a' && str[i] <= 'z')
			freq[str[i] - 'a']++;
	}
	max = 0;
	for (i = 0; i < 26; i++)
	{
		if (freq[max] < freq[i])
		{
			max = i;
		}
	}
	return (max + 'a');
}

int main(void)
{
	char buf[10000];
	while (fgets(buf, 10000, stdin))
		printf("%c\n", najcastejsi_znak(buf));
	return 0;
}