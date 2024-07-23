namespace BFBB;

public record Commit(string Id, string Email, DateTime Time, string Message, List<Difference>? Differences);