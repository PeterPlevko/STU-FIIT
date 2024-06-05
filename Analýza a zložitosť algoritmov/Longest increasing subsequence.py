print("Najdlhsia rastuca podpostupnost")
n = int(input("Pocet cisel: "))
items = [None] * n
maxi = [0] * n
for i in range(0, n):
    items[i] = int(input("Cislo: "))

for i in range(0, n):
    max_list = []
    for j in range(0, i):
        if items[j] < items[i]:
            max_list.append(maxi[j])
    if len(max_list) == 0:
        maxi[i] = 1
    else:
        maxi[i] = max(max_list) + 1

print(maxi)
