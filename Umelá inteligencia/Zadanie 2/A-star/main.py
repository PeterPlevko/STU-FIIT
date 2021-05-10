import heapq
import os
import time

# vyska a sirka hlavolamu
lines = 3
column = 3
# typ heuristiky
type_heu = 1


# objekt uzla v grafe, obsahuje heuristiku, vzdialenost, stav a odkaz na predchodcu
class Node:
    heuristic = -1
    distance = -1
    state = []
    predecessor = None

    def __init__(self, p_heuristic, p_distance, p_state, p_pred):
        self.heuristic = p_heuristic
        self.distance = p_distance
        self.state = p_state
        self.predecessor = p_pred

    # metoda, podla ktorej heap porovnava stavy (najskor usporaduva podla suctu heuristiky a vzdialenosti a ak su
    # rovnake tak este ich usporiada na zaklade heuristiky)
    def __lt__(self, other):
        if (self.heuristic + self.distance) == (other.heuristic + other.distance):
            return self.heuristic < other.heuristic
        else:
            return (self.heuristic + self.distance) < (other.heuristic + other.distance)



# region funkcie k heuristikam
# vyrata pocet inverzii v stave
def num_of_inversions(p_state):
    stack = []
    res_sum = 0
    global lines, column
    # vyrobim si z dvojrozmerneho pola jednorozmerne
    for i_l in range(0, lines):
        for j_c in range(0, column):
            if p_state[i_l][j_c] != -1:
                stack.append(p_state[i_l][j_c])

    # zratam inverzie
    for i in range(0, len(stack)):
        for j in range(i + 1, len(stack)):
            if stack[i] == 0 or stack[j] == 0:
                continue
            if stack[i] > stack[j]:
                res_sum += 1
    return res_sum


# zisti, ci dany stav sa da usporiadat na stav (1 2 3 ...)
def is_possible(p_state):
    tmp_sum = num_of_inversions(p_state)
    global lines, column
    # sirka je parna
    if column % 2 == 1:
        # inverzie su parne
        if tmp_sum % 2 == 0:
            return True
        else:
            return False
    else:
        line, col = find_blank(p_state)
        # riadok prazdneho miesta zospodu je neparny a inverzie su parne
        if lines - line % 2 == 1 and tmp_sum % 2 == 0:
            return True
        # riadok prazdneho miesta zospodu je parny a inverzie su neparne
        elif lines - line % 2 == 0 and tmp_sum % 2 == 1:
            return True
        else:
            return False


# vyber typ heuristiky
def choose_heuristic(p_start_state, p_final_state):
    global type_heu
    if type_heu == 1:
        return heuristic_1(p_start_state, p_final_state)
    elif type_heu == 2:
        return heuristic_2(p_start_state, p_final_state)
    elif type_heu == 3:
        return heuristic_1(p_start_state, p_final_state) + heuristic_2(p_start_state, p_final_state)


# heuristika 1 - pocet policok na nespravnom mieste
def heuristic_1(p_start_state, p_final_state):
    heu = 0
    global lines, column
    for i_l in range(0, lines):
        for j_c in range(0, column):
            if p_start_state[i_l][j_c] != p_final_state[i_l][j_c]:
                heu += 1
    return heu


# najde poziciu danej hodnoty v stave (pouziva sa pri heuristike 2)
def find(p_value, p_state):
    global lines, column
    for i_l in range(0, lines):
        for j_c in range(0, column):
            if p_value == p_state[i_l][j_c]:
                return i_l, j_c
    return None


# heuristika 2 - sucet vzdialenosti hodnot od svojho miesta
def heuristic_2(p_start_state, p_final_state):
    heu = 0
    global lines, column
    for i_l in range(0, lines):
        for j_c in range(0, column):
            x_l, y_c = find(p_start_state[i_l][j_c], p_final_state)
            heu += abs(i_l - x_l) + abs(j_c - y_c)
    return heu


# endregion


