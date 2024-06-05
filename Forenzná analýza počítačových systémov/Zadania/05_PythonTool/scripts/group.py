from scripts.inodetable import inodetable
from scripts.journal import journal
from scripts.superblock import superblock
from scripts.groupdescriptor import groupdescriptor
from scripts.constants import SUPERBLOCKSIZE

class group():

    def __init__(self, group_number, disk_file, padding):
        self.disk_file = disk_file
        self.disk_file.seek(padding)
        self.superblock = superblock(self.disk_file.read(SUPERBLOCKSIZE), group_number)

        if self.superblock.valid:
            self.disk_file.seek(self.superblock.block_size)
            self.groupdescriptor = groupdescriptor(self.disk_file.read(self.superblock.block_size))

            self.disk_file.seek(self.superblock.block_size * self.groupdescriptor.inode_table)
            self.inodetable = inodetable(self.disk_file.read(self.superblock.block_size), self.superblock.inodes_per_group, self.superblock.inode_size, group_number)
            
            journal_inode = self.inodetable.inodes[self.superblock.journal_inode - 1]
            journal_file = journal_inode.getData(self.disk_file, self.superblock.block_size)
            self.journal = journal(journal_file,  self.superblock.block_size, disk_file, self.superblock.inode_size)

    def print(self):
        self.superblock.print()

        if self.superblock.valid:
            self.groupdescriptor.print()
            self.inodetable.print()
            self.journal.print()