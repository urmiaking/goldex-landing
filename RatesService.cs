using System;

namespace GoldEx;

public class RatesService : IRatesService
{
    private readonly object _lock = new();
    private readonly RatesDto _currentRates = new()
    {
        Gold18 = 3720000m,
        GoldMelt = 16115000m,
        CoinEmami = 42850000m,
        CoinHalf = 24100000m,
        CoinQuarter = 14550000m,
        Usd = 61500m,
        Aed = 16750m
    };
    private readonly Random _random = new();

    public RatesDto GetRates()
    {
        lock (_lock)
        {
            return new RatesDto
            {
                Gold18 = _currentRates.Gold18,
                GoldMelt = _currentRates.GoldMelt,
                CoinEmami = _currentRates.CoinEmami,
                CoinHalf = _currentRates.CoinHalf,
                CoinQuarter = _currentRates.CoinQuarter,
                Usd = _currentRates.Usd,
                Aed = _currentRates.Aed
            };
        }
    }

    public void FluctuateRates()
    {
        lock (_lock)
        {
            // Fluctuations matching client-side logic
            var gold18Diff = (decimal)(_random.NextDouble() - 0.48) * 12000m;
            var goldMeltDiff = gold18Diff * 4.608m * 0.95m;
            var coinEmamiDiff = (decimal)(_random.NextDouble() - 0.5) * 80000m;
            var halfCoinDiff = coinEmamiDiff * 0.55m;
            var coinQuarterDiff = coinEmamiDiff * 0.33m; // Fluctuation for coinQuarter
            var usdDiff = (decimal)(_random.NextDouble() - 0.5) * 150m;
            var aedDiff = usdDiff / 3.67m;

            _currentRates.Gold18 = Math.Max(_currentRates.Gold18 + gold18Diff, 1000m);
            _currentRates.GoldMelt = Math.Max(_currentRates.GoldMelt + goldMeltDiff, 1000m);
            _currentRates.CoinEmami = Math.Max(_currentRates.CoinEmami + coinEmamiDiff, 1000m);
            _currentRates.CoinHalf = Math.Max(_currentRates.CoinHalf + halfCoinDiff, 1000m);
            _currentRates.CoinQuarter = Math.Max(_currentRates.CoinQuarter + coinQuarterDiff, 1000m);
            _currentRates.Usd = Math.Max(_currentRates.Usd + usdDiff, 1000m);
            _currentRates.Aed = Math.Max(_currentRates.Aed + aedDiff, 1000m);
        }
    }
}
