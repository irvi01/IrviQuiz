namespace IrviQuiz.API.Models;

public class QuizQuestion
{
    public required string Question { get; set; }
    public required List<string> Answers { get; set; }
    public required string CorrectAnswer { get; set; }
}
