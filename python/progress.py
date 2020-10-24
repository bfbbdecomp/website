import json
from git import Repo
from pathlib import Path
from chart import exportTimeChart

from helpers import getAsmAddresses, getGameFunctions

decompPath = "../../bfbbdecomp"

repo = Repo(decompPath)
commits = list(repo.iter_commits("master"))
commits.reverse()

timechartData = []

info = {
    "repo": repo.remotes[0].url.split('.git')[0]
}

cacheText = open("cache/timeline.json").read()
cache = {}
for point in json.loads(cacheText):
    print("cached", point["commit"])
    cache[point["commit"]] = point

commitNum = 1

allFuncs = getGameFunctions()
functionsTotal = len(allFuncs)
linesTotal = sum(map(lambda x: allFuncs[x]["size"], allFuncs))

# process assembly files from each commit
for c in commits:

    print("Processing commit #", commitNum, c, str(round(commitNum / len(commits) * 100, 2)) + "%")

    commitHash = str(c)
    if commitHash in cache and commitNum != len(commits):
        timechartData.append(cache[commitHash])
        commitNum += 1
        continue

    repo.git.checkout(c)

    asmFiles = Path(decompPath + "/asm").rglob("*.s")

    gameFuncs = getGameFunctions()
    notDoneFuncs = {}

    for asm in asmFiles:

        asmText = open(asm).read()
        asmAddresses = getAsmAddresses(asmText)

        # search functions which haven't been found already
        for addr in list(gameFuncs.keys()):
            # see if it's in this file
            if addr in asmAddresses:
                notDoneFuncs[addr] = gameFuncs[addr]
                del gameFuncs[addr]
    
    functionsDone = len(gameFuncs)
    linesDone = sum(map(lambda x: gameFuncs[x]["size"], gameFuncs))

    timechartData.append({
        "commit": str(c),
        "time": c.authored_date,
        "linesTotal": linesTotal,
        "linesDone": linesDone,
        "functionsTotal": functionsTotal,
        "functionsDone": functionsDone
    })

    # is this the most recent commit?
    # if so, generate file heatmap
    if commitNum == len(commits):
        print("TODO: generate heatmap file")

    commitNum += 1

exportTimeChart(timechartData, cache=False)

#open("dump.json", "w").write(json.dumps(timechartData, indent=4))
#open("progressCache.json", "w").write(json.dumps(timechartData, indent=4))
# timechartData = formattimechartData(timechartData)
# timechart = open("../data/timechart.js", "w")
# timechart.write("export const timeSeries = ")
# timechart.write(json.dumps(timechartData, indent=4))
# open("../data/info.js", "w").writelines(["export default ", json.dumps(info, indent=4)])