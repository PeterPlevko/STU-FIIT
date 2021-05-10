#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <math.h>

//////////////////// DEBUGGING ////////////////////
#define DEBUG 0

#define MemGet(type, offset) (*((type*)(memory + (offset))))
#define MemSet(type, offset, value) (MemGet(type, offset) = (value))

#define START sizeof(unsigned char)
#define ListSize (MemGet(unsigned char, 0) / 4)
#define Index (MemGet(unsigned char, 0) % 4)
#define TypeSize TypeReturn(Index)
#define HEADER (START + ListSize * TypeSize)


char *memory = NULL;



long long MemRead(long long offset) {
	
	int index = Index;
	switch (index) {
		case 0:
			return MemGet(char, offset);
		case 1:
			return MemGet(short, offset);
		case 2:
			return MemGet(int, offset);
		case 3:
			return MemGet(long long, offset);
	}
}


void MemWrite(long long offset, long long value) {

	int index = Index;
	switch (index) {
		case 0:
			MemSet(char, (char)offset, (char)value);
			return;
		case 1:
			MemSet(short, (short)offset, (short)value);
			return;
		case 2:
			MemSet(int, (int)offset, (int)value);
			return;
		case 3:
			MemSet(long long, offset, value);
			return;
	}
}


int TypeReturn(int index) {

	switch (index) {
	case 0:
		return sizeof(char);
	case 1:
		return sizeof(short);
	case 2:
		return sizeof(int);
	case 3:
		return sizeof(long long);
	}
}


unsigned long long power(unsigned long long base, int power) {

	if (power == 0) {
		return 1;
	}

	int baseBase = base;
	for (int i = 1; i < power; i++) {
		base *= baseBase;
	}
	return base;
}


int getFitList(long long size) {

	DEBUG ? printf("FITLIST DEBUGGING: {\n") : 0;
	int target = 0;

	while (size > 16) {
		size /= 4;
		target++;
	}

	if (target >= ListSize) {
		target = ListSize - 1;
	}

	DEBUG ? printf("FitList cislo: %d\n}\n", target) : 0;
	return target;
}


int memFindFree(long long size) {

	DEBUG ? printf("FINDFREE DEBUGGING: {\nVelkost hladanej pamate: %lld\n", size) : 0;
	int target = getFitList(size);

	for (int i = target; i < ListSize; i++) {

		long long offset = MemRead(START + i * TypeSize);
		long long smallestSpace = 0;
		DEBUG ? printf("Zoznam z offsetu: %lld\n", offset) : 0;

		while (offset != 0) {

			long long targetSize = MemRead(offset - TypeSize);
			DEBUG ? printf("Velkost pamate nejakeho bloku: %lld\n", targetSize) : 0;

			//Enough space for block
			if (targetSize >= size) {
				if (smallestSpace == 0 || smallestSpace > targetSize) {
					smallestSpace = MemRead(offset - TypeSize);
				}
				else if (smallestSpace == targetSize) {
					break;
				}
			}
			//Move to next element
			offset = MemRead(offset);
		}

		DEBUG ? printf("Velkost pamate, ktora bude priradena: %lld\n}\n", smallestSpace) : 0;
		if (smallestSpace != 0) {

			offset = MemRead(START + i * TypeSize);
			while (offset != 0) {

				long long targetSize = MemRead(offset - TypeSize);

				//Enough space for block AND it's the smallest
				if (targetSize >= size) {
					if (smallestSpace == targetSize) {
						return offset;
					}
				}
				else {
					//Move to next element
					offset = MemRead(offset);
				}
			}
		}
	}

	DEBUG ? printf("Nenasiel sa volny blok\n}\n") : 0;
	//Not enough/no space
	return 0;
}


void setBoundaries(long long offset, long long size, long long value) {

	MemWrite(offset - TypeSize, value);
	MemWrite(offset + size, value);
}


void eraseFromList(long long offset) {

	//Set next of previous to current next
	MemWrite(MemRead(offset + TypeSize), MemRead(offset));
	if (MemRead(offset) != 0) {
		//Set previous of next to current previous
		MemWrite(TypeSize + MemRead(offset), MemRead(TypeSize + offset));
	}
}


