import sys
import json


inputFile = sys.argv[1]
outPath = sys.argv[2]

print(inputFile)
print(outPath)

progressData = json.loads(open(inputFile, "r").read())
progressData["units"] = list(filter(lambda x: "/sb/" in x["name"].lower(), progressData["units"]))

open(outPath + "progress.json", 'w').write(json.dumps(progressData, indent=4))