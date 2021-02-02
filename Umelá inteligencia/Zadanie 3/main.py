import math
import random
import time
import numpy as np
import matplotlib.pyplot as plt


class DOT:
    def __init__(self, x, y, colour):
        self.x = x
        self.y = y
        self.colour = colour
        self.distance = -1


def classify(x, y, k):
    global number_of_training_data
    global final_data

    for j in range(number_of_training_data):
        training_data[j].distance = math.sqrt(((x-training_data[j].x) ** 2) + ((y-training_data[j].y) ** 2))
    # calculates distances

    sorted_training_data = sorted(training_data, key=lambda z: z.distance)
    # sort data by distance from lowest to highest

    r_count = 0
    g_count = 0
    b_count = 0
    p_count = 0

    for j in range(k):
        if sorted_training_data[j].colour == "red":
            r_count += 1
        elif sorted_training_data[j].colour == "green":
            g_count += 1
        elif sorted_training_data[j].colour == "blue":
            b_count += 1
        elif sorted_training_data[j].colour == "purple":
            p_count += 1

    final_colour = max(r_count, g_count, b_count, p_count)

    if final_colour == r_count:
        final_data.append(DOT(x, y, "red"))
        training_data.append(DOT(x, y, "red"))
        return "red"

    elif final_colour == g_count:
        final_data.append(DOT(x, y, "green"))
        training_data.append(DOT(x, y, "green"))
        return "green"

    elif final_colour == b_count:
        final_data.append(DOT(x, y, "blue"))
        training_data.append(DOT(x, y, "blue"))
        return "blue"

    elif final_colour == p_count:
        final_data.append(DOT(x, y, "purple"))
        training_data.append(DOT(x, y, "purple"))
        return "purple"


NUMBER = 625
print("Pocet bodov je:", NUMBER * 4 + 20)
# NUMBER == [5 000] means 20000 + 20 points
# NUMBER == [2 500] means 10000 + 20 points
# NUMBER == [1 250] means 5000 + 20 points
# NUMBER == [625] means 2500 + 20 points

R1 = DOT(-4500, -4400, "red")
R2 = DOT(-4100, -3000, "red")
R3 = DOT(-1800, -2400, "red")
R4 = DOT(-2500, -3400, "red")
R5 = DOT(-2000, -1400, "red")

G1 = DOT(+4500, -4400, "green")
G2 = DOT(+4100, -3000, "green")
G3 = DOT(+1800, -2400, "green")
G4 = DOT(+2500, -3400, "green")
G5 = DOT(+2000, -1400, "green")

B1 = DOT(-4500, +4400, "blue")
B2 = DOT(-4100, +3000, "blue")
B3 = DOT(-1800, +2400, "blue")
B4 = DOT(-2500, +3400, "blue")
B5 = DOT(-2000, +1400, "blue")

P1 = DOT(+4500, +4400, "purple")
P2 = DOT(+4100, +3000, "purple")
P3 = DOT(+1800, +2400, "purple")
P4 = DOT(+2500, +3400, "purple")
P5 = DOT(+2000, +1400, "purple")

final_data = []
training_data = []
training_data.extend((R1, R2, R3, R4, R5, G1, G2, G3, G4, G5, B1, B2, B3, B4, B5, P1, P2, P3, P4, P5))
final_data.extend((R1, R2, R3, R4, R5, G1, G2, G3, G4, G5, B1, B2, B3, B4, B5, P1, P2, P3, P4, P5))

red = []
green = []
blue = []
purple = []

# here starts the generation of points in the right range
for i in range(NUMBER):
    x_coordinate = random.randint(-5000, 500)
    y_coordinate = random.randint(-5000, 500)
    dot = DOT(x_coordinate, y_coordinate, "red")
    while dot in red:
        x_coordinate = random.randint(-5000, 500)
        y_coordinate = random.randint(-5000, 500)
        dot = DOT(x_coordinate, y_coordinate, "red")
    red.append(dot)

