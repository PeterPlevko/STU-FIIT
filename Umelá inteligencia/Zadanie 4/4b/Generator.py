from random import choice, randrange, uniform
from time import time
import Algorithms


# Generate random vertices within borders
def generate_vertices(borders, amount):

    vertices = {}

    for i in range(amount):

        while True:
            x = randrange(-borders[0], borders[0] + 1)
            y = randrange(-borders[1], borders[1] + 1)
            key = (x, y)

            if key not in vertices:
                vertices[key] = (x, y)
                break

    return vertices


# Special sucky generation withinh borders
def generate_square_clusters(borders, first_group_size, second_group_size, radius):

    original_vertices = generate_vertices(borders, first_group_size)
    original_values = list(original_vertices.values())
    vertices = {}

    start_time = time()

    for i in range(second_group_size):

        if time() - start_time > 10 * 60:
            break

        vertex = choice(original_values)
        
        while True:

            if time() - start_time > 10 * 60:
                break

            x = randrange(vertex[0] - radius, vertex[0] + radius + 1)
            y = randrange(vertex[1] - radius, vertex[1] + radius + 1)
            key = (x, y)    

            if key not in vertices:
                vertices[key] = (x, y)
                break

    return list(vertices.values())


# Fancy cluster generator
def generate_fancy_clusters(borders, first_group_size, second_group_size, radius):

    original_vertices = generate_vertices(borders, first_group_size)
    original_values = list(original_vertices.values())
    vertices = {}

    start_time = time()

    while len(vertices) < second_group_size:

        if time() - start_time > 10 * 60:
            break

        max_distance = uniform(1, radius ** (10 ** -1)) ** 10
        counter = 0
        
        while True:

            if time() - start_time > 10 * 60:
                break

            vertex = choice(original_values)

            x = randrange(vertex[0] - radius, vertex[0] + radius + 1)
            y = randrange(vertex[1] - radius, vertex[1] + radius + 1)

            key = (x, y)

            if counter == 100:
                break

            if Algorithms.calculate_distance(vertex, key) > max_distance:
                counter += 1
                continue

            if key not in vertices:
                vertices[key] = (x, y)
                break

    return list(vertices.values())
