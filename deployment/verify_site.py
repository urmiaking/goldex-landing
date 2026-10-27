"""Verify published pricing, renewal terms and local static dependencies."""
import json
import pathlib
import re
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote

ROOT = pathlib.Path(__file__).resolve().parents[1] / "wwwroot"


class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.references = []

    def handle_starttag(self, tag, attributes):
        attrs = dict(attributes)
        for key in ("src", "href"):
            value = attrs.get(key, "")
            if value and not value.startswith(("#", "http:", "https:", "tel:", "mailto:", "data:")):
                self.references.append(value)


def verify():
    source = (ROOT / "index.html").read_text(encoding="utf-8")
    page = Page()
    page.feed(source)
    for reference in page.references:
        target = ROOT / unquote(urlsplit(reference).path)
        assert target.is_file(), "Missing local asset: " + reference
    for text in (
        "گلدکس جامع ابری", "۱۷۹٬۰۰۰٬۰۰۰", "۱۲۹٬۰۰۰٬۰۰۰", "۵۰٬۰۰۰٬۰۰۰ تومان تخفیف",
        "پیشنهاد ویژه", "لایسنس گلدکس جامع ابری دائمی است",
        "سال اول میزبانی، پشتیبانی و به‌روزرسانی رایگان است",
        "از سال دوم، تمدید میزبانی ابری و خدمات پشتیبانی طبق تعرفه سالانه انجام می‌شود",
        "تمدید خدمات به معنی خرید مجدد لایسنس نیست",
        "مدیریت فاکتورها، مشتریان، حساب‌ها و موجودی", "گزارش‌های مالی و مدیریتی",
    ):
        assert text in source, "Missing sale term: " + text
    mini = re.search(r'<article[^>]+id="pricing-mini".*?</article>', source, re.S).group()
    assert "۹٬۹۹۹٬۰۰۰" in mini and "۲۰٬۰۰۰٬۰۰۰" in mini
    assert "بدون نیاز به اینترنت، سرور یا شارژ سالیانه" in mini
    cloud = re.search(r'<article[^>]+id="pricing-cloud".*?</article>', source, re.S).group()
    assert "۲۰۰٬۰۰۰٬۰۰۰" not in source
    assert "۱۲۹٬۰۰۰٬۰۰۰" in cloud and "۱۷۹٬۰۰۰٬۰۰۰" in cloud
    assert not re.search(r"م[ؤو]دیان|taxpayer|moadian", source, re.I)
    graph = json.loads(re.search(r'<script type="application/ld\+json">(.*?)</script>', source, re.S).group(1))
    offers = next(item for item in graph["@graph"] if item["@type"] == "SoftwareApplication")["offers"]
    assert [(item["price"], item["priceCurrency"]) for item in offers] == [
        ("99990000", "IRR"), ("1290000000", "IRR")]
    assert "index.html#pricing" in (ROOT / "pricing.html").read_text(encoding="utf-8")
    print("GoldEx prices, service terms, Mini contract, JSON-LD and local assets verified")


if __name__ == "__main__":
    verify()
