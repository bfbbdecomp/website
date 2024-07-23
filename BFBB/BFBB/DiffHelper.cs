namespace BFBB;

public class DiffHelper
{
    public static List<DiffPair> GetReportDifferences(Report newReport, Report oldReport)
    {
        var newFns = newReport.Units.SelectMany(x => x.Functions).ToList();
        var oldFns = oldReport.Units.SelectMany(x => x.Functions).ToList();
        return GetReportItemDifferences(newFns, oldFns);
    }

    private static List<DiffPair> GetReportItemDifferences(List<ReportItem> newItems, List<ReportItem> oldItems)
    {
        var differing = newItems.Join(
                oldItems,
                newItem => newItem.Address,
                oldItem => oldItem.Address,
                (newItem, oldItem) => (newItem, oldItem))
            .Where(pair => !pair.newItem.FuzzyMatchPercent.Equals(pair.oldItem.FuzzyMatchPercent))
            .Select(x => new DiffPair(x.newItem, x.oldItem))
            .ToList();
        
        return differing;
    }
};

public record DiffPair(ReportItem NewItem, ReportItem OldItem);

public record Difference(string Addr, float New, float Old);