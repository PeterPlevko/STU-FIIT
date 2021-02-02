import time
from queue import Queue

visited_array_start = {
}
visited_array_back = {
}


class Vertex:  # my state
    def __init__(self, x, y, predecesor, stage, moves):  # inti function
        self.x = x  # coordinate of x
        self.y = y  # coordinate of y
        self.stage = []  # curent 2D array
        self.stage = stage  # loads stage
        self.predecesor = []  # predecesor
        self.predecesor.append(predecesor)  # loads predecessor
        self.moves = []  # what move i did to get to this point from predecesor
        self.moves.append(moves)  # loads move


def search_from_start(start_obj):  # function that starts searching from the initial state
    # najprv riadok ptm stlpec
    global visited_array_start
    already_aded = 0
    is_not_in = 1
    global start_queue
    global first_iteration_start
    global start_visited
    x_start = start_obj.x
    y_start = start_obj.y
    array = start_obj.stage
    array_string = str(array[0] + array[1] + array[2])

    if y_start + 1 > 2:  # right
        pass
    else:
        right = array[x_start][y_start + 1]
        temp = array[x_start][y_start]
        array_return = [list(x) for x in array]
        array_return[x_start][y_start + 1] = temp
        array_return[x_start][y_start] = right
        array_return_string = str(array_return[0] + array_return[1] + array_return[2])

        if array_return_string in visited_array_start:
            is_not_in = 0

        if is_not_in:
            vertex = Vertex(x_start, y_start + 1, start_obj, array_return, "right")
            start_queue.put(vertex)
            vertex = Vertex(x_start, y_start + 1, start_obj, array, "right")

            if already_aded == 0:
                start_visited.append(vertex)
                visited_array_start[array_string] = 0
                already_aded = 1

    is_not_in = 1
    if y_start - 1 < 0:  # left
        pass
    else:
        left = array[x_start][y_start - 1]
        temp = array[x_start][y_start]
        array_return = [list(x) for x in array]
        array_return[x_start][y_start - 1] = temp
        array_return[x_start][y_start] = left
        array_return_string = str(array_return[0] + array_return[1] + array_return[2])

        if array_return_string in visited_array_start:
            is_not_in = 0

        if is_not_in:
            vertex = Vertex(x_start, y_start - 1, start_obj, array_return, "left")
            start_queue.put(vertex)
            vertex = Vertex(x_start, y_start - 1, start_obj, array, "left")

            if already_aded == 0:
                start_visited.append(vertex)
                visited_array_start[array_string] = 0
                already_aded = 1

    is_not_in = 1
    if x_start - 1 < 0:  # up
        pass
    else:
        up = array[x_start - 1][y_start]
        temp = array[x_start][y_start]
        array_return = [list(x) for x in array]
        array_return[x_start - 1][y_start] = temp
        array_return[x_start][y_start] = up
        array_return_string = str(array_return[0] + array_return[1] + array_return[2])

        if array_return_string in visited_array_start:
            is_not_in = 0

        if is_not_in:
            vertex = Vertex(x_start - 1, y_start, start_obj, array_return, "up")
            start_queue.put(vertex)
            vertex = Vertex(x_start - 1, y_start, start_obj, array, "up")

            if already_aded == 0:
                start_visited.append(vertex)
                visited_array_start[array_string] = 0
                already_aded = 1

    is_not_in = 1
    if x_start + 1 > 2:  # down
        pass
    else:
        down = array[x_start + 1][y_start]
        temp = array[x_start][y_start]
        array_return = [list(x) for x in array]
        array_return[x_start + 1][y_start] = temp
        array_return[x_start][y_start] = down
        array_return_string = str(array_return[0] + array_return[1] + array_return[2])

        if array_return_string in visited_array_start:
            is_not_in = 0

        if is_not_in:
            vertex = Vertex(x_start + 1, y_start, start_obj, array_return, "down")
            start_queue.put(vertex)
            vertex = Vertex(x_start + 1, y_start, start_obj, array, "down")

            if already_aded == 0:
                start_visited.append(vertex)
                visited_array_start[array_string] = 0
                already_aded = 1


