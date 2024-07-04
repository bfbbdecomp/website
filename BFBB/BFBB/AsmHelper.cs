using System.Text.RegularExpressions;

namespace BFBB;

public abstract class AsmHelper
{
    public static List<AsmFunction> ParseFile(string filePath)
    {
        var text = File.ReadAllText(filePath);
        string pattern = @"\.fn\s+(.*?),(?=[^,]*?\n)((?:.*\n)*?)\.endfn\s+\1";
        Regex regex = new Regex(pattern, RegexOptions.Multiline);
        var allMatches = regex.Matches(text);

        var functions = new List<AsmFunction>();

        foreach (Match match in allMatches)
        {
            var name = match.Groups[1].Value.Replace("\"", "");
            var functionBody = match.Groups[2].Value
                .Trim()
                .Split(Environment.NewLine)
                .ToList();

            var contents = functionBody
                .Where(x => x.StartsWith("/*")) // only want code lines 
                .Select(x => x.Split("\t")[1])
                .ToList();

            var numBranches = functionBody.Count(x => x.StartsWith("."));

            functions.Add(new AsmFunction(name, numBranches, contents));
        }

        return functions;
    }
}