for i in range(NUMBER):
    x_coordinate = random.randint(-500, 5000)
    y_coordinate = random.randint(-5000, 500)
    dot = DOT(x_coordinate, y_coordinate, "green")
    while dot in red:
        x_coordinate = random.randint(-500, 5000)
        y_coordinate = random.randint(-5000, 500)
        dot = DOT(x_coordinate, y_coordinate, "green")
    green.append(dot)

for i in range(NUMBER):
    x_coordinate = random.randint(-5000, 500)
    y_coordinate = random.randint(-500, 5000)
    dot = DOT(x_coordinate, y_coordinate, "blue")
    while dot in red:
        x_coordinate = random.randint(-5000, 500)
        y_coordinate = random.randint(-500, 5000)
        dot = DOT(x_coordinate, y_coordinate, "Blue")
    blue.append(dot)

for i in range(NUMBER):
    x_coordinate = random.randint(-500, 5000)
    y_coordinate = random.randint(-500, 5000)
    dot = DOT(x_coordinate, y_coordinate, "purple")
    while dot in red:
        x_coordinate = random.randint(-5000, 500)
        y_coordinate = random.randint(-500, 5000)
        dot = DOT(x_coordinate, y_coordinate, "Purple")
    purple.append(dot)

red_wrong = []
green_wrong = []
blue_wrong = []
purple_wrong = []

# here starts the generation of points in the wrong range
for i in range(NUMBER):
    while True:
        x_coordinate = random.randint(-5000, 5000)
        y_coordinate = random.randint(-5000, 5000)
        if x_coordinate > 500 and y_coordinate > 500:
            red_wrong.append(DOT(x_coordinate, y_coordinate, "red"))
            break

for i in range(NUMBER):
    while True:
        x_coordinate = random.randint(-5000, 5000)
        y_coordinate = random.randint(-5000, 5000)
        if x_coordinate < -500 and y_coordinate > 500:
            green_wrong.append(DOT(x_coordinate, y_coordinate, "green"))
            break

for i in range(NUMBER):
    while True:
        x_coordinate = random.randint(-5000, 5000)
        y_coordinate = random.randint(-5000, 5000)
        if x_coordinate > 500 and y_coordinate < -500:
            blue_wrong.append(DOT(x_coordinate, y_coordinate, "blue"))
            break

for i in range(NUMBER):
    while True:
        x_coordinate = random.randint(-5000, 5000)
        y_coordinate = random.randint(-5000, 5000)
        if x_coordinate > 500 and y_coordinate > 500:
            purple_wrong.append(DOT(x_coordinate, y_coordinate, "purple"))
            break

# set plot canvas
plt.xlim(-5000, 5000)
plt.ylim(-5000, 5000)
plt.yticks(np.arange(-5000, 6000, 1000))
plt.yticks(np.arange(-5000, 6000, 1000))
plt.xlabel("X")
plt.ylabel("Y")
fig, axs = plt.subplots(2, 2)
plt.suptitle('KNN algorithm')

