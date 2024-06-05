// uloha12-1.c -- Peter Plevko, 11.12.2019 08:31

#include <stdio.h>

int main()
{
	int sucetpola = 0;
	int arr[1000];
	int temp, prva_cifra = 0, posledna_cifra = 0;
	int x = 0, y = 0, i = 0, j = 0, pole[1000];
	int s = 0;
	int cislo;
	int dvojrozmernepole[1000][1000];


	while (scanf("%d", &cislo) == 1)
	{
		pole[i] = cislo;
		i++;
		s++;
	}


	for (i = 0; i < s; i++)
	{
		posledna_cifra = pole[i] % 10;
		prva_cifra = (pole[i] / 10) % 10;

		dvojrozmernepole[prva_cifra][i] = posledna_cifra;

	}
	// sort
	x = 0;

	for (x = 0; x < s; x++)
	{
		for (i = 0; i < s; i++)
		{
			/*
			 * Place currently selected element array[i]
			 * to its correct place.
			 */
			for (j = i + 1; j < s; j++)
			{
				/*
				 * Swap if currently selected array element
				 * is not at its correct position.
				 */
				if (dvojrozmernepole[x][i] > dvojrozmernepole[x][j])
				{
					temp = dvojrozmernepole[x][i];
					dvojrozmernepole[x][i] = dvojrozmernepole[x][j];
					dvojrozmernepole[x][j] = temp;
				}
			}
		}

	}

	//sort




	//



	for (i = 0; i < s; i++)
	{
		sucetpola = 0;
		////sucet pola

		for (x = 0; x < s; x++)
		{
			sucetpola = sucetpola + dvojrozmernepole[i][x];
		}

		////sucet pola

		if (sucetpola != 0) printf("%d | ", i);

		for (y = 0; y < s; y++)
		{
			if (dvojrozmernepole[i][y] != 0) printf("%d ", dvojrozmernepole[i][y]);
		}


		if (sucetpola != 0)printf("\n");
	}




	return 0;
}