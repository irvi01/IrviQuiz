namespace IrviQuiz.API.Models;

public class QuizQuestion
{
    public string Question { get; set; }
    public List<string> Answers { get; set; }
    public string CorrectAnswer { get; set; }
}
