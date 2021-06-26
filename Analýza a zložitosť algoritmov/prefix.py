p = "-" + (input("zadaj string: "))
k_list = [0, 0]
pi_list = [0, 0]
k_out = [0, 0]
index = [i for i in range(len(p))]
print(p)
for i in range(2, len(p)):
    k = k_list[i - 1]
    k_item = str(k)
    while k > 0 and p[i] != p[k + 1]:
        k = pi_list[k]
        k_item += "," + str(k)
    if p[i] == p[k + 1]:
        k += 1
        k_item += "," + str(k)
    pi_list.append(k)
    k_list.append(k)
    if k_item[-1] == ",":
        k_item = k_item[-1]
    k_out.append(k_item)

print("index: " + str(index[1:]))
print("pi:    " + str(pi_list[1:]))
print("k:     " + str(k_list[1:]))
print("\nk (presne): " + str(k_out[1:]))