pole_knn = [1, 3, 7, 15]
for i in range(4):
    color_list = ["red", "green", "blue", "purple"]
    last_assigned = ""
    number_of_training_data = 20
    training_data = []
    training_data.extend((R1, R2, R3, R4, R5, G1, G2, G3, G4, G5, B1, B2, B3, B4, B5, P1, P2, P3, P4, P5))
    start = time.time()

    assigned = 0
    final_data = []
    final_data.extend((R1, R2, R3, R4, R5, G1, G2, G3, G4, G5, B1, B2, B3, B4, B5, P1, P2, P3, P4, P5))
    fault = 0
    # sem zacinam robit
    r = 0
    g = 0
    b = 0
    p = 0
    red_count = 0
    blue_count = 0
    green_count = 0
    purple_count = 0

    while True:
        if red_count == blue_count == green_count == purple_count == NUMBER:
            break

        x_coordinate = 0
        y_coordinate = 0

        while True:
            random_number = random.randint(0, 3)
            color = color_list[random_number]
            if red_count or blue_count or green_count or purple_count == 10000:
                break
            if color != last_assigned:
                break

        if random.random() < 0.99:
            if color == "red":
                if red_count != NUMBER:

                    red_pop = red[r]
                    x_coordinate = red_pop.x
                    y_coordinate = red_pop.y
                    red_count += 1
                    r += 1
                    assigned = classify(x_coordinate, y_coordinate, pole_knn[i])
                    number_of_training_data += 1
            if color == "green":
                if green_count != NUMBER:

                    green_pop = green[g]
                    x_coordinate = green_pop.x
                    y_coordinate = green_pop.y
                    green_count += 1
                    g += 1
                    assigned = classify(x_coordinate, y_coordinate, pole_knn[i])
                    number_of_training_data += 1
            if color == "blue":
                if blue_count != NUMBER:

                    blue_pop = blue[b]
                    x_coordinate = blue_pop.x
                    y_coordinate = blue_pop.y
                    blue_count += 1
                    b += 1
                    assigned = classify(x_coordinate, y_coordinate, pole_knn[i])
                    number_of_training_data += 1
            if color == "purple":
                if purple_count != NUMBER:

                    purple_pop = purple[p]
                    x_coordinate = purple_pop.x
                    y_coordinate = purple_pop.y
                    purple_count += 1
                    p += 1
                    assigned = classify(x_coordinate, y_coordinate, pole_knn[i])
                    number_of_training_data += 1

        else:
            if color == "red":
                if red_count != NUMBER:
                    red_pop = red_wrong[r]
                    x_coordinate = red_pop.x
                    y_coordinate = red_pop.y
                    red_count += 1
                    r += 1
                    assigned = classify(x_coordinate, y_coordinate, pole_knn[i])
                    number_of_training_data += 1
            if color == "green":
                if green_count != NUMBER:
                    green_pop = green_wrong[g]
                    x_coordinate = green_pop.x
                    y_coordinate = green_pop.y
                    green_count += 1
                    g += 1
                    assigned = classify(x_coordinate, y_coordinate, pole_knn[i])
                    number_of_training_data += 1
            if color == "blue":
                if blue_count != NUMBER:
                    blue_pop = blue_wrong[b]
                    x_coordinate = blue_pop.x
                    y_coordinate = blue_pop.y
                    blue_count += 1
                    b += 1
                    assigned = classify(x_coordinate, y_coordinate, pole_knn[i])
                    number_of_training_data += 1
            if color == "purple":
                if purple_count != NUMBER:
                    purple_pop = purple_wrong[p]
                    x_coordinate = purple_pop.x
                    y_coordinate = purple_pop.y
                    purple_count += 1
                    p += 1
                    assigned = classify(x_coordinate, y_coordinate, pole_knn[i])
                    number_of_training_data += 1
        if assigned != color:
            fault += 1
        last_assigned = assigned

    print("pocet chyb je: ", fault)
    end = time.time()
    print("time elapsed:", end - start)

    x_2D_list = []
    y_list = []
    for data in final_data:

        if pole_knn[i] == 1:
            axs[0, 0].plot(data.x, data.y, marker="o", color=data.colour)
            axs[0, 0].set_title(pole_knn[i])
        if pole_knn[i] == 3:
            axs[0, 1].plot(data.x, data.y, marker="o", color=data.colour)
            axs[0, 1].set_title(pole_knn[i])
        if pole_knn[i] == 7:
            axs[1, 0].plot(data.x, data.y, marker="o", color=data.colour)
            axs[1, 0].set_title(pole_knn[i])
        if pole_knn[i] == 15:
            axs[1, 1].plot(data.x, data.y, marker="o", color=data.colour)
            axs[1, 1].set_title(pole_knn[i])
fig.tight_layout()
plt.savefig("knn")


print("koniec")