void addToListStart(long long offset, long long size) {

	long long target = getFitList(size);
	if (MemRead(START + TypeSize * target) != 0) {
		//Set previous of "first element" to offset
		MemWrite(TypeSize + MemRead(START + TypeSize * target), offset);
	}

	//Set next of offset to "first element"
	MemWrite(offset, MemRead(START + TypeSize * target));
	//Set previous of offset to beginning
	MemWrite(offset + TypeSize, START + TypeSize * target);

	//Set next of beginning to offset
	MemWrite(START + TypeSize * target, offset);
}


void split(long long offset, long long blockSize, long long targetSize) {

	DEBUG ? printf("SPLIT DEBUGGING: {\nVelkost pamate:\noriginal %lld\nnova: %lld\n}\n", blockSize, targetSize) : 0;
	long long neighbourOffset = offset + blockSize + 2 * TypeSize, neighbourSize = targetSize - blockSize - 2 * TypeSize;
	setBoundaries(offset, blockSize, -blockSize);
	setBoundaries(neighbourOffset, neighbourSize, neighbourSize);
	addToListStart(neighbourOffset, neighbourSize);
}


void mergeRight(long long offset1, long long offset2, long long size1, long long size2) {

	DEBUG ? printf("MERGE DEBUGGING: {\nVelkost pamate:\nvlavo %lld\nvpravo %lld\n}\n", size1, size2) : 0;
	eraseFromList(offset1);
	eraseFromList(offset2);

	long long newSize = size1 + size2 + 2 * TypeSize;
	setBoundaries(offset1, newSize, newSize);
	addToListStart(offset1, newSize);
}



void* memory_alloc(unsigned long long size) {

	DEBUG ? printf("ALLOC DEBUGGING: {\nVelkost pozadovanej pamate: %lld\n", size) : 0;
	long long isize = (long long)size;
	if (isize == 0) {
		return 0;
	}
	//Smallest allocable size is 2 * TypeSize
	if (isize < TypeSize * 2) {
		isize = TypeSize * 2; 
	}
	DEBUG ? printf("Velkost pozadovanej pamate po uprave: %lld\n", isize) : 0;

	long long offset = memFindFree(isize);
	if (offset == 0) {
		//No space for the block
		DEBUG ? printf("Nenasiel sa volny blok\n}\n") : 0;
		return 0;
	}

	long long targetSize = MemRead(offset - TypeSize);
	DEBUG ? printf("Velkost bloku co sa nasiel: %lld\n", targetSize) : 0;
	eraseFromList(offset);
	//Change to negative size -> it's allocated
	setBoundaries(offset, targetSize, -targetSize);

	//Enough space for another block
	if (targetSize >= isize + 4 * TypeSize) {
		split(offset, isize, targetSize);
		DEBUG ? printf("Rozdeluje sa blok - vytvara sa novy prazdny\n") : 0;
	}

	DEBUG ? printf("\n") : 0;
	return memory + offset;
}


int memory_check(void* ptr) {

	DEBUG ? printf("CHECK DEBUGGING: {\n") : 0;
	long long offset = HEADER + TypeSize;
	long long header = MemRead(offset - TypeSize);
	
	while (header != 0) {
		long long footer = MemRead(offset + abs(header));
		DEBUG ? printf("offset: %lld\nheader: %lld\nfooter: %lld\n", offset, header, footer) : 0;
		if (offset == (char*)ptr - memory) {
			if (header < 0 && header == footer) {
				DEBUG ? printf("Platny pointer\n}\n") : 0;
				return 1;
			}
			else {
				DEBUG ? printf("Neplatny pointer\n}\n") : 0;
				return 0;
			}
		}
		offset += abs(header) + 2 * TypeSize;
		header = MemRead(offset - TypeSize);
	}

	DEBUG ? printf("Neplatny pointer\n}\n") : 0;
	return 0;
}


