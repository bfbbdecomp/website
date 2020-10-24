from files import getFileInfo, getFunctionFile
from formatData import formatHeatmapData
import json


def exportHeatmap(fileDict, commit):

    lastCommit = {
        "commit": str(commit),
        "time": commit.authored_date
    }

    data = formatHeatmapData(fileDict)

    heatchart = open("../data/heatchart.js", "w")
    heatchart.write("export const commit = ")
    heatchart.write(json.dumps(lastCommit, indent=4))
    heatchart.write("\n")
    heatchart.write("export const heatData = ")
    heatchart.write(json.dumps(data, indent=4))

def createEntry(d, name):
    if name not in d:
        d[name] = {
            "funcs": 0,
            "doneFuncs": 0,
            "lines": 0,
            "doneLines": 0
        }
    

def genFileDict(doneFuncs, notDoneFuncs):
    fs = getFileInfo()["files"]
    names = set(map(lambda x: x["name"], fs))
    fileDict = {}

    for addr in doneFuncs:
        fname = getFunctionFile(fs, addr)
        createEntry(fileDict, fname)
        fileDict[fname]["funcs"] += 1
        fileDict[fname]["doneFuncs"] += 1
        fileDict[fname]["lines"] += doneFuncs[addr]["size"]
        fileDict[fname]["doneLines"] += doneFuncs[addr]["size"]

    for addr in notDoneFuncs:
        fname = getFunctionFile(fs, addr)
        createEntry(fileDict, fname)
        fileDict[fname]["funcs"] += 1
        fileDict[fname]["lines"] += notDoneFuncs[addr]["size"]

    return fileDict