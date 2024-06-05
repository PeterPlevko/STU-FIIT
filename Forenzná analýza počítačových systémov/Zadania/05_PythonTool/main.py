from scripts.recover import recover
from sys import byteorder
import parted
import psutil

#ERRORS
#100 - 199: user errors
#200 - 299: not implemented
#300 +    : other catched errors - bugs

recover()