int memory_free(void* valid_ptr) {

	DEBUG ? printf("FREE DEBUGGING: {\n") : 0;
	//It's not a valid pointer
	if (memory_check(valid_ptr) == 0) {
		DEBUG ? printf("Nespravny pointer\n}\n") : 0;
		return 1;
	}

	long long offset = (char*)valid_ptr - memory;
	long long size = -MemRead(offset - TypeSize);
	DEBUG ? printf("Velkost pamate pri uvolnovani: %lld\n", size) : 0;
	setBoundaries(offset, size, size);
	addToListStart(offset, size);

	//Merge right if not at the end
	long long sizeRight = MemRead(offset + size + TypeSize);
	if (sizeRight > 0) {
		long long offsetRight = offset + size + 2 * TypeSize;
		mergeRight(offset, offsetRight, size, sizeRight);
		size = MemRead(offset - TypeSize);
		DEBUG ? printf("Spojene vpravo, nova velkost: %lld\n", size) : 0;
	}

	//Merge left if not at the beginning
	if (offset > HEADER + 3 * TypeSize) {
		long long sizeLeft = MemRead(offset - 2 * TypeSize);
		if (sizeLeft > 0) {
			long long offsetLeft = offset - 2 * TypeSize - sizeLeft;
			mergeRight(offsetLeft, offset, sizeLeft, size);
			DEBUG ? printf("Spojene vlavo, nova velkost: %lld\n", size + sizeLeft) : 0;
		}
	}

	DEBUG ? printf("\n") : 0;
	return 0;
}


void memory_init(void* ptr, unsigned long long size) {

	DEBUG ? printf("INIT DEBUGGING: {\nVelkost pamate: %lld\n", size) : 0;
	//Test if there is enough memory for at least one block
	if (size < 7) {
		printf("Not enough space in memory\n");
		return;
	}
	memory = (char*)ptr;

	int typeIndex;
	if (size < power(2, (sizeof(char) * 8) - 1)) {
		typeIndex = 0;
	}
	else if (size < power(2, (sizeof(short) * 8) - 1)) {
		typeIndex = 1;
	}
	else if (size < power(2, (sizeof(int) * 8) - 1)) {
		typeIndex = 2;
	}
	else {
		typeIndex = 3;
	}

	MemSet(unsigned char, 0, typeIndex);
	DEBUG ? printf("Index typu dat: %d\n", typeIndex) : 0;

	//Create a list of pointers
	long long numOfPointers = 1;
	long long tsize = size;
	while (tsize > 64) {
		tsize /= 4;
		MemWrite(START + (numOfPointers++ - 1) * TypeSize, 0);
	}
	DEBUG ? printf("Pocet pointerov: %d\n", numOfPointers) : 0;

	//Set the index flag
	MemSet(unsigned char, 0, numOfPointers * 4 + typeIndex);
	MemWrite(HEADER - TypeSize, 0);

	long long memAvailable = size - HEADER - 3 * TypeSize;
	DEBUG ? printf("Velkost dostupnej pamate: %lld\n}\n", memAvailable) : 0;
	setBoundaries(HEADER + TypeSize, memAvailable, memAvailable);
	MemWrite(size - TypeSize, 0);

	//Set beginning pointer
	MemWrite(HEADER - TypeSize, HEADER + TypeSize);

	//Set pointers inside the free block
	MemWrite(HEADER + TypeSize, NULL);
	MemWrite(HEADER + 2 * TypeSize, HEADER - TypeSize);
}


void TEST(long long size, long long small, long long bigger, long long mega, int repeat) {

	srand(time(NULL));
	int listSize = size / small * sizeof(char*) * 10;
	char** list = (char**)malloc(listSize);

	for (int rep = 0; rep < repeat; rep++) {
		for (int i = 0; i < size / small; i++) {
			list[i] = (char*)memory_alloc(rand() % small);
			if (memory_check(list[i]) != 0) {
				printf("Alokovane small: %d\n", i);
			}
			else {
				printf("Nealokovane small: %d\n", i);
			}
		}

		for (int i = 0; i < size / small; i++) {
			if (memory_check(list[i]) != 0) {
				if (memory_free(list[i]) == 0) {
					printf("Uvolnene small: %d\n", i);
				}
				else {
					printf("Problem s uvolnenim small: %d\n", i);
				}
			}
		}

		for (int i = 0; i < size / bigger * 2; i++) {
			list[i] = (char*)memory_alloc(rand() % bigger + bigger / 3);
			if (memory_check(list[i]) != 0) {
				printf("Alokovane bigger: %d\n", i);
			}
			else {
				printf("Nealokovane bigger: %d\n", i);
			}
		}

		for (int i = 0; i < size / bigger * 2; i++) {
			if (memory_check(list[i]) != 0) {
				if (memory_free(list[i]) == 0) {
					printf("Uvolnene bigger: %d\n", i);
				}
				else {
					printf("Problem s uvolnenim bigger: %d\n", i);
				}
			}
		}

		for (int i = 0; i < size / mega * 10; i++) {
			list[i] = (char*)memory_alloc(rand() % mega + mega / 2);
			if (memory_check(list[i]) != 0) {
				printf("Alokovane MEGA: %d\n", i);
			}
			else {
				printf("Nealokovane MEGA: %d\n", i);
			}
		}

		for (int i = 0; i < size / mega * 10; i++) {
			if (memory_check(list[i]) != 0) {
				if (memory_free(list[i]) == 0) {
					printf("Uvolnene MEGA: %d\n", i);
				}
				else {
					printf("Problem s uvolnenim MEGA: %d\n", i);
				}
			}
		}
	}
	free(list);
}


