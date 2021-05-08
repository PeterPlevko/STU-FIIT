// uloha9-2.c -- Peter Plevko, 19.11.2019 20:55

#include <stdio.h>
#include <stdlib.h>

typedef struct Polozka
{
  int cislo;
  struct Polozka *dalsi;
} POLOZKA;

POLOZKA *nacitaj();

void vypis(POLOZKA *prvy);


void vloz(POLOZKA **prvy, int cislo, int k)
{
  POLOZKA *paPocetprvkovvzozname = NULL;
  int pocetprvkov=0;
  paPocetprvkovvzozname=*prvy;
  while (paPocetprvkovvzozname != NULL)
	{
		pocetprvkov++;
		paPocetprvkovvzozname = paPocetprvkovvzozname->dalsi;
	}

POLOZKA *ptr = (POLOZKA*)malloc(sizeof(POLOZKA));
    
    	ptr->cislo=cislo;	

    	int i;
    	POLOZKA *temp=*prvy,*novyhead=NULL;
      novyhead=*prvy;
    
if (*prvy == NULL) 
	{
		
		*prvy= ptr;
		ptr->dalsi = NULL;
		return;
	}
	
	if (k > pocetprvkov )
	{
    POLOZKA *ptr = (POLOZKA*)malloc(sizeof(POLOZKA));
    
         novyhead=*prvy;
    	ptr->cislo=cislo;	
		for (i = 1; i < pocetprvkov; i++)
		{
			novyhead = novyhead->dalsi;
		}

	

		novyhead->dalsi = ptr;
		ptr->dalsi = NULL;

	}

else {

    	if(k==0)
    {
        		ptr->dalsi=temp;

        		*prvy=ptr;
        	
        		return;
    	}

    	for(i=0;i<k-1;i++)
    	{
        		temp=temp->dalsi;
    	}

    	ptr->dalsi=temp->dalsi;
    

    	temp->dalsi=ptr;
    	
}
}


int main()
{
  int cislo, k;
  POLOZKA *prvy;
  scanf("%d %d", &cislo, &k);
  prvy = nacitaj(); // nacitaj zoznam

  vloz(&prvy, cislo, k);

//printf("%d\n",*prvy->dalsi);

  vypis(prvy); // vypis zoznam
  return 0;
}