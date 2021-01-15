from pathlib import Path
from git import Repo
from helpers import analyzeDiff

# Change these parameters
decompPath = "../../bfbbdecomp/"
beginAtCommit = "b99478c01b"

# The files that match the paths in this list
# will be checked for assembly differences
relevantPaths = [
    "asm/Core/**/*",
    "asm/Game/**/*",
]


commitRange = beginAtCommit + ".." + "HEAD"


def process():

    # Open the Decomp code repository
    repo = Repo(Path(decompPath))

    # get a list of our commits
    # paths="*.s"
    commits = repo.iter_commits(
        rev=commitRange,
        paths=relevantPaths,
        reverse=True
    )

    i = 1
    for c in commits:
        if not c.parents:
            continue

        parent = c.parents[-1]
        print(c, c.count(), i)
        i += 1

        diffs = parent.diff(
            c,
            create_patch=True,
            paths=relevantPaths
        )

        for diff in diffs:
            result = analyzeDiff(str(diff.diff))
            print(result)

        break


process()