int main() {

	//Vypis pamate: i char | int
	/*printf("\n\n");
	for (int i = 0; i < 50; i++) {
		printf("%d -- %d | %d\n", i, MemGet(unsigned char, i), MemGet(int, i));
	}
	printf("\n\n");
	*/


	///////////////////////// TESTOVANIE /////////////////////////
	//Test pre vacsiu pamat a najprv mini nahodne, potom male nahodne, potom vacsie nahodne bloky
	/*char* region = (char*)malloc(50 * sizeof(char));
	memory_init(region, 50);
	TEST(50, 5, 10, 20, 5);
	free(region);
	*/


	///////////////////////// TESTOVANIE /////////////////////////
	//Test pre vacsiu pamat a najprv mini nahodne, potom male nahodne, potom vacsie nahodne bloky
	/*char* region = (char*)malloc(500 * sizeof(char));
	memory_init(region, 500);
	TEST(500, 5, 50, 100, 5);
	free(region);
	*/


	///////////////////////// TESTOVANIE /////////////////////////
	//Test pre vacsiu pamat a najprv male nahodne, potom vacsie nahodne, potom velke nahodne bloky
	/*char* region = (char*)malloc(10000 * sizeof(char));
	memory_init(region, 10000);
	TEST(10000, 50, 500, 5000, 5);
	free(region);
	*/


	///////////////////////// TESTOVANIE /////////////////////////
	//Test pre velku pamat a najprv male nahodne, potom vacsie nahodne, potom velke nahodne bloky
	//char* region = (char*)malloc(500000 * sizeof(char));
	//memory_init(region, 500000);
	//TEST(500000, 50, 5000, 50000, 5);
	//free(region);
	


	///////////////////////// TESTOVANIE /////////////////////////
	//Test pre velkuvelku pamat a najprv male nahodne, potom vacsie nahodne, potom velke nahodne bloky
	/*char* region = (char*)malloc(1000000 * sizeof(char));
	memory_init(region, 1000000);
	TEST(1000000, 50, 5000, 500000, 5);
	free(region);
	*/


	///////////////////////// TESTOVANIE /////////////////////////
	//Test pre priradenie celej pamati malym blokom, uvolnenie kazdeho druheho a nasledne znovu priradenie tychto blokov a uvolnenie vsetkych
	/*char* region = (char*)malloc(1000000 * sizeof(char));
	memory_init(region, 1000000);

	char** list = (char**)malloc(62497 * sizeof(char*));
	for (int i = 0; i < 62497; i++) {
		list[i] = (char*)memory_alloc(8);
		if (list[i] == 0) {
			printf("Problem1: %d\n", i);
		}
	}

	for (int i = 0; i < 62497; i += 2) {
		if (list[i] != 0) {
			if (memory_free(list[i]) != 0) {
				printf("Problem2: %d\n", i);
			}
		}
	}

	for (int i = 0; i < 62497; i += 2) {
		list[i] = (char*)memory_alloc(8);
		if (list[i] == 0) {
			printf("Problem3: %d\n", i);
		}
	}

	for (int i = 0; i < 62497; i++) {
		if (list[i] != 0) {
			if (memory_free(list[i]) != 0) {
				printf("Problem2: %d\n", i);
			}
		}
	}

	free(region);
	*/

	return 0;
}