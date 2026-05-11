# Végleges audit jegyzet — metallagentur.at

## Javított technikai pontok

- A hibás `de.html.html`, `hu.html.html`, `en.html.html` schema URL-ek javítva.
- A hibás `de.html-*`, `hu.html-*`, `en.html-*` schema URL-ek javítva a flat fájlnevekre.
- A canonical, hreflang, sitemap és robots irány a `https://metallagentur.at/` domainhez igazítva.
- Külső Google Fonts hívás nincs; a betűk lokális/system fallback logikával működnek.
- Google Analytics, Tag Manager, YouTube embed, Google Maps embed és marketing pixel nincs beépítve.
- Google Search Console és Bing Webmaster Tools bekötéshez előkészített kommenthely van az `index.html` head részében. Ezek nem tracking kódok.
- Az űrlap FormSubmit továbbítással működik, adatvédelmi tájékoztatóhoz kötött consent checkboxszal és e-mail/telefon alternatívával.

## Publikálás utáni ellenőrzés

1. Google Search Console: domain property vagy URL-prefix property felvétele.
2. Bing Webmaster Tools: sitemap beküldése.
3. Google Rich Results Test / Schema Markup Validator futtatása főoldalakra.
4. Search Console URL Inspection: `https://metallagentur.at/`, `de.html`, `hu.html`, `en.html`.
5. Élő űrlap teszt egy rövid próbaüzenettel.

## Jogi megjegyzés

A csomag technikailag a megadott működéshez van tisztítva. A végleges osztrák jogi megfeleléshez az Impressum, Datenschutz és AGB szövegek ügyvédi/adatvédelmi szakértői ellenőrzése továbbra is javasolt.
