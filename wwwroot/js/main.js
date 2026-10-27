/**
 * GoldEx (گلدکس) - Main Landing Page Script
 * Interactivity, High-Contrast Themes, Showcase Tabs, Lightbox, and FAQ
 */

// Screenshots data with high-res captures from GoldEx
const showcaseData = {
  dashboard: {
    title: 'پیشخوان کار و گزارش لحظه‌ای وضعیت مغازه',
    desc: 'خلاصه دخل و خرج روزانه، موجودی کل طلا و فاکتورهای تسویه‌نشده در یک نگاه؛ بدون نیاز به محاسبه دستی فاکتورها در پایان شب.',
    image: 'assets/screens/screen_dashboard.png',
    bullets: [
      'آمار لحظه‌ای فروش و خرید روز به گرم طلای ۱۸ عیار و معادل ریالی',
      'نمودار ۳۰ روزه معاملات طلا جهت تحلیل رونق فروش و سودآوری',
      'سیستم هشدار فاکتورهای دارای بیشترین مانده تسویه‌نشده مشتریان'
    ]
  },
  invoices: {
    title: 'فاکتورها و وضعیت تسویه و بدهی مشتریان',
    desc: 'ثبت و پیگیری کلیه فاکتورهای خرید، فروش و تعویض طلا، تفکیک فاکتورهای تسویه‌شده، نسیه و معوقه با قابلیت چاپ استاندارد A5 افقی.',
    image: 'assets/screens/screen_invoices.png',
    bullets: [
      'تفکیک فاکتورهای نقدی، چکی و مانده‌دار با درصد دقیق وضعیت تسویه',
      'محاسبه استاندارد طبق ماده ۲۶ مالیات (معافیت اصل طلا، محاسبه سود ۷٪ و اجرت)',
      'امکان تعویض طلا، کسر وزن نگین و ثبت اتوماتیک در حساب دفتری مشتری'
    ]
  },
  customers: {
    title: 'دفتر حساب و تراز مشتریان و همکاران کیفی',
    desc: 'حساب‌کتاب بنکداران، همکاران کیفی، طلاسازان و مشتریان با تراز وزنی طلای ۷۵۰ و تراز ریالی؛ بدون نیاز به داشتن حسابدار یا ثبت سند دستی.',
    image: 'assets/screens/screen_customers.png',
    bullets: [
      'تراز همزمان به گرم طلای ۱۸ عیار (۷۵۰) و مانده ریالی به تفکیک بدهکار و بستانکار',
      'ثبت خودکار گردش حساب با هر خرید و فروش بدون نیاز به سند زدن دستی',
      'چاپ سریع صورت‌حساب مشتری جهت تسویه حساب‌های فصلی و ماهانه'
    ]
  },
  inventory: {
    title: 'موجودی انبار و گاوصندوق به تفکیک گرمی',
    desc: 'نظارت دقیق بر کل دارایی طلایی گالری تا صدم گرم؛ تفکیک طلای ساخته‌شده ویترین، آبشده‌های خزانه، طلای کهنه و مستعمل و مسکوکات.',
    image: 'assets/screens/screen_inventory.png',
    bullets: [
      'تفکیک دقیق وزن کل به طلای ساخته (ویترین)، آبشده، کهنه و متفرقه، و مسکوکات',
      'ثبت شناسنامه و عکس هر قطعه از لحظه ورود به مغازه تا فروش نهایی',
      'انبارگردانی آسان و مقایسه موجودی فیزیکی گاوصندوق با نرم‌افزار بدون کسری وزنی'
    ]
  },
  smart_tray: {
    title: 'سینی هوشمند؛ نظارت بر طلا روی پیشخوان و اسکن با دوربین',
    desc: 'هنگام چیدن زیورآلات جلوی مشتری، بارکد قطعات را با دوربین گوشی یا سیستم در چند ثانیه بخوانید. تایمر اختصاصی پیشخوان زمان حضور طلا را می‌شمارد تا در شلوغی مغازه هیچ قطعه‌ای جا نماند یا مفقود نشود. در پایان نیز با یک کلیک فاکتور صادر کنید یا کارها را به ویترین برگردانید.',
    image: 'assets/screens/screen_smart_tray_desktop.png',
    bullets: [
      'اسکن بارکد انواع طلا و جواهر با دوربین گوشی یا لپ‌تاپ بدون نیاز به بارکدخوان فیزیکی',
      'تایمر هوشمند پیشخوان برای پیشگیری از مفقودی یا سرقت طلا در شلوغی مغازه',
      'تفکیک کارهای انتخابی مشتری برای صدور فاکتور یا بازگشت باقی طلاها به ویترین با یک کلیک'
    ]
  },
  vitrine: {
    title: 'ویترین و کاتالوگ آنلاین اختصاصی گالری',
    desc: 'ویترین ۲۴ ساعته اینترنتی با نام و نشان گالری شما؛ قیمت تمام کارها متناسب با نوسان مظنه بازار در هر لحظه به‌روز شده و مشتری مستقیم در واتساپ سفارش می‌دهد.',
    image: 'assets/screens/screen_vitrine.png',
    bullets: [
      'محاسبه خودکار قیمت روز کارها متناسب با نوسان ثانیه‌ای مظنه بازار طلا',
      'دسته‌بندی منظم محصولات (النگو، انگشتر، دستبند، گردنبند، نیم‌ست و...) همراه با عکس',
      'دکمه سفارش و استعلام فوری مشتری در واتساپ رسمی گالری'
    ]
  }
};

