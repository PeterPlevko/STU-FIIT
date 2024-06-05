# https://cppsecrets.com/users/5629115104105118971091101011031055657495564103109971051084699111109/Python-Bellman-Ford-Algorithm.php


# number of nodes in the graph
print('Pocet hran: ')
m = int(input())

# number of edges in the graph
print('Pocet vrcholov: ')
n = int(input())

# graph to contain weighted edges
graph = []

print('Hrany v tvare (vrchol, vrchol, vaha) ')
for i in range(m):
    u, v, w = list(map(int, input().split()))
    graph.append([u-1, v-1, w])


def BellmanFord(src):
    # Initializing distance from source vertex to all vertices as INFINITE and distance of source vertex as 0
    dist = [float("inf") for i in range(n)]
    dist[src] = 0

    # Relax all edges | V | - 1 times. A simple shortest path from src to any other vertex can have at-most |V| - 1 edges
    for i in range(n-1):
        print(dist)
        # Update dist value and parent index of the adjacent vertices of the picked vertex. Consider only those vertices which are still in queue.
        for u, v, w in graph:
            if dist[u] != float("inf") and dist[u]+w < dist[v]:
                dist[v] = dist[u]+w

    # Step 3: check for negative-weight cycles. The above step guarantees shortest distances if graph doesnt contain negative weight cycle. If we get a shorter path, then there is a cycle.
    cycle = 0
    for u, v, w in graph:
        if dist[u] != float("Inf") and dist[u] + w < dist[v]:
            print("Graf ma negativne cykly")
            cycle = 1
            break
    if cycle == 0:
        print('Vzdialenost od startu', src+1)
        print('Vrchol \t Vzdialenost')
        for i in range(len(dist)):
            print(i+1, '\t', dist[i])

BellmanFord(int(input("Start vrchol: "))-1)
