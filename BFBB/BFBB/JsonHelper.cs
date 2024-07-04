using System.Text.Json;
using System.Text.Json.Serialization;

namespace BFBB;

public abstract class JsonHelper
{
    private static readonly JsonSerializerOptions ParseOptions = new()
    {
        PropertyNamingPolicy = JsonNamingPolicy.SnakeCaseLower,
        PropertyNameCaseInsensitive = true,
        DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingDefault,
        WriteIndented = true
    };

    public static T Deserialize<T>(string json)
    {
        return JsonSerializer.Deserialize<T>(json, ParseOptions)!;
    }

    public static string Serialize<T>(T item)
    {
        return JsonSerializer.Serialize(item, ParseOptions);
    }
}