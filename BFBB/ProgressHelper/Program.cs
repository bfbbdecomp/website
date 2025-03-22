using BFBB;
using Discord.Webhook;
using ProgressHelper;

var inputPath = args[0];
var outPath = args[1];

var progress = $"{inputPath}progress.json";
var asmInfoText = File.ReadAllText($"{inputPath}asminfo.json");

var report = JsonHelper.ReadReport(progress);
var asmInfo = JsonHelper.Deserialize<List<AsmInfo>>(asmInfoText);

var i = 0;
// Add opcode and label information about each function
var reportItems = report.Units.SelectMany(reportUnit => reportUnit.Functions ?? []).ToList();
foreach (var fn in reportItems)
{
    fn.Opcodes = asmInfo.FirstOrDefault(info => info.Name == fn.Name)?.Opcodes ?? null;
    fn.Labels = asmInfo.FirstOrDefault(info => info.Name == fn.Name)?.Labels ?? null;
}

var outProgressJson = JsonHelper.Serialize(report);

var outApiJson = JsonHelper.Serialize(new
{
    report.MatchedCode,
    report.MatchedData,
    report.MatchedFunctions,
    report.TotalCode,
    report.TotalData,
    report.TotalFunctions,
    report.MatchedCodePercent,
    report.MatchedDataPercent,
    report.MatchedFunctionsPercent,
    report.FuzzyMatchPercent,
    PerfectMatch = report.MatchedCodePercent.ToString("0.00") + "%",
    FuzzyMatch = report.FuzzyMatchPercent.ToString("0.00") + "%",
    FunctionsMatched = report.MatchedFunctionsPercent.ToString("0.00") + "%"
});

File.WriteAllText($"{outPath}/progress.json", outProgressJson);
File.WriteAllText($"{outPath}../public/api.json", outApiJson);

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
            x => new Difference(x.NewItem.Metadata.VirtualAddress, x.NewItem.FuzzyMatchPercent,
                x.OldItem.FuzzyMatchPercent)
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

    var webhook = Environment.GetEnvironmentVariable("DISCORD_WEBHOOK");

    // Don't crash workflow if we can't send this
    try
    {
        if (webhook != null)
        {
            var client = new DiscordWebhookClient(webhook);

            var user = users.FirstOrDefault(x => x.Emails.Any(e => e.ToLower() == progressCommitData.Email.ToLower()));

            List<string> messages = [];

            var fuzzyDiff = report.FuzzyMatchPercent - previousReport.FuzzyMatchPercent;

            if (fuzzyDiff != 0)
            {
                var sign = fuzzyDiff > 0 ? "+" : "";
                var addedCode = fuzzyDiff * report.TotalCode / 100;
                var totalCode = report.FuzzyMatchPercent * report.TotalCode / 100;
                messages.Add(
                    $"BFBB is [**{report.FuzzyMatchPercent:F2}%**](<https://bfbbdecomp.github.io/bfbb/>) decompiled. `({sign}{fuzzyDiff:F2}% {sign}{addedCode:N0}), {totalCode:N0} / {report.TotalCode:N0}`");
                messages.Add("");
            }

            var commitLink =
                $"[{progressCommitData.Id.Substring(0, 7)}](<https://github.com/bfbbdecomp/bfbb/commit/{progressCommitData.Id}>)";
            messages.Add(user != null
                ? $"<@{user.Discord}> just contributed the following in {commitLink}:"
                : $"Someone just contributed the following in {commitLink}:");

            //messages.Add("```");
            var adds = differences
                .OrderByDescending(x =>
                    (x.NewItem.FuzzyMatchPercent - x.OldItem.FuzzyMatchPercent) * long.Parse(x.NewItem.Size))
                .Select(diff =>
                {
                    var name = diff.NewItem.Metadata.DemangledName.Split("(")[0];
                    var diffPercent = diff.NewItem.FuzzyMatchPercent - diff.OldItem.FuzzyMatchPercent;
                    var diffDir = diffPercent > 0 ? "+" : "";
                    var total = diff.NewItem.FuzzyMatchPercent;
                    var linesOfCode = Math.Round(diffPercent * long.Parse(diff.NewItem.Size) / 100);
                    var msg = $"`{name} -> ({diffDir}{diffPercent:F2}%, {diffDir}{linesOfCode:N0}) -> {total:F2}%`";

                    if (total == 100)
                    {
                        msg += " :white_check_mark:";
                    }

                    return msg;
                }).ToList();

            messages.AddRange(adds.Take(10));

            if (adds.Count > 10)
            {
                messages.Add($"and {adds.Count} more...");
            }

            var message = string.Join(Environment.NewLine, messages);
            await client.SendMessageAsync(message);

            // send a special message if we hit a new milestone
            var fuzzNew = Math.Floor(report.FuzzyMatchPercent);
            var fuzzOld = Math.Floor(previousReport.FuzzyMatchPercent);
            if (!fuzzNew.Equals(fuzzOld))
            {
                await client.SendMessageAsync($":champagne_glass: **We just hit {fuzzNew}% Fuzzy Match!** :tada:");
            }

            // send a special message if we hit a new milestone
            var perfectNew = Math.Floor(report.MatchedCodePercent);
            var perfectOld = Math.Floor(previousReport.MatchedCodePercent);
            if (!perfectNew.Equals(perfectOld))
            {
                await client.SendMessageAsync($":champagne_glass: **We just hit {perfectNew}% Perfect Match!** :tada:");
            }
        }
    }
    catch (Exception e)
    {
        Console.WriteLine(e.Message);
    }
}