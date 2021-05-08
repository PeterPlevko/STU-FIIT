#include <stdio.h>


extern char string[100];
extern FILE* file;

extern void vypis(char* str);
extern void vypis_suboru(FILE* file, int sirka);

int main() {
	scanf("%s\n", string);

	int sirka;
	scanf("%d\n", &sirka);

	vypis(string);
	vypis_suboru(file, sirka);

	return 0;
}
///main
#include <stdio.h>
#include <string.h>

FILE* file;
char string[100];

void vypis_suboru(FILE* file, int sirka) {

	for (int i = 0; i < sirka; i++) printf("*");

	printf("\n");
	char str[200];
	int lineLength = 0;

	file = fopen(string, "r");
	printf("*");

	for (int i = 0; i < 1; i++) printf(" ");

	while (fgets(str, 198, file) > 0)
	{
		char* token = strtok(str, " ");
		while (token)
		{
			if (token[strlen(token) - 1] == '\n')
				token[strlen(token) - 1] = '\0';
			int strLength = strlen(token);

			if (strLength + lineLength + 1 <= (sirka - 2 * 1 - 2 * 1))
			{
				if (lineLength)
				{
					lineLength++;
					printf(" ");
				}
				printf("%s", token);
			}
			else
			{
				for (int i = 0; i < (sirka - 2 * 1 - 2 * 1) - lineLength + 1; i++) printf(" ");

				printf("*\n*");
				for (int i = 0; i < 1; i++) printf(" ");
				printf("%s", token);
				lineLength = 0;
			}

			lineLength += strLength;
			token = strtok(NULL, " ");
		}
	}

	for (int i = 0; i < (sirka - 2 * 1 - 2 * 1) - lineLength + 1; i++) printf(" ");
	printf("*\n");
	for (int i = 0; i < sirka; i++) printf("*");
	printf("\n");
}
//// subor c
#include <stdio.h>
#include <string.h>

char string[100];
void vypis(char* str) {

	for (int i = 0; i < 2 + 2 + strlen(string); i++) printf("*");
	printf("\n");
	printf("*");

	for (int i = 0; i < 1; i++) printf(" ");
	printf("%s", string);
	for (int i = 0; i < 1; i++) printf(" ");

	printf("*\n");
	for (int i = 0; i < 2 + 2 + strlen(string); i++) printf("*");
	printf("\n");

}///retazec c
Janko Hrasko, Popoluska, Dlhy Siroky a Bystrozraky
Snehulienka
// vstup