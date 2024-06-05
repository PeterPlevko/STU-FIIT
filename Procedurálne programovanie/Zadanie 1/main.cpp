#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <math.h>
#include <stdlib.h>
#include <string.h>
#include <stdio.h> 
#include <ctype.h>

void v(FILE** paFread)//prva funkcia precita textak
{
	int i = 0;
	char cita_subor[50];

	if ((*paFread = fopen("autobazar.txt", "r")) == 0)
	{
		printf("Neotvoreny subor\n");
		return;
	}

	while (fgets(cita_subor, sizeof cita_subor, *paFread) != NULL)
	{
		if (i == 0) printf("meno priezvisko: %s", cita_subor);
		if (i == 1) printf("SPZ: %s", cita_subor);
		if (i == 2) printf("typ auta: %s", cita_subor);
		if (i == 3) printf("cena: %s", cita_subor);
		if (i == 4) printf("datum: %s", cita_subor);
		if (i == 5) printf("\n");
		i++;
		if (i == 6)
		{
			i = 0;
		}
	}
}

void o(FILE** paFread)//vypocita odmenu podla poctu predanych aut
{
	if (*paFread == NULL) { return; }
	int datumuzivatela;
	int i = 0;
	double odmena = 0;
	char cita_subor[50];
	char SPZ[50];
	char meno_priezvisko[50];
	char typ_auta[50];
	int typ_autaint;
	char cena[50];
	double cenadouble;
	char datum[50];
	int datumint;
	int dlzka, dlzka1;

	scanf("%d", &datumuzivatela);
	datumuzivatela = datumuzivatela - 10000;
	rewind(*paFread);

	while (fgets(cita_subor, sizeof cita_subor, *paFread) != NULL)
	{
		if (i == 0)
		{
			strcpy(meno_priezvisko, cita_subor);
			dlzka = strlen(meno_priezvisko);
			meno_priezvisko[dlzka - 1] = 0;
		}

		if (i == 1)
		{
			strcpy(SPZ, cita_subor);
			dlzka1 = strlen(SPZ);
			SPZ[dlzka1 - 1] = 0;
		}

		if (i == 2)
		{
			strcpy(typ_auta, cita_subor);
			typ_autaint = atoi(typ_auta);
		}

		if (i == 3)
		{
			strcpy(cena, cita_subor);
			cenadouble = atof(cena);
		}

		if (i == 4)
		{
			strcpy(datum, cita_subor);
			datumint = atoi(datum);
		}

		if (i == 5)
		{
			if (datumuzivatela >= datumint) // pracuje dlhsie ako rok davam mu odmenu
			{
				if (typ_autaint == 0) odmena = (cenadouble / 100) * 5.1;
				if (typ_autaint == 1) odmena = (cenadouble / 100) * 2.3;
			}
			else odmena = 0;
			if (odmena == 0);
			else printf("%s %s %.2lf\n", meno_priezvisko, SPZ, odmena);
		}

		i++;
		if (i == 6)
		{
			i = 0;
		}

	}

}


void n(FILE** paFread, char** paSPZ, int* papocetzaznamov)
{
	int x = 0;
	if (*paFread == NULL)
	{
		return;
	}
	int i = 0, j = 1;
	char cita_subor[50];
	char SPZ1[200] = "";

	rewind(*paFread);

	while (fgets(cita_subor, sizeof cita_subor, *paFread) != NULL)
	{
		if (i == 0);

		if (i == 1)
		{
			x++;

			int zmaz = 7;
			memmove(&cita_subor[zmaz], &cita_subor[zmaz + 1], strlen(cita_subor) - zmaz);

			strcat(SPZ1, cita_subor);

		}

		if (i == 2);
		if (i == 3);
		if (i == 4);
		if (i == 5);
		i++;
		j++;
		if (i == 6) i = 0;

	}
	*papocetzaznamov = x;
	*paSPZ = (char*)calloc(100, sizeof(char));
	strcat(*paSPZ, SPZ1);
}

void s(char** paSPZ)// zadanie s vypise pole v urcitom slede
{
	if (*paSPZ == NULL)
	{
		printf("Pole nie je vytvorene\n");
		return;
	}

	char* returned_str;
	returned_str = (char*)malloc(100 * sizeof(char));
	strcpy(returned_str, *paSPZ);
	int c = 0;
	int i, x = 0;

	for (i = 0; i < strlen(returned_str); i++, x++)
	{
		if (x < 2) printf("%c", returned_str[i]);
		if (x == 2) printf(" ");
		if (x >= 2 && x < 5) printf("%c", returned_str[i]);
		if (x == 5)printf(" ");
		if (x >= 5 && x < 7)printf("%c", returned_str[i]);
		if (x == 6)printf("\n");

		if (x > 6)
		{
			c++;
			if (c == 1 || c == 2) printf("%c", returned_str[i]);
			if (c == 2) printf(" ");
			if (c == 3 || c == 4 || c == 5) printf("%c", returned_str[i]);
			if (c == 5)printf(" ");
			if (c == 6 || c == 7)printf("%c", returned_str[i]);
			if (c == 7)printf("\n");
			if (c == 7)c = 0;
		}

	}
}
void m(char** paSPZ)
{
	if (*paSPZ == NULL)
	{
		printf("Pole nie je vytvorene\n");
		return;
	}

	char* returned_str;
	returned_str = (char*)malloc(100 * sizeof(char));
	strcpy(returned_str, *paSPZ);
	int i = 0, max = 0;
	int vyskyt[255] = { 0 };
	char string[255];
	int pole;

	for (i = 0; i <= strlen(returned_str); i++)
	{
		string[i] = returned_str[i];
	}

	i = 0;
	while (string[i] != '\0')
	{
		pole = (int)string[i];
		vyskyt[pole] += 1;
		i++;
	}

	for (i = 0; i < 255; i++)
	{
		if (vyskyt[i] > vyskyt[max]) max = i;
	}

	printf("%c %d\n", max, vyskyt[max]);
}

