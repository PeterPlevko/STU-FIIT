import utils
import math
import numpy as np
from itertools import combinations

########################
# Useless stuff starts #
########################
def get_sum(Z,X1,X2 = 0):
    ret = (0 + X1 + X2) % Z
    return ret

def get_dist(n,Z,X):
    diam = -1
    for i,M1 in enumerate(X):
        sum = get_sum(Z,M1)
        if(sum == n):
            return 1
        for j,M2 in enumerate(X):
            if(j < i):
                continue
            # test move combination
            sum = get_sum(Z,M1,M2)
            if(sum == n):
                diam = 2
    return diam

def calculate_diam(Z1,X):
    max = -2
    for i in range(1,Z1):
        dist = get_dist(i,Z1,X)
        if dist == -1:
            return 0
        if (dist > max):
            max = dist
    if max == 1:
        return 0
    if max == 2:
        return 1
    return -1
    
######################
# Useless stuff ends #
######################

class Cayley(utils.Graph):
    '''
    def __init__(self,Z1,Z2,X):
        super().__init__(Z1 * Z2)
        self.diam = 0
        for i in range(Z1):
            for j in range(Z2):
                for x in X:
                    #self.adjc_mat[i,(i + x) % Z1] = 1
                    self.adjc_mat[i*Z2 + j, ((i + x[0]) % Z1)*Z2 + ((j + x[1]) % Z2) ] = 1
                    '''
    def __init__(self,Z1,X):
        super().__init__(Z1)
        self.diam = calculate_diam(Z1,X)
        for i in range(Z1):
            for x in X:
                self.adjc_mat[i,(i + x) % Z1] = 1


utils.greet(1)
""""
temp = Cayley(6,[2,4])
print(temp.adjc_mat)
print(temp.diam)
"""""


def test_r():
    # TODO: implement functionality
    return 0


def moore_bounds(z, r):
    # Moore bound for mixed graphs with diam = 2
    return  1 + (z + r) + r + sum(list(range(z + r)))



def get_max_r(n, z):
    return math.ceil(n - (2* z) / 2) - 1


def generate_x(n, z, r):
    edges = r + z
    # inverse has to be accounted for
    N = list(range(1, n))
    N_half = list(range(1, math.ceil(n/2)))
    # print(N_half)
    N_other_half = list(range(math.floor(n/2) + 1, n))
    comb = list(combinations(N_half, edges))
    for item in comb:
        for tuple in list(combinations(item, z)):
            new_tuple = tuple[::-1]
            temp = ()
            for i in new_tuple:
                temp += (n - i,)
            # print(item + temp)
            graph = Cayley(n, item + temp)
            # print(graph.adjc_mat)
            # print(graph.diam)
            if graph.diam == 1:
                print(item + temp)
                return 1
    if n % 2 == 0:
        comb = list(combinations(N_half, edges - 1))
        for item in comb:
            for tuple in list(combinations(item, z - 1)):
                new_tuple = tuple[::-1]
                temp = (int(n / 2),)
                for i in new_tuple:
                    temp += (n - i,)
                print(item + temp)
                graph = Cayley(n, item + temp)
                if graph.diam == 1:
                    return 1
    return 0


def main():
    possible, impossible = 0, 0
    for n in range(10, 51):
        for z in range (2,5):
            # get maximum value of oriented edges for all Caley graphs
            max_r = get_max_r(n, z)
            # cycle for every potential r
            for r in range(1, max_r + 1):
                # check Moore bound for every potential r 
                mb = moore_bounds(z, r)
                # if the number of vertices is greater than the Moore bound, go to the next configuration
                if n > mb:
                    print("Impossible to generate for params: n = ", n, " z: ", z, " r = ", r)
                    impossible += 1
                else:                    
                    possible +=1
                    if generate_x(n, z, r):
                        print("Found a graph with diameter 2 for params: n = ", n, " z: ", z, " r = ", r)
                    else:
                        print("No graph with diameter 2 for params: n = ", n, " z: ", z, " r = ", r)
                    break
                    
                    
    print("possible: ", possible, "impossible: ", impossible)

main()
#temp = generate_x(14, 2, 3)
