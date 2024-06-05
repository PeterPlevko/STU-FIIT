#include <stdio.h>

int main()
{
	int x = 0, porovnavac, i, cislo;
	scanf("%d", &cislo);
	for (i = 1; i <= cislo; i++)
	{
		scanf("%d", &porovnavac);
		if (porovnavac > 0 && porovnavac <= 100) x = x + 1;
	}
	printf("%d", x);



	return 0;
}