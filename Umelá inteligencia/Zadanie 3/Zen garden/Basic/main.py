import time
from copy import deepcopy
from random import randint, random


def get_fitness(monk):
    return monk[1]


# krizenie genov rodicov a mutacia dietata
def crossover(dominant, recessive):
    child = [[], 0]

    # vypocet miesta, od ktoreho sa menia geny
    ratio = ((dominant[1] - recessive[1] + setting[5]) / (2 * setting[5])) * len(dominant[0])
    ratio = int(round(ratio))

    for i in range(0, ratio):                                   # prva cast genov zo silnejsieho rodica
        child[0].append(dominant[0][i])

    for j in range(ratio, len(recessive[0])):                   # druha cast genov zo slabsieho
        while recessive[0][j] in child[0] or recessive[0][j] in blocked:
            recessive[0][j] = randint(0, border - 1)
        child[0].append(recessive[0][j])

    for gene in range(len(child[0])):                           # mutovanie genov
        if random() <= setting[2]:
            child[0][gene] = get_random(child)

    return child


# vyber jedinca ruletou
def roulette(totalfitness):
    num = randint(0, totalfitness)

    for monk in reversed(population):
        num -= monk[1]
        if num < 1:
            return monk


# vyber silnejsieho turnajom medzi 2 jedincami
def tournament():
    first = randint(0, setting[0] - 1)
    second = randint(0, setting[0] - 1)

    while second == first:                                      # predidenie vyberu rovnakych jedincov do turnaja
        second = randint(0, setting[0] - 1)

    if population[first][1] > population[second][1]:
        return population[first]
    else:
        return population[second]


def evolve():
    new_population = []
    population.sort(key=get_fitness, reverse=True)              # usporiadanie mnichov podla fitness hodnoty

    if population[0][1] == setting[5]:                          # navrat uspesneho jedinca
        return population[0]

    total_fitness = 0                                           # celkove fitness generacie pre ruletu a statistiku
    for monk in population:
        total_fitness += monk[1]

    print("Best fitness:", population[0][1])
    print("Worst fitness:", population[setting[0] - 1][1])
    print("Average fitness:", total_fitness / setting[0], end="\n\n")

    elite = int(setting[0] * setting[3])                        # elitizmus
    for i in range(elite):
        new_population.append(population[i])

    new_blood = int(setting[0] * setting[4])                    # nova krv - vymena najslabsich jedincov za nahodnych
    for i in range(new_blood):
        for gene in range(len(population[setting[0] - i - 1][0])):
            population[setting[0] - i - 1][0][gene] = get_random(population[setting[0] - i - 1])

    while len(new_population) < setting[0]:
        first_parent = tournament()                             # vyber turnajom
        second_parent = tournament()
        if first_parent[1] > second_parent[1]:
            new_population.append(crossover(first_parent, second_parent))
        else:
            new_population.append(crossover(second_parent, first_parent))

        first_parent = roulette(total_fitness)                  # vyber ruletou
        second_parent = roulette(total_fitness)
        if first_parent[1] > second_parent[1]:
            new_population.append(crossover(first_parent, second_parent))
        else:
            new_population.append(crossover(second_parent, first_parent))

    population.clear()

    for monk in new_population:                                 # vyslanie novych mnichov hrabat, pridelovanie
        if monk[1] == 0:                                        # fitness a premiestnenie do hlavnej populacie
            rake(monk)
        population.append(monk)

    return None


# funkcie na overovanie moznosti hrabania mnicha
def check_down(test_garden, x, y, path):
    if x + 1 < lines and test_garden[x + 1][y] == path:
        return 1

    return 0


def check_up(test_garden, x, y, path):
    if x > 0 and test_garden[x - 1][y] == path:
        return 1

    return 0


def check_right(test_garden, x, y, path):
    if y + 1 < columns and test_garden[x][y + 1] == path:
        return 1

    return 0


def check_left(test_garden, x, y, path):
    if y > 0 and test_garden[x][y - 1] == path:
        return 1

    return 0


