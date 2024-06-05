#include <stdio.h>
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
char been[1000][1000];
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
    if (arrOfV->head == arrOfV->act) arrOfV->head = NULL;
    if (next != NULL) {
        if (arrOfV->act->before != NULL) arrOfV->act->before->next = arrOfV->act->next;
        if (arrOfV->act->next != NULL) arrOfV->act->next->before = arrOfV->act->before;
    }
    free(next);
    next = NULL;
}

void freeArr(VERTEX* paNew) {
    if (paNew == NULL)
        return;
    if (paNew->next != NULL)
        freeArr(paNew->next);
    free(paNew);
}

int res = -1;

void fillArr() {
    res = 0;
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
        if (been[act->x + 1][act->y] == 0) {
            VERTEX *temp = (VERTEX *) malloc(sizeof(VERTEX));
            been[act->x + 1][act->y] = 1;
            temp->x = act->x + 1;
            temp->y = act->y;
            temp->next = NULL;
            temp->before = NULL;
            addPoint(temp);
            arrOfV->act = arrOfV->act->next;
            findRoute();
        }
    }
    if (arrOfV->isRoute == 1) return;
    if ((inputArr[act->x][act->y+1] == '.') && ((act->before == NULL) ||((act->before->x != act->x) || (act->before->y != act->y+1)))){
        if (been[act->x][act->y + 1] == 0) {
            VERTEX *temp = (VERTEX *) malloc(sizeof(VERTEX));
            been[act->x][act->y + 1] = 1;
            temp->x = act->x;
            temp->y = act->y + 1;
            temp->next = NULL;
            temp->before = NULL;
            addPoint(temp);
            arrOfV->act = arrOfV->act->next;
            findRoute();
        }
    }
    if (arrOfV->isRoute == 1) return;
    if ((inputArr[act->x - 1][act->y] == '.') && ((act->before == NULL) || ((act->before->x != act->x - 1) || (act->before->y != act->y)))){
        if (been[act->x - 1][act->y] == 0) {
            VERTEX *temp = (VERTEX *) malloc(sizeof(VERTEX));
            been[act->x - 1][act->y] = 1;
            temp->x = act->x - 1;
            temp->y = act->y;
            temp->next = NULL;
            temp->before = NULL;
            addPoint(temp);
            arrOfV->act = arrOfV->act->next;
            findRoute();
        }
    }
    if (arrOfV->isRoute == 1) return;
    if ((inputArr[act->x][act->y-1] == '.') && ((act->before == NULL) || ((act->before->x != act->x) || (act->before->y != act->y-1)))){
        if (been[act->x][act->y - 1] == 0) {
            VERTEX *temp = (VERTEX *) malloc(sizeof(VERTEX));
            been[act->x][act->y - 1] = 1;
            temp->x = act->x;
            temp->y = act->y - 1;
            temp->next = NULL;
            temp->before = NULL;
            addPoint(temp);
            arrOfV->act = arrOfV->act->next;
            findRoute();
        }
    }
    if (arrOfV->isRoute == 1) return;
    VERTEX* temp = arrOfV->act->before;
    deletePoint(arrOfV->act);
    arrOfV->act = temp;
}

int main() {
    loadMap();
    createStack();
    char result[1000][1000];
    for (int i = 0; i < arrOfV->sizex; ++i) {
        for (int j = 0; j < arrOfV->sizey; ++j) {
            been[i][j] = 0;
        }
    }
    for (int i = 0; i < arrOfV->sizex; ++i) {
        for (int j = 0; j < arrOfV->sizey; ++j) {
            if (i == 1 && j == 0) {
                result[i][j] = '!';
                continue;
            }
            if (i == 15 && j == 4) {
                result[i][j] = '!';
                continue;
            }
            if (inputArr[i][j] == '.') {
                inputArr[i][j] = '#';

                findRoute();
                freeArr(arrOfV->head);
                createStack();
                for (int i = 0; i < arrOfV->sizex; ++i) {
                    for (int j = 0; j < arrOfV->sizey; ++j) {
                        if (inputArr[i][j] == '*')
                            inputArr[i][j] = '.';
                        been[i][j] = 0;
                    }
                }
                if (res == -1) {
                    result[i][j] = '!';
                } else {
                    result[i][j] = '.';
                }
                res = -1;
                inputArr[i][j] = '.';
            } else {
                result[i][j] = inputArr[i][j];
            }
        }
    }
    for (int i = 0;i < arrOfV->sizey; i++) {
        for (int j = 0;j < arrOfV->sizex; j++) {
            printf("%c", result[j][i]);
        }
        printf("\n");
    }
    return 0;
}
