from helpers import getGameFunctions

funcs = getGameFunctions()

f = map(lambda x: funcs[x]["size"], funcs)
print(sum(f))