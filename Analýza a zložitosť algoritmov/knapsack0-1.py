
print("Knapsack 0-1")
n = int(input("Pocet veci: "))
w = int(input("Nosnost batohu: "))
items = [None] * n
for i in range(0, n):
    items[i] = [None, None]
    print("-----------------------------")
    items[i][0] = int(input("Cena: "))
    items[i][1] = int(input("Hmotnost: "))

knapsack = []
took = []
for _ in range(0, n+1):
    knapsack.append([0] * (w+1))
    took.append([0] * (w+1))

for x in range(1, n+1):
    for y in range(1, w+1):
        if y-items[x-1][1] < 0 or knapsack[x - 1][y] > knapsack[x - 1][y - items[x-1][1]] + items[x-1][0]:
            knapsack[x][y] = knapsack[x-1][y]
            took[x][y] = 0
        else:
            knapsack[x][y] = knapsack[x - 1][y - items[x - 1][1]] + items[x - 1][0]
            if knapsack[x - 1][y] == knapsack[x - 1][y - items[x-1][1]] + items[x-1][0]:
                took[x][y] = [0, 1]
            else:
                took[x][y] = 1

print("Knapsack:")
for line in knapsack:
    print("|", end="")
    counter = 0
    for x in line:
        print(" {:2d}".format(x), end="")
        if counter != len(line) - 1:
            print(",", end="")
        counter += 1
    print(" |")
print()

for line in took:
    print("|", end="")
    counter = 0
    for x in line:
        print(" {:6s}".format(str(x)), end="")
        if counter != len(line) - 1:
            print(",", end="")
        counter += 1
    print(" |")
