import sys
import json


inputFile = sys.argv[1]
outPath = sys.argv[2]

progressData = json.loads(open(inputFile, "r").read())
progressData["units"] = list(filter(lambda x: "/sb/" in x["name"].lower(), progressData["units"]))

def total(key):
    return sum(map(lambda x: x[key], progressData["units"]))

def percent(keyA, keyB):
    dividend = total(keyA)
    divisor = total(keyB)
    if (divisor == 0):
       return 100
    return dividend / divisor * 100

# we need to recalculate the grand totals since we filtered out many units
progressData["fuzzy_match_percent"] = sum(map(lambda x: x["fuzzy_match_percent"] * x["total_code"], progressData["units"])) / total("total_code")
progressData["total_code"] = total("total_code")
progressData["matched_code"] = total("matched_code")
progressData["matched_code_percent"] = percent("matched_code", "total_code")
progressData["total_data"] = total("total_data")
progressData["matched_data"] = total("matched_data")
progressData["matched_data_percent"] = percent("matched_data", "total_data")
progressData["total_functions"] = total("total_functions")
progressData["matched_functions"] = total("matched_functions")
progressData["matched_functions_percent"] = percent("matched_functions", "total_functions")

open(outPath + "progress.json", 'w').write(json.dumps(progressData, indent=4))