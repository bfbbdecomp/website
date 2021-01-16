from pathlib import Path
from git import Repo
from helpers import diffToLines

# Change these parameters
decompPath = "../../bfbbdecomp/"
beginAtCommit = "b99478c01b"

# The files that match the paths in this list
# will be checked for assembly differences
relevantPaths = [
    "asm/Core/**/*",
    "asm/Game/**/*",
]

# '^' includes the commit
commitRange = beginAtCommit + "^" + ".." + "HEAD"


def process():

    # Open the Decomp code repository
    repo = Repo(Path(decompPath))

    # get a list of our commits
    # paths="*.s"
    commits = repo.iter_commits(rev=commitRange,
                                paths=relevantPaths,
                                reverse=True)

    for c in commits:
        if not c.parents:
            continue

        parent = c.parents[-1]
        print(c, c.count())

        diffs = parent.diff(c, create_patch=True, paths=relevantPaths)

        for diff in diffs:
            result = list(diffToLines(diff))
            for r in result:
                pass
                #print(r)


process()
