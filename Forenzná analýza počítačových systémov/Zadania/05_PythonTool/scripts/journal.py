from .constants import JOURNALMAGICNUMBER
from random import randint
from sys import byteorder
from .inode import inode

class journal():

    def __init__(self, journal_file, block_size, disk_file, inode_size):
        self.desc = 0
        self.comm = 0
        self.supr = 0
        self.recovered = 0
        self.jcontent = []
        self.block_size = block_size
        self.disk_file = disk_file
        self.inode_size = inode_size

        self.get(journal_file)
        self.parse()

    def get(self, journal_file):
        self.journal_file = journal_file
        for offset in range(len(journal_file)//self.block_size):
            content = self.journal_file[offset*self.block_size:(offset + 1)*self.block_size]
            magic_number = int.from_bytes(content[0x00:0x04], byteorder=byteorder)
            if magic_number == JOURNALMAGICNUMBER:
                self.jcontent.append(content)
        
    def parse(self):
        for block in self.jcontent:
            block_type = int.from_bytes(block[0x07:0x08], byteorder=byteorder)
            if block_type == 1:
                self.desc +=1

                data_block = int.from_bytes(block[0x0b:0xf] + block[0x14:0x18], byteorder=byteorder)

                block_loc = data_block*self.block_size
                content = self.journal_file[block_loc:block_loc+self.block_size]
                self.descriptor(content)
            elif block_type == 2:
                self.comm +=1
            elif block_type == 4:
                self.supr +=1

    def print(self):
        print("\t Journal")
        print("\t\t Descriptor records \t\t", self.desc)
        print("\t\t Commit records \t\t", self.comm)
        print("\t\t Superblock records \t\t", self.supr)
        print("\t\t Recovered files \t\t", self.recovered)
            
    def descriptor(self, content):
        for ind in range(len(content) // self.inode_size):
            possible_inode = inode(content[ind*self.inode_size:(ind+1)*self.inode_size], ind)
            if possible_inode.valid():
                with open("../FapsTesting/recovered/" + possible_inode.name(), "wb") as recovered:
                    data = possible_inode.getData(self.disk_file, self.block_size)
                    recovered.write(data[0:possible_inode.size])
                    self.recovered += 1
