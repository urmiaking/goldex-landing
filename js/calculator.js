/**
 * Qirato (قیراط) - Interactive Gold & Jewelry Calculator
 * Persian Digits & Standardized Iranian Gold Union Formula (Article 26 VAT Law):
 * - Raw Gold is VAT exempt.
 * - Jeweler Profit = 7% on (Gold Value + Wage)
 * - VAT = 9% ONLY on (Wage + Profit)
 * - Full Persian Numeral Input & Display (ارقام فارسی)
 */

// Mapping between Persian and Latin digits
const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];

function toPersianDigits(str) {
  if (str === null || str === undefined) return '';
  return str.toString()
    .replace(/\d/g, x => farsiDigits[x])
    .replace(/,/g, '،');
}

function toLatinDigits(str) {
  if (!str) return '';
  let res = str.toString()
    .replace(/[۰-۹]/g, d => farsiDigits.indexOf(d))
    .replace(/[٠-٩]/g, d => arabicDigits.indexOf(d))
    .replace(/[٫\/]/g, '.')
    .replace(/،/g, '')
    .replace(/,/g, '')
    .replace(/[^\d.]/g, '');

  const parts = res.split('.');
  if (parts.length > 2) {
    res = parts[0] + '.' + parts.slice(1).join('');
  }
  return res;
}

// Format number with thousands separators using Persian digits
function formatMoneyPersian(amount) {
  if (!amount || isNaN(amount)) return '۰';
  const rounded = Math.round(amount);
  const formatted = rounded.toLocaleString('en-US');
  return toPersianDigits(formatted);
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

  let currentKarat = 750; // Standard 18K

  // Karat Switcher
  karatButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      karatButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentKarat = parseInt(btn.getAttribute('data-karat'), 10) || 750;
      calculateGold();
    });
  });

  // Parse raw value from Persian/formatted inputs
  function getInputValue(input) {
    if (!input) return 0;
    const cleanStr = toLatinDigits(input.value);
    return parseFloat(cleanStr) || 0;
  }

  // Format inputs with Persian digits
  function formatInputPersian(input, isCurrency = false) {
    if (!input) return;
    const cursorPos = input.selectionStart;
    const rawVal = toLatinDigits(input.value);
    if (!rawVal && rawVal !== '0') {
      input.value = '';
      return;
    }

    if (isCurrency) {
      const num = parseInt(rawVal, 10);
      if (!isNaN(num)) {
        input.value = toPersianDigits(num.toLocaleString('en-US'));
      }
    } else {
      input.value = toPersianDigits(rawVal);
    }
  }

  function calculateGold() {
    const weight = getInputValue(weightInput);
    const basePrice18K = getInputValue(priceInput);
    const wagePercent = getInputValue(wageInput);
    const profitPercent = getInputValue(profitInput);
    const taxPercent = getInputValue(taxInput);

    // Adjust rate for karat (750 base)
    const karatRatio = currentKarat / 750;
    const rawGoldValue = weight * basePrice18K * karatRatio;

    // Making wage
    const wageValue = rawGoldValue * (wagePercent / 100);

    // Jeweler profit (7% standard on gold value + wage)
    const profitValue = (rawGoldValue + wageValue) * (profitPercent / 100);

    // VAT (9% standard ONLY on wage + profit per Article 26)
    const vatValue = (wageValue + profitValue) * (taxPercent / 100);

    // Total Payable
    const totalPayable = rawGoldValue + wageValue + profitValue + vatValue;

    if (outGoldValue) outGoldValue.textContent = formatMoneyPersian(rawGoldValue) + ' تومان';
    if (outWage) outWage.textContent = formatMoneyPersian(wageValue) + ' تومان';
    if (outProfit) outProfit.textContent = formatMoneyPersian(profitValue) + ' تومان';
    if (outTax) outTax.textContent = formatMoneyPersian(vatValue) + ' تومان';
    if (outTotal) outTotal.textContent = formatMoneyPersian(totalPayable) + ' تومان';
    if (outWords) outWords.textContent = numberToPersianWords(totalPayable);
  }

  // Attach input formatting listeners
  if (weightInput) {
    weightInput.value = toPersianDigits('۴.۸۵');
    weightInput.addEventListener('input', () => {
      formatInputPersian(weightInput, false);
      calculateGold();
    });
  }

  if (priceInput) {
    priceInput.value = toPersianDigits('۴,۴۲۵,۰۰۰');
    priceInput.addEventListener('input', () => {
      formatInputPersian(priceInput, true);
      calculateGold();
    });
  }

  if (wageInput) {
    wageInput.value = toPersianDigits('۱۴');
    wageInput.addEventListener('input', () => {
      formatInputPersian(wageInput, false);
      calculateGold();
    });
  }

  if (profitInput) {
    profitInput.value = toPersianDigits('۷');
    profitInput.addEventListener('input', () => {
      formatInputPersian(profitInput, false);
      calculateGold();
    });
  }

  if (taxInput) {
    taxInput.value = toPersianDigits('۹');
    taxInput.addEventListener('input', () => {
      formatInputPersian(taxInput, false);
      calculateGold();
    });
  }

  // Initial Calculation
  calculateGold();
});
