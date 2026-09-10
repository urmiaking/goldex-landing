/**
 * Qirato (قیراط) - Interactive Gold & Jewelry Calculator
 * Standardized Iranian Gold Union Formula (New VAT Article 26 Law):
 * - Raw Gold is VAT exempt.
 * - Jeweler Profit = 7% on (Gold Value + Wage)
 * - VAT = 9% ONLY on (Wage + Profit)
 */

// Helper: Convert digits to Persian numbers
function toPersianDigits(num) {
  if (num === null || num === undefined) return '';
  const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return num.toString().replace(/\d/g, x => farsiDigits[x]);
}

// Helper: Format number with thousand separators
function formatMoney(amount) {
  if (!amount || isNaN(amount)) return '۰';
  return toPersianDigits(Math.round(amount).toLocaleString('en-US'));
}

// Convert numbers to Persian Words (حروف فارسی)
function numberToPersianWords(num) {
  if (!num || isNaN(num) || num <= 0) return 'صفر تومان';
  
  const yekan = ['', 'یک', 'دو', 'سه', 'چهار', 'پنج', 'شش', 'هفت', 'هشت', 'نه'];
  const dahha = ['', 'ده', 'بیست', 'سی', 'چهل', 'پنجاه', 'شصت', 'هفتاد', 'هشتاد', 'نود'];
  const dahyek = ['ده', 'یازده', 'دوازده', 'سیزده', 'چهارده', 'پانزده', 'شانزده', 'هفده', 'هجده', 'نوزده'];
  const sadha = ['', 'صد', 'دویست', 'سیصد', 'چهارصد', 'پانصد', 'ششصد', 'هفتصد', 'هشتصد', 'نهصد'];
  const levels = ['', 'هزار', 'میلیون', 'میلیارد', 'تریلیون'];

  function parseThreeDigits(n) {
    let text = [];
    const c = Math.floor(n / 100);
    const b = Math.floor((n % 100) / 10);
    const a = n % 10;

    if (c > 0) text.push(sadha[c]);

    if (b === 1) {
      text.push(dahyek[a]);
    } else {
      if (b > 1) text.push(dahha[b]);
      if (a > 0) text.push(yekan[a]);
    }
    return text.join(' و ');
  }

  let n = Math.floor(num);
  let parts = [];
  let level = 0;

  while (n > 0) {
    const chunk = n % 1000;
    if (chunk > 0) {
      const chunkStr = parseThreeDigits(chunk);
      if (levels[level]) {
        parts.unshift(chunkStr + ' ' + levels[level]);
      } else {
        parts.unshift(chunkStr);
      }
    }
    n = Math.floor(n / 1000);
    level++;
  }

  return (parts.join(' و ') || 'صفر') + ' تومان';
}

// Main Calculator Logic
document.addEventListener('DOMContentLoaded', () => {
  const weightInput = document.getElementById('calc-weight');
  const priceInput = document.getElementById('calc-price');
  const wageInput = document.getElementById('calc-wage');
  const profitInput = document.getElementById('calc-profit');
  const taxInput = document.getElementById('calc-tax');
  const karatButtons = document.querySelectorAll('.karat-btn');

  const outGoldValue = document.getElementById('out-gold-value');
  const outWage = document.getElementById('out-wage');
  const outProfit = document.getElementById('out-profit');
  const outTax = document.getElementById('out-tax');
  const outTotal = document.getElementById('out-total');
  const outWords = document.getElementById('out-words');

  let currentKarat = 750; // 18K standard

  karatButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      karatButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentKarat = parseInt(btn.getAttribute('data-karat'), 10) || 750;
      calculateGold();
    });
  });

  function calculateGold() {
    const weight = parseFloat(weightInput?.value) || 0;
    const basePrice18K = parseFloat(priceInput?.value) || 0;
    const wagePercent = parseFloat(wageInput?.value) || 0;
    const profitPercent = parseFloat(profitInput?.value) || 0;
    const taxPercent = parseFloat(taxInput?.value) || 0;

    // Adjust rate for karat (750 is standard 18K base)
    const karatRatio = currentKarat / 750;
    const rawGoldValue = weight * basePrice18K * karatRatio;

    // Making wage
    const wageValue = rawGoldValue * (wagePercent / 100);

    // Jeweler profit (7% standard on gold value + wage)
    const profitValue = (rawGoldValue + wageValue) * (profitPercent / 100);

    // VAT (9% standard ONLY on wage + profit per new law)
    const vatValue = (wageValue + profitValue) * (taxPercent / 100);

    // Total Payable
    const totalPayable = rawGoldValue + wageValue + profitValue + vatValue;

    if (outGoldValue) outGoldValue.textContent = formatMoney(rawGoldValue) + ' تومان';
    if (outWage) outWage.textContent = formatMoney(wageValue) + ' تومان';
    if (outProfit) outProfit.textContent = formatMoney(profitValue) + ' تومان';
    if (outTax) outTax.textContent = formatMoney(vatValue) + ' تومان';
    if (outTotal) outTotal.textContent = formatMoney(totalPayable) + ' تومان';
    if (outWords) outWords.textContent = numberToPersianWords(totalPayable);
  }

  [weightInput, priceInput, wageInput, profitInput, taxInput].forEach(inp => {
    if (inp) {
      inp.addEventListener('input', calculateGold);
    }
  });

  // Initial Calculation
  calculateGold();
});
