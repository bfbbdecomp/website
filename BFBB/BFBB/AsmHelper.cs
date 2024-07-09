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

    public static List<AsmObject> ParseFloats(string filePath)
    {
        var text = File.ReadAllText(filePath);
        string pattern = "\\.obj (.*?), local\\n((?:.*\\n)*?).endobj \\1";
        Regex regex = new Regex(pattern, RegexOptions.Multiline);
        var allMatches = regex.Matches(text);

        List<AsmObject> asmObjects = [];

        foreach (Match match in allMatches)
        {
            var name = match.Groups[1].Value;
            if (!name.Contains('@'))
            {
                continue;
            }

            var values = match.Groups[2].Value.Trim().Split(Environment.NewLine);
            if (values.Length == 1 && values.Any(x => x.Contains(".float")))
            {
                asmObjects.Add(new AsmObject(name, values));
            }
        }

        return asmObjects;
    }

    /// <summary>
    /// Calculate how many times a function is called across assembly code
    /// </summary>
    public static Dictionary<string, int> ReferenceCount(List<AsmFunction> asmFunctions, List<string> names)
    {
        var counts = new Dictionary<string, int>();

        foreach (var fn in asmFunctions)
        {
            foreach (var name in names)
            {
                var count = fn.Lines.Count(x => x.Contains(name));
                if (!counts.TryAdd(name, count))
                {
                    counts[name] += count;
                }
            }
        }

        return counts;
    }
}


public record AsmObject(string Name, string[] Values);