from pathlib import Path
from git import Repo
from helpers import diffToLines

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

    # Open the Decomp code repository
    repo = Repo(Path(decompPath))

    # get a range of commits which include assembly changes
    commits = repo.iter_commits(rev=commitRange,
                                paths=relevantPaths,
                                reverse=True)

    for c in commits:

        if not c.parents:
            continue

        parent = c.parents[-1]

        # limit diffs to check to only diffs that modified assembly code
        diffs = parent.diff(c, create_patch=True, paths=relevantPaths)

        if len(diffs) > 0:
            print(c, c.count())

        for diff in diffs:
            result = list(diffToLines(diff))


process()
