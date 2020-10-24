from symbols import getSymbols
from files import getFileInfo

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