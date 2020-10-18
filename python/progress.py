from git import Repo
from pathlib import Path
from helpers import *
from formatData import *
import json

decompPath = "../../bfbbdecomp"

repo = Repo(decompPath)
print(repo)

commits = list(repo.iter_commits("master"))
commits.reverse()
print(commits)

gameFuncSet = set(getGameFuncDict().keys())

graphData = []

info = {
    "repo": repo.remotes[0].url.split('.git')[0]
}

commitNum = 1

cacheText = open("./progressCache.json").read()
cache = {}
for point in json.loads(cacheText):
    print("cached", point["commit"])
    cache[point["commit"]] = point

# process assembly files from each commit
for c in commits:
    print("Processing commit #", commitNum, c, str(round(commitNum / len(commits) * 100, 2)) + "%")
    commitHash = str(c)
    if commitHash in cache and commitNum != len(commits):
        graphData.append(cache[commitHash])
        commitNum += 1
        continue

    repo.git.checkout(c)

    asmFiles = Path(decompPath + "/asm").rglob("*.s")

    funcDict = getGameFuncDict()

    for asm in asmFiles:
        # get the funcs in this file
        addrs = getAddresses(asm)

        for addr in addrs:
            # we only care about the relevant ones
            if addr in gameFuncSet:
                funcDict[addr]["done"] = False

    grandTotal = 0
    doneTotal = 0
    fcount = 0
    for f in funcDict:
        data = funcDict[f]
        grandTotal += data["size"]
        if funcDict[f]["done"] == True:
            #print(f, data["size"], data["file"])
            fcount += 1
            doneTotal += data["size"]

    plotDict = {
        "commit": str(c),
        "time": c.authored_date,
        "linesTotal": grandTotal,
        "linesDone": doneTotal,
        "functionsTotal": len(funcDict),
        "functionsDone": fcount
    }

    graphData.append(plotDict)

    # is this the most recent commit?
    # if so, generate file heatmap
    if commitNum == len(commits):
        info["stats"] = plotDict

        # save current function info to giant ass file
        funcData = formatFuncDict(funcDict)
        open("../data/functions.js", "w").writelines([
            "export default ",
            json.dumps(funcData, indent=4)
        ])
        print(len(funcDict))

        fileDict = {}
        lastCommit = {
            "commit": str(c),
            "time": c.authored_date
        }

        for func in funcDict:
            data = funcDict[func]
            name = data["file"]
            if name not in fileDict:
                fileDict[name] = {
                    "funcs": 0,
                    "doneFuncs": 0,
                    "lines": 0,
                    "doneLines": 0
                }
            fileDict[name]["funcs"] += 1
            fileDict[name]["lines"] += data["size"]
            if data["done"]:
                fileDict[name]["doneFuncs"] += 1
                fileDict[name]["doneLines"] += data["size"]

        heatmapData = formatHeatmapData(fileDict)

        # print the shit to the file
        heatchart = open("../data/heatchart.js", "w")
        heatchart.write("export const commit = ")
        heatchart.write(json.dumps(lastCommit, indent=4))
        heatchart.write("\n")
        heatchart.write("export const heatData = ")
        heatchart.write(json.dumps(heatmapData, indent=4))

    commitNum += 1

#open("progressCache.json", "w").write(json.dumps(graphData, indent=4))
graphData = formatGraphData(graphData)
timechart = open("../data/timechart.js", "w")
timechart.write("export const timeSeries = ")
timechart.write(json.dumps(graphData, indent=4))


open("../data/info.js", "w").writelines(["export default ", json.dumps(info, indent=4)])