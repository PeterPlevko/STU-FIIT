#include <stdio.h>
#include <time.h>
#include <string.h>
#include <stdlib.h>
//#define _CRT_SECURE_NO_WARNINGS

//nakopirujte nasledujuci kod namiesto funkcie main

void z1_testovac(char *region, char **pointer, int minBlock, int maxBlock, int minMemory, int maxMemory, int testFragDefrag) {
	unsigned int allocated = 0;
	unsigned int mallocated = 0;
	unsigned int allocated_count = 0;
	unsigned int mallocated_count = 0;
	unsigned int i = 0;
	int random_memory = 0;
	int random = 0;
	memset(region, 0, 100000);
	random_memory = (rand() % (maxMemory-minMemory+1)) + minMemory;
	memory_init(region + 500, random_memory);
	if (testFragDefrag) {
		do {
			pointer[i] = memory_alloc(8);
			if (pointer[i])
				i++;
		} while (pointer[i]);
		for (int j = 0; j < i; j++) {
			if (memory_check(pointer[j])) {
				memory_free(pointer[j]);
			}
			else {
				printf("Error: Wrong memory check.\n");
			}
		}
	}
	i = 0;
	while (allocated <= random_memory-minBlock) {
		random = (rand() % (maxBlock-minBlock+1)) + minBlock;
		if (allocated + random > random_memory)
			continue;
		allocated += random;
		allocated_count++;
		pointer[i] = memory_alloc(random);
		if (pointer[i]) {
			i++;
			mallocated_count++;
			mallocated += random;
		}
	}
	for (int j = 0; j < i; j++) {
		if (memory_check(pointer[j])) {
			memory_free(pointer[j]);
		}
		else {
			printf("Error: Wrong memory check.\n");
		}
	}
	memset(region + 500, 0, random_memory);
	for (int j = 0; j < 100000; j++) {
		if (region[j] != 0) {
			region[j] = 0;
			printf("Error: Modified memory outside the managed region. index: %d\n",j-500);
		}
	}
	float result = ((float)mallocated_count / allocated_count) * 100;
	float result_bytes = ((float)mallocated / allocated) * 100;
	printf("Memory size of %d bytes: allocated %.2f%% blocks (%.2f%% bytes).\n", random_memory, result, result_bytes);
}

int main() {
	char region[100000];
	char* pointer[13000];
	srand(time(NULL));
	z1_testovac(region, pointer, 8, 24, 50, 100, 1);
	z1_testovac(region, pointer, 8, 1000, 10000, 20000, 0);
	z1_testovac(region, pointer, 8, 35000, 50000, 99000, 0);
	return 0;
}