#include <stdio.h>
#include <string.h>
#include <limits.h>
#include <stdlib.h>
#include <stdbool.h>

typedef struct path_struct
{
    // struktura len nech sa lahsie vypisuje cesta, arr je ta cesta size je dlzka cesty
    int *arr;
    size_t size;
    // alloc num kolko bytov som alokoval kvoli reallocu
    size_t alloc_num;
} Path;

typedef struct Field_struct
{
    char type;
    size_t x;
    size_t y;
    size_t distance;
    size_t heap_position;
    size_t princess_position;
    size_t dragon_exists;
    struct Field_struct *predeccessor;
} Field;

typedef struct princess_struct
{
    // toto je dolezite pos je nejaky identifikator princeznej
    // kazda bude mat jeden tym padom mozem do order poradia princeznych dat napriklad 1, 2, 4, 3 a budem
    // vediet vsetko lebo pos mi vzdy identifikuje jednu princeznu a tento atribut som aj pridal do Field_struct ako princess position
    size_t pos;
    size_t x;
    size_t y;
    // kazda princezna vlastny graf s vlastnymi cestami
    Field **graph;
    // array Fieldov na ostatne princezne ked tam mame ulozene ostatne princezne tak mame k nim aj cestu
    // cez predecessorov a ich vzdialenost cez distance
    Field *princes_arr[5];
} Princess;

typedef struct Heap_struct
{
    size_t size;
    Field **array;
} Heap;

size_t parent_index(size_t i)
{
    return (i - 1) / 2;
}

Field *parent(Heap *heap, size_t i)
{
    return i > 0 ? heap->array[parent_index(i)] : NULL;
}

size_t left_index(size_t i)
{
    return i * 2 + 1;
}

size_t right_index(size_t i)
{
    return (i + 1) * 2;
}

Field *left(Heap *heap, size_t i)
{
    return left_index(i) < heap->size ? heap->array[left_index(i)] : NULL;
}

Field *right(Heap *heap, size_t i)
{
    return right_index(i) < heap->size ? heap->array[right_index(i)] : NULL;
}

void swap(Heap *heap, size_t a, size_t b)
{
    Field *temp = heap->array[a];
    heap->array[a] = heap->array[b];
    heap->array[b] = temp;
    heap->array[b]->heap_position = b;
    heap->array[a]->heap_position = a;
}

void heapify(Heap *heap, size_t i)
{
    size_t min = i;
    Field *left_child = left(heap, i);
    Field *right_child = right(heap, i);
    if (left_child != NULL && left_child->distance < heap->array[min]->distance) {
        min = left_index(i);
    }
    if (right_child != NULL && right_child->distance < heap->array[min]->distance) {
        min = right_index(i);
    }
    if (min != i) {
        swap(heap, i, min);
        heapify(heap, min);
    }
}

void decrease_key(Heap *heap, size_t i, size_t value, Field *predeccessor)
{
    heap->array[i]->distance = value;
    heap->array[i]->predeccessor = predeccessor;
    while (i > 0 && parent(heap, i)->distance > heap->array[i]->distance) {
        swap(heap, i, parent_index(i));
        i = parent_index(i);
    }
}

Field *extract_min(Heap *heap)
{
    if (heap->size == 0) {
        return NULL;
    }
    Field *ret_min = heap->array[0];
    heap->array[0] = heap->array[heap->size - 1];
    heap->array[0]->heap_position = 0;
    heap->size--;
    heapify(heap, 0);
    return ret_min;
}

Field **create_graph(char **map, int n, int m)
{
    Field **graph = malloc(m * sizeof(Field *));
    if (graph == NULL) {
        printf("graph");
        return NULL;
    }
    for (int i = 0; i < m; i++) {
        graph[i] = malloc(n * sizeof(Field));
        if (graph[i] == NULL) {
            printf("graph");
            return NULL;
        }
    }
    size_t pr_count = 1;
    Field temp;
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            temp.distance = UINT_MAX;
            temp.predeccessor = NULL;
            temp.x = i;
            temp.y = j;
            temp.type = map[i][j];
            temp.dragon_exists = 0;
            if(temp.type =='D' )
            {
                graph[0][0].dragon_exists=1;
            }
            if (temp.type == 'P') {
                temp.princess_position = pr_count;
                pr_count++;
            }
            graph[i][j] = temp;
        }
    }
    return graph;
}

