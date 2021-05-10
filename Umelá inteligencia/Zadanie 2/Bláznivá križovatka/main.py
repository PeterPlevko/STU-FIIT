import sys
import time, datetime

DEBUG = True
REMEMBER_ALL = False

# State[grid, car_list]
# Car_position[x, y]
# Static_car_info[length, orientation]

# Global grid_size[x, y]
# Global static_cars[static_car_info]
# Global visited[state]

# Orientation = {"u", "d", "l", "r"}
# Grid = [True, True, True
#         True, True, True
#         True, True, True]


# Print grid
def gridout(grid):

    global grid_size

    print()

    for i in range(grid_size[0]):
        for j in range(grid_size[1]):

            if grid[j][i]:
                print(0, end=" ")
            else:
                print(1, end=" ")

        print()
    print()


# Print whole state
def stateout(state):

    global static_cars

    # Grid info
    gridout(state[0])

    # Car info
    for car_index in range(len(state[1])):
        car_position = state[1][car_index]
        print("x: {} y: {} dĺžka: {} orientácia: {}".format(car_position[0], car_position[1], static_cars[car_index][0], static_cars[car_index][1]))


# Create a duplicit state
def duplicatestate(state):

    new_state = [[], []]

    # Add all car positions into new list:
    for car_position in state[1]:
        new_state[1].append(list(car_position))

    # Duplicate grid
    new_state[0] = [list(grid_line) for grid_line in state[0]]

    return new_state


# Remove a car from grid
def clearcar(state, car_index):

    global static_cars

    car_position = state[1][car_index]

    # Clear all tiles occupied by the car
    for i in range(static_cars[car_index][0]):

        # It's rotated upwards
        if static_cars[car_index][1] == "u":
            state[0][car_position[0]][car_position[1] - i] = True

        # It's rotated downvards
        if static_cars[car_index][1] == "d":
            state[0][car_position[0]][car_position[1] + i] = True

        # It's rotated to right
        if static_cars[car_index][1] == "r":
            state[0][car_position[0] + i][car_position[1]] = True

        # It's rotated to left
        if static_cars[car_index][1] == "l":
            state[0][car_position[0] - i][car_position[1]] = True

    return state


# Add a car to grid
def addcar(state, car_index):

    global static_cars

    car_position = state[1][car_index]

    # Unclear all tiles occupied by the car
    for i in range(static_cars[car_index][0]):

        # It's rotated upwards
        if static_cars[car_index][1] == "u":
            state[0][car_position[0]][car_position[1] - i] = False

        # It's rotated downvards
        if static_cars[car_index][1] == "d":
            state[0][car_position[0]][car_position[1] + i] = False

        # It's rotated to right
        if static_cars[car_index][1] == "r":
            state[0][car_position[0] + i][car_position[1]] = False

        # It's rotated to left
        if static_cars[car_index][1] == "l":
            state[0][car_position[0] - i][car_position[1]] = False

    return state


# Check if specific position is free
def isfree(grid, position):

    global grid_size

    # Withing boundaries
    if position[0] < 0 or position[1] < 0:
        return False

    # Withing boundaries
    if position[0] >= grid_size[0] or position[1] >= grid_size[1]:
        return False

    # Is occupied
    if not grid[position[0]][position[1]]:
        return False

    return True


# Check if all tiles on path are occupied
def checkpath(state, car_index, move_distance):

    global static_cars

    car_length = static_cars[car_index][0]
    car_position = state[1][car_index]

    for_start = 0
    for_end = 0

    # Set start and end indexes
    if move_distance > 0:
        for_start = car_length
        for_end = move_distance + car_length
    else:
        for_start = move_distance
        for_end = 0

    # Check all new tiles
    for i in range(for_start, for_end):

        if static_cars[car_index][1] == "u":
            if not isfree(state[0], [car_position[0], car_position[1] - i]):
                return False

        elif static_cars[car_index][1] == "d":
            if not isfree(state[0], [car_position[0], car_position[1] + i]):
                return False

        elif static_cars[car_index][1] == "r":
            if not isfree(state[0], [car_position[0] + i, car_position[1]]):
                return False

        elif static_cars[car_index][1] == "l":
            if not isfree(state[0], [car_position[0] - i, car_position[1]]):
                return False

    return True


# Return the minimum and maximum movable distance
def getdistancelimits(state, car_index):

    global static_cars, grid_size

    car_orienation = static_cars[car_index][1]
    car_length = static_cars[car_index][0]
    car_position_x = state[1][car_index][0]
    car_position_y = state[1][car_index][1]

    size_x = grid_size[0]
    size_y = grid_size[1]

    start_for = 0
    end_for = 0

    if car_orienation == "u":
        start_for = -(size_y - car_position_y - 1)
        end_for = car_position_y - car_length + 1

    elif car_orienation == "d":
        start_for = -car_position_y
        end_for = size_y - car_position_y - car_length

    elif car_orienation == "r":
        start_for = -car_position_x
        end_for = size_x - car_position_x - car_length

    elif car_orienation == "l":
        start_for = -(size_x - car_position_x - 1)
        end_for = car_position_x - car_length + 1

    return start_for, end_for + 1


