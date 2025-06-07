namespace IrviQuiz.API.Models;

public class OpenTdbResponse
{
    public int Response_Code { get; set; }
    public List<OpenTdbResult> Results { get; set; } = new();
}

public class OpenTdbResult
{
    public string Category { get; set; }
    public string Type { get; set; }
    public string Difficulty { get; set; }
    public string Question { get; set; }
    public string Correct_Answer { get; set; }
    public List<string> Incorrect_Answers { get; set; }
}
