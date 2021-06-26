stringX = input("Retazec X: ")
stringY = input("Retazec Y: ")

dp = [[]] * (len(stringX)+1)
for i in range(len(stringX)+1):
    dp[i] = [0] * (len(stringY)+1)

for i in range(1, len(stringX)+1):
    for j in range(1, len(stringY)+1):
        if list(stringX)[i-1] == list(stringY)[j-1]:
            dp[i][j] = dp[i-1][j-1] + 1
        else:
            dp[i][j] = max(dp[i][j-1], dp[i-1][j])

print()
for x in dp:
    print(x)
