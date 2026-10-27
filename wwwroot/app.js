// --- GLOBAL STATES & CONSTANTS ---
// currentLang is declared globally in i18n.js

// Base reference rates (in Tomans)
let baseRates = {
    gold18: 3720000,
    goldMelt: 16115000,
    coinEmami: 42850000,
    coinHalf: 24100000,
    coinQuarter: 14550000,
    usd: 191000,
    aed: 52000
};

// Exchange rates will be reset/fetched depending on currency
let liveRates = {
    gold18: 3720000,
    goldMelt: 16115000,
    coinEmami: 42850000,
    coinHalf: 24100000,
    coinQuarter: 14550000,
    usd: 191000,
    aed: 52000
};

let invoiceCart = [
    { id: 'item-default-1', type: 'طلا ۱۸ عیار', desc: 'دستبند / زنجیر طلای ۱۸ عیار', qtyText: '۴.۲۵ گرم', rateText: '۱۹٪', total: 19203000, rawWeight: 4.25 },
    { id: 'item-default-2', type: 'سکه امامی', desc: 'سکه تمام بهار آزادی', qtyText: '۱ عدد', rateText: '-', total: 42850000, rawWeight: 1 }
];

// Formatting helper: Add commas to numbers
function formatNum(num) {
    return Math.round(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function formatNumWithDecimals(num, decimals) {
    return parseFloat(num).toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Convert numbers to Persian digits (for beautiful localized display)
function toPersianDigits(str) {
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return str.toString().replace(/[0-9]/g, function (w) {
        return persianDigits[+w];
    });
}

// Format currency to localized string depending on language
function formatCurrencyVal(val) {
    if (currentLang === "fa") {
        return toPersianDigits(formatNum(val));
    }
    // For smaller values in USD/TRY, show two decimals
    if (val < 1000) {
        return formatNumWithDecimals(val, 2);
    }
    return formatNum(val);
}

function formatCurrency(val) {
    const formatted = formatCurrencyVal(val);
    if (currentLang === "fa") {
        return formatted + " تومان";
    } else if (currentLang === "tr") {
        return "₺" + formatted;
    } else {
        return "$" + formatted;
    }
}

function formatDecimal(val, decimals = 2) {
    const formatted = parseFloat(val).toFixed(decimals);
    return currentLang === "fa" ? toPersianDigits(formatted) : formatted;
}

function formatInt(val) {
    return currentLang === "fa" ? toPersianDigits(val) : val;
}

// Centralized dynamic cart recalculation and translation
function recalculateCartTotals() {
    invoiceCart.forEach(item => {
        if (item.type === "طلا ۱۸ عیار") {
            item.desc = currentLang === "fa" ? "دستبند / زنجیر طلای ۱۸ عیار" : (currentLang === "tr" ? "18 Ayar Altın Bileklik / Zincir" : "18K Gold Bracelet / Chain");
            item.qtyText = currentLang === "fa" ? item.rawWeight.toFixed(2) + " گرم" : item.rawWeight.toFixed(2) + " g";
            item.rateText = currentLang === "fa" ? "۱۹٪" : "19%";
            const basePrice = item.rawWeight * liveRates.gold18;
            const markupPrice = basePrice * 0.19; // wage + profit
            item.total = Math.round(basePrice + markupPrice + (markupPrice * 0.09)); // tax
        } else if (item.type === "طلای کهنه") {
            item.desc = currentLang === "fa" ? "خرید طلای مستعمل از مشتری" : (currentLang === "tr" ? "Hurda Altın Alımı" : "Scrap Gold Purchase");
            item.qtyText = currentLang === "fa" ? item.rawWeight.toFixed(2) + " گرم" : item.rawWeight.toFixed(2) + " g";
            item.rateText = "-";
            const scrapDiscount = currentLang === "fa" ? 60000 : (currentLang === "tr" ? 30 : 1);
            item.total = Math.round(item.rawWeight * Math.max(liveRates.gold18 - scrapDiscount, 0.01));
        } else if (item.type === "سکه امامی") {
            item.desc = currentLang === "fa" ? "سکه تمام بهار آزادی (امامی)" : (currentLang === "tr" ? "Bahar Azadi Altın Para" : "Bahar Azadi Gold Coin");
            const qty = Math.round(item.rawWeight);
            item.qtyText = currentLang === "fa" ? qty + " عدد" : qty + " qty";
            item.rateText = "-";
            item.total = Math.round(qty * liveRates.coinEmami);
        } else if (item.type === "طلای آبشده") {
            item.desc = currentLang === "fa" ? "طلای آبشده خام" : (currentLang === "tr" ? "Has Altın (Ham)" : "Melted Gold (Raw)");
            item.qtyText = currentLang === "fa" ? item.rawWeight.toFixed(2) + " گرم" : item.rawWeight.toFixed(2) + " g";
            item.rateText = "-";
            item.total = Math.round(item.rawWeight * (liveRates.goldMelt / 4.608));
        }
    });
}

// Centralized dynamic pricing matrix and cards updates based on live exchange rates
function updatePricingDisplay() {
    const usdRate = liveRates.usd > 0 ? liveRates.usd : 191000;
    const tryRate = usdRate / 47.75; // 4,000 Toman per Lira

    const prices = {
        miniStrike: 15000000,
        miniActive: 5000000,
        cloudStrike: 179000000,
        cloudActive: 129000000
    };

    let currency = "تومان";
    let formatted = {
        miniStrike: "",
        miniActive: "",
        cloudStrike: "",
        cloudActive: ""
    };

    if (currentLang === "fa") {
        formatted.miniStrike = toPersianDigits(formatNum(prices.miniStrike)) + " تومان";
        formatted.miniActive = toPersianDigits(formatNum(prices.miniActive));
        formatted.cloudStrike = toPersianDigits(formatNum(prices.cloudStrike)) + " تومان";
        formatted.cloudActive = toPersianDigits(formatNum(prices.cloudActive));
    } else if (currentLang === "tr") {
        formatted.miniStrike = "₺" + formatNum(Math.round(prices.miniStrike / tryRate));
        formatted.miniActive = formatNum(Math.round(prices.miniActive / tryRate));
        formatted.cloudStrike = "₺" + formatNum(Math.round(prices.cloudStrike / tryRate));
        formatted.cloudActive = formatNum(Math.round(prices.cloudActive / tryRate));
        currency = "TL";
    } else { // en
        formatted.miniStrike = "$" + formatNum(Math.round(prices.miniStrike / usdRate));
        formatted.miniActive = formatNum(Math.round(prices.miniActive / usdRate));
        formatted.cloudStrike = "$" + formatNum(Math.round(prices.cloudStrike / usdRate));
        formatted.cloudActive = formatNum(Math.round(prices.cloudActive / usdRate));
        currency = "$";
    }

    // Homepage Mini
    const hmStrike = document.getElementById("home-price-mini-strike");
    if (hmStrike) hmStrike.innerText = formatted.miniStrike;
    const hmActive = document.getElementById("home-price-mini-val");
    if (hmActive) hmActive.innerText = formatted.miniActive;
    const hmPeriod = document.getElementById("home-price-mini-period");
    if (hmPeriod) {
        if (currentLang === "fa") hmPeriod.innerText = "تومان / خرید مادام‌العمر";
        else if (currentLang === "tr") hmPeriod.innerText = "TL / Ömür Boyu Lisans";
        else hmPeriod.innerText = "$ / Lifetime License";
    }

    // Homepage Cloud
    const hcStrike = document.getElementById("home-price-cloud-strike");
    if (hcStrike) hcStrike.innerText = formatted.cloudStrike;
    const hcActive = document.getElementById("home-price-cloud-val");
    if (hcActive) hcActive.innerText = formatted.cloudActive;
    const hcPeriod = document.getElementById("home-price-cloud-period");
    if (hcPeriod) {
        if (currentLang === "fa") hcPeriod.innerText = "تومان / لایسنس دائمی، سال اول خدمات رایگان";
        else if (currentLang === "tr") hcPeriod.innerText = "TL / Ömür Boyu Lisans, İlk Yıl Hizmetler Ücretsiz";
        else hcPeriod.innerText = "$ / Lifetime License, First Year Services Free";
    }

    // Pricing Page Mini
    const pmStrike = document.getElementById("pricing-price-mini-strike");
    if (pmStrike) pmStrike.innerText = formatted.miniStrike;
    const pmActive = document.getElementById("pricing-price-mini-val");
    if (pmActive) {
        pmActive.innerHTML = `${formatted.miniActive} <span>${currency}</span>`;
    }

    // Pricing Page Cloud
    const pcStrike = document.getElementById("pricing-price-cloud-strike");
    if (pcStrike) pcStrike.innerText = formatted.cloudStrike;
    const pcActive = document.getElementById("pricing-price-cloud-val");
    if (pcActive) {
        pcActive.innerHTML = `${formatted.cloudActive} <span>${currency}</span>`;
    }

    // Comparison Table Prices
    const tmPrice = document.getElementById("table-price-mini");
    if (tmPrice) {
        if (currentLang === "fa") tmPrice.innerText = formatted.miniActive + " تومان";
        else if (currentLang === "tr") tmPrice.innerText = "₺" + formatted.miniActive;
        else tmPrice.innerText = "$" + formatted.miniActive;
    }

    const tcPrice = document.getElementById("table-price-cloud");
    if (tcPrice) {
        if (currentLang === "fa") tcPrice.innerText = formatted.cloudActive + " تومان";
        else if (currentLang === "tr") tcPrice.innerText = "₺" + formatted.cloudActive;
        else tcPrice.innerText = "$" + formatted.cloudActive;
    }
}

// Subscribe to language change events from i18n.js
document.addEventListener("langChanged", (e) => {
    currentLang = e.detail.lang;
    
    // Reset/update elements that need translations or text changes
    updateDateTime();
    fetchRates();
    
    // Update currency labels throughout the page
    const currencySymbols = { fa: "تومان", en: "$", tr: "TL" };
    const symbol = currencySymbols[currentLang] || "تومان";
    document.querySelectorAll(".currency-label").forEach(elem => {
        elem.innerText = symbol;
    });

    // Update percent symbol representations globally
    const percentSymbol = currentLang === "fa" ? "٪" : "%";
    document.querySelectorAll(".percent-label").forEach(elem => {
        elem.innerText = percentSymbol;
    });

    // Trigger gold type text display update
    const goldTypeSelect = document.getElementById("calc-gold-type");
    if (goldTypeSelect) {
        goldTypeSelect.dispatchEvent(new Event("change"));
    }
    
    recalculateCartTotals();
    renderInvoiceCart();
    updatePricingDisplay();
    updateVitrinePrices();

});

// --- INITIALIZATION ---
document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    initLangSelector();
    
    // Initialize default language
    const savedLang = localStorage.getItem("goldex-lang") || "fa";
    updateLanguage(savedLang);
    
    initRatesTicker();
    initAiChatSimulator();
    initVitrineShowcase();

    initCalculators();
    initReports();
    initInvoiceCart();
    initBarcodeScanner();
    initMobileMenu();
    
    // Set current date & time on footer/invoice
    updateDateTime();
    setInterval(updateDateTime, 60000);
});

// --- DATE & TIME UPDATE ---
function updateDateTime() {
    const today = new Date();
    const options = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
    
    let timeString, dateString;
    if (currentLang === "fa") {
        timeString = toPersianDigits(today.toLocaleTimeString('fa-IR', options));
        dateString = "۱۴۰۵/۰۳/۰۱"; // Simulated Persian solar date
    } else {
        timeString = today.toLocaleTimeString('en-US', options);
        dateString = "2026/05/21"; // Simulated Gregorian date
    }
    
    const lastUpdateElem = document.getElementById("last-update-time");
    if (lastUpdateElem) lastUpdateElem.innerText = timeString;
    
    const invoiceTimeElem = document.getElementById("invoice-time-today");
    if (invoiceTimeElem) {
        if (currentLang === "fa") {
            invoiceTimeElem.innerText = toPersianDigits(today.toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit', hour12: false }));
        } else {
            invoiceTimeElem.innerText = today.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
        }
    }
    
    const invoiceDateElem = document.getElementById("invoice-date-today");
    if (invoiceDateElem) invoiceDateElem.innerText = dateString;
}

// --- THEME TOGGLE (Luxury Dark / Elegant Pearl) ---
function initTheme() {
    const themeBtn = document.getElementById("theme-toggle-btn");
    const body = document.body;
    
    // Default system checks or local storage
    const savedTheme = localStorage.getItem("goldex-theme") || "dark";
    body.setAttribute("data-theme", savedTheme);
    updateThemeIcon(savedTheme);
    
    if (themeBtn) {
        themeBtn.addEventListener("click", () => {
            const currentTheme = body.getAttribute("data-theme");
            const newTheme = currentTheme === "dark" ? "light" : "dark";
            
            body.setAttribute("data-theme", newTheme);
            localStorage.setItem("goldex-theme", newTheme);
            updateThemeIcon(newTheme);
        });
    }
}

function updateThemeIcon(theme) {
    const themeBtn = document.getElementById("theme-toggle-btn");
    if (!themeBtn) return;
    if (theme === "dark") {
        themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
        themeBtn.setAttribute("title", currentLang === "fa" ? "تغییر به پوسته مروارید روشن" : "Switch to Pearl Light Mode");
    } else {
        themeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
        themeBtn.setAttribute("title", currentLang === "fa" ? "تغییر به پوسته لوکس تیره" : "Switch to Luxury Dark Mode");
    }
}

// --- LIVE RATES TICKER (CLIENT-SIDE SIMULATOR) ---
function initRatesTicker() {
    // Initial update without extra fluctuation
    fetchRates(false);
    // Periodically fluctuate and update rates
    setInterval(() => fetchRates(true), 4500);
}

function fetchRates(shouldFluctuate = true) {
    if (shouldFluctuate) {
        // Random fluctuations matching mock server logic
        const gold18Diff = (Math.random() - 0.48) * 12000;
        const goldMeltDiff = gold18Diff * 4.608 * 0.95;
        const coinEmamiDiff = (Math.random() - 0.5) * 80000;
        const halfCoinDiff = coinEmamiDiff * 0.55;
        const coinQuarterDiff = coinEmamiDiff * 0.33;
        const usdDiff = (Math.random() - 0.5) * 150;
        const aedDiff = usdDiff / 3.67;

        baseRates.gold18 = Math.max(baseRates.gold18 + gold18Diff, 1000);
        baseRates.goldMelt = Math.max(baseRates.goldMelt + goldMeltDiff, 1000);
        baseRates.coinEmami = Math.max(baseRates.coinEmami + coinEmamiDiff, 1000);
        baseRates.coinHalf = Math.max(baseRates.coinHalf + halfCoinDiff, 1000);
        baseRates.coinQuarter = Math.max(baseRates.coinQuarter + coinQuarterDiff, 1000);
        baseRates.usd = Math.max(baseRates.usd + usdDiff, 1000);
        baseRates.aed = Math.max(baseRates.aed + aedDiff, 1000);
    }

    // Convert base rates according to active language/currency
    let data;
    if (currentLang === "fa") {
        data = { ...baseRates };
    } else if (currentLang === "tr") {
        const usdRate = baseRates.usd > 0 ? baseRates.usd : 191000;
        const tryToUsd = 47.75; // Lira per USD rate (191,000 / 47.75 = 4,000 Toman per Lira)
        const tryRate = usdRate / tryToUsd; // Toman per Lira
        data = {
            gold18: Number((baseRates.gold18 / tryRate).toFixed(2)),
            goldMelt: Number((baseRates.goldMelt / tryRate).toFixed(2)),
            coinEmami: Number((baseRates.coinEmami / tryRate).toFixed(2)),
            coinHalf: Number((baseRates.coinHalf / tryRate).toFixed(2)),
            coinQuarter: Number((baseRates.coinQuarter / tryRate).toFixed(2)),
            usd: tryToUsd,
            aed: Number((baseRates.aed / tryRate).toFixed(2))
        };
    } else {
        const usdRate = baseRates.usd > 0 ? baseRates.usd : 191000;
        data = {
            gold18: Number((baseRates.gold18 / usdRate).toFixed(2)),
            goldMelt: Number((baseRates.goldMelt / usdRate).toFixed(2)),
            coinEmami: Number((baseRates.coinEmami / usdRate).toFixed(2)),
            coinHalf: Number((baseRates.coinHalf / usdRate).toFixed(2)),
            coinQuarter: Number((baseRates.coinQuarter / usdRate).toFixed(2)),
            usd: 1.00,
            aed: Number((baseRates.aed / usdRate).toFixed(2))
        };
    }

    // Calculate difference relative to current UI state to trigger the flash animations correctly
    const gold18Diff = data.gold18 - liveRates.gold18;
    const goldMeltDiff = data.goldMelt - liveRates.goldMelt;
    const coinEmamiDiff = data.coinEmami - liveRates.coinEmami;
    const coinHalfDiff = data.coinHalf - liveRates.coinHalf;
    const coinQuarterDiff = data.coinQuarter - liveRates.coinQuarter;
    const usdDiff = data.usd - liveRates.usd;
    const aedDiff = data.aed - liveRates.aed;

    // Update rates and apply UI visual flash cues
    updateRateItem("gold18", gold18Diff, "price-gold-18", "trend-gold-18", 1, "گرم");
    updateRateItem("goldMelt", goldMeltDiff, "price-gold-melt", null, 0, "");
    updateRateItem("coinEmami", coinEmamiDiff, "price-coin-emami", "trend-coin-emami", 1, "سکه");
    updateRateItem("coinHalf", coinHalfDiff, "price-coin-half", null, 0, "");
    updateRateItem("coinQuarter", coinQuarterDiff, null, null, 0, "");
    updateRateItem("usd", usdDiff, "price-usd", "trend-usd", 1, "دلار");
    updateRateItem("aed", aedDiff, "price-aed", null, 0, "");

    // Trigger calculations sync with rate updates
    recalculateGold();
    recalculateReverseBudget();
    recalculateCartTotals();
    renderInvoiceCart();
    updatePricingDisplay();
    updateVitrinePrices();

    updateDateTime();
}

function updateRateItem(key, diff, priceElemId, trendElemId, percentDecimals, unitText) {
    const oldVal = liveRates[key];
    const newVal = Math.max(oldVal + diff, 0.01); // ensure positive
    liveRates[key] = newVal;
    
    const priceElem = document.getElementById(priceElemId);
    if (!priceElem) return;
    
    // Apply flash micro-animation
    const card = priceElem.closest(".rate-card");
    const isUp = diff >= 0;
    
    if (card) {
        const flashClass = isUp ? "flash-up" : "flash-down";
        card.classList.remove("flash-up", "flash-down");
        void card.offsetWidth; // trigger reflow
        card.classList.add(flashClass);
    }
    
    // Update text
    priceElem.innerText = formatCurrencyVal(newVal);
    
    // Update trend indicator if exists
    if (trendElemId) {
        const trendElem = document.getElementById(trendElemId);
        if (trendElem) {
            const percentChange = oldVal > 0 ? (diff / oldVal) * 100 : 0;
            const absolutePercent = Math.abs(percentChange).toFixed(percentDecimals);
            
            trendElem.className = isUp ? "rate-trend up" : "rate-trend down";
            const formattedPercent = currentLang === 'fa' ? toPersianDigits(absolutePercent) : absolutePercent;
            trendElem.innerHTML = `${isUp ? '<i class="fa-solid fa-caret-up"></i>' : '<i class="fa-solid fa-caret-down"></i>'} <span class="num-font">${formattedPercent}%</span>`;
        }
    }
}

// --- INTERACTIVE CALCULATORS LOGIC ---
function initCalculators() {
    const goldType = document.getElementById("calc-gold-type");
    const weightSlider = document.getElementById("calc-weight");
    const wageSlider = document.getElementById("calc-wage");
    const profitSlider = document.getElementById("calc-profit");
    
    if (!goldType || !weightSlider || !wageSlider || !profitSlider) return;
    
    // Synchronize Display Text
    weightSlider.addEventListener("input", (e) => {
        document.getElementById("display-weight").innerText = formatDecimal(e.target.value);
        recalculateGold();
    });
    
    wageSlider.addEventListener("input", (e) => {
        document.getElementById("display-wage").innerText = formatInt(e.target.value);
        recalculateGold();
    });
    
    profitSlider.addEventListener("input", (e) => {
        document.getElementById("display-profit").innerText = formatInt(e.target.value);
        recalculateGold();
    });
    
    goldType.addEventListener("change", () => {
        const typeTexts = {
            fa: {
                "18": "طلای ۱۸ عیار",
                "24": "طلای ۲۴ عیار",
                "melted": "طلای آبشده",
                "used": "طلای کهنه / مستعمل"
            },
            en: {
                "18": "18K Gold (750)",
                "24": "24K Gold (999)",
                "melted": "Melted Gold (Mithqal)",
                "used": "Scrap / Used Gold"
            },
            tr: {
                "18": "18 Ayar Altın (750)",
                "24": "24 Ayar Altın (999)",
                "melted": "Has Altın (Miskal)",
                "used": "Hurda / Kullanılmış Altın"
            }
        };
        const activeDict = typeTexts[currentLang] || typeTexts.fa;
        document.getElementById("display-gold-type").innerText = activeDict[goldType.value];
        recalculateGold();
    });
    
    // Budget calculator sync
    const budgetInput = document.getElementById("calc-budget");
    const budgetSlider = document.getElementById("calc-budget-slider");
    
    if (budgetInput && budgetSlider) {
        budgetInput.addEventListener("input", (e) => {
            let val = parseFloat(e.target.value) || 0;
            budgetSlider.value = Math.min(val, 500000000); // clip slider max
            document.getElementById("display-budget-formatted").innerText = formatCurrency(val);
            recalculateReverseBudget();
        });
        
        budgetSlider.addEventListener("input", (e) => {
            let val = parseFloat(e.target.value);
            budgetInput.value = val;
            document.getElementById("display-budget-formatted").innerText = formatCurrency(val);
            recalculateReverseBudget();
        });
    }
    
    // Initial run
    recalculateGold();
    recalculateReverseBudget();
}

function recalculateGold() {
    const goldTypeElem = document.getElementById("calc-gold-type");
    if (!goldTypeElem) return;
    const goldType = goldTypeElem.value;
    const weight = parseFloat(document.getElementById("calc-weight").value);
    const wagePercent = parseFloat(document.getElementById("calc-wage").value);
    const profitPercent = parseFloat(document.getElementById("calc-profit").value);
    
    // Determine gram rate based on selection
    let baseGramRate = liveRates.gold18;
    if (goldType === "24") {
        baseGramRate = liveRates.gold18 * (24 / 18); // standard gold ratio conversion
    } else if (goldType === "melted") {
        // derived from melted rate (مظنه)
        baseGramRate = liveRates.goldMelt / 4.608;
    } else if (goldType === "used") {
        // scrap gold is bought at a discount
        const scrapDiscount = currentLang === "fa" ? 60000 : (currentLang === "tr" ? 30 : 1);
        baseGramRate = Math.max(liveRates.gold18 - scrapDiscount, 0.01);
    }
    
    // Formula calculations
    const basePrice = weight * baseGramRate;
    const wagePrice = basePrice * (wagePercent / 100);
    const profitPrice = (basePrice + wagePrice) * (profitPercent / 100);
    const taxPrice = (wagePrice + profitPrice) * 0.09; // 9% tax on wages & profits only (Iranian gold tax regulation)
    const totalPrice = basePrice + wagePrice + profitPrice + taxPrice;
    
    // Render outputs
    document.getElementById("res-base-price").innerText = formatCurrencyVal(basePrice);
    document.getElementById("res-wage-price").innerText = formatCurrencyVal(wagePrice);
    document.getElementById("res-profit-price").innerText = formatCurrencyVal(profitPrice);
    document.getElementById("res-tax-price").innerText = formatCurrencyVal(taxPrice);
    document.getElementById("res-total-price").innerText = formatCurrencyVal(totalPrice);
}

function recalculateReverseBudget() {
    const budgetElem = document.getElementById("calc-budget");
    if (!budgetElem) return;
    const budget = parseFloat(budgetElem.value) || 0;
    
    // Calculations based on live active prices
    const rate18 = liveRates.gold18;
    const coinRate = liveRates.coinEmami;
    const quarterRate = liveRates.coinQuarter;
    
    const buyGoldGrams = rate18 > 0 ? budget / rate18 : 0;
    const buyCoins = coinRate > 0 ? budget / coinRate : 0;
    const buyQuarters = quarterRate > 0 ? budget / quarterRate : 0;
    
    document.getElementById("res-buy-gold").innerText = formatDecimal(buyGoldGrams, 3);
    document.getElementById("res-buy-coin").innerText = formatDecimal(buyCoins, 2);
    document.getElementById("res-buy-quarter").innerText = formatDecimal(buyQuarters, 2);
}

// --- BARCODE SCANNER MOCKUP ---
function initBarcodeScanner() {
    const btnScan = document.getElementById("btn-simulate-scan");
    const scanResult = document.getElementById("scan-result-display");
    
    if (!btnScan || !scanResult) return;
    
    btnScan.addEventListener("click", () => {
        // Trigger scanning effect
        const laser = document.querySelector(".scan-laser");
        if (laser) laser.style.animationPlayState = "running";
        
        btnScan.disabled = true;
        btnScan.innerHTML = currentLang === "fa" ? '<i class="fa-solid fa-spinner fa-spin"></i> در حال اسکن بارکد...' : (currentLang === "tr" ? '<i class="fa-solid fa-spinner fa-spin"></i> Barkod taranıyor...' : '<i class="fa-solid fa-spinner fa-spin"></i> Scanning barcode...');
        
        setTimeout(() => {
            // Pick selected item details
            const itemSelect = document.getElementById("scan-item-select");
            const selectedOption = itemSelect.options[itemSelect.selectedIndex];
            
            const weight = parseFloat(selectedOption.getAttribute("data-weight"));
            const wage = parseFloat(selectedOption.getAttribute("data-wage"));
            const profit = parseFloat(selectedOption.getAttribute("data-profit"));
            
            // Calculate item price with active 18k rate
            const baseGramRate = liveRates.gold18;
            const basePrice = weight * baseGramRate;
            const wagePrice = basePrice * (wage / 100);
            const profitPrice = (basePrice + wagePrice) * (profit / 100);
            const taxPrice = (wagePrice + profitPrice) * 0.09;
            const totalPrice = basePrice + wagePrice + profitPrice + taxPrice;
            
            // Handle translated names for the scanned items
            let desc = selectedOption.text;
            if (currentLang !== "fa") {
                const itemIndex = itemSelect.selectedIndex;
                const enNames = [
                    "18K Gold Link Chain Bracelet",
                    "Fancy Diamond Flower Ring",
                    "Damas Yellow Gold Bangle"
                ];
                const trNames = [
                    "18 Ayar Altın Zincir Bileklik",
                    "Fantezi Pırlanta Çiçek Yüzük",
                    "Damas Sarı Altın Kelepçe"
                ];
                desc = currentLang === "tr" ? trNames[itemIndex] : enNames[itemIndex];
            }
            
            // Update scanning UI
            document.getElementById("scan-res-desc").innerText = desc;
            document.getElementById("scan-res-weight").innerText = formatDecimal(weight);
            document.getElementById("scan-res-wage").innerText = formatInt(wage) + "%";
            document.getElementById("scan-res-total").innerText = formatCurrencyVal(totalPrice);
            
            if (scanResult) scanResult.style.display = "block";
            
            btnScan.disabled = false;
            btnScan.innerHTML = currentLang === "fa" ? '<i class="fa-solid fa-expand"></i> اسکن مجدد بارکد کالا' : (currentLang === "tr" ? '<i class="fa-solid fa-expand"></i> Barkodu Tekrar Tara' : '<i class="fa-solid fa-expand"></i> Scan Barcode Again');
        }, 1200);
    });
}

// --- DYNAMIC REPORTS & CHART MOCKUP TAB SWITCHER ---
function initReports() {
    const tabBtns = document.querySelectorAll(".report-tab-btn");
    
    tabBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            // Toggle active state in buttons
            tabBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            
            const activeTab = btn.getAttribute("data-tab");
            
            // Show corresponding content block
            const contents = document.querySelectorAll(".tab-content");
            contents.forEach(c => c.style.display = "none");
            
            const selectedContent = document.getElementById(`tab-${activeTab}-content`);
            if (selectedContent) {
                selectedContent.style.display = "block";
                
                // If it is the capital chart tab, trigger small bar raising animation
                if (activeTab === "capital") {
                    const bars = selectedContent.querySelectorAll(".chart-bar");
                    bars.forEach(bar => {
                        const originalHeight = bar.style.height;
                        bar.style.height = "0";
                        setTimeout(() => {
                            bar.style.height = originalHeight;
                        }, 50);
                    });
                }
            }
        });
    });
}

