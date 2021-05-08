#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct vertex {
    int x, y;
    struct vertex* next;
    struct vertex* before;
}VERTEX;

typedef struct stack {
    int sizex, sizey;
    char isRoute;
    struct vertex* head;
    struct vertex* act;
}STACK;


char inputArr[1000][1000];
STACK* arrOfV = NULL;

void loadMap() {
    arrOfV = (STACK*) malloc(sizeof(STACK));
    char line[1000];
    int i = 0, j = 0;
    while (scanf("%s", line) >= 1) {
        if (line[0] == '-') break;
        for (j = 0; j < strlen(line); j++) {
            inputArr[j][i] = line[j];
        }
        i++;
    }
    arrOfV->sizex = j;
    arrOfV->sizey = i;
}
void createStack() {
    VERTEX* temp = (VERTEX*) malloc(sizeof(VERTEX));
    temp->x = 1;
    temp->y = 0;
    temp->next = NULL;
    temp->before = NULL;
    arrOfV->isRoute = 0;
    arrOfV->head = temp;
    arrOfV->act = temp;
}

void addPoint(VERTEX* paNew) {
    VERTEX* next = arrOfV->act->next;
    arrOfV->act->next = paNew;
    paNew->next = next;
    paNew->before = arrOfV->act;
}

void deletePoint(VERTEX* paNew) {
    VERTEX* next = arrOfV->act;
    if (arrOfV->act->before != NULL) arrOfV->act->before->next = arrOfV->act->next;
    if (arrOfV->act->next != NULL) arrOfV->act->next->before = arrOfV->act->before;
    free(next);
    next = NULL;
}

void fillArr() {
    arrOfV->isRoute = 1;
    VERTEX* temp = arrOfV->head;
    while (temp != NULL) {
        inputArr[temp->x][temp->y] = '*';
        temp = temp->next;
    }
}

void findRoute() {
    VERTEX* act = arrOfV->act;
    if (act == NULL) return;
    if ((act->x == arrOfV->sizex-2) && (act->y == arrOfV->sizey-1)) fillArr();
    if (arrOfV->isRoute == 1) return;
    if ((inputArr[act->x + 1][act->y] == '.') && ((act->before == NULL) || ((act->before->x != act->x + 1) || (act->before->y != act->y)))){
        VERTEX* temp = (VERTEX*) malloc(sizeof(VERTEX));
        temp->x = act->x + 1;
        temp->y = act->y;
        temp->next = NULL;
        temp->before = NULL;
        addPoint(temp);
        arrOfV->act = arrOfV->act->next;
        findRoute();
    }
    if (arrOfV->isRoute == 1) return;
    if ((inputArr[act->x][act->y+1] == '.') && ((act->before == NULL) ||((act->before->x != act->x) || (act->before->y != act->y+1)))){
        VERTEX* temp = (VERTEX*) malloc(sizeof(VERTEX));
        temp->x = act->x;
        temp->y = act->y + 1;
        temp->next = NULL;
        temp->before = NULL;
        addPoint(temp);
        arrOfV->act = arrOfV->act->next;
        findRoute();
    }
    if (arrOfV->isRoute == 1) return;
    if ((inputArr[act->x - 1][act->y] == '.') && ((act->before == NULL) || ((act->before->x != act->x - 1) || (act->before->y != act->y)))){
        VERTEX* temp = (VERTEX*) malloc(sizeof(VERTEX));
        temp->x = act->x - 1;
        temp->y = act->y;
        temp->next = NULL;
        temp->before = NULL;
        addPoint(temp);
        arrOfV->act = arrOfV->act->next;
        findRoute();
    }
    if (arrOfV->isRoute == 1) return;
    if ((inputArr[act->x][act->y-1] == '.') && ((act->before == NULL) || ((act->before->x != act->x) || (act->before->y != act->y-1)))){
        VERTEX* temp = (VERTEX*) malloc(sizeof(VERTEX));
        temp->x = act->x;
        temp->y = act->y-1;
        temp->next = NULL;
        temp->before = NULL;
        addPoint(temp);
        arrOfV->act = arrOfV->act->next;
        findRoute();
    }
    if (arrOfV->isRoute == 1) return;
    VERTEX* temp = arrOfV->act->before;
    deletePoint(arrOfV->act);
    arrOfV->act = temp;
}

void printMap() {
    for (int i = 0;i < arrOfV->sizey; i++) {
        for (int j = 0;j < arrOfV->sizex; j++) {
            printf("%c", inputArr[j][i]);
        }
        printf("\n");
    }
}

int main() {
    loadMap();
    createStack();
    findRoute();
    printMap();
    return 0;
}
