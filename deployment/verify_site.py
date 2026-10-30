"""Verify contact pricing, preserved license terms and local static dependencies."""
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
        "گلدکس جامع ابری", "مشاوره و استعلام قیمت", "استعلام قیمت در تلگرام",
        "تماس با فروش", "لایسنس گلدکس جامع ابری دائمی است",
        "سال اول میزبانی، پشتیبانی و به‌روزرسانی رایگان است",
        "از سال دوم، تمدید میزبانی ابری و خدمات پشتیبانی طبق تعرفه سالانه انجام می‌شود",
        "تمدید خدمات به معنی خرید مجدد لایسنس نیست",
        "مدیریت فاکتورها، مشتریان، حساب‌ها و موجودی", "گزارش‌های مالی و مدیریتی",
    ):
        assert text in source, "Missing sale term: " + text
    mini = re.search(r'<article[^>]+id="pricing-mini".*?</article>', source, re.S).group()
    assert "بدون نیاز به اینترنت، سرور یا شارژ سالیانه" in mini
    assert "سینی هوشمند" not in mini and "اسکن بارکد" not in mini, "Cloud tray feature attributed to Mini"
    assert "سینی هوشمند و اسکن بارکد با دوربین مخصوص نسخه جامع است و در گلدکس مینی وجود ندارد" in source
    cloud = re.search(r'<article[^>]+id="pricing-cloud".*?</article>', source, re.S).group()
    cards = re.findall(r'<article[^>]+class="[^"]*package-card[^\"]*".*?</article>', source, re.S)
    assert len(cards) == 3
    for card in cards:
        assert 'href="https://t.me/masoud_98pv"' in card and 'href="tel:09905492104"' in card
        assert "package-quote" in card and "package-price" not in card
        assert not re.search(r"[۰-۹0-9][٬،,][۰-۹0-9]{3}[٬،,][۰-۹0-9]{3}|تخفیف", card)
    for stale in ("۹٬۹۹۹٬۰۰۰", "۲۰٬۰۰۰٬۰۰۰", "۱۷۹٬۰۰۰٬۰۰۰", "۱۲۹٬۰۰۰٬۰۰۰", "۵۰٬۰۰۰٬۰۰۰"):
        assert stale not in source, "Stale software price in HTML or metadata"
    assert not re.search(r"م[ؤو]دیان|taxpayer|moadian", source, re.I)
    graph = json.loads(re.search(r'<script type="application/ld\+json">(.*?)</script>', source, re.S).group(1))
    application = next(item for item in graph["@graph"] if item["@type"] == "SoftwareApplication")
    assert "offers" not in application, "Do not present contact pricing as a free or fixed-price offer"
    assert "index.html#pricing" in (ROOT / "pricing.html").read_text(encoding="utf-8")
    print("GoldEx contact pricing, service terms, Mini contract, JSON-LD and local assets verified")


if __name__ == "__main__":
    verify()