// --- GOLDEX MINI: INVOICE CART MANAGEMENT ---
function initInvoiceCart() {
    const btnAddItem = document.getElementById("btn-add-invoice-item");
    const btnPrint = document.getElementById("btn-trigger-print-modal");
    
    if (btnAddItem && btnPrint) {
        btnAddItem.addEventListener("click", () => {
            const itemType = document.getElementById("invoice-item-type").value;
            const weightOrQty = parseFloat(document.getElementById("invoice-item-weight").value) || 0;
            
            if (weightOrQty <= 0) return;
            
            let rateText = "-";
            if (itemType === "طلا ۱۸ عیار") {
                rateText = "19%";
            }
            
            const newItem = {
                id: 'item-' + Date.now(),
                type: itemType,
                rateText: rateText,
                rawWeight: weightOrQty
            };
            
            invoiceCart.push(newItem);
            recalculateCartTotals();
            renderInvoiceCart();
        });
        
        btnPrint.addEventListener("click", () => {
            prepareInvoicePrint();
            togglePrintModal();
        });
    }
    
    // Modal Close
    const btnCloseModal = document.getElementById("btn-close-print-modal");
    if (btnCloseModal) btnCloseModal.addEventListener("click", togglePrintModal);
    const btnCloseSecondary = document.getElementById("btn-modal-close-secondary");
    if (btnCloseSecondary) btnCloseSecondary.addEventListener("click", togglePrintModal);
    
    const btnPrintReal = document.getElementById("btn-modal-print-real");
    if (btnPrintReal) {
        btnPrintReal.addEventListener("click", () => {
            window.print();
        });
    }
    
    // Initial Render
    renderInvoiceCart();
}

