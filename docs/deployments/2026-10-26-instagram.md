# افزودن اینستاگرام رسمی — ۲۶ اکتبر ۲۰۲۶

لینک `https://www.instagram.com/qirato.ir/` با عنوان «اینستاگرام قیراط» و شناسه `@qirato.ir` به فوتر افزوده شد. لینک از ظاهر موجود استفاده می‌کند، در زبانه جدید باز می‌شود و شناسه با `bdi` در متن راست‌به‌چپ خوانا می‌ماند.

- سورس فعال: شاخه `master`، تغییر `e562c15`، PR شماره ۴.
- ایمیج: `reg.goldexsoft.ir/qirato:landing-e562c15-instagram`
- Digest رجیستری: `sha256:39500c509fc494682607c043da297ebb07b7f3d940718b32c0c7b278217b7cd5`
- نسخه بازگشت روی سرور: `reg.goldexsoft.ir/qirato:rollback-before-instagram-20261026`

چهار تست دانلود، بررسی مقصد و ویژگی‌های لینک، بررسی syntax تنظیم nginx و سلامت کانتینر موفق بودند. لینک در HTML عمومی `https://qirato.ir/` تأیید شد. مخزن workflow فعال ندارد؛ ایمیج از فهرست مشخص فایل‌های runtime ساخته و منتشر شد و فقط سرویس `qirato` از Compose موجود با `--no-deps --no-build --pull never` به‌روز شد.

برای بازگشت، ایمیج rollback را به `reg.goldexsoft.ir/qirato:latest` تگ کنید و از پوشه `/home/user/docker/qirato` دستور `docker compose up -d --no-deps --no-build --pull never qirato` را اجرا کنید.

این تغییر محلی در HTML به ساخت گراف معماری نیاز نداشت؛ دارایی ایستا و استایل موجود مستقیماً بررسی شدند. برنامه و API در این انتشار تغییری نکردند.
