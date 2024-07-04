using BFBB;

var inputFile = args[0];
var outPath = args[1];

var progress = File.ReadAllText(inputFile);

var report = JsonHelper.Deserialize<Report>(progress);

var gameReport =
    new Report(Units: report.Units
        .Where(x => x.Name.Contains("/sb/", StringComparison.CurrentCultureIgnoreCase))
        .ToList());

var outProgressJson = JsonHelper.Serialize(gameReport);
var outAPIJson = JsonHelper.Serialize(new
{
    gameReport.MatchedCode,
    gameReport.MatchedData,
    gameReport.MatchedFunctions,
    gameReport.TotalCode,
    gameReport.TotalData,
    gameReport.TotalFunctions,
    gameReport.MatchedCodePercent,
    gameReport.MatchedDataPercent,
    gameReport.MatchedFunctionsPercent,
    gameReport.FuzzyMatchPercent,
    PerfectMatch = gameReport.MatchedCodePercent.ToString("0.00") + "%",
    FuzzyMatch = gameReport.FuzzyMatchPercent.ToString("0.00") + "%",
    FunctionsMatched = gameReport.MatchedFunctionsPercent.ToString("0.00") + "%"
});


File.WriteAllText($"{outPath}/progress.json", outProgressJson);
File.WriteAllText($"{outPath}../public/api.json", outAPIJson);