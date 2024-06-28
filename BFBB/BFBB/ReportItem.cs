namespace BFBB;

public record ReportItem(
    string Name,
    string? DemangledName,
    string? Address,
    long Size,
    float FuzzyMatchPercent
);