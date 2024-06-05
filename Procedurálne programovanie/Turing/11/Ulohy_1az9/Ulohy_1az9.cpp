
#include <stdio.h>
#include<math.h>
#define _GNU_SOURCE
#include <stdio.h>
#include <stdlib.h>


int L(void)
{
	int cislo;
	scanf("%d", &cislo);

	printf("Aktualna hodnota: %d\n", cislo);
	return cislo;
}
//////////////////////////
int M(int cislo)
{
	cislo = cislo * 2;
	printf("Aktualna hodnota: %d\n", cislo);
	return cislo;

}
/////////////////////////////
int D(int cislo)
{
	cislo = cislo / 2;
	printf("Aktualna hodnota: %d\n", cislo);
	return cislo;

}
//////////////////
int A(int cislo)
{
	int cislo1;
	scanf("%d", &cislo1);

	cislo = cislo + cislo1;
	printf("Aktualna hodnota: %d\n", cislo);
	return cislo;
}
///////////////////////
int S(int cislo)
{
	int cislo1;
	scanf("%d", &cislo1);

	cislo = cislo - cislo1;
	printf("Aktualna hodnota: %d\n", cislo);
	return cislo;
}


int main()
{
	int hodnota = 1;
	char pismeno;
	do
	{
		scanf("%c", &pismeno);

		switch (pismeno)
		{

		case 'L':hodnota = L(); break;//je príkaz na načítanie záznamov o realitách zo súboru reality.txt do spájaného zoznamu štruktúr.

		case 'M':hodnota = M(hodnota); break;//je príkaz na výpis celého spájaného zoznamu záznamov.

		case 'D':hodnota = D(hodnota); break;//je príkaz na pridanie záznamu o realitnej ponuke do dynamického zoznamu.

		case 'A':hodnota = A(hodnota); break;

		case 'S':hodnota = S(hodnota); break;

		}


	} while (pismeno != 'T');



	return 0;
}