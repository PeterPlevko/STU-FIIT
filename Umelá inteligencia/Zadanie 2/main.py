import math
import random
from tkinter import *
import time
import matplotlib.pyplot as plt
import copy


# my object
class Individual:
    def __init__(self, distance, fitness, route):
        self.route = route
        self.distance = distance
        self.fitness = fitness


# sets fitness for the whole population
def setFitness(population_fitness):
    for i in range(0, len(population_fitness)):
        population_fitness[i].distance = 0
        population_fitness[i].fitness = 0
        distance = 0

        for j in range(0, len(population_fitness[i].route)):
            from_city = population_fitness[i].route[j]

            if j + 1 < len(population_fitness[i].route):
                to_city = population_fitness[i].route[j + 1]
            else:
                to_city = population_fitness[i].route[0]
            x_coordinate = abs(from_city[0] - to_city[0])
            y_coordinate = abs(from_city[1] - to_city[1])
            temp = math.sqrt((x_coordinate * x_coordinate) + (y_coordinate * y_coordinate))
            distance += temp

        x_coordinate = abs(population[i].route[len(population[i].route)-1][0] - population[i].route[0][0])
        y_coordinate = abs(population[i].route[len(population[i].route)-1][1] - population[i].route[0][1])
        temp = math.sqrt((x_coordinate * x_coordinate) + (y_coordinate * y_coordinate))
        distance += temp
        population_fitness[i].distance = distance
        population_fitness[i].fitness = 1 / float(population_fitness[i].distance)
    sorted_population = sorted(population_fitness, key=lambda x: x.fitness, reverse=True)
    return sorted_population


def crossover(parent1, parent2):
    # crossover starts
    childP1 = []

    random_number1 = int(random.random() * len(parent1))
    random_number2 = int(random.random() * len(parent1))

    start_index = min(random_number1, random_number2)
    end_index = max(random_number1, random_number2)

    for j in range(start_index, end_index):
        childP1.append(parent1[j])

    childP2 = [item for item in parent2 if item not in childP1]

    child = Individual(0, 0, childP1 + childP2)
    return child


# tournament selection function
def tournament(upper_bound):
    new_population = []
    for i in range(0, upper_bound):
        fighters1 = []
        for _ in range(0, round(upper_bound/10)):
            # a = round(upper_bound/2)
            fighters1.append(population[random.randint(0, len(population)-1)])
        fighters1 = sorted(fighters1, key=lambda x: x.fitness, reverse=True)

        fighters2 = []
        for _ in range(0, round(upper_bound/10)):
            fighters2.append(population[random.randint(0, len(population)-1)])
        fighters2 = sorted(fighters2, key=lambda x: x.fitness, reverse=True)

        first_parent = fighters1[0].route
        second_parent = fighters2[0].route

        child = crossover(first_parent, second_parent)
        new_population.append(child)
    return new_population


# returns parent
def roulette_roulette(upper_bound):
    for i in range(0, upper_bound):
        max_fitness = sum(chromosome.fitness for chromosome in population)
        pick = random.uniform(0, max_fitness)
        current = 0
        for chromosome in population:
            current += chromosome.fitness
            if current > pick:
                return chromosome


# roulette selection function
def roulette(upper_bound):
    global population
    new_population = []

    for i in range(0, upper_bound):
        first_parent = roulette_roulette(upper_bound).route
        second_parent = roulette_roulette(upper_bound).route

        child = crossover(first_parent, second_parent)
        new_population.append(child)
    return new_population


# function that chooses a random city and swaps it with the one next to it
def mutate(population_mutate):
    for i in range(len(population_mutate)):
        probability = random.random()
        # probability of mutation = 5%
        if probability < 0.005:
            first = random.randint(0, len(population_mutate[0].route) - 2)
            temp = population_mutate[i].route[first]
            population_mutate[i].route[first] = population_mutate[i].route[first+1]
            population_mutate[i].route[first+1] = temp


# this function creates and returns next generation
def nextGeneration(choice_of_selection, choice_mutate, choice_elitism, choice_random):
    global population
    new_population = []

    for x in range(0, choice_elitism):
        new_population.append(population[x])
    for x in range(0, choice_random):
        temp_random_route = random.sample(city_list, len(city_list))
        temp_individual = Individual(0, 0, temp_random_route)
        new_population.append(temp_individual)

    if choice_of_selection == 1:
        new_population += tournament(len(population) - choice_elitism - choice_random)

    if choice_of_selection == 2:
        new_population += roulette(len(population) - choice_elitism - choice_random)

    if choice_mutate == 0:
        pass
    if choice_mutate == 1:
        mutate(new_population)

    new_population = setFitness(new_population)
    return new_population


