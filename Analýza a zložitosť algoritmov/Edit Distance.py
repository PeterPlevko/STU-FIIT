stringX = input("Retazec X:")
stringY = input("Retazec Y:")

dp = [[]] * (len(stringX)+1)
for i in range(len(stringX)+1):
    dp[i] = [0] * (len(stringY)+1)

for i in range(0, len(stringX)+1):
    for j in range(0, len(stringY)+1):
        if i == 0:
            dp[i][j] = j
            continue
        if j == 0:
            dp[i][j] = i
            continue

        if list(stringX)[i-1] == list(stringY)[j-1]:
            diff = 0
        else:
            diff = 1

        dp[i][j] = min(dp[i-1][j] + 1, dp[i][j-1] + 1, dp[i-1][j-1] + diff)


for x in dp:
    print(x)
