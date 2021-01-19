import json

from helpers import exportJS


def floatToPercent(f):
    return str(round(f * 100, 2)) + "%"


def generateApi(funcs):
    numFuncs = len(funcs)
    numLines = sum(map(lambda x: funcs[x]["lines"], funcs))
    doneFuncs = list(filter(lambda x: funcs[x]["commit"] != None, funcs))
    doneLines = sum(map(lambda x: funcs[x]["lines"], doneFuncs))
    linePercent = floatToPercent(doneLines / numLines)
    funcPercent = floatToPercent(len(doneFuncs) / numFuncs)
    api = {
        "functions": numFuncs,
        "functionsDone": len(doneFuncs),
        "lines": numLines,  # test
        "linesDone": doneLines,
        "linesPercent": linePercent,
        "functionsPercent": funcPercent
    }
    return api


def writeApi(funcs):
    api = generateApi(funcs)
    open("../dist/api.json", "w").write(json.dumps(api, indent=4))