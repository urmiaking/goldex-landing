/**
 * GoldEx (گلدکس) - Live Market Rates Ticker
 */

const marketRates = [
  { id: 'geram18', name: 'طلای ۱۸ عیار (گرم)', price: 25792200, change: 0.02, unit: 'تومان' },
  { id: 'abshodeh', name: 'آبشده نقدی', price: 111727000, change: 0.02, unit: 'تومان' },
  { id: 'geram24', name: 'طلای ۲۴ عیار (شمش)', price: 34582600, change: -0.94, unit: 'تومان' },
  { id: 'ounce', name: 'انس جهانی طلا', price: 4165, change: -0.14, unit: 'دلار' },
  { id: 'emami', name: 'سکه طرح جدید (امامی)', price: 264190000, change: -0.2, unit: 'تومان' },
  { id: 'mesghal', name: 'مثقال طلای تهران', price: 111730000, change: 0.05, unit: 'تومان' },
  { id: 'derham', name: 'درهم امارات', price: 71250, change: -1.3, unit: 'تومان' },
  { id: 'euro', name: 'یورو', price: 294830, change: -0.6, unit: 'تومان' }
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

document.addEventListener('DOMContentLoaded', renderTickerItems);
