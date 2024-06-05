#include <stdio.h>

int main()
{
	int faktorial, i, cislo;
	scanf("%d", &cislo);
	faktorial = 1;
	for (i = 1; i <= cislo; i++)
	{
		faktorial = faktorial * i;
	}
	printf("%d", faktorial);
	return 0;

}