import json

def addressToInt(address):
    return int(address, 16)

def getFileInfo():
    return json.loads(open("fileInfo.json").read())

def getFunctionFile(files, address):
    address = addressToInt(address)
    for f in files:
        name = f["name"]
        start = addressToInt(f["start"])
        end = addressToInt(f["end"])
        if address >= start and address < end:
            return name
    return None