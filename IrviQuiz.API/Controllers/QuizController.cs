using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Text.Json;
using System.Web;
using IrviQuiz.API.Models;
using IrviQuiz.API.Services;
using System.Text;

namespace IrviQuiz.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class QuizController : ControllerBase
{
    private readonly HttpClient _httpClient = new();
    private readonly LibreTranslateService _translator;

    public QuizController(LibreTranslateService translator)
    {
        _translator = translator;
    }

    [HttpGet("generate")]
    public async Task<IActionResult> Generate([FromQuery] int amount = 5, [FromQuery] string lang = "en")
    {
        var url = $"https://opentdb.com/api.php?amount={amount}&type=multiple&encode=base64";
        var response = await _httpClient.GetStringAsync(url);
        var data = JsonSerializer.Deserialize<OpenTdbResponse>(response, new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        });
        
        string DecodeBase64(string base64) =>   
            Encoding.UTF8.GetString(Convert.FromBase64String(base64));
        var questions = data?.Results.Select(q =>
        {
            var allAnswers = q.Incorrect_Answers
                .Append(q.Correct_Answer)
                .OrderBy(_ => Guid.NewGuid())
                .ToList();

            return new QuizQuestion
            {
                Question = DecodeBase64(q.Question),
                Answers = allAnswers.Select(DecodeBase64).ToList(),
                CorrectAnswer = DecodeBase64(q.Correct_Answer)

            };
    }).ToList();

        Console.WriteLine($"Perguntas retornadas: {questions?.Count ?? 0}");

        if (lang != "en" && questions is not null)
        {
            foreach (var q in questions)
            {
                var translatedQuestion = await _translator.Translate(q.Question, lang);
                q.Question = HttpUtility.UrlDecode(translatedQuestion);

                var translatedCorrect = await _translator.Translate(q.CorrectAnswer, lang);
                q.CorrectAnswer = HttpUtility.UrlDecode(translatedCorrect);

                for (int i = 0; i < q.Answers.Count; i++)
                {
                    var translated = await _translator.Translate(q.Answers[i], lang);
                    q.Answers[i] = HttpUtility.UrlDecode(translated);
                }

                Console.WriteLine("Pergunta traduzida: " + q.Question);
            }
        }

        return Ok(questions);
    }
}
