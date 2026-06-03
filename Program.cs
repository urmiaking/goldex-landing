using GoldEx;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);

// Register services
builder.Services.AddSingleton<IRatesService, RatesService>();
builder.Services.AddHostedService<RatesBackgroundWorker>();

var app = builder.Build();

// Setup static file serving
app.UseDefaultFiles();
app.UseStaticFiles();

// Setup API route
app.MapGet("/api/rates", (IRatesService ratesService) =>
{
    var rates = ratesService.GetRates();
    return Results.Ok(rates);
});

app.Run();
