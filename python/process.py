from pathlib import Path
from git import Repo
from api import writeApi
from files import writeFiles
from commits import getCommitData, writeCommitData
from helpers import diffToLines, exportJS, getFunctionDict, lineToChangeObject, makeDirectory

# Change these parameters
decompPath = "../../bfbbdecomp/"
beginAtCommit = "b99478c01b"

# The files that match the paths in this list
# will be checked for assembly differences
relevantPaths = [
    "asm/Core/**",
    "asm/Game/**",
]

# '^' includes the commit
commitRange = beginAtCommit + "^" + ".." + "HEAD"


def process():

    makeDirectory("../dist/")
    makeDirectory("../data/")

    repo = Repo(Path(decompPath))
    commitData, commitLookup = getCommitData(repo)

    # get a range of commits which include assembly changes
    commits = repo.iter_commits(rev=commitRange,
                                paths=relevantPaths,
                                reverse=True)

    # pre-computed of all of our functions
    # This can be cached in the future if needed.
    functions = getFunctionDict()

    for c in commits:
        if not c.parents:
            continue
        parent = c.parents[-1]

        commitHash = str(c)
        commitID = commitLookup[commitHash]
        print(commitID + 1, commitHash)

        # limit diffs to check to only diffs that modified assembly code
        diffs = parent.diff(c, create_patch=True, paths=relevantPaths)

        # iterate through each assembly file changed
        for diff in diffs:
            changes = map(lineToChangeObject, diffToLines(diff))

            # iterate through each modified assembly line
            for change in changes:
                address = change["address"]
                if address not in functions:
                    continue

                # Okay, we found a function that was added/deleted.
                # If it was deleted, store the commit number.
                # otherwise, let's make it None as if it was never done.
                # Note: this also relies on the assumption that
                # deletions of a line are processed before insertions of the same line.
                removedAt = None
                if change["delete"]:
                    removedAt = commitID
                functions[address]["commit"] = removedAt

    writeApi(functions)
    writeCommitData(commitData)
    writeFiles()
    open("../data/functions.js",
         "w").write(exportJS({
             "FUNCTIONS": functions  #
         }))


process()
