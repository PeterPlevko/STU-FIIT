from random import getrandbits, randrange

# garden = [[x x x] ...
#           [x x x] ...
#           ...]
#
# monk = [fitness, decisions, enter_tile_indices]
# decisions = [-1, 1, -1, -1 ...]
# enter_tile_indices = [1, 2, 3, 4, 5 ...]
#
# enter_tiles = [(x, y, rotation), (x, y, rotation) ...]
#
# rotation:
#   0 = up
#   1 = right
#   2 = down
#   3 = left


def print_garden(garden):

    for i in range(len(garden[0])):

        for j in range(len(garden)):

            if garden[j][i] == "X":
                print(" X", end=" ")
            elif garden[j][i][0] == "l":
                print(garden[j][i], end=" ")
            else:
                print("{0:2d}".format(int(garden[j][i])), end=" ")

        print()


def garden_max_fitness(garden):

    fitness = 0

    for x in garden:
        for item in x:
            if item != "X":
                fitness += 1

    return fitness


def load_garden(input_file):

    garden = []

    with open(input_file, "r") as file:

        first_line = True

        for line in file:

            x = 0
            item_list = list(line.strip().split())

            for item in item_list:

                if first_line:
                    garden.append([])

                garden[x].append(item)
                x += 1

            first_line = False

    return garden


def copy_garden(garden):

    new_garden = [list(row) for row in garden]

    return new_garden


def create_enter_tiles(garden):

    # add the perimeter tiles with all possible rotations
    rows = [(0, x, 1) for x in range(len(garden[0]))] + [(len(garden) - 1, x, 3) for x in range(len(garden[0]))]
    columns = [(x, 0, 2) for x in range(len(garden))] + [(x, len(garden[0]) - 1, 0) for x in range(len(garden))]

    enter_tiles = rows + columns

    return enter_tiles


def monk_swap_tiles(monk, index1, index2):

    monk[2][index1], monk[2][index2] = monk[2][index2], monk[2][index1]


def clone_monk(monk):

    clone = [0, [], []]
    clone[1] = list(monk[1])
    clone[2] = list(monk[2])

    return clone


def spawn_monk(garden):

    decisions = []

    # loop through all tiles in garden
    for x in garden:
        for item in x:

            # add new decision for each rock
            if item == "X":
                if getrandbits(1):
                    decisions.append(1)
                else:
                    decisions.append(-1)

    # there are no rocks
    if not decisions:
        # add two decisions
        for i in range(2):
            if getrandbits(1):
                decisions.append(1)
            else:
                decisions.append(-1)

    enter_tile_indices = [x for x in range(2 * (len(garden) + len(garden[0])))]
    swap_count = randrange(len(enter_tile_indices), 2 * len(enter_tile_indices))
    monk = [0, decisions, enter_tile_indices]

    # randomize first monk
    for i in range(swap_count):
        index1 = randrange(len(enter_tile_indices))
        while True:
            index2 = randrange(len(enter_tile_indices))
            if index1 != index2:
                break

        monk_swap_tiles(monk, index1, index2)

    return monk


def can_rake_tile(garden, position):

    if position[0] < 0 or position[1] < 0 or position[0] >= len(garden) or position[1] >= len(garden[0]):
        return "out of bounds"

    if garden[position[0]][position[1]] == "X":
        return False

    if garden[position[0]][position[1]][0] == "l":
        leaf_color = garden[position[0]][position[1]][1]

        for x in garden:
            for item in x:

                # it's a leaf
                if item[0] == "l":
                    # it's lighter than the original leaf to collect
                    if item[1] < leaf_color:
                        return False

        return True

    if garden[position[0]][position[1]] == "0":
        return True

    return False


def add_lists(list1, list2):

    list3 = list([list1[i] + list2[i] for i in range(len(list1))])

    return list3


def rake_line(garden, enter_tile, monk, decision_index, rake_index):

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


def rake_garden(garden, monk, enter_tiles):

    new_garden = copy_garden(garden)
    decision_index = rake_index = 0
    monk[0] = 0

    for tile in monk[2]:

        # try raking
        decision_index, rake_index = rake_line(new_garden, enter_tiles[tile], monk, decision_index, rake_index)

        if decision_index == -1:
            break

    return new_garden
