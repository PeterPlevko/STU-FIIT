print("Knapsack - vseobecny")
n = int(input("Pocet veci: "))
w = int(input("Nosnost batohu: "))
items = [None] * n
for i in range(0, n):
    items[i] = [None, None]
    print("--------------------------------")
    items[i][0] = int(input("Cena: "))
    items[i][1] = int(input("Hmotnost: "))

knapsack = [0] * (w+1)
took = [0] * (w+1)

for i in range(1, w+1):
    max_list = []
    for j in range(1, n+1):
        if i >= items[j - 1][1]:
            max_list.append([items[j - 1][0] + knapsack[i - items[j - 1][1]], j])
    if len(max_list) == 0:
        knapsack[i] = 0
        took[i] = 0
    else:
        knapsack[i] = max(max_list)[0]
        took[i] = max(max_list)[1]

counter = 0
print("| ", end="")
for x in knapsack:
    print("{:2d} ".format(x), end="")
    if counter != len(knapsack) - 1:
        print(",", end="")
    counter += 1
print(" |")
print(took)
