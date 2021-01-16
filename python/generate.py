from os.path import supports_unicode_filenames
from symbols import getSymbols
import json

gameCodeBegin = 0x800058E0
gameCodeEnd = 0x80196880


def isGameFunction(symbol):
    if symbol["type"] != "FUNC":
        return False
    addr = int(symbol["address"], 16)
    return addr >= gameCodeBegin and addr < gameCodeEnd


"""
The purpose of this function is to generate
an initial "functions.json" file.

This file will act like a database that
holds basic information about
each function in the game's code.

the progress script will use this dictionary
and update the function with a commit number
if it was found to be decompiled.
"""


def createFunctionsFile():

    funcDict = {}

    funcs = list(filter(isGameFunction, getSymbols()))

    for f in funcs:
        address = f["address"]
        info = {
            "commit": None,  # commit that this was decompiled in.
            "lines": f["size"],  # lines of code
            "name": f["name"],  # the name of the function
        }
        funcDict[address] = info

    open("json/functions.json", "w").write(json.dumps(funcDict, indent=2))


# createFunctionsFile()