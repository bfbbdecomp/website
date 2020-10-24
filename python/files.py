import json

def getFileInfo():
    return json.loads(open("fileInfo.json").read())