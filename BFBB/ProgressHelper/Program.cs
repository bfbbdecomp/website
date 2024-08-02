using System.Net;
using BFBB;
using Discord.Webhook;
using ProgressHelper;

var inputPath = args[0];
var outPath = args[1];

var progress = $"{inputPath}progress.json";
var asmInfoText = File.ReadAllText($"{inputPath}asminfo.json");

var report = JsonHelper.ReadReport(progress);
var asmInfo = JsonHelper.Deserialize<List<AsmInfo>>(asmInfoText);

var gameReport =
    new Report(Units: report.Units
        .Select(unit => unit with
        {
            Functions = unit.Functions.Select(fn => fn with
            {
                Opcodes = asmInfo.FirstOrDefault(info => info.Name == fn.Name)?.Opcodes ?? null,
                Labels = asmInfo.FirstOrDefault(info => info.Name == fn.Name)?.Labels ?? null,
            }).ToList()
        })
        .ToList());

List<string> sampleUnits = ["zEntPlayer"];

var tsSample = gameReport with
{
    Units = gameReport.Units.Where(
        x => sampleUnits.Any(u => x.Name.Contains(u))
    ).ToList()
};

var sampleJson = JsonHelper.Serialize(tsSample);

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
File.WriteAllText($"{outPath}/sample.json", sampleJson);
File.WriteAllText($"{outPath}../public/api.json", outAPIJson);

// Check to see if there are any differences between the current and previous commit
// If there are, update the commit cache, so it can be added to the repo

var previous = $"{inputPath}previous.json";
var progressCommit = File.ReadAllText($"{inputPath}progress-commit.json");
var commitCachePath = $"{inputPath}../json/commits.json";
var usersPath = $"{inputPath}../json/users.json";
var users = JsonHelper.Deserialize<List<User>>(File.ReadAllText(usersPath));
var commitCache = File.ReadAllText(commitCachePath);

var previousReport = JsonHelper.ReadReport(previous);
var commits = JsonHelper.Deserialize<List<Commit>>(commitCache);
var progressCommitData = JsonHelper.Deserialize<Commit>(progressCommit);
var differences = DiffHelper.GetReportDifferences(report, previousReport);

if (differences.Count != 0)
{
    progressCommitData = progressCommitData with
    {
        Differences = differences.Select(
            x => new Difference(x.NewItem.Address, x.NewItem.FuzzyMatchPercent, x.OldItem.FuzzyMatchPercent)
        ).ToList()
    };


    // Only add the commit if it isn't already in the cache.
    // We don't want to add it multiple times if we re-run the action
    if (commits.All(x => x.Id != progressCommitData.Id))
    {
        commits.Add(progressCommitData);
        commits = commits.OrderByDescending(x => x.Time).ToList();
        File.WriteAllText(commitCachePath, JsonHelper.Serialize(commits));
    }

    // TODO: discord update
    foreach (var diff in differences)
    {
        Console.WriteLine(diff.NewItem.Name);
    }

    Console.WriteLine(report.FuzzyMatchPercent);
    Console.WriteLine(previousReport.FuzzyMatchPercent);
    Console.WriteLine(progressCommitData);

    var webhook = Environment.GetEnvironmentVariable("DISCORD_WEBHOOK");
    var client = new DiscordWebhookClient(webhook);

    var user = users.FirstOrDefault(x => x.Emails.Any(e => e.ToLower() == progressCommitData.Email.ToLower()));

    List<string> messages = [];

    var fuzzyDiff = report.FuzzyMatchPercent - previousReport.FuzzyMatchPercent;

    if (fuzzyDiff != 0)
    {
        var sign = fuzzyDiff > 0 ? "+" : "-";
        var addedCode = fuzzyDiff * report.TotalCode / 100;
        var totalCode = report.FuzzyMatchPercent * report.TotalCode / 100;
        messages.Add(
            $"BFBB is [**{report.FuzzyMatchPercent:F2}%**](<https://bfbbdecomp.github.io/bfbb/>) decompiled. ({sign}{fuzzyDiff:F2}% {sign}{addedCode:N0}) {totalCode:N0} / {report.TotalCode:N0}. ");
    }

    var commitLink =
        $"[{progressCommitData.Id.Substring(0, 7)}](<https://github.com/bfbbdecomp/bfbb/commit/{progressCommitData.Id}>)";
    messages.Add(user != null
        ? $"<@{user.Discord}> just contributed the following in {commitLink}:"
        : $"Someone just contributed the following in {commitLink}:");

    messages.Add("```");
    var adds = differences
        .OrderByDescending(x => x.NewItem.FuzzyMatchPercent - x.OldItem.FuzzyMatchPercent)
        .Where(diff => diff.NewItem.DemangledName != null).Select(diff =>
        {
            var name = diff.NewItem.DemangledName!.Split("(")[0];
            var diffPercent = diff.NewItem.FuzzyMatchPercent - diff.OldItem.FuzzyMatchPercent;
            var diffDir = diffPercent > 0 ? "+" : "-";
            var total = diff.NewItem.FuzzyMatchPercent;
            var linesOfCode = Math.Round(diffPercent * diff.NewItem.Size / 100);
            return $"{name} -> ({diffDir}{diffPercent:F2}%, {linesOfCode:N0}) -> Total: {total:F2}% ";
        }).ToList();

    messages.AddRange(adds.Take(20));

    if (adds.Count > 20)
    {
        messages.Add($"and {adds.Count} more...");
    }

    messages.Add("```");

    var message = string.Join(Environment.NewLine, messages);
    await client.SendMessageAsync(message);
}