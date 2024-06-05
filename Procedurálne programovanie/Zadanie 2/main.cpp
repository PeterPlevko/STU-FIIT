#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <assert.h>
#include <ctype.h>
#include <locale.h>
#include <math.h>
#include <setjmp.h>
#include <signal.h>
#include <stdarg.h>	
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>
#include <cstdio>

typedef struct predaj_domov
{
	char kategoria_ponuky[50];
	char miesto_ponuky[50];
	char ulica[100];
	int rozloha;
	int cena;
	char popis[200];
	struct predaj_domov* dalsi;

}PREDAJ_DOMOV;

void nacitaj(PREDAJ_DOMOV* pomocna)
{
	char buff[255];
	int i;

	for (i = 0; i < 6; i++)
	{
		gets(buff);
		strcat(buff, "\n");

		if (i == 0) strcpy(pomocna->kategoria_ponuky, buff);

		if (i == 1) strcpy(pomocna->miesto_ponuky, buff);

		if (i == 2) strcpy(pomocna->ulica, buff);

		if (i == 3) pomocna->rozloha = atoi(buff);

		if (i == 4) pomocna->cena = atoi(buff);

		if (i == 5) strcpy(pomocna->popis, buff);

	}
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// dalsia funkcia
void zmazanie_vsetkych_zaznamov(PREDAJ_DOMOV** zaciatok)//vyprazdni cely zoznam 
{
	PREDAJ_DOMOV* aktualny, * dalsi2;

	aktualny = *zaciatok;

	while (aktualny != NULL)
	{
		dalsi2 = aktualny->dalsi;
		free(aktualny);
		aktualny = dalsi2;
	}

	*zaciatok = NULL;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// dalsia funkcia
void male_na_velke(char* paslovo)//premeni slovo z malych pismen na velke pismena 
{
	int i;
	char* slovo;
	slovo = (char*)malloc(50 * sizeof(char));

	strcpy(slovo, paslovo);

	for (i = 0; i < strlen(slovo); i++)
	{

		if (slovo[i] >= 'a' && slovo[i] <= 'z')
		{
			slovo[i] = (slovo[i] - 32);
		}

	}
	strcpy(paslovo, slovo);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// dalsia funkcia
void nacita_zaznamy(PREDAJ_DOMOV** prvy)// nacita vstup zo suboru do spajaneho zoznamu
{
	if (*prvy != NULL) zmazanie_vsetkych_zaznamov(prvy);  // { *paHead = NULL; }

	int pocetzaznamov = 0;
	PREDAJ_DOMOV* pomocna = NULL, * aktualny = NULL;
	char buff[255];
	int i = 0;
	FILE* Fread_vstup;


	if ((Fread_vstup = fopen("reality.txt", "r")) == 0)
	{
		printf("Zaznamy neboli nacitane\n");
		return;
	}

	while (fgets(buff, 255, Fread_vstup) != NULL)
	{

		if (i == 0)
		{
			pomocna = (PREDAJ_DOMOV*)malloc(sizeof(PREDAJ_DOMOV));
		}

		if (i == 1) strcpy(pomocna->kategoria_ponuky, buff);
		if (i == 2) strcpy(pomocna->miesto_ponuky, buff);
		if (i == 3) strcpy(pomocna->ulica, buff);
		if (i == 4) pomocna->rozloha = atoi(buff);
		if (i == 5) pomocna->cena = atoi(buff);
		if (i == 6) strcpy(pomocna->popis, buff);

		i++;

		if (i == 7)
		{
			pocetzaznamov++;
			pomocna->dalsi = NULL;

			if (*prvy == NULL)
			{
				*prvy = pomocna;
				aktualny = pomocna;
			}

			else
			{
				aktualny->dalsi = pomocna;
				aktualny = aktualny->dalsi;
			}
			i = 0;
		}

	}

	printf("Nacitalo sa %d zaznamov\n", pocetzaznamov);
	fclose(Fread_vstup);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// dalsia funkcia
void vypise_zaznamy(PREDAJ_DOMOV** prvy) {// vypise prvky zo zaznamu
	PREDAJ_DOMOV* pomocna;

	pomocna = *prvy;

	int i = 1;

	while (pomocna != NULL)
	{
		printf("%d.\n", i++);
		printf("kategoria ponuky: %s", pomocna->kategoria_ponuky);
		printf("miesto ponuky: %s", pomocna->miesto_ponuky);
		printf("ulica: %s", pomocna->ulica);
		printf("rozloha v m2: %d\n", pomocna->rozloha);
		printf("cena: %d\n", pomocna->cena);
		printf("popis: %s", pomocna->popis);
		pomocna = pomocna->dalsi;
	}
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// dalsia funkcia
void prida_zaznam(PREDAJ_DOMOV** prvy)//prida zaznam na poziciu urcenu uzivatelom
{
	char buff[255];
	int poziciaprvku, pocetprvkov = 0, i;
	PREDAJ_DOMOV* novyprvy = NULL, * pred = NULL, * paPocetprvkovvzozname = NULL, * pomocna = NULL;

	novyprvy = *prvy;
	paPocetprvkovvzozname = *prvy;

	if (*prvy == NULL)
	{
		pomocna = (PREDAJ_DOMOV*)malloc(sizeof(PREDAJ_DOMOV));

		gets(buff);//zbavim sa znaku
		gets(buff);//zbavim sa znaku

		nacitaj(pomocna);

		*prvy = pomocna;
		pomocna->dalsi = NULL;
		return;
	}
	//ak chcem pridat do prazdneho zaznamu 

	while (paPocetprvkovvzozname != NULL)
	{
		pocetprvkov++;
		paPocetprvkovvzozname = paPocetprvkovvzozname->dalsi;
	}

	paPocetprvkovvzozname = *prvy;

	scanf("%d\n", &poziciaprvku);


	if (poziciaprvku > pocetprvkov)
	{
		for (i = 1; i < pocetprvkov; i++)// i mam jedna pretoze zaznamy uzivatel zadava od jednotky
		{
			novyprvy = novyprvy->dalsi;
		}

		pomocna = (PREDAJ_DOMOV*)malloc(sizeof(PREDAJ_DOMOV));

		nacitaj(pomocna);

		novyprvy->dalsi = pomocna;
		pomocna->dalsi = NULL;

	}
	//ked chcem pridat na koniec 

	if (poziciaprvku == 1)
	{
		pomocna = (PREDAJ_DOMOV*)malloc(sizeof(PREDAJ_DOMOV));

		nacitaj(pomocna);

		pomocna->dalsi = *prvy;
		*prvy = pomocna;

	}


	if (poziciaprvku > 1 && poziciaprvku < pocetprvkov)
	{
		for (i = 1; i < poziciaprvku; i++)
		{
			pred = novyprvy;
			novyprvy = novyprvy->dalsi;
		}

		pomocna = (PREDAJ_DOMOV*)malloc(sizeof(PREDAJ_DOMOV));

		nacitaj(pomocna);
		pred->dalsi = pomocna;
		pomocna->dalsi = novyprvy;
	}
	//pridam na miesto zadane uzivatelom 
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// dalsia funkcia
void zmaze_zaznam(PREDAJ_DOMOV** prvy)//zmazem kazdy zaznam ktori obsahuje string ktori zadal uzivatel 
{
	char vymaz[2] = "s";
	char miesto_record[50], slovo[200];
	int pocetzmazanych = 0;

	PREDAJ_DOMOV* predosly, * aktualny, * docasnyprvy;

	docasnyprvy = *prvy;

	getchar();
	gets(slovo);

	strcpy(miesto_record, docasnyprvy->miesto_ponuky);
	male_na_velke(miesto_record);
	miesto_record[strlen(miesto_record)] = 0;
	male_na_velke(slovo);
	slovo[strlen(slovo)] = 0;

	while (*prvy != NULL && strstr(miesto_record, slovo) != NULL)
	{
		predosly = *prvy;

		*prvy = (*prvy)->dalsi;

		free(predosly);

		strcpy(miesto_record, vymaz);
		pocetzmazanych++;

	}

	predosly = NULL;
	aktualny = *prvy;

	while (aktualny != NULL)
	{
		strcpy(miesto_record, aktualny->miesto_ponuky);
		male_na_velke(miesto_record);
		miesto_record[strlen(miesto_record)] = 0;

		if ((strstr(miesto_record, slovo)) != NULL)
		{

			if (predosly != NULL)
			{
				predosly->dalsi = aktualny->dalsi;
			}

			free(aktualny);
			aktualny = predosly->dalsi;
			pocetzmazanych++;

		}

		else
		{
			predosly = aktualny;
			aktualny = aktualny->dalsi;
		}

	}

	printf("Vymazalo sa %d zaznamov\n", pocetzmazanych);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// dalsia funkcia
void vypise_podla_ceny(PREDAJ_DOMOV** prvy)// uzivatel zada cenu a vypisu sa vsetky zaznamy s rovnakou alebo mensou cenou
{
	PREDAJ_DOMOV* pomocny = NULL;
	int x = 0, i = 1, hladajcena = 0;

	pomocny = *prvy;

	scanf("%d", &hladajcena);

	while (pomocny != NULL)
	{
		if ((pomocny->cena) <= hladajcena)
		{
			printf("%d.\n", i);
			printf("kategoria ponuky: %s", pomocny->kategoria_ponuky);
			printf("miesto ponuky: %s", pomocny->miesto_ponuky);
			printf("ulica: %s", pomocny->ulica);
			printf("rozloha v m2: %d\n", pomocny->rozloha);
			printf("cena: %d\n", pomocny->cena);
			printf("popis: %s", pomocny->popis);
			x++;
			i++;
		}
		pomocny = pomocny->dalsi;
	}

	if (x == 0) printf("V ponuke su len reality s vyssou cenou\n");
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// dalsia funkcia
void aktualizuje_zaznam(PREDAJ_DOMOV** prvy)//uzivatel zada miesto ponuky a aktualizuje sa zaznam s danym miestom ponuky
{
	char miesto_ponuky[50], miesto_record[50], buff[255];
	PREDAJ_DOMOV* pomocna = NULL, * paPocetprvkovvzozname = NULL;

	int pocetprvkov = 0, i = 0, j = 0, pocetzaznamov = 0;

	pomocna = *prvy;

	paPocetprvkovvzozname = *prvy;

	while (paPocetprvkovvzozname != NULL)
	{
		pocetprvkov++;
		paPocetprvkovvzozname = paPocetprvkovvzozname->dalsi;
	}

	scanf("%s", miesto_ponuky);
	gets(buff);

	for (j = 0; j < pocetprvkov; j++)
	{

		strcpy(miesto_record, pomocna->miesto_ponuky);
		male_na_velke(miesto_record);
		miesto_record[strlen(miesto_record)] = 0;
		male_na_velke(miesto_ponuky);
		miesto_ponuky[strlen(miesto_ponuky)] = 0;

		if (strstr(miesto_record, miesto_ponuky) != NULL)
		{
			nacitaj(pomocna);
			pocetzaznamov++;
		}
		pomocna = pomocna->dalsi;
	}
	printf("Aktualizovalo sa %d zaznamov\n", pocetzaznamov);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// dalsia funkcia
int main()
{
	PREDAJ_DOMOV* zaciatok_zaznamu = NULL;
	char pismeno;

	do
	{
		scanf("%c", &pismeno);

		switch (pismeno)
		{

		case 'n':nacita_zaznamy(&zaciatok_zaznamu); break;//je príkaz na načítanie záznamov o realitách zo súboru reality.txt do spájaného zoznamu štruktúr.

		case 'v':vypise_zaznamy(&zaciatok_zaznamu); break;//je príkaz na výpis celého spájaného zoznamu záznamov.

		case 'p':prida_zaznam(&zaciatok_zaznamu); break;//je príkaz na pridanie záznamu o realitnej ponuke do dynamického zoznamu.

		case 'z':zmaze_zaznam(&zaciatok_zaznamu); break;//je prikaz na zmazanie prvku zo zoznamu

		case 'h':vypise_podla_ceny(&zaciatok_zaznamu); break;//umožní používateľovi vyhľadať a vypísať všetky položky záznamu podľa ceny ponuky.

		case 'a':aktualizuje_zaznam(&zaciatok_zaznamu); break;//je príkaz na aktualizáciu (zmenu) záznamu podľa miesta ponuky.

		case 'k':zmazanie_vsetkych_zaznamov(&zaciatok_zaznamu); break;//je príkaz na ukončenie programu.

		}

	} while (pismeno != 'k');

	return 0;
}