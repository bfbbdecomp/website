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