# overovanie, ci je mnich na okraji a chce pokracovat v hrabani za okraj
def check_borders(x, y, direction):
    if direction == "d" and x == lines - 1:
        return 1

    if direction == "u" and x == 0:
        return 1

    if direction == "l" and y == 0:
        return 1

    if direction == "r" and y == columns - 1:
        return 1

    return 0


# funkcia na pohrabanie zahrady na zaklade genu
def draw_garden(x, y, order, test_garden, path, direction):
    fitness = 1                                                 # pociatocny fitness je 1 a pripocita sa pri kazdom
                                                                # vstupe na nove policko, okrem vstupneho
    if test_garden[x][y] != path:
        return 0

    while 1:
        test_garden[x][y] = order

        if direction == "d":
            if check_down(test_garden, x, y, path):             # pohyb dole
                x = x + 1
                fitness += 1
                continue

            if check_borders(x, y, direction):                # pokial je na okraji, ukonci hrabanie
                return fitness

            elif check_right(test_garden, x, y, path):          # pokial pohyb dole nie je mozny, mnich
                direction = "r"                                 # pokracuje doprava alebo dolava
                continue

            elif check_left(test_garden, x, y, path):
                direction = "l"
                continue

            else:                                               # mnich je zaseknuty
                return 0

        elif direction == "u":
            if check_up(test_garden, x, y, path):               # pohyb hore
                x = x - 1
                fitness += 1
                continue

            elif check_borders(x, y, direction):
                return fitness

            elif check_left(test_garden, x, y, path):
                direction = "l"
                continue

            elif check_right(test_garden, x, y, path):
                direction = "r"
                continue

            else:
                return 0

        elif direction == "r":
            if check_right(test_garden, x, y, path):            # pohyb doprava
                y = y + 1
                fitness += 1
                continue

            elif check_borders(x, y, direction):
                return fitness

            elif check_down(test_garden, x, y, path):
                direction = "d"
                continue

            elif check_up(test_garden, x, y, path):
                direction = "u"
                continue

            else:
                return 0

        else:
            if check_left(test_garden, x, y, path):             # pohyb dolava
                y = y - 1
                fitness += 1
                continue

            elif check_borders(x, y, direction):
                return fitness

            elif check_up(test_garden, x, y, path):
                direction = "u"
                continue

            elif check_down(test_garden, x, y, path):
                direction = "d"
                continue

            else:
                return 0

    return 0


# funkcia na prejdenie genmi mnicha a zhodnotenie fitness
def rake(monk):
    test_garden = deepcopy(garden)                              # vytvorenie zahrady, na ktorej sa budu
    order = 1                                                   # zapisovat pohyby aktualneho mnicha

    for gene in monk[0]:                                        # prechadzanie genmi mnicha
        if gene < columns:                                      # gen zacina hore (hrabe smerom dole)
            fitness = draw_garden(0, gene, order, test_garden, 0, "d")

            if fitness == 0:
                draw_garden(0, gene, 0, test_garden, order, "d")
                order -= 1                                      # pokial sa vdaka genu mnich zasekne,
            else:                                               # nepripocita sa jeho fitness, jeho trasa
                monk[1] += fitness                              # sa zmaze z mapy a odpocita sa poradie

        elif gene < columns + lines - 2:                        # vpravo
            fitness = draw_garden(gene - columns + 1, columns - 1, order, test_garden, 0, "l")

            if fitness == 0:
                draw_garden(gene - columns + 1, columns - 1, 0, test_garden, order, "l")
                order -= 1
            else:
                monk[1] += fitness

        elif gene < 2 * columns + lines - 2:                    # dole
            fitness = draw_garden(lines - 1, (columns * 2 + lines - 3) - gene, order, test_garden, 0, "u")

            if fitness == 0:
                draw_garden(lines - 1, (columns * 2 + lines - 3) - gene, 0, test_garden, order, "u")
                order -= 1
            else:
                monk[1] += fitness

        else:                                                   # vlavo
            fitness = draw_garden(columns * 2 + lines * 2 - 4 - gene, 0, order, test_garden, 0, "r")

            if fitness == 0:
                draw_garden(columns * 2 + lines * 2 - 4 - gene, 0, 0, test_garden, order, "r")
                order -= 1
            else:
                monk[1] += fitness

        order += 1                                              # gen prejdeny, pripocita sa poradie dalsieho

    if solution is not None:                                    # vypis mapy s vyslednym pohrabanim
        for i in test_garden:
            for j in i:
                if 10 > j >= 0:
                    print(" ", j, end="")
                else:
                    print("", j, end="")
            print("")

    del test_garden


