print("Matice")
n = int(input("Pocet matic: "))
items = [None] * n
for i in range(0, n):
    items[i] = [None, None]
    print("-----------------------------")
    items[i][0] = int(input("Prvy rozmer: "))
    items[i][1] = int(input("Druhy rozmer: "))

dp = []
for _ in range(0, n):
    dp.append([0] * n)

for x in range(2, n + 1):
    j = x
    for i in range(1, n+2-x):
        min_list = []
        for k in range(i, j):
            min_list.append([[dp[i-1][k-1] + dp[k+1-1][j-1] + items[i-1][0]*items[k-1][1]*items[j-1][1]], k])
        dp[i-1][j-1] = min(min_list)[0][0]
        dp[j-1][i-1] = min(min_list)[1]
        j += 1

for line in dp:
    print("|", end="")
    counter = 0
    for x in line:
        print(" {:3d}".format(x), end="")
        if counter != len(line) - 1:
            print(",", end="")
        counter += 1
    print("   |")
print()