def search_from_back(back_obj):  # function that start searching from the final state
    # najprv riadok ptm stlpec
    global visited_array_back
    already_aded = 0
    global end_queue
    global first_iteration_end
    global end_visited
    is_not_in = 1
    x_start = back_obj.x
    y_start = back_obj.y
    array = back_obj.stage
    array_string = str(array[0] + array[1] + array[2])
    if y_start + 1 > 2:  # right
        pass
    else:
        right = array[x_start][y_start + 1]
        temp = array[x_start][y_start]
        array_return = [list(x) for x in array]
        array_return[x_start][y_start + 1] = temp
        array_return[x_start][y_start] = right
        array_return_string = str(array_return[0] + array_return[1] + array_return[2])

        if array_return_string in visited_array_back:
            is_not_in = 0

        if is_not_in:
            vertex = Vertex(x_start, y_start + 1, back_obj, array_return, "right")
            end_queue.put(vertex)
            vertex = Vertex(x_start, y_start + 1, back_obj, array, "right")

            if already_aded == 0:
                end_visited.append(vertex)
                visited_array_back[array_string] = 0
                already_aded = 1

    is_not_in = 1
    if y_start - 1 < 0:  # left
        pass
    else:
        left = array[x_start][y_start - 1]
        temp = array[x_start][y_start]
        array_return = [list(x) for x in array]
        array_return[x_start][y_start - 1] = temp
        array_return[x_start][y_start] = left
        array_return_string = str(array_return[0] + array_return[1] + array_return[2])

        if array_return_string in visited_array_back:
            is_not_in = 0

        if is_not_in:
            vertex = Vertex(x_start, y_start - 1, back_obj, array_return, "left")
            end_queue.put(vertex)
            vertex = Vertex(x_start, y_start - 1, back_obj, array, "left")

            if already_aded == 0:
                end_visited.append(vertex)
                visited_array_back[array_string] = 0
                already_aded = 1


    is_not_in = 1
    if x_start - 1 < 0:  # up
        pass
    else:
        up = array[x_start - 1][y_start]
        temp = array[x_start][y_start]
        array_return = [list(x) for x in array]
        array_return[x_start - 1][y_start] = temp
        array_return[x_start][y_start] = up
        array_return_string = str(array_return[0] + array_return[1] + array_return[2])

        if array_return_string in visited_array_back:
            is_not_in = 0

        if is_not_in:
            vertex = Vertex(x_start - 1, y_start, back_obj, array_return, "up")
            end_queue.put(vertex)
            vertex = Vertex(x_start - 1, y_start, back_obj, array, "up")

            if already_aded == 0:
                end_visited.append(vertex)
                visited_array_back[array_string] = 0
                already_aded = 1

    is_not_in = 1
    if x_start + 1 > 2:  # down
        pass
    else:
        down = array[x_start + 1][y_start]
        temp = array[x_start][y_start]
        array_return = [list(x) for x in array]
        array_return[x_start + 1][y_start] = temp
        array_return[x_start][y_start] = down
        array_return_string = str(array_return[0] + array_return[1] + array_return[2])

        if array_return_string in visited_array_back:
            is_not_in = 0

        if is_not_in:
            vertex = Vertex(x_start + 1, y_start, back_obj, array_return, "down")
            end_queue.put(vertex)
            vertex = Vertex(x_start + 1, y_start, back_obj, array, "down")

            if already_aded == 0:
                end_visited.append(vertex)
                visited_array_back[array_string] = 0
                already_aded = 1


def getInvCount(array):  # gets inversion count
    inv_count = 0
    one_array = [item for innerlist in array for item in innerlist]
    for i in range(0, 9, 1):
        for j in range(0, i):
            if one_array[i] < one_array[j] and one_array[i] != 0 and one_array[j] != 0:
                inv_count += 1
    return inv_count


def isSolvable(puzzle):  # checks if is solvable
    inv_count = getInvCount(puzzle)
    return inv_count % 2 == 0


# here starts main
first_iteration_start = 1
first_iteration_end = 1
start_queue = Queue()
end_queue = Queue()
start_visited = []
end_visited = []
start_graph = [[0 for i in range(3)] for j in range(3)]
end_graph = [[0 for i in range(3)] for j in range(3)]
var1 = 0
var2 = 0

file = open('graf.txt', 'r')
i = 0
position_of_start_x = 0
position_of_start_y = 0
for x in file:
    j = 0
    if x == '***\n':
        break
    for char in x:
        if '0' <= char <= '9':
            start_graph[i][j] = int(char)

            if char == "0":
                position_of_start_x = i
                position_of_start_y = j
            j += 1
    i += 1

i = 0
position_of_end_x = 0
position_of_end_y = 0
for x in file:
    j = 0
    for char in x:
        if '0' <= char <= '9':
            end_graph[i][j] = int(char)

            if char == "0":
                position_of_end_x = i
                position_of_end_y = j
            j += 1

    i += 1

flag = 1
flag_solvable = 0
if isSolvable(start_graph) == isSolvable(end_graph):
    flag_solvable = 1
start_current = Vertex(position_of_start_x, position_of_start_y, None, start_graph, "")  # creating initial state
end_current = Vertex(position_of_end_x, position_of_end_y, None, end_graph, "")  # creating end state
# here starts the timer
start_time = time.time()
if flag_solvable:
    while flag:
        search_from_start(start_current)
        search_from_back(end_current)
        start_current = start_queue.get()
        end_current = end_queue.get()

        temp = str(start_current.stage[0] + start_current.stage[1] + start_current.stage[2])
        if temp in visited_array_back:
            for end in end_visited:
                if start_current.stage == end.stage:
                    var1 = start_current
                    var2 = end
                    flag = 0
                    break

    # here ends the timer
    end = time.time()
    print("pocet navstivenych:", len(visited_array_back) + len(visited_array_start))
    print("pocet spracovanych:", len(visited_array_back) + len(visited_array_start) + len(start_queue.queue) + len(end_queue.queue))
    print("cas vykonania algoritmu:", end - start_time)

    array_end = []
    moves_end = []
    array_start = []
    moves_start = []

    while var1 is not None:
        array_start.append(var1.stage)
        moves_start.append(var1.moves)
        var1 = var1.predecesor[0]

    while var2 is not None:
        array_end.append(var2.stage)
        moves_end.append(var2.moves)
        var2 = var2.predecesor[0]

    moves_start[len(moves_start)-1] = 0
    array_start[0] = 0

    start_backward = len(array_start) - 2
    for i in reversed(array_start):
        if i == 0:
            continue
        for k in i:
            print(k)
        if moves_start[start_backward] == 0:
            continue
        else:
            print(moves_start[start_backward][0])
        start_backward -= 1

    end_backward = 1
    array_end[0] = 0
    for i in array_end:
        if i == 0:
            continue
        for k in i:
            print(k)
        if moves_end[end_backward][0] == "right":
            print("left")
        if moves_end[end_backward][0] == 'left':
            print("right")
        if moves_end[end_backward][0] == "up":
            print("down")
        if moves_end[end_backward][0] == "down":
            print("up")
        end_backward += 1
else:
    print("tato vec nie je vyriesitelna")
