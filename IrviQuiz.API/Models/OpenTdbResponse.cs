namespace IrviQuiz.API.Models;

public class OpenTdbResponse
{
    public int Response_Code { get; set; }
    public List<OpenTdbResult> Results { get; set; } = new();
}

public class OpenTdbResult
{
    public required string Category { get; set; }
    public required string Type { get; set; }
    public required string Difficulty { get; set; }
    public required string Question { get; set; }
    public required string Correct_Answer { get; set; }
    public required List<string> Incorrect_Answers { get; set; }
}
