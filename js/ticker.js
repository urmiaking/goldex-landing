/**
 * Qirato (قیراط) - Live Market Rates Ticker & Feed Simulation
 */

const marketRates = [
  { id: 'geram18', name: 'طلای ۱۸ عیار (گرم)', price: 23916800, change: 0.85, unit: 'تومان' },
  { id: 'mesghal', name: 'مثقال طلای تهران', price: 103604000, change: 0.72, unit: 'تومان' },
  { id: 'geram24', name: 'طلای ۲۴ عیار (شمش)', price: 31888800, change: 0.91, unit: 'تومان' },
  { id: 'emami', name: 'سکه طرح جدید (امامی)', price: 239495000, change: 0.64, unit: 'تومان' },
  { id: 'bahar', name: 'سکه تمام بهار آزادی', price: 235280000, change: 0.52, unit: 'تومان' },
  { id: 'nim', name: 'نیم سکه بهار آزادی', price: 122000000, change: 0.45, unit: 'تومان' },
  { id: 'rob', name: 'ربع سکه بهار آزادی', price: 65000000, change: 0.38, unit: 'تومان' },
  { id: 'gerami', name: 'سکه یک گرمی بانک مرکزی', price: 34000000, change: 0.25, unit: 'تومان' },
  { id: 'bubble', name: 'حباب سکه امامی', price: 6610000, change: -1.15, unit: 'تومان' },
  { id: 'ounce', name: 'انس جهانی طلا', price: 4350.4, change: 0.32, unit: 'دلار' },
  { id: 'dollar', name: 'دلار آزاد بازار تهران', price: 233900, change: 0.48, unit: 'تومان' }
];

function formatFarsiNumber(num, isDecimal = false) {
  if (num === null || num === undefined) return '';
  const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  const formatted = isDecimal ? num.toFixed(1) : Math.round(num).toLocaleString('en-US');
  return formatted.replace(/\d/g, x => farsiDigits[x]);
}

function renderTickerItems() {
  const tickerStrip = document.getElementById('ticker-strip');
  if (!tickerStrip) return;

  // Duplicate the items for seamless infinite loop marquee
  const displayItems = [...marketRates, ...marketRates];

  tickerStrip.innerHTML = displayItems.map((item, index) => {
    const isUp = item.change >= 0;
    const changeClass = isUp ? 'up' : 'down';
    const sign = isUp ? '+' : '';
    const arrow = isUp ? '▲' : '▼';

    return `
      <div class="ticker-item" id="ticker-item-${index}">
        <span class="ticker-name">${item.name}:</span>
        <span class="ticker-price">${formatFarsiNumber(item.price, item.id === 'ounce')} ${item.unit}</span>
        <span class="ticker-change ${changeClass}">
          ${arrow} ${sign}${formatFarsiNumber(Math.abs(item.change), true)}٪
        </span>
      </div>
    `;
  }).join('');
}

// Gentle live tick pulse simulation (simulating live TGJU/Tala.ir websocket ticks)
function simulateLiveTicks() {
  setInterval(() => {
    // Pick a random rate
    const randomIndex = Math.floor(Math.random() * marketRates.length);
    const item = marketRates[randomIndex];

    // Micro fluctuation: between -0.08% and +0.08%
    const deltaPercent = (Math.random() - 0.49) * 0.15;
    const factor = 1 + (deltaPercent / 100);
    const oldPrice = item.price;
    item.price = item.id === 'ounce' ? item.price * factor : Math.round(item.price * factor);
    item.change = +(item.change + (deltaPercent * 0.5)).toFixed(2);

    renderTickerItems();
  }, 4500);
}

document.addEventListener('DOMContentLoaded', () => {
  renderTickerItems();
  simulateLiveTicks();
});
