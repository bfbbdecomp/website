
def isAsmCode(line):
    print(line.split(" "))
    print(line)


def analyzeDiff(diff):
    print(type(diff))
    diffLines = diff.splitlines()

    for line in diffLines:
        print(isAsmCode(line))

    return None