void free_graph(Field **graph, int m)
{
    for (int i = 0; i < m; i++) {
        free(graph[i]);
    }
    free(graph);
}

Heap *graph_to_heap(Field **graph, int n, int m, int start_x, int start_y)
{
    // start are coordinates to the starting field
    Heap *heap = malloc(sizeof(Heap));
    if (heap == NULL) {
        printf("heap");
        return NULL;
    }
    heap->size = m * n;
    heap->array = malloc(n * m * sizeof(Field *));
    if (heap->array == NULL) {
        printf("heap");
        return NULL;
    }
    heap->array[0] = &graph[start_x][start_y];
    heap->array[0]->heap_position = 0;
    if(graph[0][0].type=='H')
    {
        heap->array[0]->distance = 2;
    }
    else {
        heap->array[0]->distance = 1;
    }
    size_t pos = 1;
    for (int x = 0; x < m; x++) {
        for (int y = 0; y < n; y++) {
            if (x != start_x || y != start_y) {
                heap->array[pos] = &graph[x][y];
                heap->array[pos]->heap_position = pos;
                pos++;
            }
        }
    }
    return heap;
}

void free_heap(Heap *heap)
{
    free(heap->array);
    free(heap);
}

size_t get_neighbouring_fields(Field **neighbours, Field **graph, int x, int y, int m, int n)
{
    size_t count = 0;
    int shift[4][2] = {
            { 0, 1 }, { 1, 0 }, { -1, 0 }, { 0, -1 }
    };
    for (int i = 0; i < 4; i++) {
        int x1 = x + shift[i][0];
        int y1 = y + shift[i][1];
        if ((x1 >= 0) && (y1 >= 0) && (x1 < m) && (y1 < n)) {
            if (graph[x1][y1].type != 'N') {
                neighbours[count] = &graph[x1][y1];
                count++;
            }
        }
    }
    return count;
}

void create_path(Field *field, Path *path)
{
    // toto rekurzivne do struktury path pouklada cestu z bodu do predchadzajuceho
    // nevypise policko 0 0 to vypis manualne
    if (field == NULL || field->predeccessor == NULL) {
        return;
    }
    create_path(field->predeccessor, path);
    path->arr[path->size] = field->x;
    path->size++;
    path->arr[path->size] = field->y;
    path->size++;
}

int add_pr_path(Princess pr_arr[6], const int* order, Path* path, int count)
{
    // mam pole princezien a mam poradie v akom ich mam navstevovat
    // tato funkcia len prida do struktury cesta finalnu cestu na zaklade tychto udajov
    Princess curr_pr;
    Field* field;
    for (int i = 0; i < count - 1; i++) {
        curr_pr = pr_arr[order[i]];
        Field* next_princess = NULL;
        // pr_arr[0] je vzdy drak a ten ma 5 princezien k sebe
        // zatial co kazda princezna ma 4 princezny k sebe preto drak ma limit 5 princezna 4 respektive count - 1 count -2
        int limit = i == 0 ? count - 1 : count - 2;
        for (int k = 0; k < limit; k++) {
            if (curr_pr.princes_arr[k]->princess_position == order[i + 1]) {
                next_princess = curr_pr.princes_arr[k];
            }
        }
        path->alloc_num += next_princess->distance * 2 * sizeof(int);
        int* temp = realloc(path->arr, path->alloc_num);
        if (temp == NULL) {
            free(path->arr);
            return -1;
        }
        path->arr = temp;
        create_path(next_princess, path);
    }
    return 0;
}

