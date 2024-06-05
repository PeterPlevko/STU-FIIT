from math import sqrt
from random import randrange, choice
from time import time
from itertools import combinations
from sys import getsizeof
import Generator


DEBUG = True


# Calculate average int from array
def average_int(array, key=lambda x: x):

    sum = 0

    if len(array) == 0:
        return 0

    for i in range(len(array)):
        sum += key(array[i])

    return round(sum / len(array))


# Calculate average float from array
def average_float(array, key=lambda x: x):

    sum = 0

    if len(array) == 0:
        return 0

    for i in range(len(array)):
        sum += key(array[i])

    return sum / len(array)


# Get max list
def max_error_index(arrays, clusters):

    errors = []

    for cluster_index in range(len(arrays)):
        errors.append(calculate_offset_sum([arrays[cluster_index]], [clusters[cluster_index]]))

    return errors.index(max(errors))


# Get smallest index
def min_double_array_index(double_array):

    first_index = -1
    second_index = -1

    min_distance = float("inf")

    for i in range(len(double_array)):
        if not double_array[i]:
            continue
        mini = min(double_array[i])
        if mini < min_distance:
            first_index = i
            second_index = double_array[i].index(mini)
            min_distance = mini


    return first_index, second_index


# Recalculate clusters to new center
def recalculate_clusters_average(colored_vertices):

    new_clusters = []

    for single_color in colored_vertices:

        x = average_int(single_color, key=lambda x: x[0])
        y = average_int(single_color, key=lambda x: x[1])

        new_clusters.append((x, y))

    return new_clusters


# Move cluster to medoid
def recalculate_clusters_medoid(colored_vertices):

    new_clusters = []
    
    for single_color in colored_vertices:

        total_distances = []

        for vertex in single_color:
            total_distances.append(calculate_offset_sum([single_color], [vertex]))

        min_distance = min(total_distances)
        min_index = total_distances.index(min_distance)

        new_clusters.append(single_color[min_index])

    return new_clusters


# Choose k vertices from all
def choices(array, k):

    new_dict = {}

    while len(new_dict) < k:

        new_element = choice(array)

        if new_element not in new_dict:
            new_dict[new_element] = new_element

    return list(new_dict.values())


# Calculate distance between two vertices
def calculate_distance(vertex1, vertex2):

    x = abs(vertex1[0] - vertex2[0])
    y = abs(vertex1[1] - vertex2[1])

    return sqrt(x**2 + y**2)


# Sort vertices into array of clusters
def color_vertices(vertices, clusters):

    colors = [[] for i in range(len(clusters))]

    for i in vertices:

        min_distance = (float("inf"), 0)

        for j in range(len(clusters)):

            current_distance = calculate_distance(i, clusters[j])
            if min_distance[0] > current_distance:
                min_distance = (current_distance, j)

        colors[min_distance[1]].append(i)

    return colors


# Calculate the average offset for each cluster
def calculate_average_offsets(colored_vertices, clusters):

    average_offset = []

    for color_index in range(len(colored_vertices)):
        
        offset = []

        for vertex in colored_vertices[color_index]:

            offset.append(calculate_distance(clusters[color_index], vertex))

        average_offset.append(average_int(offset))

    return average_offset


# Calculate the sum of all offsets combined
def calculate_offset_sum(colored_vertices, clusters):

    offset_sum = 0

    for color_index in range(len(colored_vertices)):
        
        offset = []

        for vertex in colored_vertices[color_index]:

            offset.append(calculate_distance(clusters[color_index], vertex))

        offset_sum += sum(offset)

    return offset_sum


# You know what k means
def k_means(k, vertices, iteration_border, recalculate_clusters):

    global DEBUG

    cluster_array = [list(choices(vertices, k))]

    colored_array = [color_vertices(vertices, cluster_array[0])]

    for i in range(iteration_border):

        if DEBUG:
            print("K-means iteration number {}".format(i + 1))

        cluster_array.append(recalculate_clusters(colored_array[i]))

        colored_array.append(color_vertices(vertices, cluster_array[i + 1]))

        if colored_array[i] == colored_array[i - 1]:
            break

    return colored_array, cluster_array


# Loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong boy
def agglomerative_brute(k, vertices, placeholder, recalculate_clusters):

    global DEBUG

    colored_vertices = list([[x] for x in vertices])
    clusters = recalculate_clusters(colored_vertices)

    start_time = time()

    while len(colored_vertices) > k:

        if DEBUG:
            print(time() - start_time)
            print("Agg: {}".format(len(colored_vertices)))

        start_time = time()

        first_index = None
        second_index = None
        min_distance = float("inf")

        for i in range(len(colored_vertices)):
            for j in range(i):

                distance = calculate_distance(clusters[i], clusters[j])
                if distance < min_distance:

                    min_distance = distance
                    first_index = i
                    second_index = j

        colored_vertices[first_index] += colored_vertices[second_index]
        del colored_vertices[second_index]
        clusters = recalculate_clusters(colored_vertices)

    return [colored_vertices], [clusters]


# Use of distance matrix
def agglomerative_matrix(k, vertices, placeholder, recalculate_clusters):

    colored_vertices = []
    clusters = []

    # Generate arrays
    for i in range(len(vertices)):
        colored_vertices.append([vertices[i]])
        clusters.append(vertices[i])

    # Generate double array matrix
    matrix = []
    for i in range(len(colored_vertices)):
        matrix.append([])
        for j in range(i):
            matrix[i].append(calculate_distance(clusters[i], clusters[j]))

    start_time = time()

    while len(colored_vertices) != k:

        if DEBUG:
            if not len(colored_vertices) % 100:
                print(time() - start_time)
                print("Agg: {}".format(len(colored_vertices)))
                start_time = time()

        # Find closest clusters
        second_index, first_index = min_double_array_index(matrix)

        colored_vertices[first_index] += colored_vertices[second_index]
        clusters[first_index] = recalculate_clusters([colored_vertices[first_index]])[0]

        # Update baad clusters
        for j in range(len(matrix[first_index])):
            matrix[first_index][j] = calculate_distance(clusters[first_index], clusters[j])

        for i in range(second_index + 1, len(matrix)):

            matrix[i][first_index] = calculate_distance(clusters[first_index], clusters[i])
            del matrix[i][second_index]
        
        del colored_vertices[second_index]
        del clusters[second_index]
        del matrix[second_index]

    return [colored_vertices], [clusters]


# While not good -> k-means
def divisive(k, vertices, iteration_border, recalculate_clusters):

    number_of_clusters = 2
    colored_vertices, clusters = k_means(2, vertices, iteration_border, recalculate_clusters)
    colored_array = [colored_vertices[-1]]
    cluster_array = [clusters[-1]]

    while number_of_clusters != k:

        dupli_colors = list([x for x in colored_array[-1]])
        dupli_clusters = list(cluster_array[-1])

        biggest_error_index = max_error_index(dupli_colors, dupli_clusters)

        new_vertices, new_clusters = k_means(2, dupli_colors[biggest_error_index], 
                iteration_border, recalculate_clusters)

        del dupli_colors[biggest_error_index]
        del dupli_clusters[biggest_error_index]

        for i in new_vertices[-1]:
            dupli_colors.append(i)
        
        for i in new_clusters[-1]:
            dupli_clusters.append(i)
        
        colored_array.append(dupli_colors)
        cluster_array.append(dupli_clusters)
        number_of_clusters += 1

    return colored_array, cluster_array
