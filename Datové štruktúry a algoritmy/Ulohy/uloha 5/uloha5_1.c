// uloha5-1.c

#include <stdio.h>
#include <stdlib.h>
#include <math.h>

// vrati 1 ak 's' je podmnozina 't', inak vrati 0.
int hash(int value, int n){
	return abs(value % n);
}

int *insert(int *table, int key, int n){
	int has = hash(key, n);
	if (table[has] == 0)
		table[has] = key;
	else
		while (1){
			has++;
			if (has == n)
				has = has % n;
			if (table[has] == 0){
				table[has] = key;
				break;	
			}
		}
	return table;		
}

int search(int *table, int key, int n){
	int has = hash(key, n);
	if (table[has] == key)
		return 1;
	else
		while (1){
			has++;
			if (has == n)
				has = has % n;
			if (table[has] == key)
				return 1;
			else
				if (table[has] == 0)
					return 0;				
			}
}

int is_subset(int s[], int n, int t[], int m){
	int i;
	int *table = (int*) calloc (2*m, sizeof(int));
	for(i = 0; i < m; i++)
		table = insert( table, t[i], 2*m);
	for(i = 0; i < n; i++)
		if (search( table, s[i], 2*m) == 0){
			free(table);
			return 0;
		}
	free(table);	
	return 1;
}

// ukazkovy test
int main(void)
{
	int i, a[10], na, b[10], nb;
	scanf("%d", &na);
	for (i = 0; i < na; i++)
		scanf("%d", &a[i]);
	scanf("%d", &nb);
	for (i = 0; i < nb; i++)
		scanf("%d", &b[i]);
	if (is_subset(a, na, b, nb))
		printf("PODMNOZINA\n");
	else
		printf("NIE\n");
	return 0;
}