# vyplnenie tabulky zablokovanych vstupnych policok
def get_obstacles():

    for i in range(columns):                                # overenie kamenov na hornom a spodnom okraji
        if garden[0][i] == -1:
            blocked.append(i)
        if garden[lines - 1][i] == -1:
            blocked.append(columns * 2 + lines - 3 - i)

    for i in range(lines - 1):                              # overenie kamenov vlavo a vpravo
        if garden[i + 1][0] == -1:
            blocked.append(columns * 2 + lines * 2 - 4 - i - 1)
        if garden[i + 1][columns - 1] == -1:
            blocked.append(i + columns)


# funkcia vracia nahodne vygenerovany gen pre mnicha
def get_random(monk):
    rand = randint(0, border - 1)

    while rand in monk[0] or rand in blocked:                   # overenie duplikatov alebo nedosiahnutelneho policka
        rand = randint(0, border - 1)

    return rand


# vytvorenie pociatocnej populacie
def init_population():

    for i in range(setting[0]):
        monk = [[], 0]                                          # inicializacia mnicha s fitness hodnotou 0

        for j in range(border // 2 - len(blocked) % 3):         # cyklus na vytvorenie nahodnych genov
            monk[0].append(get_random(monk))

        rake(monk)
        population.append(monk)


# funkcia na vytvorenie zahrady
def init_garden():

    for row in range(lines):                                    # inicializacia policok zahrady na 0
        col = []
        for column in range(columns):
            col.append(0)
        garden.append(col)

    for stone in stones:                                        # vlozenie kamenov do zahrady
        garden[stone[0]][stone[1]] = -1


# <<<  MAIN  >>> #

setting = []                                                    # standardne nastavenia: 100 1000 0.2 0.02 0.5
print("SETTINGS")
print("Order: Population count, max generation, mutation probability, elite and new blood percentile")

for sets in input().split():                                    # vlozenie vstupu do nastaveni
    if float(sets) < 1:
        setting.append(float(sets))
    else:
        setting.append(int(sets))

print("\nEnter map file name: ", end="")
garden = open("maps/" + input() + ".txt")
print("")

lines, columns = garden.readline().split()                      # nacitanie zahradky
lines = int(lines)
columns = int(columns)

stones = []
for line in garden:
    stones.append([int(coord) for coord in line.split()])

garden.close()

garden = []
init_garden()

for row in garden:
    print(row)

stones = len(stones)                                            # pocet kamenov
blocked = []                                                    # krajne policka zablokovane kamenmi
get_obstacles()

border = 2 * (lines + columns) - 4                              # pocet policok na ktore moze mnich vstupit
setting.append(lines * columns - stones)                        # doplnenie rozmeru zahrady do nastaveni programu

begin = time.perf_counter()

solution = None
population = []                                                 # vytvorenie pociatocnej populacie
init_population()
generations = 0

while generations < setting[1]:                                 # prechazanie generaciami po maximalnu generaciu
    generations += 1
    solution = evolve()

    if solution is not None:                                    # vypis najdeneho riesenia
        print("Best solution found in generation", generations)
        print("Genes:", solution[0])
        rake(solution)
        break

if generations == setting[1] and solution is None:              # pokial riesenie nebolo najdene, vypise sa
    solution = population[0]                                    # jedinec s najvyssim fitness v generacii
    print("Best solution not found in", generations, "generations.")
    print("Highest fitness:", solution[1])
    print("Genes:", solution[0])
    rake(solution)

end = time.perf_counter()
print(f"Time: {end - begin:0.2f}")
