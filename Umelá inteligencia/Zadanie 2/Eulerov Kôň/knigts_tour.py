import random
import sys
import time

sys.setrecursionlimit(5000)
MOVE = [(1, 2), (1, -2), (2, 1), (2, -1), (-1, 2), (-1, -2), (-2, 1), (-2, -1)]  # pohyby kona po sachovnici
MAX_MOVES = 5000000  # maximalny pocet krokov
CHESSBOARD = []  # sachovnica
SIZE = 0  # velkost sachovnici
NUMBER_OF_MOVES = 0  # pocet prehladanych uzlov, stop ak NUMBER_OF_MOVES == MAX_MOVES


# objekt, ktorý mi predstavuje jedno políčko na šachovnici
class cell:
    def __init__(self, x, y, move_number, degree):
        self.x = x
        self.y = y
        self.move_number = move_number
        self.degree = degree                # stupen ktory nam pomaha pri Warndorffovom pravidle, pocet nenavstivenych susedov
        self.secondary_degree = 2000        # stupen ktory nam pomaha pri mojej heuristike, vzdialenost od okraja sachovnice

    def add_secondary_degree(self, num):
        self.secondary_degree = num


# generovanie novej sachovnice po zadani velkosti
def generate_checkboard():
    global SIZE, CHESSBOARD
    SIZE = int(input("Zadaj velkost sachovnice: "))
    CHESSBOARD = [[-1] * SIZE for i in range(SIZE)]


# generuje 10 nahodnych roznych pozicii, ktore budu pouzite pre testovanie programu
def generate_starting_positions():
    positions = []

    while len(positions) != 10:
        duplicate = False
        y = random.randint(0, SIZE - 1)
        x = random.randint(0, SIZE - 1)
        for i in range(len(positions)):
            if y == positions[i][1] and x == positions[i][0]:
                duplicate = True
                break
        if duplicate:
            continue
        positions.append((x, y))
    return positions


# generuje stupen podla toho, na kolko susedov sa z tohto policka vie dostat kon
def get_degree(neigh_x, neigh_y):
    degree = 0
    for i in range(8):
        neighbour_y = neigh_y + MOVE[i][1]
        neighbour_x = neigh_x + MOVE[i][0]
        if check_bounds(neighbour_x, neighbour_y) and CHESSBOARD[neighbour_y][neighbour_x] == -1:
            degree += 1
    return degree


# vypocitanie stupna vrchola podla toho, ako daleko je vzdialeny od stien
# berie sa najmansia vzdialenost
def get_degree_own(neighbour_x, neighbour_y):
    degree = 0
    left = neighbour_x
    right = SIZE - neighbour_x - 1
    bottom = SIZE - neighbour_y - 1
    top = neighbour_y
    degree = min(left, right, bottom, top)
    return degree


# vrcholy su ukladane od najmansej vzdialenosti od kraja sachovnice po najvacsiu
def own_heuristics(node):
    global CHESSBOARD
    neighbours = []
    for i in range(8):
        neighbour_y = node.y + MOVE[i][1]
        neighbour_x = node.x + MOVE[i][0]
        if check_bounds(neighbour_x, neighbour_y) and CHESSBOARD[neighbour_y][neighbour_x] == -1:
            degree = get_degree_own(neighbour_x, neighbour_y)
            neighbours.append(cell(node.x + MOVE[i][0], node.y + MOVE[i][1], node.move_number + 1, degree))
    neighbours.sort(key=lambda x: x.secondary_degree, reverse=False)
    if len(neighbours) > 0:
        return neighbours
    else:
        return [0]


# sortovanie policok podla vzdialenosti od kraja sachovnice
def check_neighbours_distance(neighbours):
    if len(neighbours) == 0:
        return
    degree = neighbours[0].degree
    for i in range(len(neighbours)):
        if neighbours[i].degree != degree:
            break
        else:

            secondary_degree = get_degree_own(neighbours[i].x, neighbours[i].y)
            neighbours[i].add_secondary_degree(secondary_degree)
    neighbours.sort(key=lambda x: x.secondary_degree, reverse=False)
    return neighbours


# funkcia ktora vracia list susedov, ktori su usporiadani stupnom podla warnsdorffoveho pravidla
def warnsdorff_rule(node, optional_check):
    global CHESSBOARD
    neighbours = []
    for i in range(8):  # pre kazdeho suseda
        neighbour_y = node.y + MOVE[i][1]
        neighbour_x = node.x + MOVE[i][0]

        # ak je tah mimo sachovnice a nie je navstiveny
        if check_bounds(neighbour_x, neighbour_y) and CHESSBOARD[neighbour_y][neighbour_x] == -1:
            degree = get_degree(neighbour_x, neighbour_y)
            neighbours.append(cell(node.x + MOVE[i][0], node.y + MOVE[i][1], node.move_number + 1, degree))
    neighbours.sort(key=lambda x: x.degree, reverse=False)

    # optional_check predstavuje option, ci chceme tiebreaky nechat na DFS alebo ak nastane tiebreak, tak pridame druhu heuristiku
    if optional_check:
        check_neighbours_distance(neighbours)
    if len(neighbours) > 0:
        return neighbours
    else:
        return [0]


