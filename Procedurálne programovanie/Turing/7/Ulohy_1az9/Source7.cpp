#include <stdio.h>
#include <stdlib.h>

// tieto funkcie mozes pouzit vo svojom programe
int strinsert(char* dst, int len, const char* src, int offset);
int strdelete(char* str, int n, int offset);

int main()
{
	char instruction[5];
	char* str = malloc(50 * sizeof(char));
	int strLength = 0;

	while (scanf("%s", instruction) > 0) {

		if (!strcmp(instruction, "read")) {
			scanf("%s", str);
			scanf("%d\n", &strLength);

			str = realloc(str, strLength * sizeof(char));

		}
		else if (!strcmp(instruction, "ins")) {

			int offset;
			char str2[50];

			scanf("%d %s\n", &offset, str2);

			if ((!strLength && offset) || strinsert(str, strLength, str2, offset)) {
				printf("%s do retazca nie je mozne vlozit podretazec od zvolenej pozicie\n", str);
				continue;
			}

		}
		else if (!strcmp(instruction, "del")) {
			int offset;
			int n;

			scanf("%d %d\n", &offset, &n);

			if (!strLength || strdelete(str, n, offset)) {
				printf("%s z retazca nie je mozne vymazat znaky\n", str);
				continue;
			}
		}

		if (strLength)
			printf("%s\n", str);
	}
	return 0;
}