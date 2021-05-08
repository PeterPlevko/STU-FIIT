tn// uloha8-2.c

#include <stdio.h>
#include <stdlib.h>


#define SOURCE 0
#define SINK (n + n + f + d + 1)
#define SIZE (n + n + f + d + 2)


typedef struct node {
    int data;
    struct node* next;
} node;


int array[402][402];
int n, f, d;
node* queue = NULL;


void queue_add(int data) {

    if (queue == NULL) {

        queue = (node*) malloc(sizeof(node));
        queue->data = data;
        queue->next = NULL;

        return;
    }

    // while (pointer->next != NULL) {

    //     pointer = pointer->next;
    // }

    node* new_node = (node*) malloc(sizeof(node));

    new_node->data = data;
    new_node->next = queue;
    queue = new_node;
}


int queue_pop() {

    node* old = queue;
    int data = queue->data;

    queue = queue->next;
    free(old);

    return data;
}


int BFS(int* parent) {

    int visited[402];

    for (int i = 0; i < SIZE; i++) {
        visited[i] = 0;
    }

    queue = NULL;

    queue_add(SOURCE);
    visited[SOURCE] = 1;

    while (queue != NULL) {

        int u = queue_pop();

        for (int i = 0; i < SIZE; i++) {

            if (array[u][i] > 0 && !visited[i]) {

                parent[i] = u;
                visited[i] = 1;

                if (i == SINK) {

                    return 1;
                }

                queue_add(i);
            }
        }
    }

    return 0;
}


int FordFulkerson() {

    int parent[402], max_flow = 0;

    for (int i = 0; i < SIZE; i++) {
        parent[i] = -1;
    }

    while (BFS(parent)) {

        // while (s != SOURCE) {
        //     printf("%d ", s);
        //     path_flow = minim(path_flow, array[parent[s]][s]);
        //     s = parent[s];
        // }
        // printf("p: %d\n", path_flow);

        // for (int i = 1; i < n + 1; i++) {
        //     printf("%d ", array[0][i]);
        // }
        // printf("\n");

        // for (int i = 0; i < 14; i++) {
        //     for (int ii = 0; ii < 14; ii++) {
        //         printf("%d ", array[i][ii]);
        //     }
        //     printf("\n");
        // }
        // printf("\n");

        int v = SINK;
        max_flow += 1;

        while (v != SOURCE) {

            // printf("%d ", v);

            int u = parent[v];
            array[u][v] = 0;
            array[v][u] = 1;
            v = parent[v];
        }
        // printf("\n");
    }

    return max_flow;
}


int main() {

    int temp_food[100], temp_drink;
    int food_counter, drink_counter;

    while (scanf("%d %d %d", &n, &f, &d) > 0) {

        // Reset array
        for (int i = 0; i < n + n + f + d + 2; i++) {

            for (int ii = 0; ii < n + n + f + d + 2; ii++) {

                array[i][ii] = 0;
            }
        }

        for (int i = 0; i < f; i++) {
            // source -> food
            array[0][i + 1] = 1;
        }

        // Load all children
        for (int i = 0; i < n; i++) {

            // child -> child
            array[f + i + 1][f + i + 1 + n] = 1;

            scanf("%d %d", &food_counter, &drink_counter);

            // Load food and drink
            for (int ii = 0; ii < food_counter; ii++) {

                scanf("%d", temp_food + ii);
                array[temp_food[ii]][f + i + 1] = 1;
            }
            for (int ii = 0; ii < drink_counter; ii++) {

                scanf("%d", &temp_drink);
                // child -> drink
                array[n + f + i + 1][n + n + f + temp_drink] = 1;
                
            }
        }

        // drink -> sink
        for (int i = 0; i < d; i++) {

            array[n + n + f + i + 1][SINK] = 1;
        }

        // Compute
        printf("%d\n", FordFulkerson());
    }

    return 0;
}
