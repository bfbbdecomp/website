using System.Text.Json.Serialization;

namespace BFBB;

public record ReportItem(
    // Objdiff report properties
    string Name,
    string? DemangledName,
    string? Address,
    long Size,
    float FuzzyMatchPercent,

    // Additional BFBB ASM related properties
    HashSet<string>? Opcodes,
    int? Labels
);