void p(char** paSPZ)
{
	if (*paSPZ == NULL)
	{
		printf("Pole nie je vytvorene\n");
		return;
	}

	char* druhepole;
	char* pole;
	int i;
	char* returned_str;
	returned_str = (char*)malloc(100 * sizeof(char));
	strcpy(returned_str, *paSPZ);
	druhepole = (char*)calloc(100, sizeof(char));
	pole = (char*)calloc(100, sizeof(char));
	strcat(pole, returned_str);
	int j = 0;

	for (i = 0; i < strlen(returned_str); i++)
	{
		if (isalpha(pole[i]) == 0)pole[i] = '0';
	}

	for (i = 0; i < strlen(returned_str); i++)
	{
		if (pole[i] != '0')
		{
			druhepole[j] = pole[i];
			j++;
		}
	}


	for (i = 0; i < strlen(druhepole); i++)
	{
		if (druhepole[i] == druhepole[i + 3] && druhepole[i + 1] == druhepole[i + 2])
		{
			printf("%c%c", druhepole[i], druhepole[i + 1]);
			if (i < strlen(druhepole)) printf("\n");
		}
	}
}

void z(char** paSPZ)
{
	if (*paSPZ == NULL)
	{
		return;
	}

	int* pocetprvkovvpoli;
	pocetprvkovvpoli = (int*)calloc(100, sizeof(int));
	char poleslov[100][100] = { '0' };
	char poleslov1[100][100] = { '0' };
	char* druhepole;
	char* pole;
	int i;
	char* returned_str;
	returned_str = (char*)malloc(100 * sizeof(char));
	strcpy(returned_str, *paSPZ);
	char* tretiepole;
	tretiepole = (char*)calloc(100, sizeof(char));
	druhepole = (char*)calloc(100, sizeof(char));
	pole = (char*)calloc(100, sizeof(char));
	strcat(pole, returned_str);
	int j = 0;
	char** orderedIds;

	for (i = 0; i <= strlen(returned_str); i++)
	{
		if (isalpha(pole[i]) == 0)pole[i] = '0';
	}

	for (i = 0; i <= strlen(returned_str); i++)
	{
		if (pole[i] != '0')
		{
			druhepole[j] = pole[i];
			j++;
		}
	}

	int a = 2, b = 3;

	for (i = 0; i <= strlen(druhepole); i++)
	{
		if (i == a)
		{
			druhepole[i] = '0';
			a = a + 4;
		}

		if (i == b)
		{
			druhepole[i] = '0';
			b = b + 4;
		}
	}

	j = 0;
	for (i = 0; i <= strlen(druhepole); i++)
	{
		if (druhepole[i] != '0')
		{
			tretiepole[j] = druhepole[i];
			j++;
		}
	}

	int x = 0, y = 0;
	j = 0;

	for (i = 0; i < strlen(tretiepole); i++)
	{
		poleslov[x][y] = tretiepole[i];
		y = y + 1;
		if (y == 2)
		{
			y = 0;
			x = x + 1;
		}

	}

	int zistovatel;
	int kkt = 0;
	x = 0;

	for (i = 0; i <= (strlen(tretiepole) / 2 - 1); i++)
	{
		for (j = 0; j <= strlen(tretiepole) / 2; j++)
		{
			zistovatel = strcmp(poleslov[i], poleslov[j]);
			if (zistovatel == 0)
			{
				pocetprvkovvpoli[i] = pocetprvkovvpoli[i] + 1;
				if (zistovatel == 0 && pocetprvkovvpoli[i] >= 2) poleslov[j][1] = ' ';
			}
		}
	}

	int max = 0;
	zistovatel = 0;
	for (i = 0; i <= strlen(tretiepole); i++)
	{
		if (pocetprvkovvpoli[i] > pocetprvkovvpoli[max]) max = i;
	}

	for (i = 0; i <= strlen(tretiepole); i++)
	{
		if (pocetprvkovvpoli[i] == pocetprvkovvpoli[max])
		{
			printf("%s %d \n", poleslov[i], pocetprvkovvpoli[i]);
		}
	}
}

int main()
{
	FILE* Fread = NULL;
	char* SPZ = NULL;
	int pocetzaznamov;
	char pismeno;
	do
	{
		scanf("%c", &pismeno);

		switch (pismeno)
		{

		case 'v':v(&Fread); break;//funkcia na vypis zaznamov

		case 'o':o(&Fread); break;//funkcia na vypis odmeny

		case 'n':n(&Fread, &SPZ, &pocetzaznamov); break;//funkcia na vytvorenie dinamickeho pola

		case 's':s(&SPZ); break;//vypise spz specialnym sposobom

		case 'm':m(&SPZ); break;//vypise najcastejsie sa vyskitujuci sa znak a jeho pocetnost

		case 'p':p(&SPZ); break;//ak je palindrom vypise skratku okresu

		case 'z':z(&SPZ); break;//vypise pocetnost znakov

		}
	} while (pismeno != 'k');

	fclose(Fread);


	return 0;
}