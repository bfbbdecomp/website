using System.Text;
using Newtonsoft.Json;

namespace ProgressHelper;

public class Gemini
{
    private static string PromptOkBotSoul(string reportText)
    {
        string context = $"""
                          You are a robot named OK Bot.
                          You were created to announce progress reports for decompiling a
                          22+ year old spongebob game for the gamecube.

                          Here is the progress report you just announced (don't repeat this):
                          {reportText}

                          Notice how you give the overall percentage, who did it @[person]
                          and various other statistics are shared about the progress of decompiled game functions.

                          Give me a witty quip, no longer than a sentence or two 
                          which makes a pun about something in the report.
                          You can choose to include the person's name if it makes sense to do so,
                          as if you were talking to them.
                          If you include their name, just write [USER].
                          """;

        return context;
    }

    public static async Task<string> PromptGemini(string report)
    {
        using var client = new HttpClient();
        var proompt = PromptOkBotSoul(report);
        var api_key = Environment.GetEnvironmentVariable("GEMINI_API_KEY");
        var url =
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + api_key;
        var requestBody = $@"{{
              ""contents"": [{{
                ""parts"":[{{""text"": ""{proompt}""}}]
              }}]
            }}";

        var content = new StringContent(requestBody, Encoding.UTF8, "application/json");

        var response = await client.PostAsync(url, content);

        if (!response.IsSuccessStatusCode) throw new Exception("Gemini API call failed.");

        var responseBody = await response.Content.ReadAsStringAsync();
        var resp = JsonConvert.DeserializeObject<Response>(responseBody);

        return resp.candidates.First().content.parts.First().text;
    }
}

public class Candidate
{
    public Content content { get; set; }
}

public class Content
{
    public List<Part> parts { get; set; }
}

public class Part
{
    public string text { get; set; }
}

public class Response
{
    public List<Candidate> candidates { get; set; }

    public string GetText()
    {
        if (candidates != null && candidates.Count > 0 && candidates[0].content?.parts != null &&
            candidates[0].content.parts.Count > 0)
        {
            return candidates[0].content.parts[0].text;
        }

        return null;
    }
}