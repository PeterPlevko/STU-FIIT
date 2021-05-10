from tkinter import *       # for gui
import tkinter.messagebox   # for gui
import random               # for shuffle
import time                 # for measuring execution time
import heapq                # for queue w/ available states
import copy                 # for copying
import _thread              # for multithreading


class State:
    # used to keep track of the way possible permutations have been visited
    # distance is actually just the amount of moves from start position
    # map is a list of numbers <1; 8> and 'e' is used for the empty tile
    def __init__(self, field, distance, previous):
        self.distance = distance
        self.map = [0] * 9
        for i in range(9):
            self.map[i] = field[i]
        self.previous = previous

    # needed for queue which is done via heap and ends up comparing items because keys (distance) can be the same
    # self > other leads to greedier, faster execution
    # self < other leads to less greedy, slower, but consistently optimal execution
    def __lt__(self, other):
        return self.distance > other.distance


class Queue:
    # used to keep track of already discovered permutations
    # done via python's heapq heap data structure
    def __init__(self):
        self.queue = list()
        heapq.heapify(self.queue)

    # uses distance (already covered, aka # of moves done) as key
    def insert(self, key, state):
        heapq.heappush(self.queue, (key, state))

    # tuple is (distance, state), therefore need to return item with index 1
    def pop(self):
        return heapq.heappop(self.queue)[1]

    def is_empty(self):
        if len(self.queue) == 0:
            return True
        return False


def textvar1change(*args):
    # handles changes of the first entry (start state), makes sure it has correct stuff in it etc
    curr_value = text1var.get()
    new_text = ""
    for i in range(len(curr_value)):
        if '1' <= curr_value[i] <= '8' or curr_value[i] == 'e':
            new_text += curr_value[i]

    text1var.set(new_text)
    if len(new_text) > 9:
        text1var.set(new_text[0:9])

    if len(new_text) < 9:
        set_button["state"] = DISABLED

    if len(text1var.get()) == 9 and len(text2var.get()) == 9:
        set_button["state"] = NORMAL
    pass


def textvar2change(*args):
    # handles changes of the second entry (wanted state), makes sure it has correct stuff in it etc
    curr_value = text2var.get()
    new_text = ""
    for i in range(len(curr_value)):
        if '1' <= curr_value[i] <= '8' or curr_value[i] == 'e':
            new_text += curr_value[i]

    text2var.set(new_text)
    if len(new_text) > 9:
        text2var.set(new_text[0:9])

    if len(new_text) > 9:
        text1var.set(new_text[0:9])

    if len(new_text) < 9:
        set_button["state"] = DISABLED

    if len(text1var.get()) == 9 and len(text2var.get()) == 9:
        set_button["state"] = NORMAL
    pass


def calculate_heuristic_1(state_map):
    # calculates # of tiles that are not on their final spot
    distance_value = 0
    for i in range(9):
        value = state_map[i]
        wanted_value = wanted_state[i]
        if value != 'e' and value != wanted_value:
            distance_value += 1

    return distance_value


def calculate_heuristic_2(state_map):
    # calculates sum of manhattan distances of each tile from its final spot
    distance_value = 0
    for i in range(9):
        value = state_map[i]
        if value != 'e':
            x = i % 3
            y = i // 3
            pos = get_position(wanted_state, value)
            wanted_x = pos % 3
            wanted_y = pos // 3
            distance_value += abs(x - wanted_x) + abs(y - wanted_y)

    return distance_value


def current_heuristic(state_map, heuristic):
    # picks and returns the value of the selected heuristic
    if heuristic == 1:
        return calculate_heuristic_1(state_map)
    else:
        return calculate_heuristic_2(state_map)


def get_position(state_map, value):
    # gets position of the searched value in the array
    for i in range(9):
        if state_map[i] == value:
            return i
    return 0


def gui_shuffle():
    if running == 1:
        return

    # shuffles both start and end state, makes sure the combination is solvable
    random.shuffle(start_state)
    temp_text = ""
    for i in range(9):
        if start_state[i] == 'e':
            temp_text += 'e'
        else:
            temp_text += str(start_state[i])
        global text1var
        text1var.set(temp_text)

    random.shuffle(wanted_state)
    temp_text = ""

    # dumb af but works and its in the shuffle thing so it doesnt really matter
    while inversion_count(start_state) != inversion_count(wanted_state):
        x = random.randint(0, 8)
        wanted_state[0], wanted_state[x] = wanted_state[x], wanted_state[0]

    for i in range(9):
        if wanted_state[i] == 'e':
            temp_text += 'e'
        else:
            temp_text += str(wanted_state[i])
        global text2var
        text2var.set(temp_text)

    gui_update(start_state)


