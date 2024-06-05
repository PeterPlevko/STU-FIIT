import tkinter
from time import time
from random import randrange
import Generator, Algorithms, inputcheck


colors = []


# Function to print one color into canvas
def output_single_color(vertices, canvas, borders, radius, color, size=2):

    for vertex in vertices:
        x = (vertex[0] + borders[0] + radius) // (2 * ((borders[0] + radius) / (min(borders[0], 750) + radius))) + 10
        y = (vertex[1] + borders[1] + radius) // (2 * ((borders[1] + radius) / (min(borders[1], 750) + radius))) + 10
        canvas.create_oval(x - size, y - size, x + size, y + size, outline="", fill=color)


# Fuction to print all colors into canvas
def output_colors(colored_vertices, canvas, borders, radius, size=2):

    global colors

    for color_index in range(len(colored_vertices)):
        output_single_color(colored_vertices[color_index], canvas, borders, radius, colors[color_index], size)


# Function to print first color from array
def output_first_color(colored_array, canvas, borders, radius, color, size=2):

    first_list = []

    for i in colored_array[0]:
        first_list += i

    output_single_color(first_list, canvas, borders, radius, "black")


# Function to loop through an array and update canvas
def animation(root, canvas, colored_array, cluster_array, borders, radius, speed, iteration):

    if not colored_array:
        return

    canvas.delete("all")
    root.title(iteration)

    output_colors(colored_array[0], canvas, borders, radius)
    output_single_color(cluster_array[0], canvas, borders, radius, "white", 5)

    input()

    canvas.after(speed, animation, root, canvas, colored_array[1:], cluster_array[1:], borders, radius, speed, iteration + 1)
        

def main():

    global colors

    print("\n" + "*" * 60)
    print(" " * 19 + "Zadanie 4 - Clustering" + " " * 19)
    print(" " * 24 + "Samuel Bubán" + " " * 24)
    print("*" * 60 + "\n")

    # Get all inputs
    x = inputcheck.input_check(range(100, 5001), "Set x border: ", "Out of range", "That's not an int", int)
    y = inputcheck.input_check(range(100, 5001), "Set y border: ", "Out of range", "That's not an int", int)
    borders = (x, y)
    number_of_clusters = inputcheck.input_check(range(1, 51), "Set number of clusters (k): ", 
            "Out of range", "That's not an int", int)
    number_of_vertices = inputcheck.input_check(range(10, 100001), "Set number of vertices: ", 
            "Out of range", "That's not an int", int)
    radius = inputcheck.input_check(range(10, 501), "Set radius: ", "Out of range", "That's not an int", int)
    generator = inputcheck.input_check([1, 2], "Choose generator:\n1 - square generator\n" + 
            "2 - fancy pants generator\n", "Type doesn't exist", "", int)
    algorithm = inputcheck.input_check([1, 2, 3, 4], "Choose algorithm:\n1 - K-means\n" + 
            "2 - Agglomerative brute\n3 - Agglomerative matrix\n4 - Divisive clustering\n", "Out of range",
            "That's not an int", int)
    recalculate = inputcheck.input_check([1, 2], "Choose recalculate function:\n1 - Centroid\n2 - Medoid\n",
            "Out of range", "That's not an int", int)

    # Generate random colors
    for i in range(number_of_vertices):
        rgb = (randrange(256), randrange(256), randrange(256))
        colors.append(f'#{rgb[0]:02x}{rgb[1]:02x}{rgb[2]:02x}')

    # Set generator function
    if generator == 1:
        generator = Generator.generate_square_clusters
    elif generator == 2:
        generator = Generator.generate_fancy_clusters

    # Create canvas
    root = tkinter.Tk()
    root.title("UI")
    canvas = tkinter.Canvas(root, bg="light gray", 
            width=min(750, borders[0]) + radius + 20, height=min(750, borders[1]) + radius + 20)
    canvas.pack()

    vertices = generator(borders, number_of_clusters, number_of_vertices, radius)

    if algorithm == 1:
        algorithm = Algorithms.k_means
    elif algorithm == 2:
        algorithm = Algorithms.agglomerative_brute
    elif algorithm == 3:
        algorithm = Algorithms.agglomerative_matrix
    elif algorithm == 4:
        algorithm = Algorithms.divisive

    if recalculate == 1:
        recalculate = Algorithms.recalculate_clusters_average
    elif recalculate == 2:
        recalculate = Algorithms.recalculate_clusters_medoid

    start_time = time()

    # ALGORIT HMMMM S
    colored_array, cluster_array = algorithm(number_of_clusters, vertices, 100, recalculate)

    print(time() - start_time)
 
    root_speci = tkinter.Tk()
    root_speci.title("UI")
    canvas_speci = tkinter.Canvas(root_speci, bg="light gray", 
            width=min(750, borders[0]) + radius + 20, height=min(750, borders[1]) + radius + 20)
    canvas_speci.pack()

    output_single_color(vertices, canvas_speci, borders, radius, "black")
    animation(root, canvas, colored_array, cluster_array, borders, radius, 5, 0)

    tkinter.mainloop()


main()