# check ci sa suradnice nachadzaju vo validnej pozicii na sachovnici
def check_bounds(x, y):
    if (0 <= x < SIZE) and (0 <= y < SIZE):
        return True
    else:
        return False


# vycisti sachovnicu
def clear_chessboard():
    for i in range(SIZE):
        for j in range(SIZE):
            CHESSBOARD[i][j] = -1


# print formatovanej sachovnici
def print_chessboard():
    for i in range(SIZE):
        for j in range(SIZE):

            if CHESSBOARD[i][j] < 10 and CHESSBOARD[i][j] != -1:
                print("",CHESSBOARD[i][j], end="   ")
            elif (10 <= CHESSBOARD[i][j] < 100) or CHESSBOARD[i][j] == -1:
                print("",CHESSBOARD[i][j], end="  ")
            elif CHESSBOARD[i][j] > 99:
                print("",CHESSBOARD[i][j], end=" ")
        print("")
    print("")

#pre danu sachovnicu mi to najde vsetky body, z ktorych vieme najst eulerovu cestu na prvy krat
def test_all_clean_heuristics():
    for i in range(SIZE):
        for j in range(SIZE):
            test_clean_heuristics(i, j,True)

            clear_chessboard()


# test pre prehladavanie sachovnice iba podla cistej heuristiky (Warnsdorffove pravidlo)
def test_clean_heuristics(x, y,print_output):
    current_node = cell(x, y, 1, 0)

    while current_node.move_number < (SIZE ** 2):

        CHESSBOARD[current_node.y][current_node.x] = current_node.move_number
        current_node = warnsdorff_rule(current_node, False)[0]
        if current_node == 0:
            if print_output:
                print("[{}][{}]: not complete".format(x, y))
            return False
        if current_node.move_number == SIZE ** 2:
            if print_output:
                print("[{}][{}]: complete".format(x, y))

            CHESSBOARD[current_node.y][current_node.x] = SIZE ** 2
            return True


# rekurzivna funkcia, predstavuje DFS hladanie v strome, ktore vybera vrcholy pomocou pravidla heuristiky (mojej,implementovanej)
# hlavna funkcia v programe
def knight_tour(node, move_number, time0, heuristics):
    global NUMBER_OF_MOVES
    time1 = time.time()

    # prva konciaca podmienka, cas. ak je cas vacsi ako 15 sekund, vrat False. cesta sa nenasla
    if time1 - time0 > 15:
        return False

    # ak je cislo tahu velkost sachovnice na druhu + 1 (zaciname tahom 2 kedze prvy tah je polozenia startovacieho bodu)
    # tak vrat True, cesta bola najdena
    if move_number == SIZE ** 2 + 1:
        return True

    # ak je pocet krokov vacsi ako 5 milionov, cesta sa nenasla.
    NUMBER_OF_MOVES += 1
    if NUMBER_OF_MOVES == 5000000:
        return False

    # vyber heuristiky
    # 1 - warnsdorffove pravidlo
    # 2 - vlastna heuristika
    # 3 - warnsdorffove pravidlo + moja heuristika na rozdelenie tiebreak
    if heuristics == 1:
        neighbours = warnsdorff_rule(node, False)
    if heuristics == 2:
        neighbours = own_heuristics(node)
    if heuristics == 3:
        neighbours = warnsdorff_rule(node, True)

    if neighbours[0] == 0:
        return False

    # rekurzivne sa vnor do bodu ktory je optimalne z hladiska heuristiky
    for i in range(len(neighbours)):
        CHESSBOARD[neighbours[i].y][neighbours[i].x] = move_number
        if knight_tour(neighbours[i], move_number + 1, time0, heuristics):
            return True

        CHESSBOARD[neighbours[i].y][neighbours[i].x] = -1

    return False


# funkcia, ktora generuje cestu + statistiku o ceste + ci sa nasla cesta
# print_out sluzi na zablokovanie pisania do konzoly ked testujem vychodzie body,
# kedze kazdy bod skusam pre danu metodu N krat, chem aby sa statistkika vypisala iba raz
# OPTION - vyber medzi algoritmami, bud je to ciste Warndorffove pravidlo + backtracking, moja heuristika alebo mix vsetkeho
def test_heuristics_backtracking(node,print_out,option):

    CHESSBOARD[node.y][node.x] = 1
    time0 = time.time()
    path = knight_tour(node, 2, time0, option)
    time2 = time.time()
    if print_out:
        if not path:
            print("[{}][{}] Nepodarilo sa najst cestu".format(node.x, node.y))
        if path:
            print("[{}][{}] Podarilo sa najst cestu".format(node.x, node.y))
            print_chessboard()
        print("Pocet navstivenych stavov je : ", NUMBER_OF_MOVES)
        print("Algoritmus trval {} sekund\n".format(time2-time0))

    clear_chessboard()
    time_num = time2-time0
    return time_num,path