document.addEventListener('DOMContentLoaded', () => {
  // 1. Scroll-driven progress bar fallback
  const scrollProgress = document.getElementById('scroll-progress');
  if (scrollProgress && (!window.CSS || !CSS.supports('animation-timeline', 'scroll()'))) {
    window.addEventListener('scroll', () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const percentage = scrollable > 0 ? (scrolled / scrollable) : 0;
      scrollProgress.style.transform = `scaleX(${percentage})`;
    }, { passive: true });
  }

  // 2. Sticky Header with shadow on scroll
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  }, { passive: true });

  // 3. Theme Toggle (Dark Obsidian / Light Sovereign Porcelain)
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const savedTheme = localStorage.getItem('goldex-theme') || 'dark';

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    document.querySelectorAll('img[data-theme-dark][data-theme-light]').forEach(img => {
      img.src = theme === 'light' ? img.dataset.themeLight : img.dataset.themeDark;
    });
    localStorage.setItem('goldex-theme', theme);
    if (themeToggleBtn) {
      themeToggleBtn.innerHTML = theme === 'light' ? '🌙' : '☀️';
      themeToggleBtn.setAttribute('title', theme === 'light' ? 'تغییر به حالت شب' : 'تغییر به حالت روز');
    }
  }

  applyTheme(savedTheme);

  themeToggleBtn?.addEventListener('click', () => {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    applyTheme(isLight ? 'dark' : 'light');
  });

  // 4. Showcase Tabs Switcher
  const showcaseTabs = document.querySelectorAll('.showcase-tab-btn');
  const showcaseImg = document.getElementById('showcase-image');
  const showcaseTitle = document.getElementById('showcase-title');
  const showcaseDesc = document.getElementById('showcase-desc');
  const showcaseBullets = document.getElementById('showcase-bullets');
  const showcaseHolder = document.getElementById('showcase-holder');

  showcaseTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetKey = tab.getAttribute('data-tab');
      const data = showcaseData[targetKey];
      if (!data) return;

      showcaseTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Ensure active tab is scrolled into view in mobile horizontal scroll
      tab.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'nearest', inline: 'center' });

      // Smooth content swap with subtle fade
      if (showcaseHolder) showcaseHolder.style.opacity = '0.3';

      setTimeout(() => {
        if (showcaseImg) {
          showcaseImg.src = data.image;
          showcaseImg.alt = data.title;
        }
        if (showcaseTitle) showcaseTitle.textContent = data.title;
        if (showcaseDesc) showcaseDesc.textContent = data.desc;
        if (showcaseBullets) {
          showcaseBullets.innerHTML = data.bullets.map(b => `
            <div class="showcase-bullet-item">
              <i>✓</i>
              <span>${b}</span>
            </div>
          `).join('');
        }
        if (showcaseHolder) showcaseHolder.style.opacity = '1';
      }, 150);
    });
  });

  // 5. Lightbox Modal for high-res screenshot inspection
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');

  function openLightbox(src, alt) {
    if (!lightboxModal || !lightboxImg) return;
    lightboxImg.src = src;
    lightboxImg.alt = alt || 'پیش‌نمایش تصویر گلدکس';
    lightboxModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightboxModal) return;
    lightboxModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  showcaseHolder?.addEventListener('click', () => {
    if (showcaseImg) {
      openLightbox(showcaseImg.src, showcaseImg.alt);
    }
  });

  const heroScreenTrigger = document.getElementById('hero-screen-holder');
  heroScreenTrigger?.addEventListener('click', () => {
    const img = heroScreenTrigger.querySelector('.phone-app-image');
    if (img) openLightbox(img.src, img.alt);
  });

  document.getElementById('hero-desktop-holder')?.addEventListener('click', () => {
    const img = document.querySelector('.desktop-app-image');
    if (img) openLightbox(img.src, img.alt);
  });

  lightboxClose?.addEventListener('click', closeLightbox);
  lightboxModal?.addEventListener('click', (e) => {
    if (e.target === lightboxModal) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  // 6. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question?.setAttribute('aria-expanded', String(item.classList.contains('active')));
    question?.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(i => { i.classList.remove('active'); i.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false'); });
      if (!isActive) {
        item.classList.add('active');
      }
      question.setAttribute('aria-expanded', String(!isActive));
    });
  });

  // 7. Mobile Navigation Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  mobileMenuBtn?.addEventListener('click', () => {
    if (!navLinks) return;
    const isOpen = navLinks.classList.toggle('mobile-open');
    mobileMenuBtn.classList.toggle('active', isOpen);
    mobileMenuBtn.innerHTML = isOpen ? '✕' : '☰';
    mobileMenuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // 8. Smooth scrolling on anchor clicks & close mobile menu
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      const targetElem = document.querySelector(targetId);
      if (targetElem) {
        e.preventDefault();
        targetElem.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
        if (navLinks && navLinks.classList.contains('mobile-open')) {
          navLinks.classList.remove('mobile-open');
          if (mobileMenuBtn) {
            mobileMenuBtn.classList.remove('active');
            mobileMenuBtn.innerHTML = '☰';
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
          }
        }
      }
    });
  });
  // 9. AI Assistant Chat Simulator
  initAiChatSimulator();

  // 10. Luxury 3D Bank Card Interactions & Copy Feedback
  initBankCardInteraction();
});

