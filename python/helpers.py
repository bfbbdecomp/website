from threading import Condition
from symbols import getSymbols
from files import getFileInfo

def isCodeLine(line):
    data = line.split(" ")
    if len(data) < 2:
        return False
    if data[0] == "/*" and len(data[1]) == 8:
        return True
    return False

def getAsmAddresses(asmText):
    addrs = set()
    for line in asmText.splitlines():
        if isCodeLine(line):
            addr = line.split(" ")[1]
            addrs.add(addr)
    return addrs

def addressToInt(address):
    return int(address, 16)

def isGameFunction(symbol, start, end):
    if symbol["type"] != "FUNC":
        return False
    addr = addressToInt(symbol["address"])
    if addr >= start and addr < end:
        return True
    return False

def getGameFunctions():
    syms = getSymbols()
    bounds = getFileInfo()["bounds"]
    start = addressToInt(bounds["start"])
    end = addressToInt(bounds["end"])
    funcs = filter(lambda x: isGameFunction(x, start, end), syms)
    funcDict = {}
    for f in funcs:
        funcDict[f["address"]] = {
            "size": f["size"]
        }

    return funcDict