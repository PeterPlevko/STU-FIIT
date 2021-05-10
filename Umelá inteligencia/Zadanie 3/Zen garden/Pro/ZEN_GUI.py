from algorithms import *
from monksolve import *
from tkinter import *
from os import path
from threading import Thread


canvas = None
enter_tiles = None
positions = []
refresh_speed = 0
raked_textures = []
monks = []


def rake_line_gui(garden, enter_tile, monk, decision_index, rake_index):

    global positions

    decisions = monk[1]
    rotations = [(0, -1), (1, 0), (0, 1), (-1, 0)]
    rotation = enter_tile[2]
    position = [enter_tile[0], enter_tile[1]]

    # first tile can't be raked
    if not can_rake_tile(garden, position):
        return decision_index, rake_index

    rake_index += 1

    # start raking
    while True:

        # out of bounds
        if can_rake_tile(garden, position) == "out of bounds":
            break

        garden[position[0]][position[1]] = str(rake_index)
        positions.append((position, rotation))
        monk[0] += 1

        # go forward
        if can_rake_tile(garden, add_lists(position, rotations[rotation])):
            position = add_lists(position, rotations[rotation])
            continue

        can_rake_left = can_rake_tile(garden, add_lists(position, rotations[(rotation - 1) % len(rotations)]))
        can_rake_right = can_rake_tile(garden, add_lists(position, rotations[(rotation + 1) % len(rotations)]))

        # make a decision
        if can_rake_right and can_rake_left:
            rotation = (rotation + decisions[decision_index]) % len(rotations)
            position = add_lists(position, rotations[rotation])
            decision_index = (decision_index + 1) % len(decisions)
            continue

        if can_rake_right:
            rotation = (rotation + 1) % len(rotations)
            position = add_lists(position, rotations[rotation])
            continue

        if can_rake_left:
            rotation = (rotation - 1) % len(rotations)
            position = add_lists(position, rotations[rotation])
            continue

        return -1, -1

    return decision_index, rake_index


def rake_garden_gui(garden, monk):

    global enter_tiles

    new_garden = copy_garden(garden)
    decision_index = rake_index = 0
    monk[0] = 0

    for tile in monk[2]:

        # try raking
        decision_index, rake_index = rake_line_gui(new_garden, enter_tiles[tile], monk, decision_index, rake_index)

        if decision_index == -1:
            break

    return new_garden


def move(garden, move_index):

    global canvas, refresh_speed, positions, raked_textures

    if len(positions) == move_index:
        return

    monk_index = len(garden) * len(garden[0]) + 1
    current_position = canvas.coords(monk_index)
    target_rake = None

    if move_index != 0:

        # check if the tiles are next to each other
        if abs(positions[move_index][0][0] - positions[move_index - 1][0][0]) + abs(positions[move_index][0][1] - positions[move_index - 1][0][1]) <= 1:
            if positions[move_index - 1][1] == 0 and positions[move_index][1] == 0 or positions[move_index - 1][1] == 0 and positions[move_index][1] == 2 or positions[move_index - 1][1] == 2 and positions[move_index][1] == 0 or positions[move_index - 1][1] == 2 and positions[move_index][1] == 2:
                target_rake = 0
            elif positions[move_index - 1][1] == 1 and positions[move_index][1] == 1 or positions[move_index - 1][1] == 1 and positions[move_index][1] == 3 or positions[move_index - 1][1] == 3 and positions[move_index][1] == 1 or positions[move_index - 1][1] == 3 and positions[move_index][1] == 3:
                target_rake = 1
            elif positions[move_index - 1][1] == 0 and positions[move_index][1] == 1 or positions[move_index - 1][1] == 3 and positions[move_index][1] == 2:
                target_rake = 2
            elif positions[move_index - 1][1] == 0 and positions[move_index][1] == 3 or positions[move_index - 1][1] == 1 and positions[move_index][1] == 2:
                target_rake = 3
            elif positions[move_index - 1][1] == 2 and positions[move_index][1] == 1 or positions[move_index - 1][1] == 3 and positions[move_index][1] == 0:
                target_rake = 4
            elif positions[move_index - 1][1] == 2 and positions[move_index][1] == 3 or positions[move_index - 1][1] == 1 and positions[move_index][1] == 0:
                target_rake = 5
        # at border
        else:
            if positions[move_index - 1][0][1] == 0:
                if positions[move_index - 1][1] == 0:
                    target_rake = 0
                elif positions[move_index - 1][1] == 3:
                    target_rake = 4
                elif positions[move_index - 1][1] == 1:
                    target_rake = 5
            if positions[move_index - 1][0][1] == len(garden[0]) - 1:
                if positions[move_index - 1][1] == 2:
                    target_rake = 0
                elif positions[move_index - 1][1] == 3:
                    target_rake = 2
                elif positions[move_index - 1][1] == 1:
                    target_rake = 3
            if positions[move_index - 1][0][0] == 0:
                if positions[move_index - 1][1] == 3:
                    target_rake = 1
                elif positions[move_index - 1][1] == 0:
                    target_rake = 3
                elif positions[move_index - 1][1] == 2:
                    target_rake = 5
            if positions[move_index - 1][0][0] == len(garden) - 1:
                if positions[move_index - 1][1] == 1:
                    target_rake = 1
                elif positions[move_index - 1][1] == 0:
                    target_rake = 2
                elif positions[move_index - 1][1] == 2:
                    target_rake = 4

        # rake line
        canvas.create_image(positions[move_index - 1][0][0] * 50, positions[move_index - 1][0][1] * 50, anchor=NW, image=raked_textures[target_rake])
            
    canvas.move(monk_index, positions[move_index][0][0] * 50 - current_position[0], positions[move_index][0][1] * 50 - current_position[1])

    canvas.after(refresh_speed, move, garden, move_index + 1)


