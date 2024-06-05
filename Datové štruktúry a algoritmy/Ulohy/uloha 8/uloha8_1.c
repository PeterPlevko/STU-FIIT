#include <stdio.h>
#include <stdlib.h>

struct sur{ 	
	int cesta;	
	int kod;
};

struct sur *vloz(struct sur *halda, int cesta, int kod, int *velkost_haldy){
	struct sur akt;			
	akt.cesta = cesta;
	akt.kod = kod;
	
	(*velkost_haldy)++;
	
	halda[*velkost_haldy] = akt;
	int i = *velkost_haldy;
	while ((int)(i/2) >= 1){
		if (halda[i].cesta < halda[(int)(i/2)].cesta || halda[(int)(i/2)].cesta < 0){
			akt = halda[i];
			halda[i] = halda[(int)(i/2)];
			halda[(int)(i/2)] = akt;
			i = (int)(i/2);
		}
		else
			break;	
	}
	return halda;
}

struct sur vyber(struct sur *halda, int *velkost_haldy){
	struct sur vrat = halda[1]; 
	halda[1].cesta = halda[*velkost_haldy].cesta;
	halda[1].kod = halda[*velkost_haldy].kod;
	
	halda[*velkost_haldy].kod = 0;
	halda[*velkost_haldy].cesta = 0;
	(*velkost_haldy)--;
	
	int i = 1, menej;
	
	while(2*i < 2 * (*velkost_haldy) && (halda[2*i].cesta > 0 || halda[2*i + 1].cesta > 0) && (halda[i].cesta > halda[2*i].cesta || halda[i].cesta > halda[2*i+1].cesta)){
		if (halda[2*i].cesta > 0 && (halda[2*i].cesta < halda[2*i+1].cesta || halda[2*i+1].cesta <= 0))
			menej = 2*i;
		else
			menej = 2*i +1;
			
		struct sur akt = halda[i];
		halda[i] = halda[menej];
		halda[menej] = akt;
		i = menej;
	}
	return vrat;
}

int main(){
	struct sur *halda = (struct sur*) calloc (15000, sizeof(struct sur));	
	int poc_domov, n, m, i, j, a, b, c;
	int hrany_domu[101][101] = {{0}}, poc_hran[101] = {0};
	int *velkost_haldy = (int*) malloc (sizeof(int));
		*velkost_haldy = 0;
	
	scanf("%d %d", &n, &m);
	
	for (i = 0; i < m; i++){
		scanf("%d %d %d", &a, &b, &c);
		hrany_domu[a][b] = c;
		hrany_domu[b][a] = c;
		poc_hran[a]++;
		poc_hran[b]++;
	}

	int darceky[101] = {0};

	scanf("%d", &poc_domov);

	for (i = 0; i < poc_domov; i++){
		scanf("%d", &a);
		darceky[a]++;
	}

	int nova = 0;
	struct sur dalsi;
	struct sur pole[101];
	
	for (i = 0; i < 101; i++){
		pole[i].cesta = 0;
		pole[i].kod = 0;
	}

	int dom = 1;

	while (1){
		for (i = 2; i <= 100; i++){
			if (hrany_domu[dom][i] == 0)
				continue;

			nova = hrany_domu[dom][i];

			if (pole[i].cesta <= 0 || pole[i].cesta > pole[dom].cesta + nova){
				halda = vloz(halda, pole[dom].cesta + nova, i, velkost_haldy);
				
				pole[i].kod = dom;
				pole[i].cesta = pole[dom].cesta + nova;
			}
		}
	

		if ((*velkost_haldy) == 0)
			break;

		dalsi = vyber(halda, velkost_haldy);
		dom = dalsi.kod;
	}

	int sucet = 0;

	for (i = 2; i <= 100; i++)
		for (j = 0; j < darceky[i]; j++){
			sucet += pole[i].cesta;
	//		printf("%d\n", pole[i].cesta);
		}

	if (sucet % 2 == 1)
		sucet += 1;

	printf("%d",sucet);


	return 0;
}