Field *zatep_draka(Field **graph, int m, int n)
{
    Heap *heap = graph_to_heap(graph, m, n, 0, 0);
    if (heap == NULL) {
        return NULL;
    }
    Field *curr_field;
    size_t distance;
    Field *neighbours[4] = { 0 };
    while ((curr_field = extract_min(heap))->type != 'D' ) {
        size_t neighbours_count = get_neighbouring_fields(neighbours, graph, curr_field->x, curr_field->y, n, m);
        for (size_t i = 0; i < neighbours_count; i++) {
            size_t length = 1;
            if (neighbours[i]->type == 'H') {
                length = 2;
            }
            distance = curr_field->distance != UINT_MAX ? length + curr_field->distance
                                                        : UINT_MAX;
            if (distance < neighbours[i]->distance) {
                decrease_key(heap, neighbours[i]->heap_position, distance, curr_field);
            }
        }
    }
    free_heap(heap);
    return curr_field;
}

int find_princesses(char **map, int m, int n, Princess pr_arr[6])
{
    // tuto len najdem na mape pozicie princessiek
    size_t pos = 1;
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            if (map[i][j] == 'P') {
                Princess temp = {
                        .x = i,
                        .y = j,
                        .pos = pos,
                };
                // kazda princesska potrebuje vlastny graf
                temp.graph = create_graph(map, n, m);
                pr_arr[pos] = temp;
                pos++;
            }
        }
    }
    return pos;
}

int princess_paths(Princess pr_arr[6], int pr_num, int m, int n)
{
    // tuto pre kazdu princeznu struktura princess v poli pr_arr najdem cesty k ostatnym princeznam cez djikstru
    for (int i = 0; i < pr_num; i++) {
        Heap *heap = graph_to_heap(pr_arr[i].graph, n, m, pr_arr[i].x, pr_arr[i].y);
        Field *curr_field;
        size_t distance;
        Field *neighbours[4] = { 0 };
        size_t pr_count = 0;
        while (heap->size != 0) {
            curr_field = extract_min(heap);
            if (curr_field->type == 'P' && curr_field->princess_position != pr_arr[i].pos) {
                pr_arr[i].princes_arr[pr_count] = curr_field;
                pr_count++;
            }
            size_t neighbours_count = get_neighbouring_fields(neighbours, pr_arr[i].graph, curr_field->x, curr_field->y, m, n);
            for (size_t k = 0; k < neighbours_count; k++) {
                size_t length = 1;
                if (neighbours[k]->type == 'H') {
                    length = 2;
                }
                distance = curr_field->distance != UINT_MAX ? length + curr_field->distance
                                                            : UINT_MAX;
                if (distance < neighbours[k]->distance) {
                    decrease_key(heap, neighbours[k]->heap_position, distance, curr_field);
                }
            }
        }
        free_heap(heap);
    }
    return 0;
}

bool not_in(const int arr[6], int num)
{
    for (int i = 0; i < 6; i++) {
        if (arr[i] == num) {
            return false;
        }
    }
    return true;
}

