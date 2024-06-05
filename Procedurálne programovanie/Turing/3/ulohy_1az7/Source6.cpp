// uloha3-7.c -- Peter Plevko, 4.11.2019 21:10

#include <stdio.h>

int main()
{
	char c1, c2, * p_c;

	while ((c1 = getchar()) != '*')
	{
		p_c = &c2;
		*p_c = c1;
		//dalsie riesenie	
		//p_c=&c1; 
		//c2=*p_c;
		printf("c1: %c (%p), c2: %c (%p), p_c: %c (%p)\n", c1, &c1, c2, &c2, *p_c, p_c);
	}
	return 0;
}