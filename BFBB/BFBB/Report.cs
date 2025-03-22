using BFBB.Objdiff;

namespace BFBB;

public record Report(
    List<ReportUnit> Units, // Units within this report
    uint Version, // Report version
    List<ReportCategory> Categories // Progress categories
)
{
    public long TotalCode => Units
        .Where(x => x.Measures.TotalCode != null)
        .Select(x => long.Parse(x.Measures.TotalCode!)).Sum();

    public long TotalData => Units
        .Where(x => x.Measures.TotalCode != null)
        .Select(x => long.Parse(x.Measures.TotalCode!)).Sum();

    public long TotalFunctions => Units.Select(x => (long)x.Measures.TotalFunctions).Sum();

    public long MatchedCode => Units
        .Where(x => x.Measures.MatchedCode != null)
        .Select(x => long.Parse(x.Measures.MatchedCode!)).Sum();

    public long MatchedData => Units
        .Where(x => x.Measures.MatchedData != null)
        .Select(x => long.Parse(x.Measures.MatchedData!)).Sum();

    public long MatchedFunctions => Units.Select(x => (long)x.Measures.MatchedFunctions).Sum();

    public float FuzzyMatchPercent => TotalCode switch
    {
        0 => 100,
        _ => Units
            .Where(x => x.Measures.TotalCode != null)
            .Select(x => x.Measures.FuzzyMatchPercent * long.Parse(x.Measures.TotalCode!)).Sum() / TotalCode
    };

    public float MatchedCodePercent => TotalCode switch
    {
        0 => 100,
        _ => (float)MatchedCode / TotalCode * 100
    };

    public float MatchedDataPercent => TotalCode switch
    {
        0 => 100,
        _ => (float)MatchedData / TotalData * 100
    };

    public float MatchedFunctionsPercent => TotalCode switch
    {
        0 => 100,
        _ => (float)MatchedFunctions / TotalFunctions * 100
    };
}