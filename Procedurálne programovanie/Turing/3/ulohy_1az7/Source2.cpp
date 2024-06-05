
#include <stdio.h>

int main(void)
{

	int a, b, i, j, flag;


	scanf("%d", &a);



	scanf("%d", &b);


	if (a <= 0) a = 1;

	for (i = a; i <= b; i++) {
		if (a < 0) { break; }

		if (i == 1 || i == 0)
			continue;


		flag = 1;

		for (j = 2; j <= i / 2; ++j) {
			if (i % j == 0) {
				flag = 0;
				break;
			}
		}


		if (flag == 1)
			printf("%d ", i);
	}



	return 0;
}