# Initialize the program - setup first state and global variables
def init():

    global grid_size, static_cars, visited, text_file

    first_state = []

    with open(text_file, "r") as file:

        size_loaded = False

        for line in file:

            # Get first line info
            if not size_loaded:

                grid_size = list(map(int, line.strip().split()))
                size_loaded = True

                grid = []
                # Create empty grid
                for i in range(grid_size[0]):
                    grid.append([True for j in range(grid_size[1])])

                first_state = [grid, []]

                continue

            temp = line.strip().split()

            # All car info
            new_car_position = [int(temp[0]), int(temp[1])]
            static_cars.append([int(temp[2]), temp[3]])
            first_state[1].append(new_car_position)

            # Set orientation, length and fill grid
            if temp[3] == "u":
                for i in range(int(temp[2])):
                    grid[new_car_position[0]][new_car_position[1] - i] = False

            if temp[3] == "d":
                for i in range(int(temp[2])):
                    grid[new_car_position[0]][new_car_position[1] + i] = False

            if temp[3] == "r":
                for i in range(int(temp[2])):
                    grid[new_car_position[0] + i][new_car_position[1]] = False

            if temp[3] == "l":
                for i in range(int(temp[2])):
                    grid[new_car_position[0] - i][new_car_position[1]] = False

    visited.append(first_state)


# Try moving by move_distance, else return the same state
def movedistance(state, car_index, move_distance):

    global static_cars

    car_position = state[1][car_index]
    old_car_position = list(car_position)

    can_move = checkpath(state, car_index, move_distance)

    # Can't move -> return old state
    if not can_move:
        return state

    # Can move -> add the car to new position, return new_state
    new_state = clearcar(duplicatestate(state), car_index)

    if static_cars[car_index][1] == "u":
        new_state[1][car_index] = [car_position[0], car_position[1] - move_distance]

    elif static_cars[car_index][1] == "d":
        new_state[1][car_index] = [car_position[0], car_position[1] + move_distance]

    elif static_cars[car_index][1] == "r":
        new_state[1][car_index] = [car_position[0] + move_distance, car_position[1]]

    elif static_cars[car_index][1] == "l":
        new_state[1][car_index] = [car_position[0] - move_distance, car_position[1]]

    new_state = addcar(new_state, car_index)

    return new_state


# Check if the first car is all the way on right
def checkend(state):

    global grid_size, static_cars

    # Check all tiles occupied by first car
    for i in range(static_cars[0][0]):

        # If it's rotated to right -> add i and compare
        if static_cars[0][1] == "r" and state[1][0][0] + i == grid_size[0] - 1:
            return True

        # If it's rotated to left -> subtract i and compare
        elif static_cars[0][1] == "l" and state[1][0][0] - i == grid_size[0] - 1:
            return True

    return False


# Recursive function to try all sub_states in one state
def recursivestep(current_state, current_depth):

    global dynamic_max_depth, max_reached_depth, visited, grid_size, static_cars, DEBUG, REMEMBER_ALL

    if DEBUG:
        print("Aktuálna hĺbka: {}".format(current_depth))
        stateout(current_state)
        wait = input()

    if current_depth > max_reached_depth:
        max_reached_depth = current_depth

    # Max depth was reached
    if current_depth == dynamic_max_depth:
        if not REMEMBER_ALL:
            visited.remove(current_state)
        return False

    # Try all cars
    for car_index in range(len(current_state[1])):

        start_for, end_for = getdistancelimits(current_state, car_index)

        # Move forward and backwards
        for move_distance in range(start_for, end_for):

            if move_distance == 0:
                continue

            new_state = movedistance(current_state, car_index, move_distance)

            # It can move
            if new_state != current_state:

                # Doesn't exist yet - append to visited, and try solving
                if new_state not in visited:
                    visited.append(new_state)

                    # New state is the final one
                    if checkend(new_state):
                        return True

                    # The final state is somewhere inside new_state branch
                    if recursivestep(new_state, current_depth + 1):
                        return True

    # Stepping backwards - the final state doesn't exist in current branch - remove from visited
    if not REMEMBER_ALL:
        visited.remove(current_state)

    return False


# Start of main program

text_file = input("Zadaj názov súboru: ")

if ".txt" not in text_file:
    text_file += ".txt"

debug = input("Enable DEBUG?(Y/N): ")

if debug.strip().lower() == "y":
    DEBUG = True
else:
    DEBUG = False

remember = input("Enable remembering all visited?(Y/N): ")

if remember.strip().lower() == "y":
    REMEMBER_ALL = True
else:
    REMEMBER_ALL = False

output = input("Output (Console -> c): ")

dynamic_max_depth = 1
max_reached_depth = 0
solution_found = False

if output.strip().lower() != "c":
    if ".txt" not in output:
        output += ".txt"
    sys.stdout = open(output, "w")
else:
    sys.stdout = sys.__stdout__

start_time = time.time()

# increment max_depth
while True:

    max_reached_depth = 0

    visited = []
    grid_size = []
    static_cars = []

    init()

    print(100 * "-")
    print("Aktuálna maximálna hĺbka:", dynamic_max_depth)

    if recursivestep(visited[0], 0):
        solution_found = True
        break

    if max_reached_depth < dynamic_max_depth:
        break

    dynamic_max_depth += 2

end_time = time.time()

# Output the whole path
if solution_found:

    print("\nBolo nájdené riešenie:")

    for state in visited:
        stateout(state)

else:
    print("\nRiešenie nebolo nájdené")

print("\nČas:", datetime.timedelta(seconds=round(end_time - start_time, 0)), "[hh:mm:ss]")
