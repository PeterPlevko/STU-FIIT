import numpy as np
def greet(a):
    print("Hello world, project", a)

class Graph:
    def __init__(self,v):
        self.V = v
        self.adjc_mat = np.zeros((v,v), dtype= int)
        self.diam = -1

class CompleteGraph(Graph):
    def __init__(self,v):
        self.v = v
        self.adjc_mat = np.ones((v,v), dtype= int)
        np.fill_diagonal(self.adjc_mat, 0)
        self.diam = -1

