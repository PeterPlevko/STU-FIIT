from sys import byteorder

class groupdescriptor():

    def __init__(self, chunk):
        self.chunk = chunk

        self.parse()

    #group descriptor - get from superblock, 0x8 lower and 0x28 upper bits
    def parse(self):
        self.inode_table = int.from_bytes(self.chunk[0x8:0xb] + self.chunk[0x28:0x2b], byteorder=byteorder)
        self.free_inodes_count = int.from_bytes(self.chunk[0xE:0x10] + self.chunk[0x2E:0x30], byteorder=byteorder)

    def print(self):
        print("\t Group descriptor")
        print("\t\t iNode table \t\t\t\t", self.inode_table)
        print("\t\t Free inodes count \t\t\t", self.free_inodes_count)