import json
import os
from pathlib import Path


def exportJS(objs):
    output = ""
    for key in objs:
        output += "export const "
        output += key + " = "
        output += json.dumps(objs[key], indent=2)
        output += ";\n"
    return output


def makeDirectory(dir):
    if not os.path.exists(Path(dir)):
        os.makedirs(Path(dir))


def getFunctionDict():
    funcs = open("json/functions.json", "r").read()
    return json.loads(funcs)


def isAddress(string):
    return len(string) == 8


def isAsmCode(line):
    data = line.split()

    if len(data) < 2:
        return False

    first = data[0]

    if first != "-/*" and first != "+/*":
        return False

    return isAddress(data[1])


def diffToLines(diffObject):
    text = diffObject.diff.decode("utf-8")
    return filter(isAsmCode, map(lambda x: x.strip(), text.splitlines()))


# Takes a line of assembly and returns an object
# containing the address and whether it was removed or added.
def lineToChangeObject(line):
    info = line.split()
    char = info[0][0]
    address = info[1]
    change = {
        "address": address,
        "delete": char == "-"  # was this deleted or added?
    }
    return change