# region funkcie k nacitavaniu vstupu
# nacita sekvenciu cisel a m do 2d pola
def create_state_from_string(p_input):
    global lines, column
    res = []
    x = list(p_input.split())
    for i_l in range(0, lines):
        res.append([])
        for j_c in range(0, column):
            if x[i_l * column + j_c] == 'm':
                res[i_l].append(0)
            else:
                res[i_l].append(int(x[i_l * column + j_c]))
    return res


# zisti ci subor existuje
def checks_existency():
    filename = input("Názov súboru: ")
    while not os.path.exists(filename):
        print("Súbor neexistuje.")
        filename = input("Názov súboru: ")
    return filename


# nacita vstup zo suboru
def load_states_from_file(filename):
    global lines, column
    file = open(filename, "r").read().split('\n')
    if not file[0].isdigit():
        return '1', '1'
    lines = int(file[0])
    if not file[1].isdigit():
        return '1', '1'
    column = int(file[1])
    return file[2], file[3]


# zisti ci je vstup dobry
def is_input_correct(p_input):
    saved_input = p_input
    p_input = list(p_input.split())
    global lines, column
    if len(p_input) != lines * column:
        return False
    blank = False
    state = create_state_from_string(saved_input)
    for i in range(0, len(p_input)):
        if p_input[i] == 'm':
            blank = True
    # hladam vsetky hodnoty ktore tam maju byt
    for i in range(1, len(p_input)):
        if find(i, state) is None:
            return False
    return blank


# endregion


# region A* algoritmus a dolezite funkcie
# najde prazdne miesto v stave
def find_blank(p_state):
    global lines, column
    for i_l in range(0, lines):
        for j_c in range(0, column):
            if p_state[i_l][j_c] == 0:
                return i_l, j_c


# vymeni dve hodnoty v stave
def swap(x1_l, y1_c, x2_l, y2_c, p_state):
    temp = p_state[x1_l][y1_c]
    p_state[x1_l][y1_c] = p_state[x2_l][y2_c]
    p_state[x2_l][y2_c] = temp


# vypise sekvenciu operatorov
def print_process(p_node):
    steps = []
    # prevratim poradie
    while p_node.predecessor is not None:
        steps.insert(0, p_node)
        p_node = p_node.predecessor
    steps.insert(0, p_node)

    # zistujem rozdiel a vypisem operatory
    for x in range(0, len(steps) - 1):
        x1, y1 = find_blank(steps[x].state)
        x2, y2 = find_blank(steps[x + 1].state)
        if x1 - 1 == x2:
            print("DOLE, ", end='')
        if x1 + 1 == x2:
            print("HORE, ", end='')
        if y1 - 1 == y2:
            print("VPRAVO, ", end='')
        if y1 + 1 == y2:
            print("VĽAVO, ", end='')
    print()


# A* algoritmus - vytvorim si min_heap, kde ukladam vytvorene uzly, vyberiem vzdy najmensi prvok a rozbalim ho do
# dalsich stavov, vsetky vytvorene stavy pridam do hash tabulky, aby som sa necyklil
def find_final(p_start_pos, p_final_pos):
    heap = []
    first = Node(choose_heuristic(p_start_pos, p_final_pos), 0, p_start_pos, None)
    created = {}
    while first.heuristic != 0:
        x_l, y_c = find_blank(first.state)
        # right shift
        if y_c - 1 >= 0:
            new = [list(x) for x in first.state]
            swap(x_l, y_c - 1, x_l, y_c, new)
            if created.get(str(new)) is None:
                created[str(new)] = True
                heapq.heappush(heap, Node(choose_heuristic(new, p_final_pos), first.distance + 1, new, first))

        # left shift
        if y_c + 1 < column:
            new = [list(x) for x in first.state]
            swap(x_l, y_c + 1, x_l, y_c, new)
            if created.get(str(new)) is None:
                created[str(new)] = True
                heapq.heappush(heap, Node(choose_heuristic(new, p_final_pos), first.distance + 1, new, first))

        # up shift
        if x_l + 1 < lines:
            new = [list(x) for x in first.state]
            swap(x_l + 1, y_c, x_l, y_c, new)
            if created.get(str(new)) is None:
                created[str(new)] = True
                heapq.heappush(heap, Node(choose_heuristic(new, p_final_pos), first.distance + 1, new, first))

        # down shift
        if x_l - 1 >= 0:
            new = [list(x) for x in first.state]
            swap(x_l - 1, y_c, x_l, y_c, new)
            if created.get(str(new)) is None:
                created[str(new)] = True
                heapq.heappush(heap, Node(choose_heuristic(new, p_final_pos), first.distance + 1, new, first))

        first = heapq.heappop(heap)
    return first


