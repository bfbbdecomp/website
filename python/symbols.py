
def getSymbols():
    f = open("symbols.txt").readlines()
    f = map(lambda x: x.strip(), f)
    f = map(symbolLineToObject, f)
    return list(f)

def symbolLineToObject(line):
    info = line.split()
    data = {}
    data["symbol_number"] = int(info[0].replace(':', ''))
    data["address"] = info[1].upper()
    data["size"] = parseDecOrHex(info[2]) // 4 # total bytes / 4 bytes per instruction line
    data["type"] = info[3] # one of {'SECTION', 'NOTYPE', 'OBJECT', 'FILE', 'FUNC'}
    data["scope"] = info[4]
    # data["??"] = info[5] # this is DEFAULT for every label
    data["section"] = info[6]
    data["name"] = getSymbolName(info)
    return data

def getSymbolName(info):
    if len(info) > 7:
        return info[7]
    else:
        return None

def parseDecOrHex(number):
    if 'x' in number:
        return int(number, 16)
    else:
        return int(number)