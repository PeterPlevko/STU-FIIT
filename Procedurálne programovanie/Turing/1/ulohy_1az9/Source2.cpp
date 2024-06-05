
#include <stdio.h>

int main()
{
	int a;
	scanf("%d", &a);
	printf("Cena bez dane: %d\n", a);
	printf("Predajna cena s danou 20%%: %.1lf", a * 1.20);


	return 0;
}