# endregion


# vypise menu a ovladanie programu
def print_menu():
    global lines, column, type_heu
    print()
    print("*****************************************************************************")
    print("                          Riešiteľ  8 - hlavolamu                            ")
    print("                           Autor: Matej Delinčák                             ")
    print("*****************************************************************************")
    print()
    go = True
    file_name = ''
    file = input("Nacitat zo suboru? y / iné: ")
    if file == 'y':
        file_name = checks_existency()
    else:
        menu = input("Chceš riešiť 8-hlavolam? y / iné: ")
        if menu != 'y':
            lines = input("Zadaj počet riadkov: ")
            while (not lines.isdigit()) or (int(lines) < 1):
                print("Chybný vstup.")
                lines = input("Zadaj počet riadkov: ")
            lines = int(lines)
            column = input("Zadaj počet stĺpcov: ")
            while (not column.isdigit()) or (int(column) < 1):
                print("Chybný vstup.")
                column = input("Zadaj počet stĺpcov: ")
            column = int(column)

    if file == 'y':
        start_pos, final_pos = load_states_from_file(file_name)
        if not (is_input_correct(start_pos) and is_input_correct(final_pos)):
            print("Chybný vstup zo súboru.")
            go = False
        if go:
            start_pos = create_state_from_string(start_pos)
            final_pos = create_state_from_string(final_pos)
    else:
        print()
        print("Štartovacie rozloženie: Zadaj", column * lines - 1, "čísel a m pre prázdne políčko: ", end='')
        start_pos = input()
        while not is_input_correct(start_pos):
            print("Chybný vstup.")
            print("Štartovacie rozloženie: Zadaj", column * lines - 1, "čísel a m pre prázdne políčko: ", end='')
            start_pos = input()
        start_pos = create_state_from_string(start_pos)
        print()
        print("Koncové rozloženie: Zadaj", column * lines - 1, "čísel a m pre prázdne políčko: ", end='')
        final_pos = input()
        while not is_input_correct(final_pos):
            print("Chybný vstup.")
            print("Koncové rozloženie: Zadaj", column * lines - 1, "čísel a m pre prázdne políčko: ", end='')
            final_pos = input()
        final_pos = create_state_from_string(final_pos)
        print()
    timer = 0.0

    if go:
        print("Vyber si heuristiku: ")
        print("1. Počet políčok, ktoré nie sú na svojom mieste")
        print("2. Súčet vzdialeností jednotlivých políčok od ich cieľovej pozície")
        print("3. Súčet prvej a druhej heuristiky")
        type_heu = input("Možnosť: ")
        while (not type_heu.isdigit()) or (int(type_heu) < 1 or int(type_heu) > 3):
            print("Chybný vstup.")
            type_heu = input("Možnosť: ")
        type_heu = int(type_heu)
        menu = input("Koľko razy chceš zopakovať riešenie? Zadaj číslo: ")
        while (not menu.isdigit()) or (int(menu) < 1):
            print("Chybný vstup.")
            menu = input("Koľko razy chceš zopakovať riešenie? Zadaj číslo: ")
        menu = int(menu)
        print()
        if is_possible(start_pos) == is_possible(final_pos):
            print("Riešenie je možné.")
            for i in range(0, menu):
                start = time.time()
                if menu > 1:
                    find_final(start_pos, final_pos)
                else:
                    print("Postupnosť: ")
                    print_process(find_final(start_pos, final_pos))
                end = time.time()
                timer += end - start
            print("Cas: ", timer / menu)
        else:
            print("Riešenie nie je možné.")


print_menu()
input("Ukonči program - enter")
