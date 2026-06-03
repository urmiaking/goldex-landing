namespace GoldEx;

public interface IRatesService
{
    RatesDto GetRates();
    void FluctuateRates();
}
