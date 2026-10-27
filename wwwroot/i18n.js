// i18n.js - Multi-language translation engine for GoldEx

const i18n = {
    fa: {
        dir: "rtl",
        font: "Vazirmatn",
        currencySymbol: "تومان",
        currencyPos: "end",
        dict: {}
    },
    en: {
        dir: "ltr",
        font: "Outfit",
        currencySymbol: "$",
        currencyPos: "start",
        dict: {
            // Navbar
            
            // AI, Vitrine, Dashboard Navigation & Features
            "nav_ai": "AI Assistant",
            "nav_vitrine": "Online Vitrine",
            "nav_dashboard": "Dashboard",
            "hero_btn_ai": "<i class=\"fa-solid fa-wand-magic-sparkles\"></i> AI Assistant",
            "hero_btn_vitrine": "<i class=\"fa-solid fa-store\"></i> Online Vitrine",
            "ai_sec_title": "<i class=\"fa-solid fa-robot text-gold\"></i> GoldEx Voice & Chat AI Assistant",
            "ai_sec_subtitle": "Issue invoices, query client balances & vault stock, and analyze sales with simple commands",
            "ai_bot_name": "GoldEx AI Jewelry Assistant",
            "ai_status_text": "Ready for voice & text commands (synced with live market rates)",
            "ai_prompt_hint": "Quick Commands:",
            "ai_prompt_1": "✨ Issue Gold Invoice",
            "ai_prompt_2": "💰 Client Balance",
            "ai_prompt_3": "📈 Sales Growth",
            "ai_prompt_4": "🔥 Melted Gold Assay",
            "ai_greeting": "Hello! I am your AI assistant for jewelry management and accounting. You can command me to issue invoices, check balances, or analyze sales in seconds.",
            "ai_input_ph": "Type your command (e.g. Issue sales invoice for 2g gold)...",
            "vitrine_sec_title": "<i class=\"fa-solid fa-store text-gold\"></i> Online Vitrine & Digital Catalog",
            "vitrine_sec_subtitle": "24/7 luxury online storefront with your brand's unique link, live gold price calculation, and direct messaging orders",
            "vitrine_demo_name": "Gallery Online Showcase & Catalog",
            "vitrine_demo_desc": "Exclusive 18K gold and luxury diamond jewelry with official certified invoice",
            "v_cat_all": "All Luxury Products",
            "v_cat_bracelet": "Bracelets & Bangles",
            "v_cat_ring": "Rings & Bands",
            "v_cat_set": "Full Sets & Necklaces",
            "v_tag_18k": "18K Gold (750)",
            "v_tag_gem": "Diamond Gemstone",
            "v_tag_luxury": "Luxury Bridal Set",
            "v_p1_title": "Cartier Luxury Fusion Bracelet",
            "v_p2_title": "Fancy Diamond Flower Ring",
            "v_p3_title": "Damas Yellow Gold Bangle",
            "v_p4_title": "Royal Fusion Bridal Set",
            "v_label_weight": "Weight:",
            "v_label_wage": "Wage:",
            "v_label_price": "Live Price (with today's rate):",
            "v_btn_wa": "WhatsApp",
            "v_btn_bale": "Bale App",
            "dash_sec_title": "<i class=\"fa-solid fa-gauge-high text-gold\"></i> Executive Dashboard & Real-Time Hub",
            "dash_sec_subtitle": "Real-time monitoring of cashboxes, currencies, coins, raw gold, and automatic customer running balances on invoices",
            "dash_vault_title": "Vault Assets, Multi-Currency & Cashboxes Breakdown",
            "dash_invoices_title": "Smart Invoices with Real-Time Customer Running Balance",
            "dash_invoices_desc": "Never miss an outstanding balance! Immediately after each invoice, the customer's total gold and currency balance is shown on that row:",
            "dash_th_num": "Invoice #",
            "dash_th_buyer": "Customer / Client",
            "dash_th_desc": "Item Description",
            "dash_th_weight": "Weight (g)",
            "dash_th_total": "Total Amount",
            "dash_th_bal": "Customer Balance After Invoice",
            "comp_f_ai": "AI Voice & Chat Assistant (MCP)",
            "comp_f_ai_ent": "Yes (Voice invoice, balances & sales growth)",
            "comp_f_ai_mini": "No",
            "comp_f_vitrine": "Online Vitrine & Digital Catalog",
            "comp_f_vitrine_ent": "Yes (Custom URL, live pricing & instant ordering)",
            "comp_f_vitrine_mini": "No",
            "comp_f_dash": "Real-Time Dashboard with Customer Balances on Invoices",
            "comp_f_dash_ent": "Yes (Multi-currency & running balance per invoice)",
            "comp_f_dash_mini": "No",

            
            // Extra Localized Labels & Units
            "page_meta_title": "GoldEx Intelligent Jewelry Platform | AI Assistant, Online Showcase & Accounting",
            "v_badge_featured": "Featured",
            "v_badge_certified": "Certified",
            "v_badge_bestseller": "Best Seller",
            "v_badge_royal": "Royal Set",
            "unit_gram": "g",
            "unit_qty": "qty",
            "dash_curr_gold18": "Raw 18K Gold",
            "dash_curr_melt": "Melted Gold (Bar)",
            "dash_curr_coin": "Emami Gold Coin",
            "dash_curr_usd": "US Dollar (USD)",
            "dash_curr_eur": "Euro (EUR)",
            "dash_curr_aed": "UAE Dirham (AED)",
            "dash_inv_b1": "Mr. Reza Karimi (Market Partner)",
            "dash_inv_d1": "Cartier Luxury Fusion Bracelet",
            "dash_inv_bal1": "12,000,000 Toman (Debtor)",
            "dash_inv_b2": "Dr. Radmanesh",
            "dash_inv_d2": "Royal 24K Cut Set",
            "dash_inv_bal2": "Fully Settled (Zero Balance)",
            "dash_inv_b3": "Hosseini Wholesale Gold Gallery",
            "dash_inv_d3": "Scrap & Melt Gold Purchase",
            "dash_inv_bal3": "15.500 g Gold (Creditor)",
            "calc_display_gold_18": "18K Gold",
            "ai_btn_view_pdf": "View & Print Official PDF Invoice",
            "ai_btn_statement": "Download Detailed Statement",
            "ai_statement_alert": "Full client statement exported successfully.",

            
            // Extra missing keys
            "lang_fa": "فارسی",
            "lang_en": "English",
            "lang_tr": "Türkçe",
            "f7_title": "Multi-Store & Vault Management",
            "f7_desc": "Define unlimited branches, galleries, and vaults with isolated asset and gold ledger reporting.",
            "f8_title": "Biometric Security & Passkeys",
            "f8_desc": "Passwordless login via FaceID, TouchID, Passkeys, and robust 2FA protection.",
            "footer_web_val": "Modern Architecture based on PWA / Cloud",
            "workspace_default_item1": "18K Gold Bracelet / Chain",
            "workspace_default_item2": "Bahar Azadi Gold Coin",
            "matrix_g_ai": "AI Innovations & Online Showcase",
            "matrix_r_ai": "AI Voice & Chat Assistant (Invoice generation & sales analysis)",
            "matrix_no": "No",
            "matrix_yes_ai": "Yes (Gemini & ChatGPT integration)",
            "matrix_yes": "Yes",
            "matrix_r_vitrine": "Dedicated Online Vitrine with Live Rates & Custom Link",
            "matrix_yes_vitrine": "Yes (Dedicated Gallery Website)",
            "matrix_no_local": "Requires separate hosting",
            "matrix_r_dash": "Real-Time Dashboard with Running Customer Balance per Invoice",
            "matrix_r_remit": "Direct Customer-to-Customer Remittances & Settlement",

            "table_scroll_hint": "Swipe left/right to view all comparison columns",
            "nav_home": "Home",
            "nav_rates": "Live Rates",
            "nav_calculators": "Calculators",
            "nav_features": "Enterprise Features",
            "nav_mini": "GoldEx Mini",
            "nav_pricing": "Pricing",
            "nav_comparison": "Comparison",
            "nav_demo": "Online Demo",
            // Hero
            "hero_tag": "<i class=\"fa-solid fa-circle-check\"></i> Revolutionizing Gold Accounting & Management",
            "hero_title": "Smart Platform for Gold & Jewelry <br><span class=\"gradient-text-gold\">GoldEx</span>",
            "hero_desc": "A comprehensive, modern cloud-based solution designed for the gold and jewelry industry. Equipped with automated double-entry gold accounting, real-time pricing engine, advanced inventory, and fast offline GoldEx Mini.",
            "hero_btn_calc": "<i class=\"fa-solid fa-calculator\"></i> Smart Calculator",
            "hero_btn_mini": "<i class=\"fa-solid fa-receipt\"></i> Mini Invoice Creator",
            "hero_enterprise_badge": "ENTERPRISE",
            "hero_mini_badge": "OFFLINE / CALCULATOR",
            // Rates
            "rates_title": "<i class=\"fa-solid fa-chart-line text-gold\"></i> Live Rates & Pricing Engine",
            "rates_subtitle": "Real-time monitoring of gold, coins, and currencies integrated with multiple reference providers.",
            "rate_gold_melt_title": "18K Gold & Melted Gold",
            "rate_gold_provider": "Tehran Union",
            "rate_gold_unit": "/ Gram",
            "rate_melt_title": "Melted Gold (Mithqal)",
            "rate_coin_title": "Bahar Azadi Coins",
            "rate_coin_provider": "Reference Site",
            "rate_coin_unit": "/ Coin",
            "rate_coin_half_title": "Half Coin",
            "rate_currency_title": "Global Currencies",
            "rate_currency_provider": "National Exchange",
            "rate_currency_unit": "/ USD",
            "rate_aed_title": "UAE Dirham",
            "rates_indicator": "Live market tracking active (simulated updates active)",
            "rates_last_update": "Last Update: ",
            // Calculators
            "calc_title": "<i class=\"fa-solid fa-calculator text-gold\"></i> Smart Calculator & Converters",
            "calc_subtitle": "Test real gold and jewelry calculation formulas with live pricing instantly",
            "calc_card_gold_title": "<i class=\"fa-solid fa-coins text-gold\"></i> Advanced Gold & Jewelry Calculator",
            "calc_label_gold_type": "Gold Type / Fineness",
            "calc_label_weight": "Gold Weight (Grams)",
            "calc_label_wage": "Making Wage (%)",
            "calc_label_profit": "Gallery Profit (%)",
            "calc_label_tax": "VAT (9% on Wage & Profit)",
            "calc_base_price": "Base Gold Price (Raw):",
            "calc_wage_price": "Making Wage Price:",
            "calc_profit_price": "Gallery Profit Price:",
            "calc_tax_price": "VAT (9%):",
            "calc_total_price": "Final Price for Customer:",
            "calc_display_gold_18": "18K Gold (750)",
            "calc_display_gold_24": "24K Gold (999)",
            "calc_display_gold_melt": "Melted Gold (Mithqal)",
            "calc_display_gold_used": "Scrap / Used Gold",
            // Reverse calc
            "calc_card_reverse_title": "<i class=\"fa-solid fa-arrow-right-arrow-left text-gold\"></i> Reverse Budget to Gold Converter",
            "calc_reverse_desc": "Enter your budget to calculate the amount of gold or coins you can purchase at the current live rates:",
            "calc_label_budget": "Your Budget",
            "calc_res_gold_grams": "Raw 18K Gold purchasable:",
            "calc_res_coins": "Equivalent Bahar Azadi Coins:",
            "calc_res_quarters": "Equivalent Quarter Coins:",
            // Scanner
            "scan_title": "<i class=\"fa-solid fa-qrcode\"></i> Physical Barcode & Camera Scanner",
            "scan_desc": "Select a barcode from the list and click scan to query the live price of the item:",
            "scan_item_1": "18K Gold Link Chain Bracelet - 6.2g",
            "scan_item_2": "Fancy Diamond Flower Ring - 3.45g",
            "scan_item_3": "Damas Yellow Gold Bangle - 12.8g",
            "scan_btn": "<i class=\"fa-solid fa-expand\"></i> Scan Barcode Now",
            "scan_btn_scanning": "<i class=\"fa-solid fa-spinner fa-spin\"></i> Scanning barcode...",
            "scan_btn_rescan": "<i class=\"fa-solid fa-expand\"></i> Scan Barcode Again",
            "scan_res_label_weight": "Weight:",
            "scan_res_label_wage": "Wage:",
            "scan_res_label_price": "Scanned Price:",
            // Enterprise features
            "features_title": "<i class=\"fa-solid fa-building-shield text-gold\"></i> Enterprise Features & Specifications",
            "features_subtitle": "Advanced software platform built with distributed architecture for multi-branch gallery networks",
            "f1_title": "Automated Double-Entry Ledger",
            "f1_desc": "Fully compliant double-entry gold accounting without manual ledger entries. All transactions, assets, and balances update automatically.",
            "f2_title": "Advanced Inventory & Melting",
            "f2_desc": "Supply chain management, barcode printing, and stock registers. Track melting and assaying inputs with precise scrap calculations.",
            "f3_title": "Multi-Currency Smart Invoicing",
            "f3_desc": "Issue official & internal invoices. Instantly view client balances (both in gold and cash) with support for mixed payments.",
            "f4_title": "Multiple Cashboxes & Accounts",
            "f4_desc": "Define separate cashboxes (Cash, Gold, Foreign Currency) to isolate assets, profitability, and accounts across all branches.",
            "f5_title": "Smart SMS & Due Date Alerts",
            "f5_desc": "Automatically send SMS reminders for cheque due dates, payment installments, and gallery promotions directly to customers.",
            "f6_title": "Multi-Layer Security & Passkeys",
            "f6_desc": "Secure login via biometric Passkeys (FaceID/TouchID), Google Authenticator, 2FA SMS codes, and permission-based user access.",
            // Reports mockup
            "reports_title": "<i class=\"fa-solid fa-file-contract\"></i> Intelligent & Dynamic Account Reporting",
            "reports_desc": "Simulate ledger statements, inventory registers, and asset balances in real-time:",
            "report_tab_capital": "Capital Balances",
            "report_tab_ledger": "Customer Statements",
            "report_tab_stock": "Inventory Register",
            "report_chart_desc": "Total cash & gold asset growth (Last 6 Months) - scale in Billion Rials / USD",
            "month_1": "Dec",
            "month_2": "Jan",
            "month_3": "Feb",
            "month_4": "Mar",
            "month_5": "Apr",
            "month_6": "May",
            "report_table_date": "Date",
            "report_table_desc": "Transaction Description",
            "report_table_debit": "Debit (Cash)",
            "report_table_credit": "Credit (Gold)",
            "report_table_balance": "Ending Balance",
            "report_table_code": "Item Code",
            "report_table_name": "Item Description",
            "report_table_in": "Stock In",
            "report_table_out": "Stock Out",
            "report_table_curr": "Current Stock",
            "unit_qty": "pcs",
            // Mini spotlight
            "mini_title": "Lightweight, Offline & Standalone App",
            "mini_subtitle": "Calculations & Quick Sales App <br><span class=\"gradient-text-gold\">GoldEx Mini</span>",
            "mini_desc": "GoldEx Mini is an ultra-fast, focused app that runs 100% offline in your browser, Windows desktop, or smartphone. All data remains in your local device storage, providing absolute data privacy.",
            "mini_bullet1": "<strong>Data Privacy:</strong> Your financial data never leaves your device.",
            "mini_bullet2": "<strong>Instant Invoicing:</strong> Quick catalog entries, total calculation, and printer outputs.",
            "mini_bullet3": "<strong>A5 Landscape Output:</strong> Output format fully optimized for standard jewelry print receipts.",
            // Mini Workspace
            "workspace_title": "<i class=\"fa-solid fa-receipt text-gold\"></i> GoldEx Mini Quick Invoicer",
            "workspace_subtitle": "OFFLINE PREVIEW",
            "workspace_label_type": "Invoice Item Type",
            "workspace_option_gold18": "18K Gold Bracelet / Chain",
            "workspace_option_used": "Scrap Gold Purchase",
            "workspace_option_coin": "Bahar Azadi Gold Coin",
            "workspace_option_melt": "Melted Gold (Mithqal)",
            "workspace_label_weight": "Weight (Grams) / Qty",
            "workspace_unit_grams": "Grams",
            "workspace_btn_add": "<i class=\"fa-solid fa-plus\"></i> Add",
            "workspace_th_desc": "Description",
            "workspace_th_qty": "Qty/Weight",
            "workspace_th_markup": "Wage+Profit",
            "workspace_th_total": "Total Amount",
            "workspace_cart_total": "Quick Cart Grand Total:",
            "workspace_btn_print": "<i class=\"fa-solid fa-print\"></i> Print A5 Invoice",
            // Pricing homepage
            "pricing_title": "<i class=\"fa-solid fa-tags text-gold\"></i> Smart Pricing Plans",
            "pricing_subtitle": "Choose the optimized licensing package for your gold business requirements",
            "price_mini_badge": "Offline & Lite",
            "price_mini_title": "<i class=\"fa-solid fa-receipt text-gold\"></i> GoldEx Mini",
            "price_mini_subtitle": "Best for quick invoicing & gold calculations on the go",
            "price_mini_amount": "9,999,000",
            "price_mini_period": "One-time Lifetime License",
            "price_mini_strike": "20,000,000",
            "price_mini_f1": "<strong>Public Cloud Domain:</strong> Access via shared global domain with private username/password",
            "price_mini_f2": "<strong>PWA Install Support:</strong> Install directly on mobile or desktop devices",
            "price_mini_f3": "Runs completely offline without internet or server data transfers",
            "price_mini_btn": "View Details & Buy",
            
            "price_cloud_badge": "Cloud Enterprise",
            "price_cloud_title": "<i class=\"fa-solid fa-cloud text-gold\"></i> GoldEx Cloud (SaaS)",
            "price_cloud_subtitle": "Complete double-entry accounting, multi-branch inventory, and integrations",
            "price_cloud_amount": "179,000,000",
            "price_cloud_strike": "200,000,000",
            "price_cloud_period": "Base Software License",
            "price_cloud_server_note": "Fully managed cloud hosting & automatic backups included",
            "price_cloud_f1": "<strong>Custom Domains:</strong> Map your own brand domain or subdomain directly",
            "price_cloud_f2": "<strong>Automated Backups:</strong> Multi-region secure cloud backups run automatically",
            "price_cloud_f3": "Multi-user permissions, audit log tracking, sms triggers, biometric security",
            "price_cloud_btn": "Compare SaaS & Local Server",
            "pricing_compare_btn": "<i class=\"fa-solid fa-arrow-right-long\" style=\"margin-left: 8px;\"></i> Detailed Pricing Matrix & Plans",
            // Comparison Table Home
            "comparison_title": "<i class=\"fa-solid fa-arrow-down-up-lock text-gold\"></i> Matrix: GoldEx vs GoldEx Mini",
            "comparison_subtitle": "Select the ideal software version depending on single or multi-branch requirements",
            "comp_th_feature": "Feature / Technical Detail",
            "comp_th_enterprise": "GoldEx Enterprise",
            "comp_th_mini": "GoldEx Mini",
            "comp_f1_name": "Active Internet Connection Required",
            "comp_f1_ent": "Yes (For live rates & cloud sync)",
            "comp_f1_mini": "No (100% offline local operations)",
            "comp_f2_name": "Invoice & Financial Document Storage",
            "comp_f2_ent": "Secure Central Cloud Database / Multi-user",
            "comp_f2_mini": "Browser Local Storage (LocalStorage)",
            "comp_f3_name": "Gold Calculators & Tools",
            "comp_f3_ent": "Advanced multi-currency & physical barcode scanner",
            "comp_f3_mini": "Comprehensive (18k, scrap, budget conversions)",
            "comp_f4_name": "Double-entry automatic accounting ledgers",
            "comp_f4_ent": "Yes (Fully automated ledgers)",
            "comp_f4_mini": "No (Sales & invoice builder only)",
            "comp_f5_name": "Inventory, Showcase Stock & Melting",
            "comp_f5_ent": "Yes (Advanced with product cardex)",
            "comp_f5_mini": "No",
            "comp_f6_name": "Customer Invoice Printing Dimensions",
            "comp_f6_ent": "Custom templates with gallery branding",
            "comp_f6_mini": "Optimized in A5 landscape size",
            "comp_f7_name": "Login & Authentication System",
            "comp_f7_ent": "Biometric <span class=\"num-font\">(Passkey)</span>, Password, <span class=\"num-font\">2FA</span> SMS, Google",
            "comp_f7_mini": "Simple local username & encrypted password",
            
            // Technical Stack
            "tech_title": "Technical Architecture & Stack",
            "tech_subtitle": "Leveraging cutting-edge technologies to guarantee speed, safety, and cloud reliability",
            "tech_c1_title": "Blazor WebAssembly",
            "tech_c1_desc": "Built with Microsoft .NET framework in Auto Render Mode and MudBlazor for ultra-fast user interface response.",
            "tech_c2_title": "Full PWA Support",
            "tech_c2_desc": "Easily installable as a Progressive Web App on Windows, macOS, Android, and iOS without going through app stores.",
            "tech_c3_title": "Biometric Passkeys",
            "tech_c3_desc": "Enterprise-grade secure logins using fingerprint or facial recognition sensors on your local devices.",
            "tech_c4_title": "Distributed Data Sync",
            "tech_c4_desc": "Real-time sync to safe cloud clusters with offline-first operations during temporary network drops.",
            // Footer
            // Footer
            "footer_col_links": "Quick Access",
            "footer_col_features": "Features",
            "footer_col_contact": "Contact Us",
            "footer_link_tech": "PWA & Blazor Support",
            "footer_link_scanner": "Barcode Scanner",
            "footer_contact_email": "info@goldex-platform.ir",
            "footer_contact_phone": "+98 990 549 2104",
            "footer_address_val": "Urmia",
            
            "footer_desc": "GoldEx Smart Accounting & Sales Platform. The choice of professionals for growing jewelry enterprises in both cloud and traditional markets.",
            "footer_rights": "© 2026 GoldEx Smart Platform. All rights reserved.",
            "footer_tech": "Modern PWA & Cloud Technology Stack",
            // Receipt Modal
            "modal_title": "Receipt Invoice Preview",
            "modal_preview_title": "GoldEx Mini Quick Invoice",
            "modal_date": "Date:",
            "modal_time": "Time:",
            "modal_invoice_num": "Invoice #:",
            "modal_invoice_num_val": "GMX-9942",
            "modal_shop_name": "GoldEx Demo Gallery",
            "modal_shop_sub": "Wholesale & Retail Gold Center",
            "modal_table_idx": "No.",
            "modal_table_desc": "Item Description",
            "modal_table_qty": "Qty / Weight",
            "modal_table_markup": "Wage & Profit",
            "modal_table_total": "Total Amount",
            "modal_payment_terms": "Terms of Payment & Settlement",
            "modal_payment_terms_text": "This invoice is subject to standard guild rules. All amounts are calculated dynamically based on real-time commodity exchange rates at the timestamp of issuance.",
            "modal_weight_summary": "Total Weight of Gold:",
            "modal_rate_gold": "Reference 18K Gold Rate:",
            "modal_grand_total": "Grand Total to Pay:",
            "modal_footer_note": "Thank you for your purchase. Please keep this receipt for exchange or return services under guild regulations.",
            "modal_btn_print": "Print Invoice",
            "modal_btn_close": "Close",
            
            // --- PRICING PAGE UNIQUE STRINGS ---
            "pricing_page_title": "Pricing & Licensing Plans | GoldEx Platform",
            "pricing_page_desc": "Transparent pricing plans for GoldEx smart jewelry accounting. Compare Cloud SaaS and Local Server models.",
            "pricing_hero_tag": "<i class=\"fa-solid fa-hand-holding-dollar\"></i> Transparent Pricing & Comparison",
            "pricing_hero_title": "Smart Licensing & Server Options",
            "pricing_hero_desc": "Developed across two distinct platforms to perfectly align with cloud networks or traditional single-branch galleries.",
            "btn_back_home": "<i class=\"fa-solid fa-arrow-left\" style=\"margin-left: 8px;\"></i> Back to Homepage",
            // pricing cards
            "price_card_mini_title": "GoldEx Mini",
            "price_card_mini_sub": "Quick Offline Sales & Invoicing",
            "price_card_mini_discount": "Limited Festival Promotion Discount",
            "price_card_mini_notes": "This application runs on our shared global cloud domain. Users receive private usernames/passwords for lifetime access with no monthly fees.",
            "price_card_mini_bullet1": "Fast invoicing for 18k gold, scrap, coins, and melt",
            "price_card_mini_bullet2": "Lite PWA installation on mobile and Windows",
            "price_card_mini_bullet3": "Standard A5 landscape printing output",
            "price_card_mini_bullet4": "100% offline client-side browser storage",
            "price_card_mini_bullet5": "Lifetime license with no renewal subscriptions",
            "price_card_mini_btn": "Register & Free Demo",
            
            "price_card_cloud_title": "GoldEx Cloud (SaaS)",
            "price_card_cloud_sub": "Double-entry Accounting, Inventory & Branch Management",
            "price_card_cloud_notes": "<strong>Fully managed hosting, security, and database backups.</strong> Users can select and renew hosting plans on a monthly, quarterly, semi-annual, or annual cycle.",
            "price_card_cloud_bullet1": "<strong>Custom Domain:</strong> Bind your own gallery domain or subdomain",
            "price_card_cloud_bullet2": "<strong>Auto Backups:</strong> Secure scheduled multi-region cloud backups",
            "price_card_cloud_bullet3": "<strong>Server Management:</strong> Hardening, monitoring, and scaling managed by us",
            "price_card_cloud_bullet4": "Stock registers, lab assay, and scrap gold processing",
            "price_card_cloud_bullet5": "Biometric Passkey login and 2FA SMS security",
            "price_card_cloud_btn": "Buy Cloud SaaS License",
            
            "price_card_local_title": "GoldEx Local Server",
            "price_card_local_sub": "Physical Server Installation at Client Site",
            "price_card_local_badge": "No Cloud Hosting Rent",
            "price_card_local_label": "Local PC Server Install",
            "price_card_local_amount": "Request Quote",
            "price_card_local_notes": "The software is installed as a local web server on the client's central PC. No cloud hosting fees are paid, but due to update difficulty (lack of automated cloud CI/CD), yearly technical support fees are higher.",
            "price_card_local_bullet1": "Deploy database locally on client's central workstation",
            "price_card_local_bullet2": "Absolute independence from active internet connection",
            "price_card_local_bullet3": "No monthly cloud hardware scaling costs",
            "price_card_local_bullet4": "Manual backups performed by gallery operator",
            "price_card_local_bullet5": "Remote and on-site support billed yearly",
            "price_card_local_btn": "Request Setup Quote",
            
            // detailed comparison
            "detailed_matrix_title": "<i class=\"fa-solid fa-list-check text-gold\"></i> Technical Matrix & Support Pricing",
            "detailed_matrix_subtitle": "Compare detailed technical modules, deployment methods, and annual support structures",
            "matrix_th_service": "Service / Support Details",
            "matrix_th_mini": "GoldEx Mini Offline",
            "matrix_th_cloud": "GoldEx Cloud (SaaS)",
            "matrix_th_local": "GoldEx Offline Server",
            "matrix_g1": "Licensing & Server Fees",
            "matrix_r1": "Base Software License Price",
            "matrix_r1_val": "Ask for Daily Quote",
            "matrix_r2": "Cloud Hardware Infrastructure Fees",
            "matrix_r2_no_server": "No Server Required",
            "matrix_r2_included": "Included in subscription",
            "matrix_r2_no_rent": "No cloud rent",
            "matrix_r3": "Billing Periods",
            "matrix_r3_val": "Monthly, Quarterly, 6-Month, Yearly",
            "matrix_r3_local": "Yearly Support Contract",
            "matrix_r4": "Security & Vulnerability Management",
            "matrix_r4_user": "User-managed",
            "matrix_r4_managed": "Fully managed by us (Cloud)",
            "matrix_r4_local": "User-managed in local db",
            "matrix_g2": "Deployment & Updates",
            "matrix_r5": "Database Location",
            "matrix_r5_val": "Browser LocalStorage",
            "matrix_r5_cloud": "Secure Cloud Clusters",
            "matrix_r5_local": "Client Central PC (Local)",
            "matrix_r6": "Domain Configuration",
            "matrix_r6_val": "Public GoldEx Domain",
            "matrix_r6_cloud": "Free Subdomain or Custom Domain",
            "matrix_r6_local": "Local Network (Intranet)",
            "matrix_r7": "Automated Software Updates",
            "matrix_r7_val": "Automatic from cloud domain",
            "matrix_r7_cloud": "Seamless automatic deployment",
            "matrix_r7_local": "Requires remote setup or visit",
            "matrix_r8": "Backups",
            "matrix_r8_val": "Manual CSV exports",
            "matrix_r8_cloud": "Automated multi-point cloud backups",
            "matrix_r8_local": "Manual physical backups",
            "matrix_r9": "Annual Support Contract Pricing",
            "matrix_r9_free": "100% Free",
            "matrix_r9_cloud": "Optimized & low-cost",
            "matrix_r9_local": "Higher rate (requires manual visits/remote)",
            
            // faq pricing
            "faq_title": "<i class=\"fa-solid fa-circle-question text-gold\"></i> Pricing & Billing FAQs",
            "faq_subtitle": "Answers to technical queries regarding server infrastructure, renewals, and database support",
            "q1": "Why is the annual support fee higher for the offline local server version?",
            "a1": "In the Cloud (SaaS) version, updates, database checks, and security updates are automated through our CI/CD pipeline. For local server setups, our engineers must manually connect via remote desktop or physically visit the client's store, which is time-consuming and labor-intensive.",
            "q2": "Does the Cloud version require a high-speed internet connection?",
            "a2": "No. GoldEx is built as a Progressive Web App (PWA). Data payloads are highly optimized and extremely small. Even if your internet disconnects temporarily, operations continue locally and sync automatically once the connection is restored.",
            "q3": "How is hosting and server management billed for GoldEx Cloud?",
            "a3": "After acquiring the 179 Million Toman software license, cloud server hosting and maintenance fees are billed in cycles. You can choose to pay monthly, quarterly, semi-annually, or annually with progressive discounts.",
            "q4": "Are there any hidden fees in the GoldEx Mini version?",
            "a4": "No. GoldEx Mini is designed as a standalone utility. Once the one-time 5 Million Toman license is purchased, there are no monthly, quarterly, or annual server renewal fees whatsoever.",

            // Additional translation keys
            "report_r1_date": "2026/04/24",
            "report_r1_desc": "Sales Invoice #10422",
            "report_r1_debit": "450,000,000",
            "report_r1_credit": "0.000",
            "report_r1_bal": "Cash Debit",
            "report_r2_date": "2026/04/29",
            "report_r2_desc": "Settled with customer 18K scrap gold",
            "report_r2_debit": "0",
            "report_r2_credit": "120.500",
            "report_r2_bal": "Gold Credit",
            "report_r3_date": "2026/05/04",
            "report_r3_desc": "Cheque received (Mellat Bank Central Branch)",
            "report_r3_debit": "200,000,000",
            "report_r3_credit": "0.000",
            "report_r3_bal": "Cash Debit",
            "report_r4_desc": "Customer Cumulative Ending Balance",
            "report_r4_debit": "250,000,000 Debit",
            "report_r4_credit": "120.500 Credit",
            "report_r4_bal": "Combined Balance",

            "stock_r1_code": "GLD-5022",
            "stock_r1_desc": "Fancy Diamond Flower Ring - Main Window",
            "stock_r1_in": "5 pcs",
            "stock_r1_out": "2 pcs",
            "stock_r1_bal": "3 pcs in stock",
            "stock_r2_code": "GLD-M-110",
            "stock_r2_desc": "Assayed Melted Gold (Lab 110)",
            "stock_r2_in": "1,500.25 g",
            "stock_r2_out": "450.00 g",
            "stock_r2_bal": "1,050.25 g in stock",
            "stock_r3_code": "GLD-CO-1",
            "stock_r3_desc": "Bahar Azadi Coin (Mint 2007)",
            "stock_r3_in": "50 pcs",
            "stock_r3_out": "15 pcs",
            "stock_r3_bal": "35 pcs in stock",
            "stock_r4_desc": "Total Stock of Gallery Showrooms",
            "stock_r4_bal": "Ledger matching verified",

            "modal_settlement_label": "Payment Method:",
            "modal_settlement_val": "Offline (Local)",
            "modal_buyer_label": "Dear Buyer:",
            "modal_buyer_val": "General Gallery Customer (Gold Guild)",
            "modal_national_id": "National ID / Tax ID:",
            "modal_mobile": "Mobile Number:",
            "modal_address_text": "Address: Urmia | Tel: +989905492104"
        }
    },
    tr: {
        dir: "ltr",
        font: "Outfit",
        currencySymbol: "TL",
        currencyPos: "end",
        dict: {
            // Navbar
            
            // AI, Vitrine, Dashboard Navigation & Features
            "nav_ai": "Yapay Zeka",
            "nav_vitrine": "Çevrimiçi Vitrin",
            "nav_dashboard": "Yönetim Paneli",
            "hero_btn_ai": "<i class=\"fa-solid fa-wand-magic-sparkles\"></i> Yapay Zeka",
            "hero_btn_vitrine": "<i class=\"fa-solid fa-store\"></i> Çevrimiçi Vitrin",
            "ai_sec_title": "<i class=\"fa-solid fa-robot text-gold\"></i> GoldEx Sesli ve Yazılı Yapay Zeka Asistanı",
            "ai_sec_subtitle": "Fatura kesme, müşteri bakiyesi sorgulama ve satış analizlerini tek bir mesajla gerçekleştirin",
            "ai_bot_name": "GoldEx Kuyumcu Yapay Zeka Asistanı",
            "ai_status_text": "Sesli ve yazılı komutlar için hazır (anlık piyasa fiyatlarıyla senkronize)",
            "ai_prompt_hint": "Hızlı Komutlar:",
            "ai_prompt_1": "✨ Altın Faturası Kes",
            "ai_prompt_2": "💰 Müşteri Bakiyesi",
            "ai_prompt_3": "📈 Satış Büyümesi",
            "ai_prompt_4": "🔥 Has Altın Hesabı",
            "ai_greeting": "Merhaba! Kuyumcu muhasebe ve yönetim yapay zeka asistanınızım. Fatura kesmek, bakiye sorgulamak veya satış analizleri için bana yazabilirsiniz.",
            "ai_input_ph": "Komutunuzu yazın (örn: 2g altın satış faturası kes)...",
            "vitrine_sec_title": "<i class=\"fa-solid fa-store text-gold\"></i> Çevrimiçi Vitrin & Dijital Katalog",
            "vitrine_sec_subtitle": "Markanıza özel bağlantı, canlı altın fiyatı hesaplama ve doğrudan mesajlaşma siparişleri ile 7/24 çevrimiçi vitrin",
            "vitrine_demo_name": "Kuyumcu Çevrimiçi Vitrin Kataloğu",
            "vitrine_demo_desc": "Resmi sertifikalı faturalı özel 18 ayar altın ve pırlanta takılar",
            "v_cat_all": "Tüm Lüks Ürünler",
            "v_cat_bracelet": "Bileklik & Bilezik",
            "v_cat_ring": "Yüzük & Alyans",
            "v_cat_set": "Takımlar & Kolyeler",
            "v_tag_18k": "18 Ayar Altın (750)",
            "v_tag_gem": "Pırlanta Taşlı",
            "v_tag_luxury": "Lüks Gelin Seti",
            "v_p1_title": "Cartier Lüks Füzyon Bileklik",
            "v_p2_title": "Pırlantalı Çiçek Yüzük",
            "v_p3_title": "Damas Sarı Altın Bilezik",
            "v_p4_title": "Kraliyet Füzyon Gelin Seti",
            "v_label_weight": "Ağırlık:",
            "v_label_wage": "İşçilik:",
            "v_label_price": "Anlık Fiyat (bugünkü kur ile):",
            "v_btn_wa": "WhatsApp",
            "v_btn_bale": "Bale Uygulaması",
            "dash_sec_title": "<i class=\"fa-solid fa-gauge-high text-gold\"></i> Yönetici Paneli & Anlık Kontrol Merkezi",
            "dash_sec_subtitle": "Kasa, döviz, altın para takibi ve faturalarda otomatik müşteri cari bakiye gösterimi",
            "dash_vault_title": "Kasa Varlıkları, Dövizler ve Nakit Dağılımı",
            "dash_invoices_title": "Anlık Müşteri Bakiyeli Akıllı Fatura Listesi",
            "dash_invoices_desc": "Hiçbir alacağı unutmayın! Her faturadan sonra müşterinin toplam altın ve nakit bakiyesi anında o satırda görüntülenir:",
            "dash_th_num": "Fatura No",
            "dash_th_buyer": "Müşteri / Cari",
            "dash_th_desc": "Açıklama",
            "dash_th_weight": "Ağırlık (g)",
            "dash_th_total": "Toplam Tutar",
            "dash_th_bal": "Fatura Sonrası Müşteri Bakiyesi",
            "comp_f_ai": "Yapay Zeka Sesli ve Yazılı Asistanı",
            "comp_f_ai_ent": "Evet (Sesli fatura, bakiye ve satış büyümesi)",
            "comp_f_ai_mini": "Hayır",
            "comp_f_vitrine": "Çevrimiçi Vitrin & Dijital Katalog",
            "comp_f_vitrine_ent": "Evet (Özel bağlantı, anlık fiyat ve sipariş)",
            "comp_f_vitrine_mini": "Hayır",
            "comp_f_dash": "Faturalarda Anlık Müşteri Bakiyeli Yönetici Paneli",
            "comp_f_dash_ent": "Evet (Çoklu döviz ve fatura başı bakiye)",
            "comp_f_dash_mini": "Hayır",

            
            // Extra Localized Labels & Units
            "page_meta_title": "GoldEx Akıllı Kuyumcu Platformu | Yapay Zeka, Çevrimiçi Vitrin & Muhasebe",
            "v_badge_featured": "Seçkin",
            "v_badge_certified": "Sertifikalı",
            "v_badge_bestseller": "Çok Satan",
            "v_badge_royal": "Kraliyet Seti",
            "unit_gram": "gram",
            "unit_qty": "adet",
            "dash_curr_gold18": "Ham 18 Ayar Altın",
            "dash_curr_melt": "Has Altın (Külçe)",
            "dash_curr_coin": "Bahar Azadi Altın Sikke",
            "dash_curr_usd": "ABD Doları (USD)",
            "dash_curr_eur": "Euro (EUR)",
            "dash_curr_aed": "BAE Dirhemi (AED)",
            "dash_inv_b1": "Rıza Kerimi (Kapalıçarşı Ortağı)",
            "dash_inv_d1": "Cartier Lüks Füzyon Bileklik",
            "dash_inv_bal1": "12.000.000 Tümen (Borçlu)",
            "dash_inv_b2": "Dr. Radmanesh",
            "dash_inv_d2": "Kraliyet 24K Kesim Seti",
            "dash_inv_bal2": "Tamamen Kapatıldı (Sıfır Bakiye)",
            "dash_inv_b3": "Hüseyni Toptan Altın Galerisi",
            "dash_inv_d3": "Hurda ve Has Altın Alımı",
            "dash_inv_bal3": "15.500 g Altın (Alacaklı)",
            "calc_display_gold_18": "18 Ayar Altın",
            "ai_btn_view_pdf": "Resmi PDF Faturayı Görüntüle ve Yazdır",
            "ai_btn_statement": "Ayrıntılı Hesap Dökümünü İndir",
            "ai_statement_alert": "Müşteri hesap dökümü başarıyla dışa aktarıldı.",

            
            // Extra missing keys
            "lang_fa": "Farsça",
            "lang_en": "İngilizce",
            "lang_tr": "Türkçe",
            "f7_title": "Çoklu Şube ve Kasa Yönetimi",
            "f7_desc": "Sınırsız şube, galeri ve kasa tanımlama ile bağımsız nakit ve altın varlık raporlaması.",
            "f8_title": "Biyometrik Güvenlik & Passkey",
            "f8_desc": "Parmak izi, FaceID, Passkey ve 2FA ile güvenli parolasız giriş koruması.",
            "footer_web_val": "PWA / Bulut Tabanlı Modern Mimari",
            "workspace_default_item1": "18 Ayar Altın Bileklik / Zincir",
            "workspace_default_item2": "Bahar Azadi Altın Para",
            "matrix_g_ai": "Yapay Zeka Yenilikleri & Çevrimiçi Vitrin",
            "matrix_r_ai": "Yapay Zeka Sesli ve Yazılı Asistanı (Fatura kesme ve satış analizi)",
            "matrix_no": "Hayır",
            "matrix_yes_ai": "Evet (Gemini & ChatGPT entegrasyonu)",
            "matrix_yes": "Evet",
            "matrix_r_vitrine": "Canlı Fiyatlı ve Özel Bağlantılı Çevrimiçi Vitrin",
            "matrix_yes_vitrine": "Evet (Özel Galeri Web Sitesi)",
            "matrix_no_local": "Ayrı barındırma gerektirir",
            "matrix_r_dash": "Faturalarda Anlık Müşteri Bakiyeli Yönetici Paneli",
            "matrix_r_remit": "Müşteriler Arası Havale ve Hesap Kapatma",

            "table_scroll_hint": "Tüm sütunları görmek için tabloyu sağa/sola kaydırın",
            "nav_home": "Ana Sayfa",
            "nav_rates": "Canlı Kurlar",
            "nav_calculators": "Hesaplayıcılar",
            "nav_features": "Kurumsal Özellikler",
            "nav_mini": "GoldEx Mini",
            "nav_pricing": "Fiyatlandırma",
            "nav_comparison": "Karşılaştırma",
            "nav_demo": "Çevrimiçi Demo",
            // Hero
            "hero_tag": "<i class=\"fa-solid fa-circle-check\"></i> Altın Muhasebe ve Yönetiminde Yeni Bir Dönem",
            "hero_title": "Altın ve Mücevherat İçin Akıllı Platform <br><span class=\"gradient-text-gold\">GoldEx</span>",
            "hero_desc": "Altın ve mücevherat sektörü için tasarlanmış kapsamlı, modern ve bulut tabanlı bir çözüm. Otomatik çift kayıtlı altın muhasebesi, gerçek zamanlı fiyatlandırma motoru, gelişmiş envanter yönetimi ve hızlı çevrimdışı GoldEx Mini ile donatılmıştır.",
            "hero_btn_calc": "<i class=\"fa-solid fa-calculator\"></i> Akıllı Hesaplayıcı",
            "hero_btn_mini": "<i class=\"fa-solid fa-receipt\"></i> Mini Fatura Oluşturucu",
            "hero_enterprise_badge": "KURUMSAL",
            "hero_mini_badge": "ÇEVRİMDIŞI / HESAPLAYICI",
            // Rates
            "rates_title": "<i class=\"fa-solid fa-chart-line text-gold\"></i> Canlı Fiyat & Kur Motoru",
            "rates_subtitle": "Çoklu referans sağlayıcılarıyla entegre edilmiş altın, madeni para ve döviz kurlarının gerçek zamanlı izlenmesi.",
            "rate_gold_melt_title": "18 Ayar Altın & Has Altın",
            "rate_gold_provider": "Tahran Birliği",
            "rate_gold_unit": "/ Gram",
            "rate_melt_title": "Has Altın (Miskal)",
            "rate_coin_title": "Bahar Azadi Paraları",
            "rate_coin_provider": "Referans Site",
            "rate_coin_unit": "/ Para",
            "rate_coin_half_title": "Yarım Para",
            "rate_currency_title": "Küresel Para Birimleri",
            "rate_currency_provider": "Ulusal Borsa",
            "rate_currency_unit": "/ USD",
            "rate_aed_title": "Birleşik Arap Emirlikleri Dirhemi",
            "rates_indicator": "Canlı piyasa takibi aktif (simüle edilmiş güncellemeler etkin)",
            "rates_last_update": "Son Güncelleme: ",
            // Calculators
            "calc_title": "<i class=\"fa-solid fa-calculator text-gold\"></i> Akıllı Hesaplayıcı ve Dönüştürücüler",
            "calc_subtitle": "Gerçek altın ve mücevher hesaplama formüllerini canlı fiyatlarla anında test edin",
            "calc_card_gold_title": "<i class=\"fa-solid fa-coins text-gold\"></i> Gelişmiş Altın & Mücevher Hesaplayıcı",
            "calc_label_gold_type": "Altın Türü / Ayarı",
            "calc_label_weight": "Altın Ağırlığı (Gram)",
            "calc_label_wage": "İşçilik Ücreti (%)",
            "calc_label_profit": "Mağaza Kârı (%)",
            "calc_label_tax": "KDV (İşçilik ve Kâr üzerinden %9)",
            "calc_base_price": "Ham Altın Fiyatı:",
            "calc_wage_price": "İşçilik Bedeli:",
            "calc_profit_price": "Mağaza Kâr Bedeli:",
            "calc_tax_price": "KDV (%9):",
            "calc_total_price": "Müşteri İçin Son Fiyat:",
            "calc_display_gold_18": "18 Ayar Altın (750)",
            "calc_display_gold_24": "24 Ayar Altın (999)",
            "calc_display_gold_melt": "Has Altın (Miskal)",
            "calc_display_gold_used": "Hurda / Kullanılmış Altın",
            // Reverse calc
            "calc_card_reverse_title": "<i class=\"fa-solid fa-arrow-right-arrow-left text-gold\"></i> Bütçeden Altına Geri Dönüştürücü",
            "calc_reverse_desc": "Güncel canlı kurlar üzerinden satın alabileceğiniz altın veya madeni para miktarını hesaplamak için bütçenizi girin:",
            "calc_label_budget": "Bütçeniz",
            "calc_res_gold_grams": "Satın Alınabilir 18 Ayar Altın:",
            "calc_res_coins": "Eşdeğer Bahar Azadi Parası:",
            "calc_res_quarters": "Eşdeğer Çeyrek Altın:",
            // Scanner
            "scan_title": "<i class=\"fa-solid fa-qrcode\"></i> Fiziksel Barkod & Kamera Tarayıcı",
            "scan_desc": "Listeden bir barkod seçin ve ürünün canlı fiyatını sorgulamak için şimdi tara butonuna tıklayın:",
            "scan_item_1": "18 Ayar Altın Zincir Bileklik - 6.2g",
            "scan_item_2": "Fantezi Pırlanta Çiçek Yüzük - 3.45g",
            "scan_item_3": "Damas Sarı Altın Kelepçe - 12.8g",
            "scan_btn": "<i class=\"fa-solid fa-expand\"></i> Barkodu Şimdi Tara",
            "scan_btn_scanning": "<i class=\"fa-solid fa-spinner fa-spin\"></i> Barkod taranıyor...",
            "scan_btn_rescan": "<i class=\"fa-solid fa-expand\"></i> Barkodu Tekrar Tara",
            "scan_res_label_weight": "Ağırlık:",
            "scan_res_label_wage": "İşçilik:",
            "scan_res_label_price": "Taranan Fiyat:",
            // Enterprise features
            "features_title": "<i class=\"fa-solid fa-building-shield text-gold\"></i> Kurumsal Özellikler & Teknik Detaylar",
            "features_subtitle": "Çok şubeli kuyumcu ağlarının eksiksiz yönetimi için dağıtık mimariyle oluşturulmuş gelişmiş yazılım platformu",
            "f1_title": "Otomatik Çift Kayıtlı Defter",
            "f1_desc": "Manuel yevmiye girişi gerektirmeyen, altın muhasebesine tam uyumlu çift kayıt sistemi. Tüm işlemler, varlıklar ve bakiyeler otomatik güncellenir.",
            "f2_title": "Gelişmiş Stok & Eritme",
            "f2_desc": "Tedarik zinciri yönetimi, barkod basımı ve stok kayıtları. Hassas fire hesaplamalarıyla eritme ve analiz girişlerini takip edin.",
            "f3_title": "Çok Para Birimli Akıllı Faturalama",
            "f3_desc": "Resmi ve dahili faturalar düzenleyin. Karışık ödeme desteğiyle müşteri bakiyelerini (hem altın hem de nakit) anında görüntüleyin.",
            "f4_title": "Çoklu Kasa & Hesap Yönetimi",
            "f4_desc": "Tüm şubelerdeki varlıkları, karlılığı ve hesapları izole etmek için ayrı kasalar (Nakit, Altın, Döviz) tanımlayın.",
            "f5_title": "Akıllı SMS & Vade Uyarıları",
            "f5_desc": "Çek vadeleri, taksit ödemeleri ve mağaza promosyonları için müşterilere otomatik olarak SMS hatırlatıcıları gönderin.",
            "f6_title": "Çok Katmanlı Güvenlik & Geçiş Anahtarları",
            "f6_desc": "Biyometrik Geçiş Anahtarları (FaceID/TouchID), Google Authenticator, 2FA SMS kodları ve yetki tabanlı kullanıcı erişimi ile güvenli giriş.",
            // Reports mockup
            "reports_title": "<i class=\"fa-solid fa-file-contract\"></i> Akıllı & Dinamik Hesap Raporlama",
            "reports_desc": "Defter beyanlarını, envanter kayıtlarını ve varlık bakiyelerini gerçek zamanlı olarak simüle edin:",
            "report_tab_capital": "Sermaye Dengeleri",
            "report_tab_ledger": "Müşteri Hesap Özetleri",
            "report_tab_stock": "Envanter Kayıtları",
            "report_chart_desc": "Toplam nakit ve altın varlık büyümesi (Son 6 Ay) - Milyar Riyal / USD ölçeğinde",
            "month_1": "Ara",
            "month_2": "Oca",
            "month_3": "Şub",
            "month_4": "Mar",
            "month_5": "Nis",
            "month_6": "May",
            "report_table_date": "Tarih",
            "report_table_desc": "İşlem Açıklaması",
            "report_table_debit": "Borç (Nakit)",
            "report_table_credit": "Alacak (Altın)",
            "report_table_balance": "Kapanış Bakiyesi",
            "report_table_code": "Ürün Kodu",
            "report_table_name": "Ürün Açıklaması",
            "report_table_in": "Stok Giriş",
            "report_table_out": "Stok Çıkış",
            "report_table_curr": "Güncel Stok",
            "unit_qty": "adet",
            // Mini spotlight
            "mini_title": "Hafif, Çevrimdışı ve Bağımsız Uygulama",
            "mini_subtitle": "Hesaplamalar & Hızlı Satış Uygulaması <br><span class=\"gradient-text-gold\">GoldEx Mini</span>",
            "mini_desc": "GoldEx Mini, tarayıcınızda, Windows masaüstünüzde veya akıllı telefonunuzda %100 çevrimdışı çalışan ultra hızlı, odaklanmış bir uygulamadır. Tüm veriler yerel cihaz depolama alanınızda kalır ve mutlak veri gizliliği sağlar.",
            "mini_bullet1": "<strong>Veri Gizliliği:</strong> Finansal verileriniz asla cihazınızdan dışarı çıkmaz.",
            "mini_bullet2": "<strong>Anında Faturalama:</strong> Hızlı katalog girişleri, toplam hesaplama ve yazıcı çıktıları.",
            "mini_bullet3": "<strong>A5 Yatay Çıktı:</strong> Standart kuyumcu baskı makbuzları için tamamen optimize edilmiş çıktı biçimi.",
            // Mini Workspace
            "workspace_title": "<i class=\"fa-solid fa-receipt text-gold\"></i> GoldEx Mini Hızlı Faturalandırıcı",
            "workspace_subtitle": "ÇEVRİMDIŞI ÖNİZLEME",
            "workspace_label_type": "Fatura Ürün Tipi",
            "workspace_option_gold18": "18 Ayar Altın Bileklik / Zincir",
            "workspace_option_used": "Hurda Altın Alımı",
            "workspace_option_coin": "Bahar Azadi Altın Para",
            "workspace_option_melt": "Has Altın (Miskal)",
            "workspace_label_weight": "Ağırlık (Gram) / Adet",
            "workspace_unit_grams": "Gram",
            "workspace_btn_add": "<i class=\"fa-solid fa-plus\"></i> Ekle",
            "workspace_th_desc": "Açıklama",
            "workspace_th_qty": "Adet/Ağırlık",
            "workspace_th_markup": "İşçilik+Kâr",
            "workspace_th_total": "Toplam Tutar",
            "workspace_cart_total": "Hızlı Sepet Genel Toplamı:",
            "workspace_btn_print": "<i class=\"fa-solid fa-print\"></i> A5 Fatura Yazdır",
            // Pricing homepage
            "pricing_title": "<i class=\"fa-solid fa-tags text-gold\"></i> Akıllı Fiyatlandırma Planları",
            "pricing_subtitle": "Kuyumculuk işletmenizin gereksinimlerine göre optimize edilmiş lisans paketini seçin",
            "price_mini_badge": "Çevrimdışı & Hafif",
            "price_mini_title": "<i class=\"fa-solid fa-receipt text-gold\"></i> GoldEx Mini",
            "price_mini_subtitle": "Hareket halindeyken hızlı faturalandırma ve altın hesaplamaları için en iyisi",
            "price_mini_amount": "9,999,000",
            "price_mini_period": "Tek Seferlik Ömür Boyu Lisans",
            "price_mini_strike": "20,000,000",
            "price_mini_f1": "<strong>Ortak Bulut Alan Adı:</strong> Özel kullanıcı adı/şifre ile paylaşılan küresel alan adı üzerinden erişim",
            "price_mini_f2": "<strong>PWA Yükleme Desteği:</strong> Doğrudan mobil veya masaüstü cihazlara yükleyin",
            "price_mini_f3": "İnternet veya sunucu veri aktarımı olmadan tamamen çevrimdışı çalışır",
            "price_mini_btn": "Detayları Göster & Satın Al",
            
            "price_cloud_badge": "Bulut Kurumsal",
            "price_cloud_title": "<i class=\"fa-solid fa-cloud text-gold\"></i> GoldEx Bulut (SaaS)",
            "price_cloud_subtitle": "Eksiksiz çift kayıtlı muhasebe, çok şubeli envanter yönetimi ve entegrasyonlar",
            "price_cloud_amount": "179,000,000",
            "price_cloud_strike": "200,000,000",
            "price_cloud_period": "Temel Yazılım Lisansı",
            "price_cloud_server_note": "Tamamen yönetilen bulut barındırma ve otomatik yedeklemeler dahildir",
            "price_cloud_f1": "<strong>Özel Alan Adı:</strong> Kendi mağaza alan adınızı veya alt alan adınızı doğrudan eşleyin",
            "price_cloud_f2": "<strong>Otomatik Yedeklemeler:</strong> Güvenli, çok bölgeli bulut yedeklemeleri otomatik olarak çalışır",
            "price_cloud_f3": "Çoklu kullanıcı izinleri, denetim günlüğü takibi, SMS tetikleyicileri, biyometrik güvenlik",
            "price_cloud_btn": "SaaS ve Yerel Sunucuyu Karşılaştır",
            "pricing_compare_btn": "<i class=\"fa-solid fa-arrow-right-long\" style=\"margin-left: 8px;\"></i> Detaylı Fiyatlandırma Matrisi & Planları",
            // Comparison Table Home
            "comparison_title": "<i class=\"fa-solid fa-arrow-down-up-lock text-gold\"></i> Matris: GoldEx vs GoldEx Mini",
            "comparison_subtitle": "Tek veya çok şubeli gereksinimlere bağlı olarak ideal yazılım sürümünü seçin",
            "comp_th_feature": "Özellik / Teknik Detay",
            "comp_th_enterprise": "GoldEx Kurumsal",
            "comp_th_mini": "GoldEx Mini",
            "comp_f1_name": "Etkin İnternet Bağlantısı Gerekli",
            "comp_f1_ent": "Evet (Canlı kurlar ve bulut senkronizasyonu için)",
            "comp_f1_mini": "Hayır (%100 çevrimdışı yerel işlemler)",
            "comp_f2_name": "Fatura & Finansal Belge Depolama",
            "comp_f2_ent": "Güvenli Merkezi Bulut Veritabanı / Çoklu Kullanıcı",
            "comp_f2_mini": "Tarayıcı Yerel Depolaması (LocalStorage)",
            "comp_f3_name": "Altın Hesaplayıcıları & Araçları",
            "comp_f3_ent": "Gelişmiş çok para birimli ve fiziksel barkod tarayıcı",
            "comp_f3_mini": "Kapsamlı (18k, hurda, bütçe dönüştürme)",
            "comp_f4_name": "Çift kayıtlı otomatik muhasebe defterleri",
            "comp_f4_ent": "Evet (Tam otomatik defterler)",
            "comp_f4_mini": "Hayır (Yalnızca satış ve fatura oluşturucu)",
            "comp_f5_name": "Envanter, Vitrin Stoğu ve Eritme İşlemleri",
            "comp_f5_ent": "Evet (Ürün kartelası ile gelişmiş)",
            "comp_f5_mini": "Hayır",
            "comp_f6_name": "Müşteri Fatura Baskı Boyutları",
            "comp_f6_ent": "Galeri markalı özel şablonlar",
            "comp_f6_mini": "Yatay A5 boyutunda optimize edilmiş",
            "comp_f7_name": "Giriş ve Kimlik Doğrulama Sistemi",
            "comp_f7_ent": "Biyometrik <span class=\"num-font\">(Geçiş Anahtarı)</span>, Şifre, <span class=\"num-font\">2FA</span> SMS, Google",
            "comp_f7_mini": "Basit yerel kullanıcı adı ve şifrelenmiş şifre",
            
            // Technical Stack
            "tech_title": "Teknik Mimari ve Teknolojik Altyapı",
            "tech_subtitle": "Hız, güvenlik ve bulut güvenirliğini garanti etmek için en güncel teknolojilerden yararlanma",
            "tech_c1_title": "Blazor WebAssembly",
            "tech_c1_desc": "Kullanıcı arayüzünün son derece hızlı işlenmesi için Otomatik İşleme Modu ve MudBlazor ile MudBlazor tabanlı MudBlazor mimarisiyle tasarlanmıştır.",
            "tech_c2_title": "Tam PWA Desteği",
            "tech_c2_desc": "Uygulama mağazalarına ihtiyaç duymadan Windows, macOS, Android ve iOS işletim sistemlerinde Aşamalı Web Uygulaması (PWA) olarak kolayca yüklenebilir.",
            "tech_c3_title": "Biyometrik Geçiş Anahtarları",
            "tech_c3_desc": "Yerel cihazlarınızdaki parmak izi veya yüz tanıma sensörlerini kullanarak kurumsal düzeyde güvenli şifresiz giriş.",
            "tech_c4_title": "Dağıtık Veri Senkronizasyonu",
            "tech_c4_desc": "Geçici ağ kesintileri durumunda veri kaybı riski olmadan çevrimdışı öncelikli mekanizma ile verilerin güvenli bulut kümeleriyle anlık senkronizasyonu.",
            // Footer
            // Footer
            "footer_col_links": "Hızlı Erişim",
            "footer_col_features": "Özellikler",
            "footer_col_contact": "İletişim",
            "footer_link_tech": "PWA ve Blazor Desteği",
            "footer_link_scanner": "Barkod Tarayıcı",
            "footer_contact_email": "info@goldex-platform.ir",
            "footer_contact_phone": "+98 990 549 2104",
            "footer_address_val": "Urmiye",
            
            "footer_desc": "GoldEx Akıllı Muhasebe ve Satış Platformu. Hem bulut hem de geleneksel pazarlarda büyüyen kuyumculuk işletmeleri için profesyonellerin tercihi.",
            "footer_rights": "© 2026 GoldEx Akıllı Platformu. Tüm hakları saklıdır.",
            "footer_tech": "Modern PWA & Bulut Teknoloji Yığını",
            // Receipt Modal
            "modal_title": "Fatura Makbuzu Önizleme",
            "modal_preview_title": "GoldEx Mini Hızlı Fatura",
            "modal_date": "Tarih:",
            "modal_time": "Saat:",
            "modal_invoice_num": "Fatura No:",
            "modal_invoice_num_val": "GMX-9942",
            "modal_shop_name": "GoldEx Demo Galerisi",
            "modal_shop_sub": "Toptan & Perakende Altın Merkezi",
            "modal_table_idx": "No.",
            "modal_table_desc": "Ürün Açıklaması",
            "modal_table_qty": "Adet / Ağırlık",
            "modal_table_markup": "İşçilik & Kâr",
            "modal_table_total": "Toplam Tutar",
            "modal_payment_terms": "Ödeme Şartları & Mutabakat",
            "modal_payment_terms_text": "Bu fatura standart lonca kurallarına tabidir. Tüm tutarlar, düzenleme tarihindeki canlı emtia borsası kurlarına göre dinamik olarak hesaplanır.",
            "modal_weight_summary": "Toplam Altın Ağırlığı:",
            "modal_rate_gold": "Referans 18 Ayar Altın Kuru:",
            "modal_grand_total": "Ödenecek Toplam Tutar:",
            "modal_footer_note": "Satın aldığınız için teşekkür ederiz. Lonca kuralları çerçevesinde değişim veya iade işlemleri için lütfen bu makbuzu saklayın.",
            "modal_btn_print": "Yazdır",
            "modal_btn_close": "Kapat",
            
            // --- PRICING PAGE UNIQUE STRINGS ---
            "pricing_page_title": "Fiyatlandırma & Lisans Planları | GoldEx Platform",
            "pricing_page_desc": "GoldEx akıllı kuyumculuk muhasebesi için şeffaf fiyatlandırma planları. Bulut SaaS ve Yerel Sunucu modellerini karşılaştırın.",
            "pricing_hero_tag": "<i class=\"fa-solid fa-hand-holding-dollar\"></i> Şeffaf Fiyatlandırma & Karşılaştırma",
            "pricing_hero_title": "Akıllı Lisanslama & Sunucu Seçenekleri",
            "pricing_hero_desc": "Bulut ağları veya geleneksel tek şubeli galerilerle mükemmel uyum sağlamak için iki ayrı platformda geliştirilmiştir.",
            "btn_back_home": "<i class=\"fa-solid fa-arrow-left\" style=\"margin-left: 8px;\"></i> Ana Sayfaya Dön",
            // pricing cards
            "price_card_mini_title": "GoldEx Mini",
            "price_card_mini_sub": "Hızlı Çevrimdışı Satış & Faturalama",
            "price_card_mini_discount": "Sınırlı Süreli Festival Promosyonu İndirimi",
            "price_card_mini_notes": "Bu uygulama paylaşılan bulut alan adımızda çalışır. Kullanıcılar, aylık ücret ödemeden ömür boyu erişim için özel kullanıcı adları/şifreleri alırlar.",
            "price_card_mini_bullet1": "18k altın, hurda, madeni para ve eritme için hızlı faturalandırma",
            "price_card_mini_bullet2": "Mobil ve Windows'ta hafif PWA kurulumu",
            "price_card_mini_bullet3": "Standart A5 yatay yazdırma çıktısı",
            "price_card_mini_bullet4": "%100 çevrimdışı istemci tarafı depolama",
            "price_card_mini_bullet5": "Yıllık yenileme aboneliği olmayan ömür boyu lisans",
            "price_card_mini_btn": "Kayıt & Ücretsiz Demo",
            
            "price_card_cloud_title": "GoldEx Bulut (SaaS)",
            "price_card_cloud_sub": "Çift Kayıtlı Muhasebe, Envanter & Şube Yönetimi",
            "price_card_cloud_notes": "<strong>Tamamen yönetilen barındırma, güvenlik ve veritabanı yedeklemeleri.</strong> Kullanıcılar barındırma planlarını aylık, üç aylık, altı aylık veya yıllık döngülerde seçebilir ve yenileyebilir.",
            "price_card_cloud_bullet1": "<strong>Özel Alan Adı:</strong> Kendi mağaza alan adınızı veya alt alan adınızı doğrudan bağlayın",
            "price_card_cloud_bullet2": "<strong>Otomatik Yedeklemeler:</strong> Güvenli planlanmış çok bölgeli bulut yedeklemeleri",
            "price_card_cloud_bullet3": "<strong>Sunucu Yönetimi:</strong> Güvenlik, izleme ve ölçeklendirme bizim tarafımızdan yönetilir",
            "price_card_cloud_bullet4": "Stok kayıtları, laboratuvar analizi ve hurda altın işleme",
            "price_card_cloud_bullet5": "Biyometrik Geçiş Anahtarı ile giriş ve 2FA SMS güvenliği",
            "price_card_cloud_btn": "Bulut SaaS Lisansı Satın Al",
            
            "price_card_local_title": "GoldEx Yerel Sunucu",
            "price_card_local_sub": "Müşteri Sahasında Fiziksel Sunucu Kurulumu",
            "price_card_local_badge": "Bulut Barındırma Kirası Yok",
            "price_card_local_label": "Yerel PC Sunucu Kurulumu",
            "price_card_local_amount": "Teklif İsteyin",
            "price_card_local_notes": "Yazılım, müşterinin merkezi bilgisayarına yerel bir web sunucusu olarak kurulur. Bulut barındırma ücreti ödenmez, ancak güncelleme zorluğu nedeniyle (otomatik bulut CI/CD eksikliği), yıllık teknik destek ücretleri daha yüksektir.",
            "price_card_local_bullet1": "Veritabanını yerel olarak müşterinin merkezi iş istasyonuna kurun",
            "price_card_local_bullet2": "Aktif internet bağlantısından mutlak bağımsızlık",
            "price_card_local_bullet3": "Aylık bulut donanım ölçeklendirme maliyeti yok",
            "price_card_local_bullet4": "Galeri operatörü tarafından gerçekleştirilen manuel yedeklemeler",
            "price_card_local_bullet5": "Yıllık faturalandırılan uzaktan ve yerinde destek",
            "price_card_local_btn": "Kurulum Teklifi İsteyin",
            
            // detailed comparison
            "detailed_matrix_title": "<i class=\"fa-solid fa-list-check text-gold\"></i> Teknik Matris & Destek Fiyatlandırması",
            "detailed_matrix_subtitle": "Ayrıntılı teknik modülleri, dağıtım yöntemlerini ve yıllık destek yapılarını karşılaştırın",
            "matrix_th_service": "Hizmet / Destek Detayları",
            "matrix_th_mini": "GoldEx Mini Çevrimdışı",
            "matrix_th_cloud": "GoldEx Bulut (SaaS)",
            "matrix_th_local": "GoldEx Çevrimdışı Sunucu",
            "matrix_g1": "Lisanslama & Sunucu Ücretleri",
            "matrix_r1": "Temel Yazılım Lisans Fiyatı",
            "matrix_r1_val": "Günlük Teklif İsteyin",
            "matrix_r2": "Bulut Donanım Altyapı Ücretleri",
            "matrix_r2_no_server": "Sunucu Gerekmiyor",
            "matrix_r2_included": "Aboneliğe dahildir",
            "matrix_r2_no_rent": "Bulut kirası yok",
            "matrix_r3": "Faturalandırma Dönemleri",
            "matrix_r3_val": "Aylık, Üç Aylık, 6 Aylık, Yıllık",
            "matrix_r3_local": "Yıllık Destek Sözleşmesi",
            "matrix_r4": "Güvenlik & Zafiyet Yönetimi",
            "matrix_r4_user": "Kullanıcı tarafından yönetilir",
            "matrix_r4_managed": "Tamamen tarafımızdan yönetilir (Bulut)",
            "matrix_r4_local": "Yerel veritabanında kullanıcı tarafından yönetilir",
            "matrix_g2": "Dağıtım & Güncellemeler",
            "matrix_r5": "Veritabanı Konumu",
            "matrix_r5_val": "Tarayıcı LocalStorage'ı",
            "matrix_r5_cloud": "Güvenli Bulut Kümeleri",
            "matrix_r5_local": "Müşteri Merkezi PC'si (Yerel)",
            "matrix_r6": "Alan Adı Yapılandırması",
            "matrix_r6_val": "Genel GoldEx Alan Adı",
            "matrix_r6_cloud": "Ücretsiz Alt Alan Adı veya Özel Alan Adı",
            "matrix_r6_local": "Yerel Ağ (İntranet)",
            "matrix_r7": "Otomatik Yazılım Güncellemeleri",
            "matrix_r7_val": "Bulut alan adından otomatik",
            "matrix_r7_cloud": "Sorunsuz otomatik dağıtım",
            "matrix_r7_local": "Uzaktan kurulum veya ziyaret gerektirir",
            "matrix_r8": "Yedeklemeler",
            "matrix_r8_val": "Manuel CSV dışa aktarma",
            "matrix_r8_cloud": "Otomatik çok noktalı bulut yedeklemeleri",
            "matrix_r8_local": "Manuel fiziksel yedeklemeler",
            "matrix_r9": "Yıllık Destek Sözleşmesi Fiyatlandırması",
            "matrix_r9_free": "%100 Ücretsiz",
            "matrix_r9_cloud": "Optimize edilmiş ve düşük maliyetli",
            "matrix_r9_local": "Daha yüksek oran (manuel ziyaretler/uzaktan bağlantı gerektirir)",
            
            // faq pricing
            "faq_title": "<i class=\"fa-solid fa-circle-question text-gold\"></i> Sıkça Sorulan Sorular",
            "faq_subtitle": "Sunucu altyapısı, yenilemeler ve veritabanı desteğiyle ilgili teknik soruların yanıtları",
            "q1": "Çevrimdışı yerel sunucu sürümü için yıllık destek ücreti neden daha yüksek?",
            "a1": "Bulut (SaaS) sürümünde güncellemeler, veritabanı kontrolleri ve güvenlik yamaları CI/CD boru hattımız üzerinden otomatikleştirilir. Yerel sunucu kurulumları için mühendislerimizin uzaktan masaüstü aracılığıyla bağlanması veya müşterinin mağazasını fiziksel olarak ziyaret etmesi gerekir; bu da zaman alıcı ve iş gücü yoğundur.",
            "q2": "Bulut sürümü yüksek hızlı bir internet bağlantısı gerektirir mi?",
            "a2": "No. GoldEx, Progresif Web Uygulaması (PWA) olarak oluşturulmuştur. Veri yükleri son derece optimize edilmiştir ve çok küçüktür. İnternetiniz geçici olarak kesilse bile işlemler yerel olarak devam eder ve bağlantı yeniden kurulduğunda otomatik olarak senkronize edilir.",
            "q3": "GoldEx Bulut için barındırma ve sunucu yönetimi nasıl faturalandırılır?",
            "a3": "179 Milyon Tümen yazılım lisansını aldıktan sonra, bulut sunucu barındırma ve bakım ücretleri dönemler halinde faturalandırılır. Kademeli indirimlerle aylık, üç aylık, altı aylık veya yıllık ödemeyi seçebilirsiniz.",
            "q4": "GoldEx Mini sürümünde herhangi bir gizli ücret var mı?",
            "a4": "Hayır. GoldEx Mini bağımsız bir araç olarak tasarlanmıştır. Tek seferlik 5 Milyon Tümen lisansı satın alındıktan sonra hiçbir aylık, üç aylık veya yıllık sunucu yenileme ücreti yoktur.",

            // Additional translation keys
            "report_r1_date": "2026/04/24",
            "report_r1_desc": "Satış Faturası #10422",
            "report_r1_debit": "450,000,000",
            "report_r1_credit": "0.000",
            "report_r1_bal": "Nakit Borç",
            "report_r2_date": "2026/04/29",
            "report_r2_desc": "Müşterinin 18 ayar hurda altını ile mahsup edildi",
            "report_r2_debit": "0",
            "report_r2_credit": "120.500",
            "report_r2_bal": "Altın Alacak",
            "report_r3_date": "2026/05/04",
            "report_r3_desc": "Mellat Bankası Merkez Şubesi çeki alındı",
            "report_r3_debit": "200,000,000",
            "report_r3_credit": "0.000",
            "report_r3_bal": "Nakit Borç",
            "report_r4_desc": "Müşteri Kümülatif Kapanış Bakiyesi",
            "report_r4_debit": "250,000,000 Borç",
            "report_r4_credit": "120.500 Alacak",
            "report_r4_bal": "Birleşik Bakiye",

            "stock_r1_code": "GLD-5022",
            "stock_r1_desc": "Fantezi Pırlanta Çiçek Yüzük - Vitrin Ana",
            "stock_r1_in": "5 adet",
            "stock_r1_out": "2 adet",
            "stock_r1_bal": "3 adet stokta",
            "stock_r2_code": "GLD-M-110",
            "stock_r2_desc": "Analiz Edilmiş Eritilmiş Altın (Lab 110)",
            "stock_r2_in": "1,500.25 g",
            "stock_r2_out": "450.00 g",
            "stock_r2_bal": "1,050.25 g stokta",
            "stock_r3_code": "GLD-CO-1",
            "stock_r3_desc": "Bahar Azadi Para (Basım 2007)",
            "stock_r3_in": "50 adet",
            "stock_r3_out": "15 adet",
            "stock_r3_bal": "35 adet stokta",
            "stock_r4_desc": "Galeri Vitrinlerinin Toplam Stoğu",
            "stock_r4_bal": "Defter eşleşmesi doğrulandı",

            "modal_settlement_label": "Ödeme Yöntemi:",
            "modal_settlement_val": "Çevrimdışı (Yerel)",
            "modal_buyer_label": "Sayın Alıcı:",
            "modal_buyer_val": "Genel Galeri Müşterisi (Altın Loncası)",
            "modal_national_id": "T.C. Kimlik / Vergi No:",
            "modal_mobile": "Cep Telefonu:",
            "modal_address_text": "Adres: Urmiye | Tel: +989905492104"
        }
    }
};

