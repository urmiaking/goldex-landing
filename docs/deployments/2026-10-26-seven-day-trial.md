# انتشار دوره آزمایشی هفت‌روزه — ۲۶ اکتبر ۲۰۲۶

سورس شاخه `master` در `15e6789` متن هفت‌روزه داشت، اما کانتینر عمومی هنوز نسخه ۱۳ اکتبر را اجرا می‌کرد و چهار اشاره به دوره چهارده‌روزه داشت. مخزن workflow فعال GitHub Actions برای این لندینگ ندارد؛ انتشار با مسیر Docker موجود انجام شد. شاخه پیش‌فرض `main` این مخزن محتوای متفاوتی دارد؛ سورس فعال لندینگ از `master` انتخاب شد.

- Image: `reg.goldexsoft.ir/qirato:landing-15e6789-account-recovery`
- Digest رجیستری: `sha256:885dd5ee774c3a0eb678926ba7e308107e9f94ee25a5a89d0d4c0d2b33cb2050`
- SHA-256 فایل عمومی: `60dbcb34673bb7f48c5e2ec7f06b350cd1bed6be239fa34f763e46a5e1bcae86`
- نسخه بازگشت محلی: `reg.goldexsoft.ir/qirato:rollback-before-account-recovery`

چهار تست مسیر دانلود و بررسی syntax دو فایل JavaScript موفق بودند. تنظیم nginx پیش و پس از استقرار بررسی شد؛ `/healthz` پاسخ `OK` داد. HTML عمومی با بایت‌های `index.html` سورس برابر است و اشاره چهارده‌روزه ندارد. فقط سرویس `qirato` با Compose موجود به‌روز شد؛ انتشار API/admin از workflow مستقل بک‌اند انجام شد.

برای بازگشت، روی سرور image نسخه بازگشت را به `reg.goldexsoft.ir/qirato:latest` تگ کنید و از پوشه `/home/user/docker/qirato` فقط `docker compose up -d --no-deps --no-build --pull never qirato` را اجرا کنید. رکوردهای مشتری، پایگاه داده و volumeها در این انتشار تغییر نکردند.
