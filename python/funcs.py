def getCommitSet(funcs):
    commits = set()
    for key in funcs:
        c = funcs[key]["commit"]
        if c:
            commits.add(c)
    return sorted(list(commits))


def getInfoAtCommit(funcs, commit):
    linesAsm = 0
    linesDone = 0
    funcsTotal = 0
    funcsDone = 0
    for key in funcs:
        f = funcs[key]
        ls = f["lines"]
        linesAsm += ls
        funcsTotal += 1
        c = f["commit"]
        if c is not None and c < commit:
            funcsDone += 1
            linesDone += ls
    return {
        "linesASM": linesAsm,
        "linesDone": linesDone,
        "funcsTotal": funcsTotal,
        "funcsDone": funcsDone
    }
