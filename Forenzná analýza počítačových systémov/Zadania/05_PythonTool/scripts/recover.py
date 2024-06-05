from scripts.device import device
from scripts.group import group

GROUPPOSITIONS =  [0, 32768, 98304, 163840, 229376, 294912, 819200, 884736, 1605632, 2654208, 4096000]

class recover():

    def __init__(self):
        self.device = device()
        self.groups = []
        
        if self.device.valid:
            self.parse()

    def parse(self):
        for group_number in GROUPPOSITIONS:
            gr = group(group_number, self.device.disk_file, 1024)
            self.groups.append(gr)

    def print(self):
        print("***********************")
        print("Device \t\t\t\t", self.device.chosen_device)
        print("Partition \t\t\t", self.device.chosen_partition)
        if not self.device.valid:
            print("\t Code \t\t\t\t", self.device.code)
            print("\t Message \t\t\t", self.device.message)
        else:
            for group in self.groups:
                group.print()
        print("***********************")
