namespace BFBB;

public record ReportUnit(
    string Name,
    float FuzzyMatchPercent,
    long TotalCode,
    long MatchedCode,
    long TotalData,
    long MatchedData,
    int TotalFunctions,
    int MatchedFunctions,
    bool? Complete,
    string? ModuleName,
    int? ModuleId,
    List<ReportItem> Sections,
    List<ReportItem> Functions
);