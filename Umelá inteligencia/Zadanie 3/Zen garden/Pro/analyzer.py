from algorithms import *
from monksolve import *
from time import time
from threading import Thread


def single_pass(algo, garden, monk, enter_tiles, stats):

    start_time = time()

    if algo == 0:
        monk = hillclimber_lite(garden, monk, enter_tiles)

    elif algo == 1:
        monk = hillclimber(garden, monk, enter_tiles)

    elif algo == 2:
        monk = tabu_search(garden, monk, enter_tiles)

    elif algo == 3:
        monk = annealing(garden, monk, enter_tiles)

    end_time = time()
    stats.append([monk, end_time - start_time])


def main():

    # reset out file
    open("data/data_out", "w").close()

    population = 10
    algos = 4

    # loop through all garden inputs
    for garden_index in range(80):

        starting = time()

        file = open("data/data_out", "a")
        print(garden_index)

        garden = load_garden("maps/input" + str(garden_index))
        enter_tiles = create_enter_tiles(garden)
        max_fitness = garden_max_fitness(garden)

        print(max_fitness, end=" ", file=file)

        threads = []
        stats = [[] for i in range(algos)]
        monks = []

        for i in range(population):
            monks.append(spawn_monk(garden))

        # generate 100 solutions -> average
        for i in range(population):

            for algo_index in range(algos):
                thread = Thread(target=single_pass, args=(algo_index, garden, monks[i], enter_tiles, stats[algo_index]))
                thread.start()
                threads.append(thread)

            for thread_index in range(len(threads)):
                threads[thread_index].join()

        for i in range(len(stats)):

            best_fitness = max(stats[i], key=lambda x: x[0][0])[0][0]
            average_fitness = sum([stat[0][0] for stat in stats[i]]) / population
            average_time = sum([stat[1] for stat in stats[i]]) / population

            print(best_fitness, average_fitness, average_time, end=" ", file=file)

        print(file=file)
        file.close()


main()