function removeInvoiceItem(id) {
    invoiceCart = invoiceCart.filter(item => item.id !== id);
    renderInvoiceCart();
}

// Attach remove function globally so elements can click it
window.removeInvoiceItem = removeInvoiceItem;

function renderInvoiceCart() {
    const container = document.getElementById("invoice-rows-container");
    if (!container) return;
    
    container.innerHTML = "";
    let grandTotal = 0;
    
    invoiceCart.forEach(item => {
        grandTotal += item.total;
        
        const row = document.createElement("div");
        row.className = "invoice-item-row";
        
        const qtyDisplay = currentLang === "fa" ? toPersianDigits(item.qtyText) : item.qtyText;
        const rateDisplay = currentLang === "fa" ? toPersianDigits(item.rateText) : item.rateText;
        const totalDisplay = formatCurrencyVal(item.total);
        
        row.innerHTML = `
            <span>${item.desc}</span>
            <span style="text-align: center;" class="num-font">${qtyDisplay}</span>
            <span style="text-align: center;" class="num-font">${rateDisplay}</span>
            <span style="text-align: left;" class="num-font">${totalDisplay}</span>
            <button class="btn-remove-item" onclick="removeInvoiceItem('${item.id}')"><i class="fa-solid fa-trash-can"></i></button>
        `;
        container.appendChild(row);
    });
    
    const totalElem = document.getElementById("invoice-cart-total");
    if (totalElem) totalElem.innerText = formatCurrencyVal(grandTotal);
}