let currentLang = localStorage.getItem("goldex-lang") || "fa";


function convertDigitsInText(text, toPersian) {
    if (typeof text !== "string") text = String(text);
    const faDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    const enDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    if (toPersian) {
        return text.replace(/[0-9]/g, w => faDigits[+w]);
    } else {
        return text.replace(/[۰-۹]/g, w => enDigits[faDigits.indexOf(w)]);
    }
}

function localizeAllDomNumbers(lang) {
    const isFa = lang === "fa";
    const selector = ".num-font, .currency-pill-amount, .val-display, .balance-tag, .stat-value, .ticker-val, .ticker-diff, .v-price, .v-weight, .price-amount, .strike-price, .price-val, .badge, .ai-invoice-card span, .ai-invoice-card strong, table td, table th, p, span, strong";
    
    document.querySelectorAll(selector).forEach(elem => {
        // Skip elements that have data-i18n since updateLanguage already translates them
        if (elem.hasAttribute("data-i18n")) return;
        
        elem.childNodes.forEach(node => {
            if (node.nodeType === Node.TEXT_NODE && node.nodeValue.trim()) {
                node.nodeValue = convertDigitsInText(node.nodeValue, isFa);
            }
        });
    });
}

function updateLanguage(lang) {
    currentLang = lang;
    localStorage.setItem("goldex-lang", lang);
    const config = i18n[lang] || i18n.fa;
    
    // Set layout direction and lang code
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("dir", config.dir);
    document.body.setAttribute("dir", config.dir);
    
    // Set direction class on body for simple custom styles
    if (config.dir === "ltr") {
        document.body.classList.add("ltr-layout");
        document.body.style.fontFamily = "'Outfit', -apple-system, sans-serif";
    } else {
        document.body.classList.remove("ltr-layout");
        document.body.style.fontFamily = "'Vazirmatn', -apple-system, sans-serif";
    }

    // Apply translations for elements with [data-i18n] attribute
    document.querySelectorAll("[data-i18n]").forEach(elem => {
        const key = elem.getAttribute("data-i18n");
        if (elem.tagName === "META") {
            if (!elem.hasAttribute("data-orig-content")) {
                elem.setAttribute("data-orig-content", elem.getAttribute("content") || "");
            }
            
            if (lang === "fa") {
                elem.setAttribute("content", elem.getAttribute("data-orig-content"));
            } else if (config.dict && config.dict[key] !== undefined) {
                elem.setAttribute("content", config.dict[key]);
            }
        } else {
            if (!elem.hasAttribute("data-orig-html")) {
                elem.setAttribute("data-orig-html", elem.innerHTML);
            }
            
            let translatedText = "";
            if (lang === "fa") {
                translatedText = elem.getAttribute("data-orig-html");
            } else if (config.dict && config.dict[key] !== undefined) {
                translatedText = config.dict[key];
            } else {
                translatedText = elem.getAttribute("data-orig-html");
            }
            
            elem.innerHTML = translatedText;
            if (elem.tagName === "TITLE") {
                document.title = translatedText;
            }
        }
    });
    
    // Manage active visual state in dropdown selectors
    document.querySelectorAll(".lang-option").forEach(opt => {
        if (opt.getAttribute("data-lang") === lang) {
            opt.classList.add("active");
        } else {
            opt.classList.remove("active");
        }
    });

    // Update active trigger flag
    const btn = document.getElementById("lang-select-btn");
    if (btn) {
        const flags = { fa: "🇮🇷", en: "🇬🇧", tr: "🇹🇷" };
        btn.querySelector(".flag-icon").innerText = flags[lang];
        btn.querySelector(".lang-code").innerText = lang.toUpperCase();
    }
    
    // Localize all raw numeric nodes across DOM
    localizeAllDomNumbers(lang);

    // Dispatch custom event to notify app.js that language has changed
    const event = new CustomEvent("langChanged", { detail: { lang: lang } });
    document.dispatchEvent(event);
}

function initLangSelector() {
    const btn = document.getElementById("lang-select-btn");
    const menu = document.getElementById("lang-dropdown-menu");
    
    if (btn && menu) {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            menu.classList.toggle("show");
        });
        
        document.addEventListener("click", () => {
            menu.classList.remove("show");
        });
        
        document.querySelectorAll(".lang-option").forEach(opt => {
            opt.addEventListener("click", (e) => {
                const lang = opt.getAttribute("data-lang");
                updateLanguage(lang);
            });
        });
    }
}
