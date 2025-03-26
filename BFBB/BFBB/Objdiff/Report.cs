namespace BFBB.Objdiff;

// Project progress report
public class Report
{
    public Measures Measures { get; set; } // Overall progress info
    public List<ReportUnit> Units { get; set; } // Units within this report
    public uint Version { get; set; } // Report version
    public List<ReportCategory> Categories { get; set; } // Progress categories
}

// Progress info for a report or unit
public class Measures
{
    public float
        FuzzyMatchPercent { get; set; } // Overall match percent, including partially matched functions and data

    public string? TotalCode { get; set; } // Total size of code in bytes
    public string? MatchedCode { get; set; } // Fully matched code size in bytes
    public float MatchedCodePercent { get; set; } // Fully matched code percent
    public string TotalData { get; set; } // Total size of data in bytes
    public string? MatchedData { get; set; } // Fully matched data size in bytes
    public float MatchedDataPercent { get; set; } // Fully matched data percent
    public uint TotalFunctions { get; set; } // Total number of functions
    public uint MatchedFunctions { get; set; } // Fully matched functions
    public float MatchedFunctionsPercent { get; set; } // Fully matched functions percent
    public string CompleteCode { get; set; } // Completed (or "linked") code size in bytes
    public float CompleteCodePercent { get; set; } // Completed (or "linked") code percent
    public string CompleteData { get; set; } // Completed (or "linked") data size in bytes
    public float CompleteDataPercent { get; set; } // Completed (or "linked") data percent
    public uint TotalUnits { get; set; } // Total number of units
    public uint CompleteUnits { get; set; } // Completed (or "linked") units
}

// Progress category
public class ReportCategory
{
    public string Id { get; set; } // The ID of the category
    public string Name { get; set; } // The name of the category
    public Measures Measures { get; set; } // Progress info for this category
}

// A unit of the report (usually a translation unit)
public class ReportUnit
{
    public string Name { get; set; } // The name of the unit
    public Measures Measures { get; set; } // Progress info for this unit
    public List<ReportItem>? Sections { get; set; } // Sections within this unit
    public List<ReportItem>? Functions { get; set; } // Functions within this unit
    public ReportUnitMetadata? Metadata { get; set; } // Extra metadata for this unit
}

// Extra metadata for a unit
public class ReportUnitMetadata
{
    public bool? Complete { get; set; } // Whether this unit is marked as complete (or "linked")
    public string? ModuleName { get; set; } // The name of the module this unit belongs to
    public uint? ModuleId { get; set; } // The ID of the module this unit belongs to
    public string? SourcePath { get; set; } // The path to the source file of this unit
    public List<string> ProgressCategories { get; set; } // Progress categories for this unit
    public bool? AutoGenerated { get; set; } // Whether this unit is automatically generated (not user-provided)
}

// A section or function within a unit
public class ReportItem
{
    public string Name { get; set; } // The name of the item
    public string Size { get; set; } // The size of the item in bytes
    public float FuzzyMatchPercent { get; set; } // The overall match percent for this item
    public ReportItemMetadata? Metadata { get; set; } // Extra metadata for this item

    // Some extra metadata we're going to add for BFBB related decomp website
    public HashSet<string>? Opcodes { get; set; }
    public int? Labels { get; set; }
}

// Extra metadata for an item
public class ReportItemMetadata
{
    public string? DemangledName { get; set; } // The demangled name of the function
    public string? VirtualAddress { get; set; } // The virtual address of the function or section
}