import requests
import os
from funcs import getInfoAtCommit
from math import floor

template = """
```
Battle for Bikini Bottom is {donePercent}% decompiled
{asmDone} / {asmTotal} lines of assembly. ({asmPercent}%) +{newLines}
{funcsDone} / {funcsTotal} functions. ({funcPercent}%) +{newFuncs}
```
""".strip()

newPercent = """
:spongescream:
**WE HIT {percent}%!!!**
:SpongeNut:
""".strip()

payload = {
    "username": "OK",
    "avatar_url": "https://i.imgur.com/YpjX7W3.png",
}


def formatMessage(info):
    msg = template
    for key in info:
        msg = msg.replace("{" + key + "}", str(info[key]))
    return msg


def f(number):
    return "{:,}".format(number)


def processDiscordInfo(functions, commit):
    url = os.environ.get("OK_WEBHOOK")
    if not url:
        print("Environment Variable 'OK_WEBHOOK' not set.")
        return
    print("Processing discord info for commit", commit)
    current = getInfoAtCommit(functions, commit)
    previous = getInfoAtCommit(functions, commit - 1)

    # we only care if there's a difference
    if current != previous:
        asmDone = current["linesDone"]
        asmTotal = current["linesASM"]
        funcsDone = current["funcsDone"]
        funcsTotal = current["funcsTotal"]
        asmPercent = round(asmDone / asmTotal * 100, 2)
        funcPercent = round(funcsDone / funcsTotal * 100, 2)
        newLines = f(asmDone - previous["linesDone"])
        newFuncs = f(funcsDone - previous["funcsDone"])
        msg = formatMessage({
            "asmDone": f(asmDone),
            "asmTotal": f(asmTotal),
            "funcsDone": f(funcsDone),
            "funcsTotal": f(funcsTotal),
            "donePercent": asmPercent,
            "asmPercent": asmPercent,
            "funcPercent": funcPercent,
            "newLines": newLines,
            "newFuncs": newFuncs
        })
        payload["content"] = msg
        print(payload)
        requests.post(url, payload)

        # post new percent message
        nowPercent = floor(asmPercent)
        prevPercent = floor(previous["linesDone"] / previous["linesASM"] * 100)
        if nowPercent > prevPercent:
            payload["content"] = newPercent.replace("{percent}",
                                                    str(nowPercent))
            requests.post(url, payload)
            print(payload)
    else:
        print("Nothing new in this commit...")