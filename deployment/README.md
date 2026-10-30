# GoldEx website delivery

The GoldEx website lives on `main` in `wwwroot/`. The independent Qirato website lives on `master` in the same remote repository. The root Compose file belongs to the older portfolio setup and is deliberately not used by this workflow.

Pushes affecting website/deployment files on `main`, or a manual run of **Verify and deploy GoldEx website**, directly update only the existing `goldex-landing` container. Pull requests do not deploy. The workflow has no test stage, as requested by the owner. The current design was already live before the pricing task; commit `1edc1f2` records that previously uncommitted baseline.

Production uses `/home/user/goldex-landing/docker-compose.yaml`. The server's root-owned `/usr/local/sbin/deploy-goldex-landing` is installed from `deploy_goldex.py`. Its SSH key is restricted to this command, with forwarding and interactive access disabled. It accepts a size-limited archive of static website files and `release.json`, builds a fixed nginx image, and never executes a Dockerfile or shell script from the upload. Updating the trusted server command requires a separate administrator installation.

GitHub secrets `GOLDEX_DEPLOY_KEY` and `GOLDEX_DEPLOY_KNOWN_HOSTS` hold the dedicated private key and pinned server host key. Registry credentials stay on the server. No application environments, databases or customer records are read by the job. Tests use temporary fixtures and never inspect production files.

Every deployment publishes `reg.goldexsoft.ir/goldex-landing:main-<full-commit>` and promotes `latest` after its nginx and container HTTP checks. The previous image is retained as `rollback-before-<first-12-characters-of-commit>`. A failed container check restores the previous local image and restarts only `goldex-landing`.

For manual rollback, tag the desired rollback image as `reg.goldexsoft.ir/goldex-landing:latest`, then run `docker compose -f /home/user/goldex-landing/docker-compose.yaml up -d --no-deps --no-build --pull never goldex-landing`. Publish that restored `latest` tag to the registry if retaining the rollback. Public HTML is compared with the checked-out source after deployment.

## مشاوره و استعلام قیمت

طرح‌های گلدکس مینی، جامع ابری و سرور محلی با امکانات فعلی حفظ شده‌اند. مبلغ و تخفیف عمومی نرم‌افزار از HTML، اطلاعات جست‌وجو، FAQ، ترجمه‌های انگلیسی/ترکی و رندر قدیمی قیمت حذف شده است. هر طرح مسیر تلگرام و تماس فروش دارد؛ راهنمای واریز عمومی به دریافت پیشنهاد و تأیید شرایط پیش از پرداخت تبدیل شده است.

لایسنس جامع ابری دائمی و سال اول میزبانی، پشتیبانی و به‌روزرسانی رایگان است. تمدید خدمات از سال دوم طبق تعرفه سالانه انجام می‌شود و خرید مجدد لایسنس نیست. این تغییر، شرایط لایسنس یا قابلیت‌های مینی و سایر نسخه‌ها را عوض نمی‌کند.

انتشار با پوش به `main` و بدون مرحله تست انجام می‌شود. بررسی در دسترس بودن کانتینر و تطبیق HTML بعد از انتشار، برای تشخیص خطای استقرار و بازگشت خودکار حفظ شده است.