// --- PRINT PREPARE & MODAL OVERLAY ---
function togglePrintModal() {
    const modal = document.getElementById("receipt-modal-container");
    if (!modal) return;
    const isActive = modal.classList.contains("active");
    
    if (isActive) {
        modal.classList.remove("active");
        setTimeout(() => { modal.style.display = "none"; }, 300);
    } else {
        modal.style.display = "flex";
        setTimeout(() => { modal.classList.add("active"); }, 20);
    }
}

function prepareInvoicePrint() {
    const tbody = document.getElementById("a5-table-rows");
    if (!tbody) return;
    tbody.innerHTML = "";
    
    let grandTotal = 0;
    let totalWeight = 0;
    let idx = 1;
    
    invoiceCart.forEach(item => {
        grandTotal += item.total;
        totalWeight += item.rawWeight;
        
        const tr = document.createElement("tr");
        const idxDisplay = formatInt(idx++);
        const qtyDisplay = currentLang === "fa" ? toPersianDigits(item.qtyText) : item.qtyText;
        const rateDisplay = currentLang === "fa" ? toPersianDigits(item.rateText) : item.rateText;
        const totalDisplay = formatCurrencyVal(item.total);
        
        tr.innerHTML = `
            <td class="num-font">${idxDisplay}</td>
            <td style="text-align: right;">${item.desc}</td>
            <td class="num-font">${qtyDisplay}</td>
            <td class="num-font">${rateDisplay}</td>
            <td class="num-font" style="text-align: left;">${totalDisplay}</td>
        `;
        tbody.appendChild(tr);
    });
    
    // Injections to A5 Form Summary
    const weightDisplay = document.getElementById("a5-total-weight-display");
    if (weightDisplay) weightDisplay.innerText = formatDecimal(totalWeight);
    const rateDisplay = document.getElementById("a5-today-gold-rate");
    if (rateDisplay) rateDisplay.innerText = formatCurrencyVal(liveRates.gold18);
    const grandTotalDisplay = document.getElementById("a5-grand-total-display");
    if (grandTotalDisplay) grandTotalDisplay.innerText = formatCurrencyVal(grandTotal);
}

