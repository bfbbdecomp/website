// See https://aka.ms/new-console-template for more information

using BFBB;
using LibGit2Sharp;
using Commit = BFBB.Commit;

var repo = new Repository("../bfbb");
var files = Directory.GetFiles("./parsed/artifacts");

var commits = repo.Commits.ToList();
var pairs = commits.Zip(commits.Skip(1), (newCommit, oldCommit) => (newCommit, oldCommit)).ToList();

var commitData = new List<Commit>();

foreach (var (newCommit, oldCommit) in pairs)
{
    var newPath = files.FirstOrDefault(x => x.Contains(newCommit.Id.ToString()));
    var oldPath = files.FirstOrDefault(x => x.Contains(oldCommit.Id.ToString()));
    if (newPath == null || oldPath == null) continue;

    var newReport = JsonHelper.ReadReport(newPath);
    var oldReport = JsonHelper.ReadReport(oldPath);

    var differences = DiffHelper
        .GetReportDifferences(newReport, oldReport)
        .Select(x => new Difference(x.NewItem.Metadata.DemangledName, x.NewItem.FuzzyMatchPercent,
            x.OldItem.FuzzyMatchPercent))
        .ToList();

    if (differences.Count > 0)
    {
        commitData.Add(new Commit(newCommit.Id.ToString(), newCommit.Author.Email, newCommit.Author.When.DateTime,
            newCommit.MessageShort,
            differences));
    }
}

commitData = commitData
    .Where(x => x.Time > new DateTime(2024, 6, 22))
    .OrderByDescending(x => x.Time)
    .ToList();

Console.WriteLine(commitData.Count);
File.WriteAllText("commits.json", JsonHelper.Serialize(commitData));

var names = commitData.Select(x => x.Email).ToHashSet();

foreach (var name in names.OrderBy(x => x))
{
    Console.WriteLine(name);
}

/*
var report = JsonHelper.ReadReport(files.First(x => x.Contains(commits[0].Id.ToString())));
Console.WriteLine(report.Units.Count);
var fns = report.Units
    .SelectMany(x => x.Functions)
    .Where(x => x.Size == 8)
    .Where(x => x.FuzzyMatchPercent == 100)
    .Where(x => x.DemangledName != null);

foreach (var reportItem in fns.OrderBy(x => x.DemangledName))
{
    Console.WriteLine(reportItem.DemangledName);
}
*/