# https://www.programiz.com/dsa/floyd-warshall-algorithm

# Floyd Warshall Algorithm in python


# The number of vertices
nV = 4

INF = 999


# Algorithm implementation
def floyd_warshall(G, X):
    distance = list(map(lambda i: list(map(lambda j: j, i)), G))
    prev = list(map(lambda i: list(map(lambda j: j, i)), X))

    print("---------------------------------------------------------")
    print("Initial")
    print_solution(distance)
    print()
    print_solution(prev)

    # Adding vertices individually
    for k in range(nV):
        for i in range(nV):
            for j in range(nV):
                if distance[i][j] > distance[i][k] + distance[k][j]:
                    distance[i][j] = distance[i][k] + distance[k][j]
                    prev[i][j] = prev[k][j]
        print("---------------------------------------------------------")
        print("K = ", k+1)
        print_solution(distance)
        print()
        print_solution(prev)


# Printing the solution
def print_solution(distance):
    for i in range(nV):
        print("|", end="")
        counter = 0
        for j in range(nV):
            if distance[i][j] == INF:
                print("INF", end=" ")
            else:
                print(" {:3d}".format(distance[i][j]), end="")
            if counter != nV - 1:
                print(",", end="")
            counter += 1
        print("   |")
    print()


# number of nodes in the graph
n = int(input('Pocet hran: '))

# number of edges in the graph
m = int(input('Pocet vrcholov: '))

# graph to contain weighted edges
c = []
nV = m
for _ in range(m):
    c.append([INF] * m)

print('Hrany v tvare -> vrchol vrchol vaha')
for _ in range(n):
    u, v, w = list(map(int, input().split()))
    c[u-1][v-1] = w

for i in range(m):
    c[i][i] = 0

x = []
for _ in range(m):
    x.append([INF] * m)

for x1 in range(m):
    for y in range(m):
        if c[x1][y] != INF:
            x[x1][y] = x1+1

floyd_warshall(c, x)
