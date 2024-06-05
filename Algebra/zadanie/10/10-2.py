import utils
from itertools import permutations

utils.greet(2)

def is_graceful(permutation):
    edges = []
    for i in range(0, len(permutation) - 1):
        edges.append(abs(permutation[i] - permutation[i + 1]))

    if len(edges) != len(set(edges)):
        return 0
    
    else:
        #print('Permutation: ' + str(permutation))
        print('Permutation: ' + str(permutation) + '  Edges:' + str(edges))
        #print('Edges:       ' + str(edges))
        return 1

def graceful(n):
    g = 0

    # Generate all permutations of vertices without reverse duplicates
    for perm in permutations(range(0, int(n))):
        if perm[0] <= perm[-1]:
            g += is_graceful(perm)

    return g

edge_list = []

def is_graceful2(permutation):
    edges = []
    for i in range(0, len(permutation) - 1):
        edges.append(abs(permutation[i] - permutation[i + 1]))

    if len(edges) != len(set(edges)):
        return 0
    
    else:
        if not list(reversed(edges)) in edge_list:
            edge_list.append(edges)
            #print('Permutation: ' + str(permutation))
            print('Permutation: ' + str(permutation) + '  Edges:' + str(edges))
            #print('Edges:       ' + str(edges))
            return 1
        else:
            return 0

def graceful2(n):
    edge_list.clear()
    g = 0

    # Generate all permutations of vertices without reverse duplicates
    for perm in permutations(range(0, int(n))):
        if perm[0] <= perm[-1]:
            g += is_graceful2(perm)
    #print(edge_list)
    return g


def main():
    n = 0
    

    algo = input("Pick algorithm: \n 1. Normal graceful G(n) \n 2. Graceful based on wolfram G2(n)\n")

    while int(n) <= 1: 
        n = input('Insert the number of vertices in a path: ')
    """
    for n in range(2, 11):
        print(str(n) + ': ' + str(graceful(n)))
    """
    if (algo == '1'):
        print(graceful(n))
    else:
        print(graceful2(n))

main()