// --- MOBILE HAMBURGER MENU TOGGLE ---
function initMobileMenu() {
    const menuToggle = document.getElementById("mobile-menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            menuToggle.classList.toggle("active");
            navLinks.classList.toggle("active");
        });
        
        // Close menu when clicking on any link
        const links = navLinks.querySelectorAll("a");
        links.forEach(link => {
            link.addEventListener("click", () => {
                menuToggle.classList.remove("active");
                navLinks.classList.remove("active");
            });
        });
    }
}


// --- AI CHAT SIMULATOR ENGINE ---
function initAiChatSimulator() {
    const chatBody = document.getElementById("ai-chat-body");
    const promptBtns = document.querySelectorAll(".prompt-btn");
    const userInput = document.getElementById("ai-user-input");
    const sendBtn = document.getElementById("btn-ai-send");
    
    if (!chatBody) return;

    function appendUserMessage(text) {
        const msgDiv = document.createElement("div");
        msgDiv.className = "chat-msg user";
        msgDiv.innerHTML = `
            <div class="chat-avatar-mini user-icon"><i class="fa-solid fa-user"></i></div>
            <div class="msg-bubble"><p>${text}</p></div>
        `;
        chatBody.appendChild(msgDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function appendBotTyping() {
        const typingDiv = document.createElement("div");
        typingDiv.className = "chat-msg bot typing-indicator";
        typingDiv.id = "ai-typing-msg";
        typingDiv.innerHTML = `
            <div class="chat-avatar-mini bot-icon"><i class="fa-solid fa-wand-magic-sparkles"></i></div>
            <div class="msg-bubble">
                <div class="typing-dots">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
            </div>
        `;
        chatBody.appendChild(typingDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function removeBotTyping() {
        const typingDiv = document.getElementById("ai-typing-msg");
        if (typingDiv) typingDiv.remove();
    }

    function appendBotMessage(htmlContent) {
        removeBotTyping();
        const msgDiv = document.createElement("div");
        msgDiv.className = "chat-msg bot";
        msgDiv.innerHTML = `
            <div class="chat-avatar-mini bot-icon"><i class="fa-solid fa-wand-magic-sparkles"></i></div>
            <div class="msg-bubble">${htmlContent}</div>
        `;
        chatBody.appendChild(msgDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    
    function triggerAiResponse(type) {
        appendBotTyping();
        
        setTimeout(() => {
            const currentGoldRate = liveRates.gold18;
            const isFa = currentLang === "fa";
            const isTr = currentLang === "tr";
            const currSymbol = isFa ? "تومان" : (isTr ? "TL" : "$");
            const gramUnit = isFa ? "گرم" : (isTr ? "gram" : "g");
            
            if (type === "invoice") {
                const weight = 5.80;
                const basePrice = Math.round(weight * currentGoldRate);
                const wageAmt = Math.round(basePrice * 0.16);
                const profitAmt = Math.round(basePrice * 0.07);
                const taxAmt = Math.round((wageAmt + profitAmt) * 0.09);
                const total = basePrice + wageAmt + profitAmt + taxAmt;

                let title = isFa ? "✅ <strong>فاکتور رسمی فروش طلا با موفقیت در سیستم ثبت گردید:</strong>" :
                            (isTr ? "✅ <strong>Resmi altın satış faturası sisteme başarıyla kaydedildi:</strong>" :
                            "✅ <strong>Official gold sales invoice successfully generated:</strong>");
                
                let buyerLabel = isFa ? "خریدار:" : (isTr ? "Müşteri:" : "Buyer:");
                let buyerVal = isFa ? "خانم دکتر کریمی" : (isTr ? "Dr. Kerimi" : "Dr. Karimi");
                let itemLabel = isFa ? "شرح کالا:" : (isTr ? "Ürün:" : "Item:");
                let itemVal = isFa ? "دستبند کارتیه لوکس ۱۸ عیار (۷۵۰)" : (isTr ? "Cartier Lüks Füzyon Bileklik 18K" : "Cartier Luxury Fusion Bracelet 18K (750)");
                let weightLabel = isFa ? "وزن خالص طلا:" : (isTr ? "Net Altın Ağırlığı:" : "Net Gold Weight:");
                let rateLabel = isFa ? "نرخ لحظه‌ای طلا:" : (isTr ? "Anlık Altın Kuru:" : "Live Gold Rate:");
                let wageLabel = isFa ? "اجرت ساخت (۱۶٪) + سود (۷٪):" : (isTr ? "İşçilik (%16) + Kâr (%7):" : "Labor (16%) + Profit (7%):");
                let taxLabel = isFa ? "مالیات بر ارزش افزوده (۹٪):" : (isTr ? "KDV (%9):" : "VAT / Tax (9%):");
                let totalLabel = isFa ? "مبلغ کل فاکتور:" : (isTr ? "Fatura Toplam Tutarı:" : "Grand Total:");
                let payLabel = isFa ? "نحوه تسویه:" : (isTr ? "Ödeme Yöntemi:" : "Payment Settlement:");
                let payVal = isFa ? "کارت‌خوان (پوز) شعبه مرکزی - تسویه کامل" : (isTr ? "Merkez Şube POS Cihazı - Tam Ödeme" : "Central POS Terminal - Fully Settled");
                let btnText = isFa ? "مشاهده و چاپ مستقیم PDF فاکتور" : (isTr ? "PDF Faturayı Gör ve Yazdır" : "View & Print Official PDF Invoice");

                const responseHtml = `
                    <p>${title}</p>
                    <div class="ai-invoice-card">
                        <div class="ai-invoice-row">
                            <span>${buyerLabel}</span>
                            <strong>${buyerVal}</strong>
                        </div>
                        <div class="ai-invoice-row">
                            <span>${itemLabel}</span>
                            <span>${itemVal}</span>
                        </div>
                        <div class="ai-invoice-row">
                            <span>${weightLabel}</span>
                            <span class="num-font">${formatDecimal(weight)} ${gramUnit}</span>
                        </div>
                        <div class="ai-invoice-row">
                            <span>${rateLabel}</span>
                            <span class="num-font">${formatCurrencyVal(currentGoldRate)} ${currSymbol}</span>
                        </div>
                        <div class="ai-invoice-row">
                            <span>${wageLabel}</span>
                            <span class="num-font">${formatCurrencyVal(wageAmt + profitAmt)} ${currSymbol}</span>
                        </div>
                        <div class="ai-invoice-row">
                            <span>${taxLabel}</span>
                            <span class="num-font">${formatCurrencyVal(taxAmt)} ${currSymbol}</span>
                        </div>
                        <div class="ai-invoice-row ai-invoice-total">
                            <span>${totalLabel}</span>
                            <span class="num-font">${formatCurrencyVal(total)} ${currSymbol}</span>
                        </div>
                        <div class="ai-invoice-row" style="color: var(--accent-green); font-weight:700;">
                            <span>${payLabel}</span>
                            <span>${payVal}</span>
                        </div>
                    </div>
                    <div class="ai-card-actions">
                        <button class="btn-ai-action" onclick="togglePrintModal()"><i class="fa-solid fa-file-pdf"></i> ${btnText}</button>
                    </div>
                `;
                appendBotMessage(responseHtml);
            } else if (type === "balance") {
                let title = isFa ? "📊 <strong>استعلام لحظه‌ای وضعیت حساب مشتری:</strong>" :
                            (isTr ? "📊 <strong>Anlık müşteri cari bakiye sorgusu:</strong>" :
                            "📊 <strong>Real-time customer account balance statement:</strong>");
                let nameLabel = isFa ? "نام طرف حساب:" : (isTr ? "Cari Ünvanı:" : "Account Name:");
                let nameVal = isFa ? "جناب آقای رضایی (همکار صنف طلا)" : (isTr ? "Rezai Kuyumculuk (Kapalıçarşı)" : "Mr. Rezaei (Jewelry Market Partner)");
                let goldBalLabel = isFa ? "تراز وزن طلای ۱۸ عیار:" : (isTr ? "18K Altın Bakiyesi:" : "18K Gold Balance:");
                let goldBalVal = isFa ? "۳۲۰.۲۵۰ گرم (بستانکار)" : (isTr ? "320.250 g (Alacaklı)" : "320.250 g (Creditor)");
                let cashBalLabel = isFa ? "تراز حساب ریالی:" : (isTr ? "Nakit Para Bakiyesi:" : "Cash Balance:");
                let cashBalVal = isFa ? "۴۵,۰۰۰,۰۰۰ تومان (بدهکار)" : (isTr ? "45.000.000 TL (Borçlu)" : "$45,000 (Debtor)");
                let txLabel = isFa ? "آخرین تراکنش:" : (isTr ? "Son İşlem:" : "Latest Transaction:");
                let txVal = isFa ? "حواله بین مشتریان مورخ دیروز - سند #TR-۸۹۲" : (isTr ? "Müşteriler Arası Havale Dün - Fiş #TR-892" : "Customer Remittance Yesterday - #TR-892");
                let credLabel = isFa ? "وضعیت اعتباری:" : (isTr ? "Kredi Durumu:" : "Credit Standing:");
                let credVal = isFa ? "معتبر و خوش‌حساب" : (isTr ? "Güvenilir & Yüksek Kredi" : "Excellent & Highly Trusted");
                let btnText = isFa ? "دریافت ریز گردش حساب" : (isTr ? "Hesap Ekstresini İndir" : "Download Detailed Statement");
                let alertText = isFa ? "صورتحساب کامل مشتری استخراج شد." : (isTr ? "Müşteri hesap ekstresi hazırlandı." : "Client statement generated successfully.");

                const responseHtml = `
                    <p>${title}</p>
                    <div class="ai-invoice-card">
                        <div class="ai-invoice-row">
                            <span>${nameLabel}</span>
                            <strong>${nameVal}</strong>
                        </div>
                        <div class="ai-invoice-row">
                            <span>${goldBalLabel}</span>
                            <span class="num-font text-gold" style="font-weight:800;">${goldBalVal}</span>
                        </div>
                        <div class="ai-invoice-row">
                            <span>${cashBalLabel}</span>
                            <span class="num-font" style="color: var(--accent-red); font-weight:800;">${cashBalVal}</span>
                        </div>
                        <div class="ai-invoice-row">
                            <span>${txLabel}</span>
                            <span>${txVal}</span>
                        </div>
                        <div class="ai-invoice-row">
                            <span>${credLabel}</span>
                            <span style="color: var(--accent-green); font-weight:700;">${credVal}</span>
                        </div>
                    </div>
                    <div class="ai-card-actions">
                        <button class="btn-ai-action" onclick="alert('${alertText}')"><i class="fa-solid fa-list-check"></i> ${btnText}</button>
                    </div>
                `;
                appendBotMessage(responseHtml);
            } else if (type === "growth") {
                let title = isFa ? "📈 <strong>تحلیل هوشمند مقایسه‌ای عملکرد فروش گالری:</strong>" :
                            (isTr ? "📈 <strong>Galeri satış performansı yapay zeka analizi:</strong>" :
                            "📈 <strong>AI Comparative Gallery Sales Growth Analysis:</strong>");
                let gLabel = isFa ? "رشد کل فروش ماه جاری:" : (isTr ? "Bu Ayki Toplam Satış Büyümesi:" : "Current Month Total Growth:");
                let wtLabel = isFa ? "وزن کل طلای فروخته‌شده:" : (isTr ? "Satılan Toplam Altın Ağırlığı:" : "Total Sold Gold Weight:");
                let wtVal = isFa ? "۳,۴۲۰ گرم (۵۲۰ گرم بیشتر از ماه قبل)" : (isTr ? "3.420 g (Geçen aya göre +520 g)" : "3,420 g (+520 g compared to last month)");
                let invCountLabel = isFa ? "تعداد کل فاکتورها:" : (isTr ? "Toplam Fatura Sayısı:" : "Total Invoices Issued:");
                let invCountVal = isFa ? "۱۴۸ فقره (میانگین هر فاکتور: ۲۳.۱ گرم)" : (isTr ? "148 adet (Fatura ortalaması: 23.1 g)" : "148 invoices (Avg: 23.1 g per invoice)");
                let topLabel = isFa ? "پرفروش‌ترین رده محصولات:" : (isTr ? "En Çok Satan Kategori:" : "Top Performing Category:");
                let topVal = isFa ? "النگو و دستبندهای سبک فیوژن (زیر ۱۰ گرم)" : (isTr ? "Hafif Füzyon Bilezik ve Kelepçeler (<10g)" : "Lightweight Fusion Bangles (<10g)");
                let tip = isFa ? "💡 <strong>پیشنهاد هوشمند:</strong> تقاضا برای کارهای سبک بدون اجرت بالا در حال افزایش است؛ پیشنهاد می‌شود موجودی کالکشن‌های ۵ تا ۸ گرمی را شارژ نمایید." :
                         (isTr ? "💡 <strong>Akıllı Öneri:</strong> Düşük işçilikli hafif takılara olan talep artışta; 5-8 gramlık koleksiyon stoklarını artırmanız tavsiye edilir." :
                         "💡 <strong>Smart Insight:</strong> Demand for lightweight collections is surging (+22%); we recommend restocking 5-8g fashion pieces.");

                const responseHtml = `
                    <p>${title}</p>
                    <div class="ai-invoice-card">
                        <div class="ai-invoice-row">
                            <span>${gLabel}</span>
                            <span class="num-font" style="color: var(--accent-green); font-weight:800;">+28.4% 🚀</span>
                        </div>
                        <div class="ai-invoice-row">
                            <span>${wtLabel}</span>
                            <span class="num-font">${wtVal}</span>
                        </div>
                        <div class="ai-invoice-row">
                            <span>${invCountLabel}</span>
                            <span class="num-font">${invCountVal}</span>
                        </div>
                        <div class="ai-invoice-row">
                            <span>${topLabel}</span>
                            <span>${topVal}</span>
                        </div>
                    </div>
                    <p style="margin-top: 8px; font-size: 0.88rem; color: var(--accent-gold);">
                        ${tip}
                    </p>
                `;
                appendBotMessage(responseHtml);
            } else if (type === "melt") {
                const weightRaw = 120.0;
                const assay = 740;
                const equivalent750 = (weightRaw * assay) / 750;
                const mithqalPrice = liveRates.goldMelt;
                const totalMeltVal = Math.round(equivalent750 * (mithqalPrice / 4.608));

                let title = isFa ? "🔥 <strong>محاسبه دقیق آزمایشگاهی و ارزش‌گذاری طلای آب‌شده:</strong>" :
                            (isTr ? "🔥 <strong>Has altın ramat ve ayar hesaplama raporu:</strong>" :
                            "🔥 <strong>Melted Gold Assay & 750 Standard Valuation:</strong>");
                let rawLabel = isFa ? "وزن طلای ورودی به کوره:" : (isTr ? "Eritmeye Giren Ham Altın:" : "Input Gold Weight:");
                let assayLabel = isFa ? "عیار ری‌گیری آزمایشگاه:" : (isTr ? "Laboratuvar Ayarı (Ramat):" : "Laboratory Assay Fineness:");
                let eqLabel = isFa ? "معادل استاندارد ۱۸ عیار (۷۵۰):" : (isTr ? "Standart 18 Ayar (750) Karşılığı:" : "Standard 18K (750) Equivalent:");
                let rateLabel = isFa ? "مظنه مثقال آبشده مبنا:" : (isTr ? "Baz Has Altın Fiyatı:" : "Base Melt Gold Rate:");
                let totalLabel = isFa ? "ارزش ریالی نهایی شمش آبشده:" : (isTr ? "Nihai Külçe Toplam Değeri:" : "Total Valuation Value:");

                const responseHtml = `
                    <p>${title}</p>
                    <div class="ai-invoice-card">
                        <div class="ai-invoice-row">
                            <span>${rawLabel}</span>
                            <span class="num-font">${formatDecimal(weightRaw)} ${gramUnit}</span>
                        </div>
                        <div class="ai-invoice-row">
                            <span>${assayLabel}</span>
                            <span class="num-font">${formatInt(assay)}</span>
                        </div>
                        <div class="ai-invoice-row">
                            <span>${eqLabel}</span>
                            <strong class="num-font text-gold">${formatDecimal(equivalent750)} ${gramUnit}</strong>
                        </div>
                        <div class="ai-invoice-row">
                            <span>${rateLabel}</span>
                            <span class="num-font">${formatCurrencyVal(mithqalPrice)} ${currSymbol}</span>
                        </div>
                        <div class="ai-invoice-row ai-invoice-total">
                            <span>${totalLabel}</span>
                            <span class="num-font">${formatCurrencyVal(totalMeltVal)} ${currSymbol}</span>
                        </div>
                    </div>
                `;
                appendBotMessage(responseHtml);
            } else {
                let genMsg = isFa ? "<p>دستور شما دریافت شد! سیستم هوشمند گلدکس به صورت خودکار با پایگاه داده گالری و نرخ زنده طلا همگام است و پردازش‌های لازم را برای شما در کسری از ثانیه انجام می‌دهد.</p>" :
                            (isTr ? "<p>Komutunuz alındı! GoldEx yapay zeka sistemi mağaza veritabanı ve canlı altın kurları ile senkronize olarak saniyeler içinde işlemi tamamlar.</p>" :
                            "<p>Command received! GoldEx AI is synchronized with your vault database and live rates to process requests in milliseconds.</p>");
                appendBotMessage(genMsg);
            }
        }, 700);
    }

    promptBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            promptBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            
            const promptType = btn.getAttribute("data-prompt");
            appendUserMessage(btn.innerText.replace(/^[✨💰📈🔥]\s*/, ""));
            triggerAiResponse(promptType);
        });
    });

    if (sendBtn && userInput) {
        const handleSend = () => {
            const text = userInput.value.trim();
            if (!text) return;
            appendUserMessage(text);
            userInput.value = "";
            
            
            const t = text.toLowerCase();
            if (t.includes("فاکتور") || t.includes("فروش") || t.includes("خرید") || t.includes("invoice") || t.includes("sell") || t.includes("buy") || t.includes("fatura")) {
                triggerAiResponse("invoice");
            } else if (t.includes("مانده") || t.includes("حساب") || t.includes("طلب") || t.includes("balance") || t.includes("account") || t.includes("bakiye")) {
                triggerAiResponse("balance");
            } else if (t.includes("رشد") || t.includes("سود") || t.includes("گزارش") || t.includes("growth") || t.includes("sales") || t.includes("büyüme")) {
                triggerAiResponse("growth");
            } else if (t.includes("ذوب") || t.includes("آبشده") || t.includes("عیار") || t.includes("melt") || t.includes("assay") || t.includes("has")) {
                triggerAiResponse("melt");
            } else {
                triggerAiResponse("general");
            }
        };

        sendBtn.addEventListener("click", handleSend);
        userInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") handleSend();
        });
    }
}

