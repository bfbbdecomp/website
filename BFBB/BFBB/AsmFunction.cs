using System.Text.Json.Serialization;

namespace BFBB;

public record AsmFunction(
    string Name,
    int NumberOfLabels,
    List<string> Lines
)
{
    public HashSet<string> Opcodes = Lines.Select(x => x.Split(" ").First()).ToHashSet();
};

public record AsmInfo(string Name, int Referenced, int Labels, HashSet<string> Opcodes);