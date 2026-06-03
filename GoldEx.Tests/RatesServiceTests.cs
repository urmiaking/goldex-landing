using Xunit;

namespace GoldEx.Tests;

public class RatesServiceTests
{
    [Fact]
    public void GetRates_ShouldReturnInitialRates_WhenServiceCreated()
    {
        // Arrange
        var service = new RatesService();

        // Act
        var rates = service.GetRates();

        // Assert
        Assert.Equal(3720000m, rates.Gold18);
        Assert.Equal(16115000m, rates.GoldMelt);
        Assert.Equal(42850000m, rates.CoinEmami);
        Assert.Equal(24100000m, rates.CoinHalf);
        Assert.Equal(14550000m, rates.CoinQuarter);
        Assert.Equal(61500m, rates.Usd);
        Assert.Equal(16750m, rates.Aed);
    }

    [Fact]
    public void FluctuateRates_ShouldModifyRates_WhenInvoked()
    {
        // Arrange
        var service = new RatesService();
        var initialRates = service.GetRates();

        // Act
        service.FluctuateRates();
        var fluctuatedRates = service.GetRates();

        // Assert
        Assert.NotEqual(initialRates.Gold18, fluctuatedRates.Gold18);
        Assert.NotEqual(initialRates.GoldMelt, fluctuatedRates.GoldMelt);
        Assert.NotEqual(initialRates.CoinEmami, fluctuatedRates.CoinEmami);
        Assert.NotEqual(initialRates.CoinHalf, fluctuatedRates.CoinHalf);
        Assert.NotEqual(initialRates.CoinQuarter, fluctuatedRates.CoinQuarter);
        Assert.NotEqual(initialRates.Usd, fluctuatedRates.Usd);
        Assert.NotEqual(initialRates.Aed, fluctuatedRates.Aed);
    }

    [Fact]
    public void Rates_ShouldNeverFallBelow1000_WhenInvokedMultipleTimes()
    {
        // Arrange
        var service = new RatesService();

        // Act
        for (int i = 0; i < 500; i++)
        {
            service.FluctuateRates();
        }
        var finalRates = service.GetRates();

        // Assert
        Assert.True(finalRates.Gold18 >= 1000m);
        Assert.True(finalRates.GoldMelt >= 1000m);
        Assert.True(finalRates.CoinEmami >= 1000m);
        Assert.True(finalRates.CoinHalf >= 1000m);
        Assert.True(finalRates.CoinQuarter >= 1000m);
        Assert.True(finalRates.Usd >= 1000m);
        Assert.True(finalRates.Aed >= 1000m);
    }
}
