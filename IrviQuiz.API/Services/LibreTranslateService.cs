using System.Net.Http;
using System.Text;
using System.Text.Json;

namespace IrviQuiz.API.Services
{
    public class LibreTranslateService
    {
        private readonly HttpClient _httpClient;

        public LibreTranslateService(HttpClient httpClient)
        {
            _httpClient = httpClient;
            _httpClient.BaseAddress = new Uri("http://localhost:5000/");
        }

        public async Task<string> Translate(string text, string targetLang, string sourceLang = "en")
        {
            var content = new StringContent(JsonSerializer.Serialize(new
            {
                q = text,
                source = sourceLang,
                target = targetLang,
                format = "text"
            }), Encoding.UTF8, "application/json");

            var response = await _httpClient.PostAsync("translate", content);

            if (!response.IsSuccessStatusCode)
            {
                Console.WriteLine($"Tradução falhou ({(int)response.StatusCode}): '{text}'");
                return text;
            }

            var json = await response.Content.ReadAsStringAsync();
            using var doc = JsonDocument.Parse(json);
            return doc.RootElement.GetProperty("translatedText").GetString() ?? text;
        }
    }
}
