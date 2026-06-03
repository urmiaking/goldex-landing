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
app.MapGet("/api/rates", (IRatesService ratesService, string? currency) =>
{
    var rates = ratesService.GetRates();
    
    if (string.Equals(currency, "usd", System.StringComparison.OrdinalIgnoreCase))
    {
        decimal usdRate = rates.Usd > 0 ? rates.Usd : 61500m;
        return Results.Ok(new
        {
            Gold18 = System.Math.Round(rates.Gold18 / usdRate, 2),
            GoldMelt = System.Math.Round(rates.GoldMelt / usdRate, 2),
            CoinEmami = System.Math.Round(rates.CoinEmami / usdRate, 2),
            CoinHalf = System.Math.Round(rates.CoinHalf / usdRate, 2),
            CoinQuarter = System.Math.Round(rates.CoinQuarter / usdRate, 2),
            Usd = 1.00m,
            Aed = System.Math.Round(rates.Aed / usdRate, 2)
        });
    }
    else if (string.Equals(currency, "try", System.StringComparison.OrdinalIgnoreCase))
    {
        decimal usdRate = rates.Usd > 0 ? rates.Usd : 61500m;
        decimal tryToUsd = 33.00m; // simulated Lira per USD rate
        decimal tryRate = usdRate / tryToUsd; // Toman per Lira
        return Results.Ok(new
        {
            Gold18 = System.Math.Round(rates.Gold18 / tryRate, 2),
            GoldMelt = System.Math.Round(rates.GoldMelt / tryRate, 2),
            CoinEmami = System.Math.Round(rates.CoinEmami / tryRate, 2),
            CoinHalf = System.Math.Round(rates.CoinHalf / tryRate, 2),
            CoinQuarter = System.Math.Round(rates.CoinQuarter / tryRate, 2),
            Usd = tryToUsd,
            Aed = System.Math.Round(rates.Aed / tryRate, 2)
        });
    }

    return Results.Ok(rates);
});

app.Run();
