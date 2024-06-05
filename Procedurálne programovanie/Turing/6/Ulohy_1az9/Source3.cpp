#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
int main()
{

	char* pole;
	int i, n;
	//nacita cele cislo n
	scanf("%d ", &n);

	pole = (char*)malloc(n * sizeof(char));
	fgets(pole, n + 2, stdin);


	pole[n] = 0;

	for (i = n - 1; i >= 0; i--)
	{
		printf("%c", pole[i]);
	}



	return 0;
}