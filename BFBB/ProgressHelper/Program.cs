using BFBB;

var inputPath = args[0];
var outPath = args[1];

var progress = File.ReadAllText($"{inputPath}progress.json");
var asmInfoText = File.ReadAllText($"{inputPath}asminfo.json");

var report = JsonHelper.Deserialize<Report>(progress);
var asmInfo = JsonHelper.Deserialize<List<AsmInfo>>(asmInfoText);

var gameReport =
    new Report(Units: report.Units
        .Where(unit => unit.Name.Contains("/sb/", StringComparison.CurrentCultureIgnoreCase))
        .Select(unit => unit with
        {
            Functions = unit.Functions.Select(fn => fn with
            {
                Opcodes = asmInfo.FirstOrDefault(info => info.Name == fn.Name)?.Opcodes ?? null,
                Labels = asmInfo.FirstOrDefault(info => info.Name == fn.Name)?.Labels ?? null,
            }).ToList()
        })
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
