# انتشار لندینگ اندروید و ویندوز — ۱۳ اکتبر ۲۰۲۶

نسخه تأییدشده در [qirato.ir](https://qirato.ir/) منتشر شد. بخش معرفی بدون قیمت، پکیج اندروید ۹٬۹۹۹٬۰۰۰ تومان و پکیج کامل ۲۵٬۰۰۰٬۰۰۰ تومان، تصاویر واقعی برنامه و قاب‌های G615 و Galaxy S25 Ultra در این انتشار حضور دارند.

## هویت انتشار

- Commit کد: `dee6072926d545db590d5bd57539cc0a3ca3986c`
- Image: `reg.goldexsoft.ir/qirato:landing-dee6072`؛ همین ایمیج با تگ `latest` نیز منتشر شد.
- Digest منتشرشده و اجراشده: `sha256:141b767f4bfc5766a67d52842345561d665ee4f37e87752c0164740b599e2b86`
- SHA-256 فایل HTML عمومی: `f832871f851826bb57b821ca69b1a581054a718ec6691eb4d7dc5ce1e38f3145`
- نسخه قبلی رجیستری: `reg.goldexsoft.ir/qirato:rollback-before-landing-dee6072`
- نسخه قبلی روی سرور: `reg.goldexsoft.ir/qirato:rollback-local-before-landing-dee6072`
- Digest قبلی: `sha256:7747c514da054e525a7cabc4c9afc3d2f65ce74b71c385035d223fbd57a8f521`

## اجرا و بررسی

ایمیج با Dockerfile موجود ساخته شد. Nginx config test و health endpoint محلی کانتینر موفق بودند؛ محتوای تأییدشده و ۱۸ ارجاع به فایل ایستا بررسی شدند. انتخاب مستقل ریلیزهای دو پلتفرم قبلاً در چهار تست Node.js و مرورگر بررسی شده بود.

روی سرور فقط سرویس `qirato` با `docker compose pull qirato` و `docker compose up -d --no-deps qirato` به‌روزرسانی شد. دستور به‌روزرسانی، سرویس‌های `qirato-admin` و `qirato-api` را هدف نگرفت و فایل compose و volumeهای آن‌ها تغییر نکردند. digest کانتینر جدید با رجیستری برابر بود و Nginx config test و health endpoint داخل کانتینر موفق بودند.

روی HTTPS عمومی، فایل HTML و هر ۱۸ ارجاع فایل ایستا با بایت‌های checkout تأییدشده برابر بودند؛ `/healthz` پاسخ `200 OK` و بدنه `OK` داشت. هدر HTML شامل `no-store` است. نمایش مرورگر نیز نبود قیمت در معرفی، حضور قیمت‌های دو پکیج و بارگذاری تصاویر واقعی را تأیید کرد.

## بازگشت به نسخه قبلی

در پوشه compose روی همان سرور، در صورت نیاز به بازگشت:

```sh
sudo docker tag reg.goldexsoft.ir/qirato:rollback-local-before-landing-dee6072 reg.goldexsoft.ir/qirato:latest
sudo docker compose up -d --no-deps --pull never qirato
sudo docker exec qirato wget -qO- http://127.0.0.1:8080/healthz
```

در صورت حذف ایمیج محلی، تگ rollback رجیستری همچنان در دسترس است. پس از بازگشت نیز صفحه عمومی و فایل‌های آن باید بررسی شوند.

مخزن محلی لندینگ remote گیت ندارد؛ تحویل از طریق رجیستری Docker و سرور انجام شده است. فایل‌های این گزارش در context ایمیج قرار نمی‌گیرند. هیچ اطلاعات ورود به سرور در فایل‌های پروژه ذخیره نشده است.
