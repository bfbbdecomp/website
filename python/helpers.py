
def getFuncList():
    funcs = []
    for line in open("funcs.csv").readlines():
        data = line.strip().split(",")
        data[1] = int(data[1])
        funcs.append(data)
    return funcs

def getGameFuncDict():
    return funcListToDict(getGameFuncs())

def getGameFuncs():
    return list(filter(lambda x: "Core/" in x[2] or "Game/" in x[2], getFuncList()))

def funcListToDict(funcList):
    funcDict = {}
    for func in funcList:
        funcDict[func[0]] = {
            "size": func[1],
            "file": func[2],
            "done": True
        }
    return funcDict

def getAddresses(path):
    inFunc = False
    addrs = []
    for line in open(path).readlines():
        if inFunc:
            data = line.split()
            if len(data) > 2 and data[0] == "/*" and len(data[1]) == 8:
                addrs.append(data[1])
                inFunc = False
        if ":" in line and "lbl_" not in line:
            inFunc = True
    return addrs