int princess_order(Princess *princess, Princess pr_arr[6], int* order, int count, int depth)
{
    // tato funkcia rekurvzivne prechadza princezny a zistuje aka permutacia poradia princezien da najkratsiu cestu
    // tieto cesty neprechadza len kuka na atribut distance
    if (depth == 0) {
        // na konci ostava uz iba jedna princezna
        order[count - 1] = princess->pos;
        return 0;
    }
    int distance = INT_MAX;
    int temp_distance = 0;
    Field *curr_princes;
    int temp_order[6] = {0};
    for (int i = 0; i < 5; i++) {
        temp_order[i] = order[i];
    }
    temp_order[count - depth - 1] = princess->pos;
    int limit = depth == count - 2 ? count - 2 : count - 3;
    for (int i = 0; i < limit; i++) {
        curr_princes = princess->princes_arr[i];
        temp_distance = curr_princes->distance;
        // volame to iba na tie princezne ktore uz nie su zaradene v poradi
        if (not_in(order, curr_princes->princess_position)) {
            temp_distance += princess_order(&pr_arr[curr_princes->princess_position], pr_arr, temp_order, count, depth - 1);
            if (temp_distance < distance) {
                distance = temp_distance;
                for (int k = 0; k < 6; k++) {
                    order[k] = temp_order[k];
                }
            }
        }
    }
    return distance;
}
void change_to_popolvar_format(int *normal_array, Path path)
{
    for(int j=1,i=0; i<path.size; i=i+2,j=j+2)
    {
        normal_array[i]=path.arr[j];
    }
    for(int j=0,i=1; i<path.size; i=i+2,j=j+2)
    {
        normal_array[i]=path.arr[j];
    }


}
int *zachran_princezne(char **mapa, int n, int m, int t, int *dlzka_cesty)
{
    Field **graph = create_graph(mapa, m, n);
    if(graph[0][0].type=='N')return NULL;
    if (graph == NULL) {
        return NULL;
    }
    // drak
    if(graph[0][0].dragon_exists==0) return NULL;
    Field *dragon = zatep_draka(graph, m, n);
    if(dragon->distance==UINT_MAX) return NULL;
    Path path = { NULL, 0 };
    // vytvaram strukturu cesta
    path.arr = malloc(dragon->distance * 2 * sizeof(int));
    path.arr[0] = 0;
    path.arr[1] = 0;
    path.size = 2;
    path.alloc_num = dragon->distance * 2 * sizeof(int);
    create_path(dragon, &path);
    if (dragon->distance>t)
    {
        printf("nestihol si zabit draka dosiel ti cas");
        return NULL;
    }
    int drx = dragon->x;
    int dry = dragon->y;
    Princess pr_arr[6];
    // princess temp je drak ten bude vzdycky v pr_arr na pozicii nula
    Princess temp = {
            .x = drx,
            .y = dry,
            .pos = 0,
    };
    temp.graph = create_graph(mapa, m, n);
    pr_arr[0] = temp;
    // najdem suradnice princessiek a vytvorim im struktury
    size_t count = find_princesses(mapa, n, m, pr_arr);
    // najdem od kazdej princessky cestu ku kazdej ostatnej princesske plus od draka;
    princess_paths(pr_arr, count, n, m);
    int* order = malloc(sizeof(int) * 6);
    memset(order, 0, sizeof(int) * 6);
    // zisti v akom poradi idu tieto princezne
    princess_order(&pr_arr[0], pr_arr, order, count, count - 1);
    // mas princezne kazda ma svojich susedov a vies v akom poradi maju ist uz ich len treba pridat do cesty
    for(int i=0;i<count-1;i++)
    {
        if(pr_arr[0].princes_arr[i]->distance==UINT_MAX) return NULL;
    }
    add_pr_path(pr_arr, order, &path, count);
    free_graph(graph, n);
    for (int i = 0; i < count; i++) {
        // kazda princesska potrebuje uvolnit graf
        free_graph(pr_arr[i].graph, 5);
    }
    *dlzka_cesty=path.size/2;
    int* normal_array = malloc(sizeof(int) * path.size);
    change_to_popolvar_format(normal_array, path);
    free(path.arr);
    free(order);
    return normal_array;
}

