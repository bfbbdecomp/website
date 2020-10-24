

from formatData import formatTimechartData
import json

def exportTimeChart(timechartData, cache=False):
    if cache:
        open("cache/timeline.json", "w").write(json.dumps(timechartData, indent=4))
    timechartData = formatTimechartData(timechartData)
    timechart = open("../data/timechart.js", "w")
    timechart.write("export const timeSeries = ")
    timechart.write(json.dumps(timechartData, indent=4))