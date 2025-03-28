using System.Text.Json;
using System.Text.Json.Serialization;

namespace BFBB;

public abstract class JsonHelper
{
    private static readonly JsonSerializerOptions ParseOptions = new()
    {
        PropertyNamingPolicy = JsonNamingPolicy.SnakeCaseLower,
        PropertyNameCaseInsensitive = true,
        DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull,
        WriteIndented = true
    };

    public static T Deserialize<T>(string json)
    {
        return JsonSerializer.Deserialize<T>(json, ParseOptions)!;
    }

    public static string Serialize<T>(T item)
    {
        return JsonSerializer.Serialize(item, ParseOptions);
    }

    public static Report ReadReport(string path)
    {
        var report = Deserialize<Objdiff.Report>(File.ReadAllText(path));

        // We only care about SpongeBob code
        report.Units = report.Units
            .Where(unit => unit.Name.Contains("/sb/", StringComparison.CurrentCultureIgnoreCase))
            .ToList();

        return new Report(report.Units, report.Version, report.Categories);
    }
}