// 3D Bank Card Flip, Entrance Animation & Clipboard Copying
function initBankCardInteraction() {
  const cardContainer = document.getElementById('luxury-bank-card-container');
  const cardInner = document.getElementById('luxury-bank-card');

  if (!cardContainer || !cardInner) return;

  // 1. Entrance animation on scroll via IntersectionObserver
  if ('IntersectionObserver' in window) {
    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          cardContainer.classList.add('in-view');
          cardObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    cardObserver.observe(cardContainer);
  } else {
    cardContainer.classList.add('in-view');
  }

  // 2. Flip functionality when clicking anywhere on the card
  function toggleFlip(e) {
    // If click was directly on an inline copy button, do not flip
    if (e && e.target && e.target.closest('.copy-field-btn')) {
      return;
    }
    cardInner.classList.toggle('flipped');
  }

  cardInner.addEventListener('click', toggleFlip);

  // 3. Clipboard copy handler with Toast feedback (no innerHTML label mutation)
  const copyButtons = document.querySelectorAll('[data-copy]');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation();
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      const success = await copyToClipboard(textToCopy);
      if (success) {
        btn.classList.add('copied');

        if (textToCopy.startsWith('6037')) {
          showToast('شماره کارت بانکی با موفقیت کپی شد ✓');
        } else if (textToCopy.startsWith('IR')) {
          showToast('شماره شبا حساب با موفقیت کپی شد ✓');
        } else {
          showToast('با موفقیت در کلیپ‌بورد کپی شد ✓');
        }

        setTimeout(() => {
          btn.classList.remove('copied');
        }, 1400);
      }
    });
  });
}

// Copy to clipboard with legacy fallback
async function copyToClipboard(text) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch (err) {
    console.warn('Clipboard API failed, using textarea fallback', err);
  }

  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    textArea.style.top = '-9999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const successful = document.execCommand('copy');
    textArea.remove();
    return successful;
  } catch (err) {
    console.error('Fallback copy failed', err);
    return false;
  }
}