// --- VITRINE SHOWCASE & LIVE PRICES ---
function updateVitrinePrices() {
    const currentGoldRate = liveRates.gold18;
    const cards = document.querySelectorAll(".vitrine-card");
    
    cards.forEach(card => {
        const weight = parseFloat(card.getAttribute("data-weight")) || 1;
        const wage = parseFloat(card.getAttribute("data-wage")) || 0;
        const profit = parseFloat(card.getAttribute("data-profit")) || 7;
        
        const basePrice = weight * currentGoldRate;
        const wageAmt = basePrice * (wage / 100);
        const profitAmt = basePrice * (profit / 100);
        const taxAmt = (wageAmt + profitAmt) * 0.09;
        const total = Math.round(basePrice + wageAmt + profitAmt + taxAmt);
        
        const priceElem = card.querySelector(".v-price");
        if (priceElem) {
            priceElem.innerHTML = `${formatCurrencyVal(total)} <span style="font-size: 0.85rem;" class="currency-label">${currentLang === "fa" ? "تومان" : (currentLang === "tr" ? "TL" : "$")}</span>`;
        }
    });
}

function initVitrineShowcase() {
    updateVitrinePrices();
    
    const filterBtns = document.querySelectorAll(".vitrine-filter-btn");
    const cards = document.querySelectorAll(".vitrine-card");
    
    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            filterBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            
            const cat = btn.getAttribute("data-cat");
            cards.forEach(card => {
                if (cat === "all" || card.getAttribute("data-category") === cat) {
                    card.style.display = "flex";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });
}
