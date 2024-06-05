from .constants import EXTENTTREEMAGICNUMBER
from datetime import datetime
from sys import byteorder

class inode():
    def __init__(self, chunk, ind):
        self.ind = ind
        
        self.parseInode(chunk)
        self.getInodeType(self.block_addressing)

    def parseInode(self, chunk):
        self.mode = int.from_bytes(chunk[0x0:0x2], byteorder=byteorder)
        self.size = int.from_bytes(chunk[0x4:0x8], byteorder=byteorder)
        self.deleted_time = int.from_bytes(chunk[0x14:0x18], byteorder=byteorder)
        self.hard_links = int.from_bytes(chunk[0x1A:0x1C], byteorder=byteorder)
        self.block_count = int.from_bytes(chunk[0x1C:0x20], byteorder=byteorder)
        self.block_addressing = chunk[0x28:0x64]

    def print(self):
        print("\t\t iNode \t\t\t\t", self.ind)
        print("\t\t\t mode \t\t\t\t", self.mode)
        print("\t\t\t magic number \t\t\t", self.magic_number)
        print("\t\t\t hard links \t\t\t", self.hard_links)
        print("\t\t\t size \t\t\t\t", self.size)
        print("\t\t\t deleted time \t\t\t", self.deleted_time)
        print("\t\t\t block count \t\t\t", self.block_count)
        print("\t\t\t real block count \t\t", len(self.blocks))

    def getData(self, disk_file, block_size):
        data_from = b""
        old_position = disk_file.tell()

        if len(self.blocks) > 0:
            for group in self.blocks[0]:
                for block in group:
                    disk_file.seek(block*block_size)
                    data_from += disk_file.read(block_size)

        disk_file.seek(old_position)
        return data_from

    def getBlocksExtentCount(self, byte, block):
        #ee_block = int.from_bytes(byte[0:4], byteorder=byteorder)
        ee_len = int.from_bytes(byte[4:6], byteorder=byteorder)
        ee_pos = int.from_bytes(byte[8:12] + byte[6:8], byteorder=byteorder)
        
        return [*range(ee_pos, ee_len+ee_pos)]

    def parse_extent_idx(self, byte, block):
        ei_block = int.from_bytes(byte[0:4], byteorder=byteorder)
        ei_leaf = int.from_bytes(byte[4:0xa], byteorder=byteorder)
        return ei_block, ei_leaf

    def getBlocksExtentTree(self, chunk):
        #valid_entries = int.from_bytes(byte[0x2:0x4], byteorder=byteorder)
        entries_following_header = int.from_bytes(chunk[0x4:0x6], byteorder=byteorder)
        depth = int.from_bytes(chunk[0x6:0x8], byteorder=byteorder)
        blocks = []

        for block in range(entries_following_header):
            position = 12*(block+1)
            if depth == 0:
                blcks = self.getBlocksExtentCount(chunk[position:position+12], block)
                blocks.append(blcks)
            else:
                pass
                #print(self.parse_extent_idx(chunk[position:position+12], block))

        return blocks

    def getInodeType(self, chunk):
        self.magic_number = int.from_bytes(chunk[0x0:0x2], byteorder=byteorder)
        self.blocks = []

        if self.magic_number == EXTENTTREEMAGICNUMBER:
            self.blocks.append(self.getBlocksExtentTree(chunk))
        """
        else:
            blocks = []
            for i in range(end):
                inode_block = int.from_bytes(byte[i*length:(i+1)*length], byteorder=byteorder)
                if inode_block > 0:
                    if depth == 0:
                        blocks.append(inode_block)
                    else:
                        disk.seek(inode_block*block_size)
                        blocks.append(self.parse_inode_type(block_size//INODEPOINTER, disk.read(block_size), length, block_size, disk, depth-1))
            #data = parse_blocks(disk, blocks, block_size)
        """

    def valid(self):
        if len(self.blocks) > 0:
            if self.mode > 0 and self.mode < 65535:
                return True
            if self.magic_number > 0 and self.magic_number < 65535:
                return True
            if self.size > 0 and self.size < 4294967295:
                return True
            if self.block_count > 0 and self.block_count < 4294967295:
                return True
        return False

    def name(self):
        #size + "B/kB/MB..." + "_" + deletion_date(%Y%M%D_%H%M%S)
        size = str(self.size)
        date = datetime.fromtimestamp(self.deleted_time)
        date = date.strftime("%Y%d%m-%H%M%S")

        return size + "B_" + date + ".bin"
