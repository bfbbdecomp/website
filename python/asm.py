import re

instructionRegex = r"\/\*\s([0-9a-fA-F]{8})\s"

def sectionName(line):
    return line.split()[1]

def text(path):
    asm = parseAsm(path)
    if ".text" in asm:
        return asm[".text"]
    return None

labelRegex = r"(.*):"

def functionAddress(func):
    for line in func:
        match = re.match(instructionRegex, line)
        if match:
            return match[1]

def endAddress(func):
    latest = None
    for line in func:
        match = re.match(instructionRegex, line)
        if match:
            latest = match
    return match[1]


def functionLen(func):
    return len(list(filter(lambda x: re.match(instructionRegex, x), func)))

def getFunction(text, label):
    data = []
    inFunc = False
    for line in text.splitlines():
        if label == line:
            inFunc = True
        if inFunc:
            if line.strip():
                data.append(line)
            else:
                break
    return data

def getFunctions(text):
    funcs = []
    lines = text.splitlines()
    inFunc = False
    for l in lines:
        match = re.match(labelRegex, l)
        if match and "lbl_" not in match[1]:
            funcs.append(match[0])
    return funcs

def parseAsm(filepath):
    data = open(filepath).readlines()
    sections = {}
    name = None
    for line in data:
        if ".section" in line:
            name = sectionName(line)
            sections[name] = [line]
            continue
        if name != None:
            sections[name].append(line)
    for s in sections:
        sections[s] = ''.join(sections[s])
    return sections