# the next 4 transform the map, yes
def move_up(state_map):
    pos = get_position(state_map, 'e')
    state_map[pos + 3], state_map[pos] = state_map[pos], state_map[pos + 3]


def move_down(state_map):
    pos = get_position(state_map, 'e')
    state_map[pos - 3], state_map[pos] = state_map[pos], state_map[pos - 3]


def move_left(state_map):
    pos = get_position(state_map, 'e')
    state_map[pos + 1], state_map[pos] = state_map[pos], state_map[pos + 1]


def move_right(state_map):
    pos = get_position(state_map, 'e')
    state_map[pos - 1], state_map[pos] = state_map[pos], state_map[pos - 1]


# the next 4 are checks for whether moves can be performed
def can_move_up(state_map):
    pos = get_position(state_map, 'e')
    if (pos // 3) != 2: return True
    return False


def can_move_down(state_map):
    pos = get_position(state_map, 'e')
    if (pos // 3) != 0: return True
    return False


def can_move_left(state_map):
    pos = get_position(state_map, 'e')
    if (pos % 3) != 2: return True
    return False


def can_move_right(state_map):
    pos = get_position(state_map, 'e')
    if (pos % 3) != 0: return True
    return False


# just changes captions on the button according to the data in the provided state
def gui_update(state_map):
    for i in range(9):
        if state_map[i] != 'e':
            buttons[i]['text'] = state_map[i]
        else:
            buttons[i]['text'] = ''


# handles enter being pressed in the gui
def enter_press(event):
    focus = main_window.focus_get()
    if str(focus) == ".!entry" or str(focus) == ".!entry2" or str(focus) == ".!button10":
        gui_set()

    if str(focus) == ".!button11":
        gui_shuffle()

    if str(focus) == ".!button12":
        gui_solve()

    if str(focus) == ".!button13":
        solution_move_back()

    if str(focus) == ".!button14":
        solution_move_further()


# creates the gui window
def init_window():
    master = Tk()
    master.title("%d-puzzle" % (9 - 1))
    width = 2 * 25 + 3 * 75 + 1 * 75
    height = 2 * 25 + 3 * 75 + 65
    master.geometry("%sx%s" % (width, height))
    master.resizable(False, False)

    master.bind('<Return>', enter_press)
    btns = list()
    for i in range(9):
        btn = Button(master, state="disabled")
        btn.place(x= 25 + 75 * (i % 3), y= 25 + 75 * (i // 3), width = 75, height = 75)
        btns.append(btn)

    text1var = StringVar()
    text1var.set("12345678e")
    text1var.trace_add("write", textvar1change)
    text1 = Entry(master, textvariable=text1var)
    text1.place(x=125, y=height - 75, width=65, height=25)

    label2 = Label(master, text="Final position")
    label2.place(x=25, y=height - 45)

    text2var = StringVar()
    text2var.set("87654321e")
    text2var.trace_add("write", textvar2change)
    text2 = Entry(master, textvariable=text2var)
    text2.place(x=125, y=height - 45, width=65, height=25)

    btn_set = Button(master, text="SET", command=gui_set)
    btn_set.place(x=width - 150, y=height - 72, width=50, height=50)

    btn_gui_shuffle = Button(master, text="SHUFFLE", command=gui_shuffle)
    btn_gui_shuffle.place(x=width - 80, y=25, width=60, height=50)

    label_slider1 = Label(master, text = "Multithreading")
    label_slider1.place(x = width - 92, y = height // 2 - 90)

    slider1 = Scale(master, from_=0, to = 1, orient = HORIZONTAL)
    slider1.place(x = width - 75, width = 50, y = height // 2 - 75)

    label_slider2 = Label(master, text="Heuristic")
    label_slider2.place(x=width - 77, y =height // 2 - 35)

    slider2 = Scale(master, from_=1, to=2, orient=HORIZONTAL)
    slider2.place(x=width - 75, y=height // 2 - 20, width=50)

    label1 = Label(master, text="Starting position:")
    label1.place(x=25, y=height - 75)

    btn_solve = Button(master, text="SOLVE", command=gui_solve)
    btn_solve.place(x=width - 80, y=height - 150, width=60, height=50)

    text3var = StringVar()
    text3var.set("--/--")
    label_progress = Label(master, textvariable = text3var)
    label_progress.place(x = width - 67, y = height - 92)

    btn_step_back = Button(master, text = "<-", command = solution_move_back, state = "disabled")
    btn_step_back.place(x =width - 75, y=height - 73, width = 50, height = 25)

    btn_step_forward = Button(master, text = "->", command = solution_move_further, state = "disabled")
    btn_step_forward.place(x =width - 75, y=height - 48, width = 50, height = 25)

    return master, btns, text1var, text2var, text3var,\
        slider1, slider2, btn_set, btn_step_back, btn_step_forward, btn_solve, btn_gui_shuffle


# next 2 let u move back and forth in the set of the states from start to solution
def solution_move_back():
    global curr_index
    if curr_index == 0:
        return
    curr_index -= 1

    btn_forward["state"] = NORMAL

    if curr_index == 0:
        btn_back["state"] = DISABLED
        btn_forward.focus_set()

    gui_update(solution[curr_index])
    text3var.set("%2d/%2d" % (curr_index + 1, len(solution)))


def solution_move_further():
    global curr_index
    if curr_index == len(solution) - 1:
        return
    curr_index += 1

    btn_back["state"] = NORMAL

    if curr_index == len(solution) - 1:
        btn_forward["state"] = DISABLED
        btn_back.focus_set()

    gui_update(solution[curr_index])
    text3var.set("%2d/%2d" % (curr_index + 1, len(solution)))


# counts the inversion count, later gets compared with value from other state (start - final get compared)
def inversion_count(array):
    counter = 0
    for i in range(9):
        for j in range(i + 1, 9):
            if array[j] == 'e' or array[i] == 'e':
                continue
            if array[j] < array[i]:
                counter += 1

    return counter % 2


# transforms the field representation of the field to a number representation used by the dictionary
def dict_transform(field):
    value = 0
    for i in range(9):
        value *= 10
        if field[i] != 'e':
            value += int(field[i])
    return value


# traverses the states using the previous field & does stuff with gui, checks validity of moves
def get_solution(end, time):
    solution_temp = list()
    temp = copy.copy(end)
    count = 0
    while True:
        count += 1
        solution_temp.insert(0, temp.map)
        temp = temp.previous
        if temp is None:
            break

    btn_back["state"] = DISABLED
    btn_forward["state"] = DISABLED

    global curr_index
    curr_index = 0

    global solution
    solution = copy.deepcopy(solution_temp)

    for i in range(len(solution_temp)):
        solution_temp[i] = [0 if x == 'e' else x for x in solution_temp[i]]
        if i == 0:
            print(solution_temp[i][0:3])
            print(solution_temp[i][3:6])
            print(solution_temp[i][6:9])
            continue
        curr_pos = get_position(solution[i], 'e')
        prev_pos = get_position(solution[i - 1], 'e')
        if prev_pos - curr_pos == 3:
            print("%2d" % i, "DOWN")
            if not can_move_down(solution[i - 1]):
                tkinter.messagebox.showinfo("BAD", "%d ILLEGAL MOVE" % i)
        if prev_pos - curr_pos == -3:
            print("%2d" % i, "UP")
            if not can_move_up(solution[i - 1]):
                tkinter.messagebox.showinfo("BAD", "%d ILLEGAL MOVE" % i)
        if prev_pos - curr_pos == 1:
            print("%2d" % i, "RIGHT")
            if not can_move_right(solution[i - 1]):
                tkinter.messagebox.showinfo("BAD", "%d ILLEGAL MOVE" % i)
        if prev_pos - curr_pos == -1:
            print("%2d" % i, "LEFT")
            if not can_move_left(solution[i - 1]):
                tkinter.messagebox.showinfo("BAD", "%d ILLEGAL MOVE" % i)
        print(solution_temp[i][0:3])
        print(solution_temp[i][3:6])
        print(solution_temp[i][6:9])

    print("Time elapsed:", time, "\n")

    text3var.set("%2d/%2d" % (curr_index + 1, len(solution)))

    if len(solution) > 1:
        btn_forward["state"] = NORMAL


def gui_solve():
    if int(slider_multi.get()) == 1:
        _thread.start_new_thread(solve, ())
    else:
        solve()


# solves the puzzle using a-star with currently chosen heuristic
def solve():
    # checks whether there is a solution for the current start-end combination
    if inversion_count(start_state) != inversion_count(wanted_state):
        tkinter.messagebox.showinfo("Info", "This combination of start-end states does not have a solution")
        return

    t0 = time.time()

    # to prevent multiple instances from running simultaneously
    global running
    if running == 1:
        return
    running = 1

    # so user doesnt mess stuff up by pressing stuff while its trying to solve the current combination
    btn_solve["state"] = DISABLED
    btn_solve["text"] = "RUNNING"
    btn_shuffle["state"] = DISABLED
    heuristic = int(slider_heuristic.get())

    # queue used to store currently available states
    queue = Queue()
    start = State(copy.deepcopy(start_state), 0, None)
    queue.insert(current_heuristic(start.map, heuristic), start)

    # dictionary used to store already visited states
    searched = dict()
    searched[dict_transform(start.map)] = 0

    # until it finds the wanted state (which it should, since it has already checked whether its solvable) in loop
    # it pops the currently cheapest state from the queue (which is sorted using g(n) + h(n) value, in case this sum
    # is equal for 2 items, its sorted so that states with higher g(n) - covered distance - come first)
    # checks for all 4 possible moves and for each does it (if the move is legal and results in a new (unvisited) state)
    while not queue.is_empty():
        top = queue.pop()
        top_map = top.map
        if top_map == wanted_state:
            t1 = time.time() - t0
            temp = copy.copy(top)
            get_solution(temp, t1)
            btn_solve["state"] = NORMAL
            btn_solve["text"] = "SOLVE"
            btn_shuffle["state"] = NORMAL
            tkinter.messagebox.showinfo("Info", "Elapsed time: %f" % t1)
            running = 0
            return

        if can_move_down(top_map):
            temp_map = copy.copy(top_map)
            move_down(temp_map)
            if dict_transform(temp_map) not in searched:
                add_state = State(temp_map, top.distance + 1, top)
                searched[dict_transform(add_state.map)] = 0
                queue.insert(add_state.distance + current_heuristic(add_state.map, heuristic), add_state)

        if can_move_up(top_map):
            temp_map = copy.copy(top_map)
            move_up(temp_map)
            if dict_transform(temp_map) not in searched:
                add_state = State(temp_map, top.distance + 1, top)
                searched[dict_transform(add_state.map)] = 0
                queue.insert(add_state.distance + current_heuristic(add_state.map, heuristic), add_state)

        if can_move_left(top_map):
            temp_map = copy.copy(top_map)
            move_left(temp_map)
            if dict_transform(temp_map) not in searched:
                add_state = State(temp_map, top.distance + 1, top)
                searched[dict_transform(add_state.map)] = 0
                queue.insert(add_state.distance + current_heuristic(add_state.map, heuristic), add_state)

        if can_move_right(top_map):
            temp_map = copy.copy(top_map)
            move_right(temp_map)
            if dict_transform(temp_map) not in searched:
                add_state = State(temp_map, top.distance + 1, top)
                searched[dict_transform(add_state.map)] = 0
                queue.insert(add_state.distance + current_heuristic(add_state.map, heuristic), add_state)

    # this should NEVER be reached because of the solvability checks before, but its here anyway just in case
    tkinter.messagebox.showinfo("Info", "This combination does not seem to have a solution")
    return


# sets start and end state to the values provided by user, checks for their legality
def gui_set():
    text1str = text1var.get()
    text2str = text2var.get()
    len1 = len(text1str)
    len2 = len(text2str)
    faulty = 0
    error_text = ""

    if len1 != 9:
        error_text += "Starting position is invalid\n"
        faulty = 1

    if len2 != 9:
        error_text += "Final position is invalid\n"
        faulty = 1

    found = [0] * 9
    for i in range(len1):
        if text1str[i] == 'e':
            found[0] = 1
            continue
        if 1 <= int(text1str[i]) < 9:
            found[int(text1str[i])] = 1

    for i in range(9):
        if found[i] == 0:
            faulty = 1
            if i == 0:
                error_text += "Empty space not in start state\n"
            else:
                error_text += "%d not found in start state\n" % i

    found = [0] * 9
    for i in range(len2):
        if text2str[i] == 'e':
            found[0] = 1
            continue
        if 1 <= int(text2str[i]) < 9:
            found[int(text2str[i])] = 1

    for i in range(9):
        if found[i] == 0:
            faulty = 1
            if i == 0:
                error_text += "Empty space not in end state\n"
            else:
                error_text += "%d not found in end state\n" % i

    if faulty:
        tkinter.messagebox.showinfo("Warning", error_text)
        return

    start_list = list()
    for i in range(9):
        if text1str[i] == 'e':
            start_list.append('e')
        else:
            start_list.append(int(text1str[i]))

    global start_state
    start_state = start_list

    end_list = list()
    for i in range(9):
        if text2str[i] == 'e':
            end_list.append('e')
        else:
            end_list.append(int(text2str[i]))

    global wanted_state
    wanted_state = end_list

    gui_update(start_state)
    return


# creates initial start and end state lists
def temp_init():
    start = list()
    end = list()
    for i in range(9):
        if i < 8:
            start.append(i + 1)
            end.append(8 - i)
        else:
            start.append('e')
            end.append('e')

    return start, end


# used to make sure 2 instances of solve thread do not run simultaneously to prevent unintended behaviour
# some minor bs can still be done but nothing that can kill the program or break something afaik
running = 0

# list of lists that represent the field, used to store the solution so it can be browsed in GUI
solution = list()
curr_index = -1

# start and end state
start_state, wanted_state = temp_init()

# GUI bs
main_window, buttons, text1var, text2var, text3var, slider_multi, slider_heuristic,\
    set_button, btn_back, btn_forward, btn_solve, btn_shuffle = init_window()
gui_update(start_state)
mainloop()
