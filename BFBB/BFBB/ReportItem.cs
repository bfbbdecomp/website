using System.Text.Json.Serialization;

namespace BFBB;

public record ReportItem(
    string Name,
    string? DemangledName,
    string? Address,
    long Size,
    float FuzzyMatchPercent,
    [property: JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
    AsmInfo? AsmInfo
);