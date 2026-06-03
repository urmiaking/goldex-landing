using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace GoldEx;

public class RatesBackgroundWorker : BackgroundService
{
    private readonly IRatesService _ratesService;
    private readonly ILogger<RatesBackgroundWorker> _logger;

    public RatesBackgroundWorker(IRatesService ratesService, ILogger<RatesBackgroundWorker> logger)
    {
        _ratesService = ratesService;
        _logger = logger;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        _logger.LogInformation("Rates background worker is starting.");

        while (!stoppingToken.IsCancellationRequested)
        {
            _ratesService.FluctuateRates();
            _logger.LogDebug("Rates fluctuated in background service.");
            await Task.Delay(4500, stoppingToken);
        }

        _logger.LogInformation("Rates background worker is stopping.");
    }
}
