import argparse
import glob
from pathlib import Path
import json
from asm import *
import csv


"""
This is an ugly throw-away script.
The point is to get all of the functions from one of the earlier commits
and information about which files they were in, size, etc.

In order to compare the current version of the repo against the version
where all of the assembly functions were present.

The whole point of this was to generate the funcs.csv file

"""

parser = argparse.ArgumentParser()
parser.add_argument("decompPath")

# args = parser.parse_args()
# print(args)
path = Path("../bfbbdecomp/asm/")

#files = filter(lambda f: "Core" in str(f) or "Game" in str(f), path.rglob("*.s"))
#files = filter(lambda f: "Core" not in str(f) and "Game" not in str(f), path.rglob("*.s"))
files = path.rglob("*.s")

funcDict = {}

for f in files:
    asm = text(f)
    print(f)
    if asm == None:
        continue
    funcs = getFunctions(asm)
    for x in funcs:
        n = getFunction(asm, x)
        addr = functionAddress(n)
        count = functionLen(n)
        end = endAddress(n)
        diff = (int(end, 16) - int(addr, 16)) // 4 + 1
        if diff != count:
            print("ERROR: DIFF != COUNT", diff, count, addr, f)
            exit(69)
        #print(addr, end, count, diff)
        if addr not in funcDict:
            funcDict[addr] = {
                "lines": count,
                "file": str(f).replace(str(path), "").replace("\\","/")
            }
        else:
            print("EERROR", addr, "ALREADY IN FUNC DICT")
            exit(69)

# print(funcDict)

#open("funcs.json", "w").write(json.dumps(funcDict, indent=4, sort_keys=True))

out = []

for key in funcDict:
    info = funcDict[key]
    out.append([key,info["lines"],info["file"]])

out.sort(key=lambda x: int(x[0], 16))

#print(len(out))
#print(sum(map(lambda x: x[1], out)))

with open("funcs.csv", "w") as csv:
    for func in out:
        csv.write(','.join(map(str, func)) + "\n")
