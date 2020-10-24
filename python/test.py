from helpers import getGameFunctions

funcs = getGameFunctions()
tot = 0
for f in funcs:
    tot += funcs[f]["size"]

print(tot)
print(len(funcs), "functions")