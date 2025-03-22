namespace BFBB;

public class DiffHelper
{
    public static List<Diff> GetReportDifferences(Report newReport, Report oldReport)
    {
        return newReport.Units
            .Join(oldReport.Units,
                unitA => unitA.Name,
                unitB => unitB.Name,
                (unitA, unitB) => new { unitA, unitB })
            .SelectMany(x => x.unitA.Sections?.Concat(x.unitA.Functions ?? [])
                .Join(x.unitB.Sections?.Concat(x.unitB.Functions ?? []) ?? [],
                    itemA => itemA.Name,
                    itemB => itemB.Name,
                    (itemA, itemB) => new { itemA, itemB, unitName = x.unitA.Name })
                .Where(y => !y.itemA.FuzzyMatchPercent.Equals(y.itemB.FuzzyMatchPercent))
                .Where(y => y.itemA.Metadata?.DemangledName != null)
                .Select(y => new Diff(y.unitName, y.itemA, y.itemB)) ?? [])
            .ToList();
    }

    /*
    private static List<DiffPair> GetReportItemDifferences(List<Objdiff.ReportItem> newItems,
        List<Objdiff.ReportItem> oldItems)
    {
        var differing = newItems.Join(
                oldItems,
                n => (n.Name, n.Metadata.DemangledName, n.Size, n.Metadata.VirtualAddress),
                o => (o.Name, o.Metadata.DemangledName, o.Size, o.Metadata.VirtualAddress),
                (newItem, oldItem) => (newItem, oldItem))
            .Where(pair => !string.IsNullOrEmpty(pair.newItem.Metadata.DemangledName))
            .Where(pair => !pair.newItem.FuzzyMatchPercent.Equals(pair.oldItem.FuzzyMatchPercent))
            .Select(x => new DiffPair(x.newItem, x.oldItem))
            .ToList();

        return differing;
    }
    */
};

public record Diff(string UnitName, Objdiff.ReportItem NewItem, Objdiff.ReportItem OldItem);

public record Difference(string DemangledName, float New, float Old);