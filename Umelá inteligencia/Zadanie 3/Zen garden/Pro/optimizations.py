from algorithms import *
from monksolve import *
from itertools import product
from time import time
from threading import Thread


def single_pass(algo, garden, monk, enter_tiles, stats, optimization):

    start_time = time()

    if algo == 0:
        monk = tabu_search(garden, monk, enter_tiles, optimization[0], optimization[1])

    elif algo == 1:
        monk = annealing(garden, monk, enter_tiles, optimization[0], optimization[1])

    end_time = time()
    stats.append([monk, end_time - start_time])


def tabu_optimization():

    # reset out file
    open("data/optimizations_tabu", "w").close()

    # loop through 5 gardens
    for garden_index in range(5, 10):

        garden = load_garden("maps/input" + str(garden_index))
        enter_tiles = create_enter_tiles(garden)
        max_fitness = garden_max_fitness(garden)

        monk_list = [spawn_monk(garden) for i in range(100)]

        multipliers = list(product([1, 2, 5], [1, 2, 5]))

        for i in multipliers:

            file = open("data/optimizations_tabu", "a")

            print(garden_index, i)
            print("Multiplier:", i, max_fitness, end=" ", file=file)

            threads = []
            stats = []

            for j in range(100):
                monk = monk_list[j]
                thread = Thread(target=single_pass, args=(0, garden, monk, enter_tiles, stats, i))
                thread.start()
                threads.append(thread)

            for thread_index in range(len(threads)):
                threads[thread_index].join()

            best_fitness = max(stats, key=lambda x: x[0][0])[0][0]
            average_fitness = sum([stat[0][0] for stat in stats]) / 100
            average_time = sum([stat[1] for stat in stats]) / 100

            print(best_fitness, average_fitness, average_time, file=file)

            file.close()

        file = open("data/optimizations_tabu", "a")
        print(file=file)
        file.close()


def annealing_optimization():

    # reset out file
    open("data/optimizations_annealing", "w").close()

    multipliers = list(product([25, 50, 100], [0.25, 0.5, 1, 2, 5]))

    # loop through 5 gardens
    for garden_index in range(5, 10):

        garden = load_garden("maps/input" + str(garden_index))
        enter_tiles = create_enter_tiles(garden)
        max_fitness = garden_max_fitness(garden)

        monk_list = [spawn_monk(garden) for i in range(100)]

        for i in multipliers:

            file = open("data/optimizations_annealing", "a")

            print(garden_index, i)
            print("Multiplier:", i, max_fitness, end=" ", file=file)

            threads = []
            stats = []

            for j in range(100):
                monk = monk_list[j]
                thread = Thread(target=single_pass, args=(1, garden, monk, enter_tiles, stats, i))
                thread.start()
                threads.append(thread)

            for thread_index in range(len(threads)):
                threads[thread_index].join()

            best_fitness = max(stats, key=lambda x: x[0][0])[0][0]
            average_fitness = sum([stat[0][0] for stat in stats]) / 100
            average_time = sum([stat[1] for stat in stats]) / 100

            print(best_fitness, average_fitness, average_time, file=file)

            file.close()

        file = open("data/optimizations_annealing", "a")
        print(file=file)
        file.close()


def main():

    annealing_optimization()
    #tabu_optimization()


main()
