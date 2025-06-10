using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Text.Json;
using System.Web;
using IrviQuiz.API.Models;

namespace IrviQuiz.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class QuizController : ControllerBase
{
    private readonly HttpClient _httpClient = new();

    [HttpGet("generate")]
    public async Task<IActionResult> Generate([FromQuery] int amount = 5, [FromQuery] string lang = "en")
    {
        var url = $"https://opentdb.com/api.php?amount={amount}&type=multiple&encode=url3986";
        var response = await _httpClient.GetStringAsync(url);
        var data = JsonSerializer.Deserialize<OpenTdbResponse>(response, new JsonSerializerOptions
        {
             PropertyNameCaseInsensitive = true
        });

        var questions = data?.Results.Select(q =>
        {
            var allAnswers = q.Incorrect_Answers.Append(q.Correct_Answer).OrderBy(_ => Guid.NewGuid()).ToList();
            return new QuizQuestion
            {
                Question = HttpUtility.HtmlDecode(q.Question),
                Answers = allAnswers.Select(HttpUtility.HtmlDecode).ToList(),
                CorrectAnswer = HttpUtility.HtmlDecode(q.Correct_Answer)
            };
        }).ToList();

        Console.WriteLine($"Perguntas retornadas: {questions?.Count ?? 0}");
        return Ok(questions);
    }
}