# output ktory sa pouziva pri testovani viac vzoriek
def test_output(path,starting_node,timer,TEST_NUM):
    global NUMBER_OF_MOVES
    if not path:
        print("[{}][{}] Nepodarilo sa najst cestu\n".format(starting_node.x, starting_node.y))
    else:
        print("[{}][{}] Podarilo sa najst cestu".format(starting_node.x, starting_node.y))
        print("Pocet navstivenych stavov: ", int(NUMBER_OF_MOVES / TEST_NUM))
        print("Algoritmus priemerne trval {} sekund\n".format(float(timer / TEST_NUM)))
    NUMBER_OF_MOVES = 0


# samotne testovanie desiatich vychodzich bodov
def test_starting_points(starting_positions):
    global NUMBER_OF_MOVES
    NUMBER_OF_MOVES = 0
    timer = 0
    TEST_NUM = 5
    for j in range(10):
        print("=====================================================")


        # test vlastnej heuristiky
        # pre sachovnice vacsie ako 6 sa cesta nenajde
        if SIZE <= 6:
            print("Test vlastnej heuristiky")
            for i in range(TEST_NUM):
                starting_node = cell(starting_positions[j][0], starting_positions[j][1], 1, 8)
                time_t, path = test_heuristics_backtracking(starting_node, False,2)
                timer = timer + float(time_t)
            test_output(path,starting_node,timer,TEST_NUM)
            timer = 0


        #test cistej heuristiky
        print("Test cistej heuristiky Warndorffove pravidlo")
        for i in range(TEST_NUM):
            time0 = time.time()
            path = test_clean_heuristics(starting_positions[j][0],starting_positions[j][1],False)
            time1 = time.time()
            timer +=time1-time0
            clear_chessboard()
        if not path:
            print("[{}][{}] Nepodarilo sa najst cestu\n".format(starting_positions[j][0], starting_positions[j][1]))
        else:
            print("[{}][{}] Podarilo sa najst cestu".format(starting_positions[j][0], starting_positions[j][1]))
            print("Pocet navstivenych stavov: ", SIZE**2-1)
            print("Algoritmus priemerne trval {} sekund\n".format(float(timer / TEST_NUM)))


        # test Warnsdorffoveho pravidla zahrnuteho do DFS
        print("Test heuristiky + backtracking")
        for i in range(TEST_NUM):
            starting_node = cell(starting_positions[j][0], starting_positions[j][1], 1, 8)
            time_t, path = test_heuristics_backtracking(starting_node, False,1)
            timer = timer + float(time_t)
        test_output(path,starting_node,timer,TEST_NUM)
        timer = 0


        # test Warnsdorffoveho pravidla zahrnuteho do DFS + pouzitie mojej heuristiky na rozdelenie tiebreak
        print("Test heuristiky + backtracking + vlastna heuristika pre tiebreak")
        for i in range(TEST_NUM):
            starting_node = cell(starting_positions[j][0], starting_positions[j][1], 1, 8)
            time_t, path = test_heuristics_backtracking(starting_node, False,3)
            timer = timer + float(time_t)
        test_output(path,starting_node,timer,TEST_NUM)
        timer = 0


def main():
    global NUMBER_OF_MOVES
    generate_checkboard()
    starting_positions = generate_starting_positions()
    controller = 0

    print(starting_positions)
    while controller != 6:
        print(
            "0 - Test 10 vychodzich random bodov\n1 - Dostupnost cesty pre kazde policko na sachovnici pouzitim "
            "cistej heuristiky\n2 - (BOD) Cesta pre "
            "cistu Heuristiku\n3 - (BOD) Cesta pre vlastnu heuristiku\n4 - (BOD) Cesta pre Heuristiku + "
            "backtracking\n5 - (BOD) Cesta pre Heuristiku + backtracking + vlastná heuristika\n6 - koniec programu")

        clear_chessboard()
        NUMBER_OF_MOVES = 0
        controller = int(input("Zadaj moznost: "))


        if controller == 0:
            test_starting_points(starting_positions)

        if controller == 1:
            test_all_clean_heuristics()

        if controller == 2:
            line = input("Zadaj X a Y koordinati: ")
            x = int(line.split()[0])
            y = int(line.split()[1])

            time0 = time.time()
            test_clean_heuristics(x, y,True)
            time1 = time.time()

            print("Algoritmus trval {} sekund".format(time1 - time0))
            print("Pocet navstivenych stavov je : ", SIZE ** 2 - 1)
            print_chessboard()

        if controller == 3:

            line = input("Zadaj X a Y koordinati: ")
            x = int(line.split()[0])
            y = int(line.split()[1])

            starting_node = cell(x, y, 1, 8)
            test_heuristics_backtracking(starting_node,True,2)

        if controller == 4:
            line = input("Zadaj X a Y koordinati: ")
            x = int(line.split()[0])
            y = int(line.split()[1])

            starting_node = cell(x, y, 1, 8)
            test_heuristics_backtracking(starting_node, True, 1)

        if controller == 5:
            line = input("Zadaj X a Y koordinati: ")
            x = int(line.split()[0])
            y = int(line.split()[1])

            starting_node = cell(x, y, 1, 8)
            test_heuristics_backtracking(starting_node, True, 3)


if __name__ == "__main__":
    main()