def run_algo(garden, algo, modifiers):

    global enter_tiles, monks

    monk = spawn_monk(garden)
    enter_tiles = create_enter_tiles(garden)

    if algo == 0:
        monk = hillclimber(garden, monk, enter_tiles)
    else:
        if modifiers == "N":
            if algo == 1:
                monk = tabu_search(garden, monk, enter_tiles)
            elif algo == 2:
                monk = annealing(garden, monk, enter_tiles)
        else:
            if algo == 1:
                monk = tabu_search(garden, monk, enter_tiles, modifiers[0], modifiers[1])
            elif algo == 2:
                monk = annealing(garden, monk, enter_tiles, modifiers[0], modifiers[1])

    monks.append(monk)


def main():

    global canvas, refresh_speed, raked_textures, monks, positions
    
    while True:

        monks = []
        positions = []
        
        inp = input("Exit?(Y/N): ")
        if inp == "Y":
            break
    
        root = Tk()
        root.title("ZEN GARDEN")
        
        while True:
            garden_name = input("Set garden file: ")
            if path.exists(garden_name):
                break
            print("File doesn't exist")

        garden = load_garden(garden_name)
        size = [len(garden), len(garden[0])]

        canvas = Canvas(root, width=size[0] * 50, height=size[1] * 50)
        canvas.pack()

        # DRAW GARDEN #####
        sand_texture = PhotoImage(file="textures/sand.ppm")
        rock_texture = PhotoImage(file="textures/rock.ppm")
        leaves_textures = []

        for i in range(5):
            leaves_textures.append(PhotoImage(file="textures/l" + str(i + 1) + ".ppm"))

        for x in range(len(garden)):
            for y in range(len(garden[0])):

                item = garden[x][y]
                target_texture = None

                if item == "X":
                    target_texture = rock_texture
                elif item == "0":
                    target_texture = sand_texture
                elif item[0] == "l":
                    target_texture = leaves_textures[int(item[1]) - 1]

                canvas.create_image(x * 50, y * 50, anchor=NW, image=target_texture)

        #####

        raked_textures = []

        raked_textures.append(PhotoImage(file="textures/rakedup.ppm"))
        raked_textures.append(PhotoImage(file="textures/rakedside.ppm"))
        raked_textures.append(PhotoImage(file="textures/rakedupright.ppm"))
        raked_textures.append(PhotoImage(file="textures/rakedupleft.ppm"))
        raked_textures.append(PhotoImage(file="textures/rakeddownright.ppm"))
        raked_textures.append(PhotoImage(file="textures/rakeddownleft.ppm"))

        monk_texture = PhotoImage(file="textures/monk.ppm")
        canvas.create_image(0, 0, anchor=NW, image=monk_texture)

        while True:
            algo = input("Set algorithm index (hillclimber - 0, tabu_search - 1, simulated_annealing - 2): ")
            if algo in "012":
                break
            print("Wrong index")
            
        algo = int(algo)
        modifiers = input("Do you want to set modifiers? (Y/N): ")

        if modifiers == "Y":
            while True:
                try:
                    if algo == 0:
                        print("There are no modifiers to set")
                    elif algo == 1:
                        modifiers = list(map(float, input("Set tabu modifiers [list size=1 visit=1]: ").strip().split()))
                        modifiers[0] = round(modifiers[0])
                        modifiers[1] = round(modifiers[1])
                        if modifiers[0] < 1:
                            modifiers[0] = 1
                        if modifiers[1] < 1:
                            modifiers[1] = 1
                    elif algo == 2:
                        modifiers = list(map(float, input("Set annealing modifiers [temperature = 25 cooling_multiplier = 1]: ").strip().split()))
                        if modifiers[0] < 10:
                            modifiers[0] = 10
                        if modifiers[1] < 0.25:
                            modifiers[1] = 0.25
                    break
                except:
                    print("That's not a number")
        else:
            modifiers = "N"

        threads = []
        population = 0
        
        while True:
            try:
                population = int(input("Set population size: "))
                if population > 0:
                    break
                print("Choose a number greater than 0")
            except:
                print("That's not a number")

        for i in range(population):
            thread = Thread(target=run_algo, args=(garden, algo, modifiers))
            thread.start()
            threads.append(thread)

        for i in range(population):
            threads[i].join()

        monks.sort(key=lambda x: x[0], reverse=True)

        print("Results:")

        for i in range(population):
            print("Index:", i, "Fitness:", monks[i][0])

        index = 0
        while True:
            try:
                index = int(input("Choose index: "))
                if index in list(range(100)):
                    break
                print("Wrong index")
            except:
                print("That's not a number")

        while True:
            try:
                refresh_speed = int(input("Set refresh speed (ms): "))
                if refresh_speed > 0:
                    break
                print("Choose a number greater than 0")
            except:
                print("That's not a number")
                
        rake_garden_gui(garden, monks[index])

        move(garden, 0)
                
        mainloop()
    

main()
