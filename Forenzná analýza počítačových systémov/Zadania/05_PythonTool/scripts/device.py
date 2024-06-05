from os import path
import parted

class device():

    def __init__(self):
        self.valid = True
        self.chosen_device = ""
        self.chosen_partition = ""
        self.getDevice()
        if self.valid:
            self.getPartition()

    def getDevice(self):
        devices = parted.getAllDevices()
        for row, dev in enumerate(devices, start=1):
            print("[" + str(row) + "] \t\t" + dev.path)
        self.chosen_device = input("Choose device or file (Default None) [Number]: ") 

        try:
            self.chosen_device = int(self.chosen_device) - 1
            if self.chosen_device < 0 or self.chosen_device > len(devices) - 1:
                self.valid = False
                self.code = 103
                self.message = "Invalid number: out of range"
                return
            device = devices[self.chosen_device].path
        except ValueError:
            if not path.exists(self.chosen_device):
                self.valid = False
                self.code = 101
                self.message = "Invalid file: file does not exist"
                return
            device = self.chosen_device

        self.device = parted.getDevice(device)
        self.disk = parted.newDisk(self.device)
        self.disk_file = open(self.device.path, "rb")

    def getPartition(self):
        row = 1
        for part in self.disk.partitions:
            filesystem = part.fileSystem
            if filesystem and filesystem.type == "ext4":
                #print more information here!!!
                print("[" + str(row) + "] \t\t" + filesystem.type + " partition")
                row += 1
            
        self.chosen_partition = input("Choose partition (Default None) [Number]: ") 
        try:
            self.chosen_partition = int(self.chosen_partition) - 1
            if self.chosen_partition < 0 or self.chosen_partition > len(self.disk.partitions) - 1:
                self.valid = False
                self.code = 104
                self.message = "Invalid number: not in range"
                return
            self.partition = self.disk.partitions[self.chosen_partition]
        except ValueError:
            self.valid = False
            self.code = 102
            self.message = "Invalid number: not number"
    
    def getDirectory(self):
        chosen = input("Store recovered items in folder: ")
        if path.exists(chosen):
            self.directory = chosen
        else:
            self.valid = False
            self.code = 105
            self.message = "Destination folder: Folder does not exist"
            