int main()
{
    char **mapa;
    int i, test, dlzka_cesty, cas, *cesta;
    int n=0, m=0, t=0;
    FILE* f;
    while(1){
        printf("Zadajte cislo testu (0 ukonci program):\n");
        scanf("%d",&test);
        dlzka_cesty = 0;
        n=m=t=0;
        switch(test){
            case 0://ukonci program
                return 0;
            case 1://nacitanie mapy zo suboru
                f=fopen("D:\\1 datove struktury a algoritmi\\radeksmradek\\test.txt","r");
                if(f)
                    fscanf(f, "%d %d %d", &n, &m, &t);
                else
                    continue;
                mapa = (char**)malloc(n*sizeof(char*));
                for(i=0; i<n; i++){
                    mapa[i] = (char*)malloc(m*sizeof(char));
                    for (int j=0; j<m; j++){
                        char policko = fgetc(f);
                        if(policko == '\n') policko = fgetc(f);
                        mapa[i][j] = policko;
                    }
                }
                fclose(f);
                cesta = zachran_princezne(mapa, n, m, t, &dlzka_cesty);
                break;
            case 2://nacitanie preddefinovanej mapy
                n = 10;//vyska
                m = 10;//sirka
                t = 12;
                mapa = (char**)malloc(n*sizeof(char*));
                mapa[0]=strdup("CCHCNHCCHNC");
                mapa[1]=strdup("NNCCCHHCCCC");
                mapa[2]=strdup("DNCCNNHHHCC");
                mapa[3]=strdup("CHHHCCCCCCC");
                mapa[4]=strdup("CCCCCNHHHHC");
                mapa[5]=strdup("PCHCCCNNNNC");
                mapa[6]=strdup("NNNNNHCCCCC");
                mapa[7]=strdup("CCCCCPCCCCC");
                mapa[8]=strdup("CCCNNHHHHHC");
                mapa[9]=strdup("HHHPCCCCCCC");
                cesta = zachran_princezne(mapa, n, m, t, &dlzka_cesty);
                break;
            case 3: //otestujem pripad ze drak je nedostupny
                n = 10;//vyska
                m = 10;//sirka
                t = 12;
                mapa = (char**)malloc(n*sizeof(char*));
                mapa[0]=strdup("CCHCNHCCHNC");
                mapa[1]=strdup("NNCCCHHCCCC");
                mapa[2]=strdup("DNCCNNHHHCC");
                mapa[3]=strdup("NHHHCCCCCCC");
                mapa[4]=strdup("CCCCCNHHHHC");
                mapa[5]=strdup("PCHCCCNNNNC");
                mapa[6]=strdup("NNNNNHCCCCC");
                mapa[7]=strdup("CCCCCPCCCCC");
                mapa[8]=strdup("CCCNNHHHHHC");
                mapa[9]=strdup("HHHPCCCCCCC");
                cesta = zachran_princezne(mapa, n, m, t, &dlzka_cesty);
                break;
            case 4: //otestujem ze drak nieje
                n = 10;//vyska
                m = 10;//sirka
                t = 12;
                mapa = (char**)malloc(n*sizeof(char*));
                mapa[0]=strdup("CCHCNHCCHNC");
                mapa[1]=strdup("NNCCCHHCCCC");
                mapa[2]=strdup("CNCCNNHHHCC");
                mapa[3]=strdup("NHHHCCCCCCC");
                mapa[4]=strdup("CCCCCNHHHHC");
                mapa[5]=strdup("PCHCCCNNNNC");
                mapa[6]=strdup("NNNNNHCCCCC");
                mapa[7]=strdup("CCCCCPCCCCC");
                mapa[8]=strdup("CCCNNHHHHHC");
                mapa[9]=strdup("HHHPCCCCCCC");
                cesta = zachran_princezne(mapa, n, m, t, &dlzka_cesty);
                break;
            case 5: //otestujem ze stojim na skale
                n = 10;//vyska
                m = 10;//sirka
                t = 12;
                mapa = (char**)malloc(n*sizeof(char*));
                mapa[0]=strdup("NCHCNHCCHNC");
                mapa[1]=strdup("NNCCCHHCCCC");
                mapa[2]=strdup("DNCCNNHHHCC");
                mapa[3]=strdup("CHHHCCCCCCC");
                mapa[4]=strdup("CCCCCNHHHHC");
                mapa[5]=strdup("PCHCCCNNNNC");
                mapa[6]=strdup("NNNNNHCCCCC");
                mapa[7]=strdup("CCCCCPCCCCC");
                mapa[8]=strdup("CCCNNHHHHHC");
                mapa[9]=strdup("HHHPCCCCCCC");
                cesta = zachran_princezne(mapa, n, m, t, &dlzka_cesty);
                break;
            case 6: //otestujem ze stojim na hustine
                n = 10;//vyska
                m = 10;//sirka
                t = 13;
                mapa = (char**)malloc(n*sizeof(char*));
                mapa[0]=strdup("HCHCNHCCHNC");
                mapa[1]=strdup("NNCCCHHCCCC");
                mapa[2]=strdup("DNCCNNHHHCC");
                mapa[3]=strdup("CHHHCCCCCCC");
                mapa[4]=strdup("CCCCCNHHHHC");
                mapa[5]=strdup("PCHCCCNNNNC");
                mapa[6]=strdup("NNNNNHCCCCC");
                mapa[7]=strdup("CCCCCPCCCCC");
                mapa[8]=strdup("CCCNNHHHHHC");
                mapa[9]=strdup("HHHPCCCCCCC");
                cesta = zachran_princezne(mapa, n, m, t, &dlzka_cesty);
                break;
            case 7://nemam princezne
                n = 10;//vyska
                m = 10;//sirka
                t = 12;
                mapa = (char**)malloc(n*sizeof(char*));
                mapa[0]=strdup("CCHCNHCCHNC");
                mapa[1]=strdup("NNCCCHHCCCC");
                mapa[2]=strdup("DNCCNNHHHCC");
                mapa[3]=strdup("CHHHCCCCCCC");
                mapa[4]=strdup("CCCCCNHHHHC");
                mapa[5]=strdup("CCHCCCNNNNC");
                mapa[6]=strdup("NNNNNHCCCCC");
                mapa[7]=strdup("CCCCCCCCCCC");
                mapa[8]=strdup("CCCNNHHHHHC");
                mapa[9]=strdup("HHHCCCCCCCC");
                cesta = zachran_princezne(mapa, n, m, t, &dlzka_cesty);
                break;
            case 8://nacitanie preddefinovanej mapy
                n = 10;//vyska
                m = 10;//sirka
                t = 12;
                mapa = (char**)malloc(n*sizeof(char*));
                mapa[0]=strdup("CCHCNHCCHNC");
                mapa[1]=strdup("NNCCCHHCCCC");
                mapa[2]=strdup("DNCCNNHHHCC");
                mapa[3]=strdup("CHHHCCCCCCC");
                mapa[4]=strdup("CCCCCNHHHHC");
                mapa[5]=strdup("PCHCCCNNNNC");
                mapa[6]=strdup("NNNNNHCCCCC");
                mapa[7]=strdup("CCCCCPCCCCC");
                mapa[8]=strdup("CCCNNHHHHHC");
                mapa[9]=strdup("HHHPCCCCCPP");
                cesta = zachran_princezne(mapa, n, m, t, &dlzka_cesty);
                break;
            case 9://nacitanie preddefinovanej mapy
                n = 10;//vyska
                m = 10;//sirka
                t = 12;
                mapa = (char**)malloc(n*sizeof(char*));
                mapa[0]=strdup("CCHCNHCCHNC");
                mapa[1]=strdup("NNCCCHHCCCC");
                mapa[2]=strdup("DNCCNNHHHCC");
                mapa[3]=strdup("CHHHCCCCCCC");
                mapa[4]=strdup("CCCCCNHHHHC");
                mapa[5]=strdup("PCHCCCNNNNC");
                mapa[6]=strdup("NNNNNHCCCCC");
                mapa[7]=strdup("CCCCCPCCCC");
                mapa[8]=strdup("CCCNNHHHHN");
                mapa[9]=strdup("HHHPCCPCNP");
                cesta = zachran_princezne(mapa, n, m, t, &dlzka_cesty);
                break;
            default:
                continue;
        }
        cas = 0;
        for(i=0; i<dlzka_cesty; i++){
            printf("%d %d\n", cesta[i*2], cesta[i*2+1]);
            if(mapa[cesta[i*2+1]][cesta[i*2]] == 'H')
                cas+=2;
            else
                cas+=1;
            if(mapa[cesta[i*2+1]][cesta[i*2]] == 'D' && cas > t)
                printf("Nestihol si zabit draka!\n");
            if(mapa[cesta[i*2+1]][cesta[i*2]] == 'N')
                printf("Prechod cez nepriechodnu prekazku!\n");
            if(i>0 && abs(cesta[i*2+1]-cesta[(i-1)*2+1])+abs(cesta[i*2]-cesta[(i-1)*2])>1)
                printf("Neplatny posun Popolvara!\n");
        }
        printf("%d\n",cas);
        free(cesta);
        for(i=0; i<n; i++){
            free(mapa[i]);
        }
        free(mapa);
    }

}
