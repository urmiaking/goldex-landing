// --- GLOBAL STATES & CONSTANTS ---
let liveRates = {
    gold18: 3720000,
    goldMelt: 16115000,
    coinEmami: 42850000,
    coinHalf: 24100000,
    coinQuarter: 14550000,
    usd: 61500,
    aed: 16750
};

let invoiceCart = [
    { id: 'item-default-1', desc: 'دستبند / زنجیر طلای ۱۸ عیار', qtyText: '۴.۲۵ گرم', rateText: '۱۹٪', total: 19203000, rawWeight: 4.25 },
    { id: 'item-default-2', desc: 'سکه تمام بهار آزادی', qtyText: '۱ عدد', rateText: '-', total: 42850000, rawWeight: 0 }
];

// Formatting helper: Add commas to numbers
function formatNum(num) {
    return Math.round(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Convert numbers to Persian digits (for beautiful localized display)
function toPersianDigits(str) {
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return str.toString().replace(/[0-9]/g, function (w) {
        return persianDigits[+w];
    });
}

// Format currency to Persian localized string
function formatPersianCurrency(val) {
    return toPersianDigits(formatNum(val));
}

// --- INITIALIZATION ---
document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    initRatesTicker();
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
    
    // Simulating Persian Solar Date for absolute realism (e.g. 1405/03/01)
    // 2026 May 21st is approximately Solar Hijri 1405/03/01 (Khordad)
    const options = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
    const timeString = today.toLocaleTimeString('fa-IR', options);
    
    const lastUpdateElem = document.getElementById("last-update-time");
    if (lastUpdateElem) lastUpdateElem.innerText = timeString;
    
    const invoiceTimeElem = document.getElementById("invoice-time-today");
    if (invoiceTimeElem) invoiceTimeElem.innerText = today.toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit', hour12: false });
    
    const invoiceDateElem = document.getElementById("invoice-date-today");
    if (invoiceDateElem) invoiceDateElem.innerText = "۱۴۰۵/۰۳/۰۱"; // Perfect Persian Date simulation matching current simulated time (2026 May)
}

// --- THEME TOGGLE (Luxury Dark / Elegant Pearl) ---
function initTheme() {
    const themeBtn = document.getElementById("theme-toggle-btn");
    const body = document.body;
    
    // Default system checks or local storage
    const savedTheme = localStorage.getItem("goldex-theme") || "dark";
    body.setAttribute("data-theme", savedTheme);
    updateThemeIcon(savedTheme);
    
    themeBtn.addEventListener("click", () => {
        const currentTheme = body.getAttribute("data-theme");
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        
        body.setAttribute("data-theme", newTheme);
        localStorage.setItem("goldex-theme", newTheme);
        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
    const themeBtn = document.getElementById("theme-toggle-btn");
    if (theme === "dark") {
        themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
        themeBtn.setAttribute("title", "تغییر به پوسته مروارید روشن");
    } else {
        themeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
        themeBtn.setAttribute("title", "تغییر به پوسته لوکس تیره");
    }
}

// --- LIVE RATES TICKER FROM BACKEND ---
function initRatesTicker() {
    // Initial fetch
    fetchRates();
    // Periodically poll rates from backend
    setInterval(fetchRates, 4500);
}

async function fetchRates() {
    try {
        const response = await fetch('/api/rates');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
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
        // coinQuarter and others are updated in local state too via updateRateItem:
        updateRateItem("coinQuarter", coinQuarterDiff, null, null, 0, "");
        updateRateItem("usd", usdDiff, "price-usd", "trend-usd", 1, "دلار");
        updateRateItem("aed", aedDiff, "price-aed", null, 0, "");
        
        // Trigger calculations sync with rate updates
        recalculateGold();
        recalculateReverseBudget();
        updateDateTime();
    } catch (err) {
        console.error("Failed to fetch live rates from server:", err);
    }
}

function updateRateItem(key, diff, priceElemId, trendElemId, percentDecimals, unitText) {
    const oldVal = liveRates[key];
    const newVal = Math.max(oldVal + diff, 1000); // ensure positive
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
    priceElem.innerText = toPersianDigits(formatNum(newVal));
    
    // Update trend indicator if exists
    if (trendElemId) {
        const trendElem = document.getElementById(trendElemId);
        if (trendElem) {
            const percentChange = (diff / oldVal) * 100;
            const absolutePercent = Math.abs(percentChange).toFixed(percentDecimals);
            
            trendElem.className = isUp ? "rate-trend up" : "rate-trend down";
            trendElem.innerHTML = `${isUp ? '<i class="fa-solid fa-caret-up"></i>' : '<i class="fa-solid fa-caret-down"></i>'} <span class="num-font">${toPersianDigits(absolutePercent)}٪</span>`;
        }
    }
}

// --- INTERACTIVE CALCULATORS LOGIC ---
function initCalculators() {
    const goldType = document.getElementById("calc-gold-type");
    const weightSlider = document.getElementById("calc-weight");
    const wageSlider = document.getElementById("calc-wage");
    const profitSlider = document.getElementById("calc-profit");
    
    // Synchronize Display Text
    weightSlider.addEventListener("input", (e) => {
        document.getElementById("display-weight").innerText = toPersianDigits(parseFloat(e.target.value).toFixed(2));
        recalculateGold();
    });
    
    wageSlider.addEventListener("input", (e) => {
        document.getElementById("display-wage").innerText = toPersianDigits(e.target.value);
        recalculateGold();
    });
    
    profitSlider.addEventListener("input", (e) => {
        document.getElementById("display-profit").innerText = toPersianDigits(e.target.value);
        recalculateGold();
    });
    
    goldType.addEventListener("change", () => {
        const typeTexts = {
            "18": "طلای ۱۸ عیار",
            "24": "طلای ۲۴ عیار",
            "melted": "طلای آبشده",
            "used": "طلای کهنه / مستعمل"
        };
        document.getElementById("display-gold-type").innerText = typeTexts[goldType.value];
        recalculateGold();
    });
    
    // Budget calculator sync
    const budgetInput = document.getElementById("calc-budget");
    const budgetSlider = document.getElementById("calc-budget-slider");
    
    budgetInput.addEventListener("input", (e) => {
        let val = parseFloat(e.target.value) || 0;
        budgetSlider.value = Math.min(val, 500000000); // clip slider max
        document.getElementById("display-budget-formatted").innerText = formatPersianCurrency(val) + " تومان";
        recalculateReverseBudget();
    });
    
    budgetSlider.addEventListener("input", (e) => {
        let val = parseFloat(e.target.value);
        budgetInput.value = val;
        document.getElementById("display-budget-formatted").innerText = formatPersianCurrency(val) + " تومان";
        recalculateReverseBudget();
    });
    
    // Initial run
    recalculateGold();
    recalculateReverseBudget();
}

function recalculateGold() {
    const goldType = document.getElementById("calc-gold-type").value;
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
        baseGramRate = liveRates.gold18 - 60000; // scrap gold is bought at a discount
    }
    
    // Formula calculations
    const basePrice = weight * baseGramRate;
    const wagePrice = basePrice * (wagePercent / 100);
    const profitPrice = (basePrice + wagePrice) * (profitPercent / 100);
    const taxPrice = (wagePrice + profitPrice) * 0.09; // 9% tax on wages & profits only (Iranian gold tax regulation)
    const totalPrice = basePrice + wagePrice + profitPrice + taxPrice;
    
    // Render outputs
    document.getElementById("res-base-price").innerText = toPersianDigits(formatNum(basePrice));
    document.getElementById("res-wage-price").innerText = toPersianDigits(formatNum(wagePrice));
    document.getElementById("res-profit-price").innerText = toPersianDigits(formatNum(profitPrice));
    document.getElementById("res-tax-price").innerText = toPersianDigits(formatNum(taxPrice));
    document.getElementById("res-total-price").innerText = toPersianDigits(formatNum(totalPrice));
}

function recalculateReverseBudget() {
    const budget = parseFloat(document.getElementById("calc-budget").value) || 0;
    
    // Calculations based on live active prices
    const rate18 = liveRates.gold18;
    const coinRate = liveRates.coinEmami;
    const quarterRate = liveRates.coinQuarter;
    
    const buyGoldGrams = budget / rate18;
    const buyCoins = budget / coinRate;
    const buyQuarters = budget / quarterRate;
    
    document.getElementById("res-buy-gold").innerText = toPersianDigits(buyGoldGrams.toFixed(3));
    document.getElementById("res-buy-coin").innerText = toPersianDigits(buyCoins.toFixed(2));
    document.getElementById("res-buy-quarter").innerText = toPersianDigits(buyQuarters.toFixed(2));
}

// --- BARCODE SCANNER MOCKUP ---
function initBarcodeScanner() {
    const btnScan = document.getElementById("btn-simulate-scan");
    const scanResult = document.getElementById("scan-result-display");
    
    btnScan.addEventListener("click", () => {
        // Trigger scanning effect
        const laser = document.querySelector(".scan-laser");
        laser.style.animationPlayState = "running";
        
        btnScan.disabled = true;
        btnScan.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> در حال اسکن بارکد...';
        
        setTimeout(() => {
            // Pick selected item details
            const itemSelect = document.getElementById("scan-item-select");
            const selectedOption = itemSelect.options[itemSelect.selectedIndex];
            
            const desc = selectedOption.getAttribute("data-desc");
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
            
            // Update scanning UI
            document.getElementById("scan-res-desc").innerText = desc;
            document.getElementById("scan-res-weight").innerText = toPersianDigits(weight.toFixed(2));
            document.getElementById("scan-res-wage").innerText = toPersianDigits(wage) + "٪";
            document.getElementById("scan-res-total").innerText = toPersianDigits(formatNum(totalPrice));
            
            scanResult.style.display = "block";
            
            btnScan.disabled = false;
            btnScan.innerHTML = '<i class="fa-solid fa-expand"></i> اسکن مجدد بارکد کالا';
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
    
    btnAddItem.addEventListener("click", () => {
        const itemType = document.getElementById("invoice-item-type").value;
        const weightOrQty = parseFloat(document.getElementById("invoice-item-weight").value) || 0;
        
        if (weightOrQty <= 0) return;
        
        let desc = "";
        let qtyText = "";
        let rateText = "-";
        let totalVal = 0;
        
        // Calculate price based on item type
        if (itemType === "طلا ۱۸ عیار") {
            desc = "دستبند / زنجیر طلای ۱۸ عیار";
            qtyText = weightOrQty.toFixed(2) + " گرم";
            rateText = "۱۹٪"; // default markup
            const basePrice = weightOrQty * liveRates.gold18;
            const markupPrice = basePrice * 0.19; // wage + profit
            totalVal = basePrice + markupPrice + (markupPrice * 0.09); // tax
        } else if (itemType === "طلای کهنه") {
            desc = "خرید طلای مستعمل از مشتری";
            qtyText = weightOrQty.toFixed(2) + " گرم";
            totalVal = weightOrQty * (liveRates.gold18 - 60000);
        } else if (itemType === "سکه امامی") {
            desc = "سکه تمام بهار آزادی (امامی)";
            qtyText = Math.round(weightOrQty) + " عدد";
            totalVal = Math.round(weightOrQty) * liveRates.coinEmami;
        } else if (itemType === "طلای آبشده") {
            desc = "طلای آبشده خام";
            qtyText = weightOrQty.toFixed(2) + " گرم";
            totalVal = weightOrQty * (liveRates.goldMelt / 4.608);
        }
        
        const newItem = {
            id: 'item-' + Date.now(),
            desc: desc,
            qtyText: qtyText,
            rateText: rateText,
            total: Math.round(totalVal),
            rawWeight: itemType === "سکه امامی" ? 0 : weightOrQty
        };
        
        invoiceCart.push(newItem);
        renderInvoiceCart();
    });
    
    // Modal Close
    document.getElementById("btn-close-print-modal").addEventListener("click", togglePrintModal);
    document.getElementById("btn-modal-close-secondary").addEventListener("click", togglePrintModal);
    
    // Print triggers
    btnPrint.addEventListener("click", () => {
        prepareInvoicePrint();
        togglePrintModal();
    });
    
    document.getElementById("btn-modal-print-real").addEventListener("click", () => {
        window.print();
    });
    
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
        row.innerHTML = `
            <span>${item.desc}</span>
            <span style="text-align: center;" class="num-font">${toPersianDigits(item.qtyText)}</span>
            <span style="text-align: center;" class="num-font">${toPersianDigits(item.rateText)}</span>
            <span style="text-align: left;" class="num-font">${toPersianDigits(formatNum(item.total))}</span>
            <button class="btn-remove-item" onclick="removeInvoiceItem('${item.id}')"><i class="fa-solid fa-trash-can"></i></button>
        `;
        container.appendChild(row);
    });
    
    document.getElementById("invoice-cart-total").innerText = toPersianDigits(formatNum(grandTotal));
}

// --- PRINT PREPARE & MODAL OVERLAY ---
function togglePrintModal() {
    const modal = document.getElementById("receipt-modal-container");
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
    tbody.innerHTML = "";
    
    let grandTotal = 0;
    let totalWeight = 0;
    let idx = 1;
    
    invoiceCart.forEach(item => {
        grandTotal += item.total;
        totalWeight += item.rawWeight;
        
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td class="num-font">${toPersianDigits(idx++)}</td>
            <td style="text-align: right;">${item.desc}</td>
            <td class="num-font">${toPersianDigits(item.qtyText)}</td>
            <td class="num-font">${toPersianDigits(item.rateText)}</td>
            <td class="num-font" style="text-align: left;">${toPersianDigits(formatNum(item.total))}</td>
        `;
        tbody.appendChild(tr);
    });
    
    // Injections to A5 Form Summary
    document.getElementById("a5-total-weight-display").innerText = toPersianDigits(totalWeight.toFixed(2));
    document.getElementById("a5-today-gold-rate").innerText = toPersianDigits(formatNum(liveRates.gold18));
    document.getElementById("a5-grand-total-display").innerText = toPersianDigits(formatNum(grandTotal));
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
