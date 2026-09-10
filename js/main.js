/**
 * Qirato (قیراط) - Main Landing Page Script
 * Interactivity, Themes, Showcase Tabs, Lightbox, and FAQ
 */

// Screenshots data
const showcaseData = {
  dashboard: {
    title: 'داشبورد اختصاصی بنکداران و فعالان بازار طلا',
    desc: 'نمای ۳۶۰ درجه و آنی از ارزش کل سبد دارایی، سود و زیان روزانه، مظنه‌های شاخص بازار و میانبرهای عملیاتی زرگری در یک پوسته لوکس زرین.',
    image: 'assets/screens/screen_dashboard.png',
    bullets: [
      'محاسبه لحظه‌ای ارزش کل موجودی طلا و مسکوکات بر اساس نرخ زنده',
      'نمودار بصری تغییرات پورتفوی با تفکیک سود محقق‌شده و دارایی راکد',
      'دسترسی سریع به صدور فاکتور، تبدیل عیار و استعلام حباب سکه'
    ]
  },
  rates: {
    title: 'تابلوی مظنه زنده سه‌گانه بدون قطعی',
    desc: 'استعلام لحظه‌ای و پایدار نرخ طلا، سکه و ارز از سه مرجع رسمی با مکانیزم Fallback هوشمند جهت روزهای پرنوسان یا قطعی موقت مراجع.',
    image: 'assets/screens/screen_rates.png',
    bullets: [
      'تجمیع و اعتبارسنجی خودکار از TGJU، طلا.آی‌آر و آی‌سیگنال',
      'استخراج دقیق نرخ دلار آزاد از برابری درهم امارات در روزهای تعطیل',
      'نشانگرهای صوتی و تصویری نوسانات سریع لحظه‌ای در بازار'
    ]
  },
  calculator: {
    title: 'ماشین‌حساب تخصصی طلا و صدور فاکتور رسمی',
    desc: 'محاسبه دقیق قیمت تمام‌شده انواع مصنوعات طلا و جواهر طبق آخرین اصلاحیه ماده ۲۶ قانون مالیات بر ارزش افزوده و ضوابط اتحادیه طلا.',
    image: 'assets/screens/screen_calculator.png',
    bullets: [
      'معافیت اصل طلا از مالیات و محاسبه ۹٪ ارزش‌افزوده صرفاً روی اجرت و سود ۷٪',
      'کسر اتوماتیک وزن نگین، سنگ‌های اتمی و محاسبات شرطی',
      'تبدیل آنی مبلغ کل به حروف جهت درج در فاکتورهای رسمی و دستی'
    ]
  },
  bubble: {
    title: 'تحلیل‌گر پیشرفته حباب مسکوکات بانکی',
    desc: 'محاسبه ریاضی ارزش ذاتی طلای انواع سکه بر اساس انس جهانی و مظنه روز، همراه با محاسبه دقیق حباب ریالی و درصد ریسک سرمایه‌گذاری.',
    image: 'assets/screens/screen_bubble.png',
    bullets: [
      'پشتیبانی از سکه تمام بهار آزادی، طرح امامی، نیم سکه، ربع سکه و گرمی',
      'نمایش تفکیک‌شده ارزش طلای خام سکه و حق‌ضرب بانکی',
      'سیگنال‌های هوشمند ورود و خروج بر اساس درصد تاریخی حباب'
    ]
  },
  invoice: {
    title: 'سیستم جامع فاکتور دوطرفه، تهاتر و خروجی PDF',
    desc: 'صدور فاکتورهای استاندارد طلا و جواهر به همراه قابلیت تهاتر طلای کهنه مشتری، تسویه نقدی و تولید مستقیم فایل PDF جهت چاپ یا ارسال در پیام‌رسان‌ها.',
    image: 'assets/screens/screen_invoice.png',
    bullets: [
      'پشتیبانی از اقلام طلای ساخته، سکه بانکی، آبشده و طلای مستعمل',
      'تولید سند استاندارد PDF با سربرگ، مشخصات مشتری و بارکد استعلام',
      'اشتراک‌گذاری آنی در ایتا، بله، واتساپ، تلگرام و پرینترهای بی‌سیم'
    ]
  },
  ledger: {
    title: 'دفتر حساب و معین زرگری (حساب اشخاص و بنکداری)',
    desc: 'مدیریت دقیق مانده‌حساب‌های ریالی و وزنی طلا با همکاران و مشتریان، ثبت اسناد دریافت و پرداخت، و محاسبه خودکار تراز زرگری.',
    image: 'assets/screens/screen_ledger.png',
    bullets: [
      'تفکیک حساب طلایی (به گرم ۷۵۰) و حساب ریالی (تومان)',
      'ثبت تسویه حساب‌های تهاتری با ثبت عیار دقیق',
      'دفترچه تلفن اختصاصی همکاران، طلافروشان و کیفی‌ها'
    ]
  },
  melt: {
    title: 'مدیریت آبشده، عیارسنجی و آزمایشگاه ری‌گیری',
    desc: 'ثبت و محاسبه انواع قطعات طلای آبشده، شماره انگ ری‌گیری، تبدیل عیارهای سنتی (۷۰۵، ۷۴۰، ۷۵۰ و ۹۹۵) و معادل‌سازی وزنی به خط طلای ۱۸ عیار.',
    image: 'assets/screens/screen_melt.png',
    bullets: [
      'محاسبه خودکار وزن شرطی و عیار استاندارد ۷۵۰',
      'جستجو و بایگانی شماره انگ ری‌گیری‌های معتبر کشور',
      'سرعت فوق‌العاده در محاسبات روزمره معامله‌گران آبشده'
    ]
  },
  workshop: {
    title: 'سفارشات ساخت و مدیریت کارگاه طلاسازی',
    desc: 'پیگیری کامل مراحل ساخت سفارشات مشتری از مرحله ذوب، مخراج‌کاری، پولیش و پرداخت تا تحویل نهایی همراه با محاسبه کسری و کسورات کارگاه.',
    image: 'assets/screens/screen_workshop.png',
    bullets: [
      'ثبت دقیق پیش‌دریافت طلا و وجه نقد',
      'محاسبه کسری مجاز ساخت طبق عرف بازار',
      'گزارش‌گیری از پیشرفت پروژه‌های سفارشی ساخت'
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
    if (window.scrollY > 30) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  }, { passive: true });

  // 3. Theme Toggle (Dark Obsidian / Light Sovereign Porcelain)
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const currentTheme = localStorage.getItem('qirato-theme') || 'dark';

  if (currentTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    if (themeToggleBtn) themeToggleBtn.innerHTML = '🌙';
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
    if (themeToggleBtn) themeToggleBtn.innerHTML = '☀️';
  }

  themeToggleBtn?.addEventListener('click', () => {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    const newTheme = isLight ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('qirato-theme', newTheme);
    themeToggleBtn.innerHTML = newTheme === 'light' ? '🌙' : '☀️';
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

      // Smooth content swap with subtle fade
      if (showcaseHolder) showcaseHolder.style.opacity = '0.4';

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
    lightboxImg.alt = alt || 'پیش‌نمایش تصویر قیراط';
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
    const img = heroScreenTrigger.querySelector('img');
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
    question?.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // 7. Mobile Navigation Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  mobileMenuBtn?.addEventListener('click', () => {
    if (!navLinks) return;
    const isShown = navLinks.style.display === 'flex';
    navLinks.style.display = isShown ? 'none' : 'flex';
    if (!isShown) {
      navLinks.style.flexDirection = 'column';
      navLinks.style.position = 'absolute';
      navLinks.style.top = 'var(--header-height)';
      navLinks.style.left = '0';
      navLinks.style.right = '0';
      navLinks.style.background = 'var(--bg-card)';
      navLinks.style.padding = '1.5rem';
      navLinks.style.borderBottom = '1px solid var(--border-gold)';
    }
  });

  // 8. Smooth scrolling on anchor clicks
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      const targetElem = document.querySelector(targetId);
      if (targetElem) {
        e.preventDefault();
        targetElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (window.innerWidth <= 768 && navLinks) {
          navLinks.style.display = 'none';
        }
      }
    });
  });

  // 9. Generate QR Code for direct APK download
  renderDownloadQr();
});

// Render dynamic QR code for direct download URL
function renderDownloadQr() {
  const qrContainer = document.getElementById('qr-container');
  if (!qrContainer) return;

  const downloadUrl = 'https://github.com/urmiaking/goldex-companion/releases/latest/download/app-release.apk';
  
  // Use official QR code API for high-density crisp vector QR
  const qrImg = document.createElement('img');
  qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=4&color=111827&bgcolor=FFFFFF&data=${encodeURIComponent(downloadUrl)}`;
  qrImg.alt = 'کد QR دانلود مستقیم اپلیکیشن قیراط';
  qrImg.width = 170;
  qrImg.height = 170;
  qrImg.loading = 'lazy';

  qrContainer.innerHTML = '';
  qrContainer.appendChild(qrImg);
}
