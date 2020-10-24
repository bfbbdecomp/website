from random import randint
from datetime import datetime

# we're gonna format some js data objects in python
# because python is 1,000,000% more enjoyable to
# work with than javashit.
# this entire codebase is ugly
# but as long as it serves its purpose who cares

def formatFuncDict(funcDict):
    data = []
    for func in funcDict:
        f = funcDict[func]
        f["address"] = func
        f["name"] = "func_" + func
        data.append(f)

    return data

def formatTimechartData(timechartData):

    # remove commits before 9-15-2020 because
    # the repo was still stabilizing before that point
    before = datetime(2020, 9, 15)
    timechartData = list(filter(lambda x: datetime.fromtimestamp(x["time"]) >= before, timechartData))

    newData = []
    previous = None
    for point in timechartData:
        if previous == None:
            newData.append(point)
            previous = point
            continue
        if point["functionsDone"] != previous["functionsDone"]:
            newData.append(point)
        previous = point

    return newData

def formatHeatmapData(fileDict, columns=20):
    points = []
    for f in fileDict:
        point = fileDict[f]
        point["file"] = f #.replace(".s", "")
        point["funcPercent"] = round(point["doneFuncs"] / point["funcs"] * 100, 2)
        point["linePercent"] = round(point["doneLines"] / point["lines"] * 100, 2)
        point["value"] = point["funcPercent"] # maybe change this to linePercent
        points.append(point)
    points.sort(key=lambda x: x["file"])
    col = 0
    row = 0
    prev = None
    pathcount = 0
    pathDelim = None
    for p in points:
        """
        pathDelim = "/".join(p["file"].split("/")[:-1])
        if pathDelim != prev:
            if pathcount > 0:
                prev = pathDelim
                col = 0
                row += 2
            pathcount += 1
        print(pathDelim)
        """
        #p["value"] = randint(0.0, 100.0)
        p["x"] = col
        p["y"] = row
        col += 1
        if col >= columns:
            row += 1
            col = 0
    return points