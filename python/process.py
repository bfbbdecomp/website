from pathlib import Path
from git import Repo
from helpers import diffToLines, getFunctionDict, lineToChangeObject

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
    repo = Repo(Path(decompPath))

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

        commitNumber = c.count()
        print(commitNumber, c)

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
                    removedAt = commitNumber
                functions[address]["commit"] = removedAt


# TODO: do something with our calculated data.

process()