// Sleek floating toast feedback
function showToast(message) {
  let toast = document.getElementById('goldex-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'goldex-toast';
    toast.style.cssText = `
      position: fixed;
      bottom: 2.2rem;
      left: 50%;
      transform: translateX(-50%) translateY(80px);
      background: rgba(15, 23, 42, 0.96);
      border: 1.5px solid #10B981;
      color: #FFFFFF;
      padding: 0.85rem 1.6rem;
      border-radius: 9999px;
      font-size: 0.95rem;
      font-weight: 700;
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.45), 0 0 16px rgba(16, 185, 129, 0.3);
      z-index: 99999;
      transition: transform 0.32s cubic-bezier(0.18, 0.9, 0.25, 1.15), opacity 0.3s ease;
      opacity: 0;
      pointer-events: none;
      direction: rtl;
      font-family: inherit;
      display: flex;
      align-items: center;
      gap: 0.6rem;
    `;
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> <span>${message}</span>`;
  toast.style.transform = 'translateX(-50%) translateY(0)';
  toast.style.opacity = '1';

  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => {
    toast.style.transform = 'translateX(-50%) translateY(80px)';
    toast.style.opacity = '0';
  }, 2400);
}

// AI Chat Simulator Engine
function initAiChatSimulator() {
  const chatBody = document.getElementById('ai-chat-body');
  const promptBtns = document.querySelectorAll('.prompt-btn');
  const userInput = document.getElementById('ai-user-input');
  const sendBtn = document.getElementById('btn-ai-send');

  if (!chatBody) return;

  const aiResponses = {
    invoice: {
      user: 'فاکتور فروش یک عدد النگو طلا ۱۸ عیار به وزن ۵.۴۲۰ گرم برای آقای حسینی با اجرت ۱۸٪ و سود ۷٪ صادر کن',
      bot: `
        <p>فاکتور فروش با موفقیت صادر شد. ریزمحاسبات بر اساس مظنه لحظه‌ای:</p>
        <div class="ai-card-result">
          <div class="ai-card-row"><span>شرح کالا:</span><span>النگو تراش ۱۸ عیار (۷۵۰)</span></div>
          <div class="ai-card-row"><span>وزن دقیق:</span><span>۵.۴۲۰ گرم</span></div>
          <div class="ai-card-row"><span>مظنه خام:</span><span>۲۵٬۷۹۲٬۲۰۰ تومان</span></div>
          <div class="ai-card-row"><span>اجرت ساخت (۱۸٪):</span><span>۲۵٬۱۶۳٬۵۰۰ تومان</span></div>
          <div class="ai-card-row"><span>سود طلافروش (۷٪):</span><span>۱۱٬۵۷۹٬۰۰۰ تومان</span></div>
          <div class="ai-card-row"><span>مالیات ارزش‌افزوده (ماده ۲۶):</span><span>۳٬۶۷۴٬۲۰۰ تومان</span></div>
          <div class="ai-card-row"><span>مبلغ نهایی فاکتور:</span><span>۱۸۰٬۲۱۴٬۰۰۰ تومان</span></div>
        </div>
        <p style="margin-top: 0.5rem; font-size: 0.85rem; color: var(--bull-green-text);">✓ ثبت خودکار در دفتر حساب مشتری | آماده چاپ A5 افقی و ارسال پیامک</p>
      `
    },
    balance: {
      user: 'مانده‌حساب آقای احمدی (همکار بازار) رو بیار',
      bot: `
        <p>استعلام وضعیت حساب طرف‌حساب از دفتر کل:</p>
        <div class="ai-card-result">
          <div class="ai-card-row"><span>نام طرف‌حساب:</span><span>آقای علیرضا احمدی (بنکداری بازار)</span></div>
          <div class="ai-card-row"><span>تراز طلایی:</span><span style="color: var(--bull-green-text);">۳۲.۴۵۰ گرم (۷۵۰) بستانکار</span></div>
          <div class="ai-card-row"><span>تراز ریالی / تومانی:</span><span style="color: var(--bear-red-text);">۱۸٬۵۰۰٬۰۰۰ تومان بدهکار</span></div>
          <div class="ai-card-row"><span>آخرین معامله:</span><span>تحویل آبشده انگ‌دار (دیروز ۱۷:۳۰)</span></div>
          <div class="ai-card-row"><span>وضعیت حساب:</span><span>معتبر و در سقف مجاز اعتبار</span></div>
        </div>
      `
    },
    growth: {
      user: 'گزارش کارکرد و فروش امروز مغازه چطور بوده؟',
      bot: `
        <p>خلاصه آمار و عملکرد صندوق‌های گالری تا این لحظه:</p>
        <div class="ai-card-result">
          <div class="ai-card-row"><span>تعداد فاکتورهای امروز:</span><span>۸ فقره</span></div>
          <div class="ai-card-row"><span>وزن کل طلای فروخته‌شده:</span><span>۳۸.۷۵۰ گرم</span></div>
          <div class="ai-card-row"><span>طلای کهنه خریداری‌شده:</span><span>۱۲.۳۰۰ گرم</span></div>
          <div class="ai-card-row"><span>طلای خالص افزوده‌شده:</span><span>۲۶.۴۵۰ گرم ۱۸ عیار</span></div>
          <div class="ai-card-row"><span>دریافتی نقد و کارت‌خوان:</span><span>۷۶۴٬۲۰۰٬۰۰۰ تومان</span></div>
          <div class="ai-card-row"><span>نسبت تسویه نقدی:</span><span>۸۸٪ (۱ فاکتور نسیه)</span></div>
        </div>
      `
    },
    melt: {
      user: 'ارزش و تبدیل یک شمش ۵۰ گرمی آبشده با عیار ۷۳۵ چقدر می‌شه؟',
      bot: `
        <p>محاسبه تبدیل عیار و ارزش روز طلای آب‌شده:</p>
        <div class="ai-card-result">
          <div class="ai-card-row"><span>وزن ناخالص قطعه:</span><span>۵۰.۰۰۰ گرم</span></div>
          <div class="ai-card-row"><span>عیار آزمایشگاه (ری‌گیری):</span><span>۷۳۵</span></div>
          <div class="ai-card-row"><span>معادل طلای ۱۸ عیار (۷۵۰):</span><span>۴۹.۰۰۰ گرم</span></div>
          <div class="ai-card-row"><span>معادل به مثقال:</span><span>۱۰.۶۱۵ مثقال</span></div>
          <div class="ai-card-row"><span>ارزش بر پایه مظنه روز:</span><span>۱٬۲۶۳٬۸۱۷٬۰۰۰ تومان</span></div>
        </div>
      `
    }
  };

  function appendMessage(text, isUser = false) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-msg ${isUser ? 'user' : 'bot'}`;
    const avatar = isUser
      ? '<div class="chat-avatar-mini user-icon">👤</div>'
      : '<div class="chat-avatar-mini bot-icon">✨</div>';
    
    msgDiv.innerHTML = `
      ${avatar}
      <div class="msg-bubble">${isUser ? `<p>${text}</p>` : text}</div>
    `;
    chatBody.appendChild(msgDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  function showTypingAndRespond(botHtml) {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'chat-msg bot';
    typingDiv.id = 'ai-typing-indicator';
    typingDiv.innerHTML = `
      <div class="chat-avatar-mini bot-icon">✨</div>
      <div class="msg-bubble">
        <div class="typing-dots">
          <span class="typing-dot"></span>
          <span class="typing-dot"></span>
          <span class="typing-dot"></span>
        </div>
      </div>
    `;
    chatBody.appendChild(typingDiv);
    chatBody.scrollTop = chatBody.scrollHeight;

    setTimeout(() => {
      typingDiv.remove();
      appendMessage(botHtml, false);
    }, 600);
  }

  promptBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      promptBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const promptKey = btn.getAttribute('data-prompt');
      const data = aiResponses[promptKey];
      if (!data) return;

      appendMessage(data.user, true);
      showTypingAndRespond(data.bot);
    });
  });

  function handleSend() {
    if (!userInput) return;
    const text = userInput.value.trim();
    if (!text) return;

    appendMessage(text, true);
    userInput.value = '';

    if (text.includes('حسینی') || text.includes('فاکتور') || text.includes('النگو')) {
      showTypingAndRespond(aiResponses.invoice.bot);
    } else if (text.includes('احمدی') || text.includes('مانده') || text.includes('حساب')) {
      showTypingAndRespond(aiResponses.balance.bot);
    } else if (text.includes('فروش') || text.includes('رشد') || text.includes('گزارش')) {
      showTypingAndRespond(aiResponses.growth.bot);
    } else if (text.includes('آبشده') || text.includes('شمش') || text.includes('عیار')) {
      showTypingAndRespond(aiResponses.melt.bot);
    } else {
      showTypingAndRespond(`
        <p>دستور <strong>«${text}»</strong> دریافت شد و در پایگاه حسابداری گلدکس پردازش گردید.</p>
        <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.4rem;">برای مشاهده فرآیندهای نمونه می‌توانید از کلیدهای آماده بالای صفحه استفاده فرمایید.</p>
      `);
    }
  }

  sendBtn?.addEventListener('click', handleSend);
  userInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  });
}
