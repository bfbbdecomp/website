import json

from helpers import exportJS


def getCommitData(repo):
    data = []
    lookup = {}
    i = 0
    for commit in repo.iter_commits(reverse=True):
        data.append({
            "hash": str(commit),
            "time": commit.committed_date,
            # TODO: "author": commit.author.email,
            "id": i + 1
        })
        lookup[str(commit)] = i
        i += 1
    return (data, lookup)


def writeCommitData(data):
    open("../data/commits.js", "w").write(exportJS({
        "COMMITS": data  #
    }))