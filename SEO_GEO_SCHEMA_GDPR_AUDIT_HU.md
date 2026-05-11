# metallagentur.at — SEO / GEO / Schema / GDPR audit (HU)

Dátum: 2026-05-11

## Vezetői összefoglaló
A weboldal flat GitHub Pages struktúrája működőképes és stabilizálható. A legfontosabb technikai javítások megtörténtek: a domain a `metallagentur.at` fődomainre van egységesítve, a `CNAME`, `robots.txt`, `sitemap.xml`, canonical / hreflang / Open Graph URL-ek a megfelelő domainre lettek átállítva. A vizuális rendszer prémiumabb, nyugodtabb kép–szöveg arányt kapott.

## 1. SEO audit
### Erősségek
- Minden nyelvi verzió külön URL-en szerepel.
- Van `sitemap.xml` és `robots.txt`.
- A fő oldalak rendelkeznek title és meta description mezővel.
- A hreflang rendszer alapjai jelen vannak.
- A flat struktúra GitHub Pages alatt egyszerűen kiszolgálható.

### Kritikus javítások, amelyek bekerültek
- `magtamastoth.com` domainhivatkozások cseréje `metallagentur.at` domainre.
- `CNAME` tartalma: `metallagentur.at`.
- `robots.txt` sitemap hivatkozása: `https://metallagentur.at/sitemap.xml`.
- `sitemap.xml` URL-ek átállítása `https://metallagentur.at/...` formára.
- Canonical / hreflang / Open Graph URL-ek abszolút URL-ként szerepelnek.

### További ajánlás
- Ellenőrizni kell, hogy minden nyelvi oldal title-je valóban egyedi-e.
- Érdemes Google Search Console-ban beküldeni az új sitemapet.
- Ha a `www.metallagentur.at` is él, azt 301-gyel vagy DNS/GitHub beállítással egységesíteni kell a preferált domainre.

## 2. GEO / AI search audit
### Cél
A generatív keresők és válaszmotorok számára a weboldal egyértelmű entitásként értelmezze: Mag. Tamás Tóth, bécsi kereskedelmi ügynök, Ausztria–Magyarország fókusz, B2B piacra lépés és kereskedelmi képviselet.

### Erősségek
- Többnyelvű tartalom: HU / DE / EN.
- Egyértelmű személyes és szakmai pozicionálás.
- Strukturált tartalom: szolgáltatások, iparágak, régiók, GYIK, bemutatkozás.
- A cím, GISA, WKO és kapcsolati adatok erősítik a bizalmi jeleket.

### Javasolt további GEO erősítés
- Minden főoldalon legyen 1 rövid, gépileg is könnyen kiemelhető definíciós bekezdés: „Mag. Tamás Tóth is a Vienna-based commercial agent...”.
- Az About / Über mich / Bemutatkozás oldalon legyen tömör, dátumokkal és igazolható adatokkal épített szakmai timeline.
- A szolgáltatásoldalakon szerepeljen konkrét „Who this is for / Für wen / Kinek szól” blokk.
- A GYIK válaszok legyenek tömörek, idézhetőek, 2–4 mondatosak.

## 3. Schema audit — 6 fő séma
A jelenlegi struktúra jó alap, de a legstabilabb prémium verzióhoz oldalanként célzott JSON-LD graph ajánlott.

### 1. Person
Használandó: Mag. Tamás Tóth entitás, név, nyelvek, cím, email, telefon, sameAs.

### 2. ProfessionalService / LocalBusiness
Használandó: kereskedelmi ügynöki szolgáltatás, bécsi cím, areaServed: AT, HU, DACH.

### 3. WebSite
Használandó: domainszintű entitás `https://metallagentur.at/#website` az összes nyelvre.

### 4. WebPage
Oldalanként egyedi `@id`, canonical URL, `inLanguage`, `isPartOf`.

### 5. BreadcrumbList
Minden aloldalra javasolt. Flat fájlstruktúra mellett is segíti az értelmezést.

### 6. FAQPage
Csak azokon az oldalakon szerepeljen, ahol a kérdés-válasz ténylegesen látható a felhasználónak is.

### Kiemelt schema szabály
A schema URL-ek mindenhol `https://metallagentur.at/...` formában szerepeljenek, ne fejlesztői vagy régi domainnel.

## 4. GDPR / osztrák jogi audit
### Jelenlegi kockázati szint
Alacsony-közepes, feltéve hogy az oldal tényleg nem használ analytics, marketing pixel, beágyazott tracking vagy harmadik fél sütit.

### Pozitívumok
- A cookie banner szövege technikailag szükséges sütikről beszél.
- Nincs nyilvánvaló tracking script a fő működéshez.
- Vannak adatvédelem / impresszum / ÁSZF jellegű aloldalak.

### Szigorú osztrák / EU megfelelési pontok
- Ha nincs tracking, ne legyen „accept marketing” logika, mert az félrevezető lehet.
- Ha csak sessionStorage vagy technikailag szükséges működés van, elegendő lehet tájékoztató jellegű banner, de a privacy oldalon részletesen meg kell nevezni.
- Google Fonts használata esetén a legszigorúbb megoldás: lokális font-hosting, nem Google CDN.
- Kapcsolati űrlap esetén legyen adatkezelési cél, jogalap, megőrzési idő, címzett, érintetti jogok.
- A privacy oldalon külön legyen: hosting szolgáltató, GitHub Pages, emailkezelés, kapcsolatfelvétel, technikai naplók.
- Cookie tájékoztatóban szerepeljen: név, cél, időtartam, típus, szolgáltató.
- A jogi oldalak legyenek DE nyelven különösen pontosak, mert osztrák vállalkozásnál ez az elsődleges megfelelési réteg.

### Legszigorúbb ajánlás
- Google Fonts teljes kiváltása helyi fontfájlokkal vagy rendszerfont stackkel.
- Külső beágyazások kerülése.
- Nincs analytics, amíg nincs Consent Management Platform.
- Kapcsolati űrlapnál checkbox: „Ich habe die Datenschutzerklärung gelesen.” — nem marketing consent, csak tudomásulvételi link.

## 5. Mobil / reszponzív audit
### Javítva
- Hero cím mérete további 25%-kal csökkent.
- Hero kép kontrolláltabb, kevésbé domináns.
- A kép és szöveg szerkesztőségi egységként jelenik meg.
- Az alsó portré a szöveges tartalom közé került, nem külön lebegő blokk.

### Ellenőrzendő mobilon
- 390px és 430px széles nézeten a hero cím ne törjön túl sok sorba.
- A portré arca ne vágódjon túl közel a felső képszélhez.
- A nyelvválasztó ne ütközzön a logóval vagy hamburgerrel.
- A CTA gombok ne legyenek túl magasak egymás alatt.

## 6. Következő lépések
1. Feltöltés GitHub repo rootba.
2. GitHub Pages build ellenőrzése.
3. Search Console sitemap beküldés.
4. Rich Results Test / Schema Validator ellenőrzés.
5. GDPR jogi oldalak ügyvédi vagy adatvédelmi szakértői validációja.
