#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
int main()
{

	char str[20];
	int countL = 0;
	int  countU;
	int counter;
	int s = 0;
	FILE* Fread1;
	FILE* Fread2;
	char c, p;
	int dlzka1 = 0, dlzka2 = 0;
	int pocetroznychznakov = 0;

	Fread1 = fopen("prvy.txt", "r");
	Fread2 = fopen("druhy.txt", "r");


	int vysledok = 0;

	while (c = fgetc(Fread1) != EOF)
	{

		dlzka1++;
	}

	while (p = fgetc(Fread2) != EOF)
	{
		dlzka2++;
	}
	rewind(Fread1);
	rewind(Fread2);
	while (((c = fgetc(Fread1)) != EOF) && (p = fgetc(Fread2)) != EOF)
	{
		if (c != p) pocetroznychznakov++;
	}
	if (pocetroznychznakov == 0)printf("Subory su identicke\n");
	if (pocetroznychznakov != 0)printf("Pocet roznych znakov: %d\n", pocetroznychznakov);

	if (dlzka1 > dlzka2)vysledok = dlzka1 - dlzka2;
	if (dlzka2 > dlzka1)vysledok = dlzka2 - dlzka1;

	if (dlzka1 != dlzka2)printf("Jeden zo suborov je dlhsi o %d znakov", vysledok);






	fclose(Fread1);
	fclose(Fread2);

	return 0;

}