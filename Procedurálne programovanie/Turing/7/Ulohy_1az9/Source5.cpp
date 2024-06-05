// uloha7-7.c -- Peter Plevko, 14.11.2019 15:39

#include <stdio.h>
#include<string.h> 
int strinsert(char* dst, int len, const char* src, int offset)
{
	int dl = strlen(dst), sl = strlen(src);
	if (offset > dl || dl + sl >= len)
		return 1;
	int i;
	for (i = dl + sl; i >= offset + sl; i--)
		dst[i] = dst[i - sl];
	for (i = 0; i < sl; i++)
		dst[offset + i] = src[i];
	return 0;

}

int main()
{
	char dst[100], src[100];
	int len, offset;
	scanf("%s %d %s %d", dst, &len, src, &offset);

	if (strinsert(dst, len, src, offset))
		printf("Nepodarilo sa vlozit retazec.\n");
	else
		printf("%s", dst);
	return 0;
}