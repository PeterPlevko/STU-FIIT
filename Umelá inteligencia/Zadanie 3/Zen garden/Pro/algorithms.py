from monksolve import *
from itertools import combinations
from random import uniform, randrange
from math import exp


WRITE_FITNESS = True
global_max_fitness = 0


def solve_neighbours(garden, monk, enter_tiles):

    neighbour_list = []

    for i in range(len(monk[1])):
        clone = clone_monk(monk)
        clone[1][i] *= -1
        neighbour_list.append(clone)

    swap_combinations = list(combinations(monk[2], 2))
    for i in range(len(swap_combinations)):
        clone = clone_monk(monk)
        monk_swap_tiles(clone, swap_combinations[i][0], swap_combinations[i][1])
        neighbour_list.append(clone)

    for neighbour in neighbour_list:
        rake_garden(garden, neighbour, enter_tiles)

    neighbour_list.sort(key=lambda x: x[0], reverse=True)

    return neighbour_list


def tabu_insert(tabu_list, monk):

    for i in range(len(tabu_list) - 1):
        tabu_list[i] = tabu_list[i + 1]

    tabu_list[len(tabu_list) - 1] = monk


def hillclimber_lite(garden, monk, enter_tiles):

    # global WRITE_FITNESS, global_max_fitness
    #
    # file = None
    #
    # if WRITE_FITNESS:
    #     file = open("data/hillclimber_lite_fitness", "a")
    #     print(global_max_fitness, end=" ", file=file)

    best_monk = clone_monk(monk)
    rake_garden(garden, best_monk, enter_tiles)
    max_fitness = garden_max_fitness(garden)

    while best_monk[0] != max_fitness:

        # if WRITE_FITNESS:
        #     print(best_monk[0], end=" ", file=file)

        neighbour_list = []

        i = 0

        for i in range(len(best_monk[1])):
            clone = clone_monk(best_monk)
            clone[1][i] *= -1
            neighbour_list.append(clone)

        swap_combinations = list(combinations(best_monk[2], 2))
        for i in range(len(swap_combinations)):
            clone = clone_monk(best_monk)
            monk_swap_tiles(clone, swap_combinations[i][0], swap_combinations[i][1])
            neighbour_list.append(clone)

        for neighbour in neighbour_list:
            rake_garden(garden, neighbour, enter_tiles)

        for i in range(len(neighbour_list)):
            if neighbour_list[i][0] > best_monk[0]:
                best_monk = neighbour_list[i]
                break

        if i == len(neighbour_list) - 1:
            break

    # if WRITE_FITNESS:
    #     print(file=file)
    #     file.close()

    return best_monk


def hillclimber(garden, monk, enter_tiles):

    # global WRITE_FITNESS, global_max_fitness
    #
    # file = None
    #
    # if WRITE_FITNESS:
    #     file = open("data/hillclimber_fitness", "a")
    #     print(global_max_fitness, end=" ", file=file)

    best_monk = clone_monk(monk)
    rake_garden(garden, best_monk, enter_tiles)
    max_fitness = garden_max_fitness(garden)

    while best_monk[0] != max_fitness:

        # if WRITE_FITNESS:
        #     print(best_monk[0], end=" ", file=file)

        neighbour_list = solve_neighbours(garden, best_monk, enter_tiles)

        if best_monk[0] < neighbour_list[0][0]:
            best_monk = neighbour_list[0]
        else:
            break

    # if WRITE_FITNESS:
    #     print(file=file)
    #     file.close()

    return best_monk


def tabu_search(garden, monk, enter_tiles, tabu_list_multiplier=1, tabu_visit_multiplier=1):

    # global WRITE_FITNESS, global_max_fitness
    #
    # file = None
    #
    # if WRITE_FITNESS:
    #     file = open("data/tabu_search_fitness", "a")
    #     print(global_max_fitness, end=" ", file=file)

    current_monk = clone_monk(monk)
    best_monk = current_monk
    rake_garden(garden, current_monk, enter_tiles)
    max_fitness = garden_max_fitness(garden)

    tabu_list_size = round(tabu_list_multiplier * len(current_monk[1]))
    tabu_list = [i for i in range(tabu_list_size)]
    tabu_visit = 0
    max_tabu_visit = round(tabu_visit_multiplier * tabu_list_size)

    while best_monk[0] != max_fitness:

        # if WRITE_FITNESS:
        #     print(best_monk[0], end=" ", file=file)

        neighbour_list = solve_neighbours(garden, current_monk, enter_tiles)

        for i in range(len(tabu_list) + 1):

            # new monk is not in tabu list
            if neighbour_list[i] not in tabu_list:
                # new monk is better than current best
                if best_monk[0] < neighbour_list[i][0]:
                    best_monk = neighbour_list[i]
                    current_monk = best_monk
                    tabu_visit = 0
                    break
                # new monk is not as good
                else:
                    tabu_insert(tabu_list, current_monk)
                    current_monk = neighbour_list[i]
                    tabu_visit += 1
                    break

        if tabu_visit > max_tabu_visit:
            break

    # if WRITE_FITNESS:
    #     print(file=file)
    #     file.close()

    return best_monk


def annealing(garden, monk, enter_tiles, starting_temperature=25, cooling_multiplier=1):

    # global WRITE_FITNESS, global_max_fitness
    #
    # file = None
    #
    # if WRITE_FITNESS:
    #     file = open("data/simulated_annealing_fitness", "a")
    #     print(global_max_fitness, end=" ", file=file)

    current_monk = clone_monk(monk)
    rake_garden(garden, current_monk, enter_tiles)
    temperature = starting_temperature

    while temperature > 0.1:

        # if WRITE_FITNESS:
        #     print(current_monk[0], end=" ", file=file)

        neighbour = clone_monk(current_monk)

        # change decisions
        if uniform(0, len(current_monk[1]) + len(current_monk[2]) < len(current_monk[1])):
            neighbour[1][randrange(len(current_monk[1]))] *= -1

        # swap enter_tiles
        else:
            index1 = randrange(len(current_monk[2]))
            while True:
                index2 = randrange(len(current_monk[2]))
                if index1 != index2:
                    break

            monk_swap_tiles(neighbour, index1, index2)

        rake_garden(garden, neighbour, enter_tiles)

        if exp((neighbour[0] - current_monk[0])/temperature) >= uniform(0, 1):
            current_monk = neighbour

        temperature *= (0.99 ** cooling_multiplier)

    # if WRITE_FITNESS:
    #     print(file=file)
    #     file.close()

    return current_monk


# def main():
#
#     global global_max_fitness
#
#     for i in range(35, 40):
#
#         print(i)
#
#         garden = load_garden("maps/input" + str(i))
#         enter_tiles = create_enter_tiles(garden)
#         global_max_fitness = garden_max_fitness(garden)
#
#         start_monk = spawn_monk(garden)
#         hillclimber_lite(garden, start_monk, enter_tiles)
#         hillclimber(garden, start_monk, enter_tiles)
#         tabu_search(garden, start_monk, enter_tiles)
#         annealing(garden, start_monk, enter_tiles)
#
#
# main()
