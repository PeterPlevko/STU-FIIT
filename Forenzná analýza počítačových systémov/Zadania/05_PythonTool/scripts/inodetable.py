from .inode import inode

class inodetable():
    
    def __init__(self, chunk, inodes_per_group, inode_size, group_number):
        self.inodes = []
        self.inodes_per_group = inodes_per_group
        self.inode_size = inode_size
        self.parse(chunk, group_number)

    def parse(self, chunk, group_number):
        self.inodes = []

        for ind in range(self.inodes_per_group):
            self.inodes.append(inode(chunk[ind*self.inode_size:(ind+1)*self.inode_size], group_number*self.inodes_per_group + (ind+1)))

    def print(self):
        print("\t iNode table")
        for ind in self.inodes:
            ind.print()