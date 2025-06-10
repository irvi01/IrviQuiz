using IrviQuiz.API.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(static options =>
{
    options.AddDefaultPolicy(static policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

builder.Services.AddControllers();

builder.Services.AddHttpClient<LibreTranslateService>();

var app = builder.Build();

app.UseHttpsRedirection();
app.UseCors();
app.UseAuthorization();

app.MapControllers();
app.Run();