# this function calculates route
def calculateRoute(route):
    global city_list
    final_route = []
    for i in range(0, len(route)):
        for j in range(0, len(route)):
            if route[i] == city_list[j]:
                final_route.append(j+1)
                break
    return final_route


########################################################################################################################
population_size = int(input("size of population: "))
generation_size = int(input("size of generation: "))
population = []

# sample input
choice_input = input("press 1 for sample input press 2 for random input: ")

if choice_input == "1":
    city_list = [
        [60, 200], [180, 200], [100, 180], [140, 180], [20, 160], [80, 160],
        [200, 160], [140, 140], [40, 120], [120, 120], [180, 100], [60, 80], [100, 80],
        [180, 60], [20, 40], [100, 40], [200, 40], [20, 20], [60, 20], [160, 20]
    ]

elif choice_input == "2":
    number_of_cities = int(input("number of cities: "))
    city_list = []
    for _ in range(0, number_of_cities):
        array = [int(random.random() * 200), int(random.random() * 200)]
        city_list.append(array)
else:
    city_list = []

averages = []

# here starts the generation breeding

choice1 = int(input("press 1 for Tournament Selection press 2 for Roulette Wheel Selection: "))
choice2 = int(input("do you want to mutate 1 == yes 0 == no: "))
choice3 = int(input("number of elites: "))
choice4 = int(input("number of randoms: "))


over_all_distance = 0
over_all_fitness = 0
over_all_time = 0
# for x in range(0, 3):

# creates population
for _ in range(0, population_size):
    random_route = random.sample(city_list, len(city_list))
    individual = Individual(0, 0, random_route)
    population.append(individual)
population = setFitness(population)
best_first_individual = copy.deepcopy(population[0])
best_around = copy.deepcopy(population[0])
best_of_generation = []
best_around_generation = 0

start = time.time()
for position in range(0, generation_size):
    temp_average = 0
    population = nextGeneration(choice1, choice2, choice3, choice4)
    best_of_generation.append(population[0].fitness)

    for average in range(0, len(population)):
        temp_average += population[average].fitness
    averages.append(temp_average/len(population))

    if population[0].fitness > best_around.fitness:
        best_around = copy.deepcopy(population[0])
        best_around_generation = position
end = time.time()
over_all_time += end - start
over_all_fitness += best_around.fitness
over_all_distance += best_around.distance

# print(over_all_time/3)
# print(over_all_fitness/3)
# print(over_all_distance/3)

# draws my traveling salesman
master = Tk()
w = Canvas(master, width=800, height=800)
w.pack()
x_global = 0
for city in city_list:
    x_global += 1
    r = 5
    w.create_oval(city[0] * 2 + 5, city[1] * 2 + 5, (city[0] + r) * 2 + 5, (city[1] + r) * 2 + 5, fill="black")
    w.create_text((city[0] * 2 + 5 + (city[0] + r) * 2 + 5) / 2, (city[1] * 2 + 5 + (city[1] + r) * 2 + 5) / 2 + 15,
                  fill="black", font="Times 10 italic bold", text=x_global)

for city in range(0, len(city_list)-1):
    w.create_line(best_around.route[city][0] * 2 + 5 + 5, best_around.route[city][1] * 2 + 5 + 5,
                  best_around.route[city + 1][0] * 2 + 5+5, best_around.route[city + 1][1] * 2 + 5+5, width="2")
w.create_line(best_around.route[len(city_list)-1][0] * 2 + 5+5, best_around.route[len(city_list)-1][1] * 2 + 5 + 5,
              best_around.route[0][0] * 2 + 5+5, best_around.route[0][1] * 2 + 5+5)
mainloop()
print()
print("Generation 0")
print("Best fitness:", best_first_individual.fitness)
print("Distance:", best_first_individual.distance)
print("Path:", calculateRoute(best_first_individual.route))

print("-----------------------------------------------")
print("Generation", generation_size-1)
print("Best fitness:", population[0].fitness)
print("Distance:", population[0].distance)
print("Path:", calculateRoute(population[0].route))
print("-----------------------------------------------")

print("Best overall")
print(f"found in {best_around_generation} generation")
print("Fitness:", best_around.fitness)
print("Distance", best_around.distance)
print("Path:", calculateRoute(best_around.route))
print(f"Number of generations: {generation_size} | population size: {population_size} | number of cities:"
      f" {len(city_list)} | time: {end - start}")

# creates graph
fig, ax = plt.subplots()
ax.plot(averages, label='average')
ax.plot(best_of_generation, label='best')
ax.legend()
ax.set(xlabel='generations', ylabel='fitness',
       title='graph of averages and best')
ax.grid()
plt.show()

# end of the program
# author Peter Plevko
