import numpy
import random
from operator import attrgetter

population = []     #pole ktore v sebe drzi vsetkych jedincov prvej generacie

treasure_c = []     #pole obsahujuce dvojice suradnic pokladov

start_c = [0, 0]    #pole so suradnicami startu, ktore sa neskor nastavi podla vystupnej hodnoty funkcie


class Individual():                                                         #struktura jedinca ako objektu
    def __init__(self, tape, path, treasures, fitness):
        self.tape = []
        self.tape.extend(tape)
        self.path = path
        self.fitness = fitness
        self.treasures = treasures


def mutate(child):                                                          #funkcia pre mutaciu jedincov
    for i in range(64):
        random_num = random.randint(1, 100)
        if random_num <= 3:
            child.tape[i] = random.randint(0, 255)


def crossover(individual1, individual2):                                    #funkcia na krizenie jedincov
    index = random.randint(0, len(individual1.tape) - 1)
    new_tape1 = []
    new_tape2 = []
    for i in range(len(individual1.tape)):
        if i >= index:
            new_tape1.append(individual2.tape[i])
            new_tape2.append(individual1.tape[i])
        else:
            new_tape1.append(individual1.tape[i])
            new_tape2.append(individual2.tape[i])
    final_individual1 = Individual(new_tape1, get_path(new_tape1[:]), 0, 0)
    final_individual2 = Individual(new_tape2, get_path(new_tape2[:]), 0, 0)
    return final_individual1, final_individual2


def tournament(generation, k):
    contestants = []
    for i in range(k):
       contestants.append(random.choice(generation))
    return max(contestants, key=attrgetter('fitness'))


def set_fitness(individual):                                                #funkcia pocitajuca fitness jedincov
    if individual.treasures != 0:
        individual.fitness = 1000 * int(individual.treasures) - len(individual.path)
    else:
        individual.fitness -= len(individual.path)


def count_treasures(individual, coord, treasures, size):                    #funkcia pocitajuca najdene poklady
    if coord[0] < size and coord[1] < size:                                 #a ich nasledne odstranenie, aby sa program
        for each in treasures:                                              #necyklil
            if coord[0] == each[0] and coord[1] == each[1]:
                individual.treasures += 1
                treasures.remove(each)
        return True
    return False


def how_many_treasures(start_c, treasure_c, individual, size):              #funkcia simulujuca pohyb po mape
    for move in individual.path:
        if move == 'P':
            start_c[0] += 1
            if not count_treasures(individual, start_c, treasure_c, size):
                break
        elif move == 'L':
            start_c[0] -= 1
            if not count_treasures(individual, start_c, treasure_c, size):
                break
        elif move == 'H':
            start_c[1] -= 1
            if not count_treasures(individual, start_c, treasure_c, size):
                break
        elif move == 'D':
            start_c[1] += 1
            if not count_treasures(individual, start_c, treasure_c, size):
                break


def get_size():                                                 #funkcia ktora ziska rozmer mriezky/mapy
    file = open("size.txt", "r")
    size = int(file.readline())
    return size


def get_start_coordinates(start_c):                             #funkcia vracajuca suradnice startu
    file = open("start.txt", "r")
    for line in file:
        start_c[0], start_c[1] = (int(line.split()[0]), int(line.split()[1]))
    return start_c


def get_treasure_coordinates(treasure_c):                       #funkcia vracajuca suradnice vsetkych pokladov
   file = open("coords.txt", "r")
   for line in file:
      treasure_c.append((int(line.split()[0]), int(line.split()[1])))


def calculate_movement(givenValue):                             #funkcia urcuje symboly podla poctu jednotiek v bunke
    counter = 0
    while givenValue != 0:
        if givenValue & 1:
            counter += 1

        givenValue = givenValue >> 1

    if 0 <= counter <= 2:
        return 'H'
    elif 2 < counter <= 4:
        return 'D'
    elif 4 < counter <= 6:
        return 'P'
    elif 6 < counter <= 8:
        return 'L'


def get_path(tape):                                               #funkcia pomocou ktorej ziskame cestu kazdeho jedinca
    tapeIndex = 0
    moves = []
    for i in range(500):
        instruction = tape[tapeIndex] >> 6
        address = tape[tapeIndex] & 63

        if instruction == 0:
            tape[address] += 1
        elif instruction == 1:
            tape[address] -= 1
        elif instruction == 2:
            tapeIndex = address
        elif instruction == 3:
            moves.append(calculate_movement(tape[tapeIndex]))      #tato funkcia nam naplna pole symbolov pohybu

        if instruction != 2:
            tapeIndex += 1
            if tapeIndex > 63:
                tapeIndex = 0
    return moves                                                  #funkcia nam vrati pole so symbolmi pohybu(P, D,...)


def create_individual():                                                #funkcia na vytvorenie pamatovych buniek
    tape = [int(random.randint(0, 255)) for i in range(64)]             #pamatove bunky obsahujuce instrukcie
    return tape


number_of_generations = input('Zadajte pocet generacii: ')
population_size = input('Zadajte pocet jedincov pre jednu populaciu: ')
size = get_size()                                   #rozmer mapy/mriezky
start_c = get_start_coordinates(start_c)            #startovna pozicia jedincov
get_treasure_coordinates(treasure_c)                #funkcia ktora naplni pole dvojicami suradnic pokladov
number_of_treasures = len(treasure_c)               #pocet pokladov pomocou ktoreho zistujeme uspesnost programu


for ind in range(int(population_size)):
    seeker = create_individual()
    individual = Individual(seeker, get_path(seeker[:]), 0, 0)
    population.append(individual)

control_flag = 0
for i in range(int(number_of_generations)):
    print('Generacia cislo: ' + str(i))
    for member in population:
        how_many_treasures(start_c[:], treasure_c[:], member, size)
        if member.treasures == number_of_treasures:
            print('Jedinec z ' +str(i) +'. generacie nasiel vsetky poklady, jeho cesta bola: ', member.path)
            control_flag = 1
            break
        else:
            set_fitness(member)

    if control_flag == 1:
        break
    new_generation = []

    for counter in range(int(len(population) / 2)):
        while True:
            individual1 = tournament(population, 3)
            individual2 = tournament(population, 3)
            if not individual1 is individual2:
                break
        new_children = crossover(individual1, individual2)
        mutate(new_children[0])
        mutate(new_children[1])
        new_generation.append(new_children[0])
        new_generation.append(new_children[1])
    population.clear()
    population.extend(new_generation)
print()


