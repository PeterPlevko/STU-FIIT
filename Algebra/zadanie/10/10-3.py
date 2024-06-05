import numpy as np
import networkx as nx
import random
from networkx.algorithms import isomorphism
import matplotlib.pyplot as plt
import copy

def contains_K5(g, k5):
    if len(g) < len(k5):
        return False

    for i in range(len(k5)):
        for j in range(len(k5[0])):
            if k5[i][j] != g[i][j]:
                return False

    return True

def get_thickness(g):
    # Check for single vertex graphs
    if len(list(g.edges)) == 0:
        return 1
    
    t = 0
    # Still needs to be processed matrix
    p = copy.deepcopy(g)

    # While the matrix g is not full of zeros
    while len(list(p.edges)) > 0:
        is_k5   = isomorphism.GraphMatcher(p, nx.complete_graph(5))
        is_k3_3 = isomorphism.GraphMatcher(p, nx.complete_bipartite_graph(3, 3))

        # If true then delete vertex from graph
        if nx.check_planarity(p)[0] == False:
            if is_k3_3.subgraph_is_isomorphic() == True:
                for subgraph in is_k3_3.subgraph_isomorphisms_iter():
                    edge = tuple(list(subgraph.keys())[:2])
                    #print('K3_3 remove edge:', edge)
                    p.remove_edge(*edge)
                    break
            elif is_k5.subgraph_is_isomorphic() == True:
                for subgraph in is_k5.subgraph_isomorphisms_iter():
                    edge = tuple(list(subgraph.keys())[:2])
                    #print('K5 remove edge:', edge)
                    p.remove_edge(*edge)
                    break
            else:
                xCoord = random.randrange(0, len(g))
                yCoord = random.randrange(0, len(g))
                # Check if we are deleting any edge
                while (xCoord, yCoord) not in list(p.edges):
                    xCoord = random.randrange(0, len(g))
                    yCoord = random.randrange(0, len(g))
                p.remove_edge(xCoord, yCoord)

        # Graph is planar
        else:
            t += 1
            g.remove_edges_from(list(p.edges))
            p = copy.deepcopy(g)

    return t

def main():
    n = int(input('Insert the number of vertices in a complete graph: '))
    g = nx.complete_graph(n)

    theta = 999

    for _ in range(10):
        g = nx.complete_graph(n)
        temp = get_thickness(g)
        print(temp)
        if temp < theta:
            print('Found new thickness value:', temp)
            theta = temp

    print('The thickness of the K' + str(n), 'graph is:', theta)

main()