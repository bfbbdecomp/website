import json
from helpers import exportJS


def writeFiles():
    files = json.load(open("json/files.json", "r"))
    js = exportJS({
        "FILES": files,
    })
    open("../data/files.js", "w").write(js)
