# 🔧 INTEGRACIÓN ÚTMUTATÓ — Metallagentur.at Weboldal Módosítása

## 📋 Tartalomjegyzék
1. [Módosított Fájlok Listája](#fájlok-listája)
2. [Fő Módosítások](#fő-módosítások)
3. [Integráció Lépésről Lépésre](#integráció-lépésről-lépésre)
4. [URL Struktúra](#url-struktúra)
5. [Képek & Média](#képek--média)
6. [Reszponzivitás Tesztelése](#reszponzivitás-tesztelése)

---

## 📁 Fájlok Listája

### ✅ Módosított CSS
- **`styles-modified.css`** — Az új, szellősebb design CSS fájl

### ✅ HTML Fájlok — 6 oldal (3 nyelven)

#### MAGYAR (HU)
- **`index-hu.html`** — Főoldal (4:3 + 3:4 képek)
- **`bemutatkozas-hu.html`** — Bemutatkozás/About oldal (3:2 kép)

#### NÉMET (DE)
- **`index-de.html`** — Startseite (4:3 + 3:4 képek)
- **`ueber-mich-de.html`** — Über Mich oldal (3:2 kép)

#### ANGOL (EN)
- **`index-en.html`** — Homepage (4:3 + 3:4 képek)
- **`about-en.html`** — About oldal (3:2 kép)

---

## 🎨 Fő Módosítások

### 1. **CSS Fejlesztések**
```
✓ Szellősebb elrendezés (Flexbox + Grid)
✓ Jobb spacing (var(--space-4) - var(--space-7) közötti rések)
✓ Modern aspect-ratio megvalósítás
✓ object-fit: cover — képek nem torzulnak
✓ Captions/Szövegek véglegesen rejtve (.portrait-figure__caption { display: none !important; })
✓ Új CSS osztályok: .hero-images-grid, .about-content-grid, .contact-content-grid
```

### 2. **HTML Szerkezet**
```html
<!-- Főoldal képpárok -->
<div class="hero-images-grid">
  <div class="hero-images-grid__item">
    <figure class="portrait-figure portrait-figure--hero">
      <!-- Kép: 4:3 aránya -->
    </figure>
  </div>
  <div class="hero-images-grid__item">
    <!-- Szöveg tartalom -->
  </div>
</div>

<!-- About oldalak -->
<div class="about-content-grid">
  <div><!-- Szöveg --></div>
  <div>
    <figure class="portrait-figure portrait-figure--about">
      <!-- Kép: 3:2 aránya -->
    </figure>
  </div>
</div>
```

### 3. **Képarányok (Véglegesek)**
| Oldal | Kép Helye | Aránya | CSS Class |
|-------|-----------|--------|-----------|
| Főoldal 1. kép | Hero szekció | **4:3** | `.portrait-figure--hero` |
| Főoldal 2. kép | Trust szekció | **3:4** | `.portrait-figure--trust` |
| About oldalak | Bemutatkozás szekció | **3:2** | `.portrait-figure--about` |
| Kapcsolat oldalak | Szöveg mellett | **3:4** | `.portrait-figure--contact` |

### 4. **Captions — TELJESEN REJTVE**
```css
.portrait-figure__caption {
  display: none !important;     /* Véglegesen rejtett */
  visibility: hidden;           /* Extra biztonság */
  content: none;                /* Nincs tartalom */
}
```

---

## 🚀 Integráció Lépésről Lépésre

### 1. CSS Csere
```bash
# Régi CSS biztonsági másolatba mentése
cp /assets/styles.css /assets/styles-backup.css

# Új CSS másolása
cp styles-modified.css /assets/styles.css
```

### 2. HTML Fájlok Helyezése

Attól függ, hogy milyen CMS/szerkezet van a szerveren:

#### Statamic CMS (valószínű)
```
/resources/views/
├── hu/
│   ├── index.html           ← index-hu.html
│   └── bemutatkozas.html    ← bemutatkozas-hu.html
├── de/
│   ├── index.html           ← index-de.html
│   └── ueber-mich.html      ← ueber-mich-de.html
└── en/
    ├── index.html           ← index-en.html
    └── about.html           ← about-en.html
```

#### Statikus Website
```
/public/
├── hu/
│   ├── index.html
│   └── bemutatkozas/index.html
├── de/
│   ├── index.html
│   └── ueber-mich/index.html
└── en/
    ├── index.html
    └── about/index.html
```

### 3. Képek Ellenőrzése

A HTML-ben a képek útvonalai:
```html
<!-- Helyesen kell lennie: -->
<picture>
  <source srcset="/images/hero-1.webp" type="image/webp">
  <img src="/images/hero-1.jpg" alt="...">
</picture>

<!-- Mappázásodban: -->
/public/images/
├── hero-1.jpg
├── hero-1.webp
├── portrait-1.jpg
├── portrait-1.webp
├── portrait-about.jpg
├── portrait-about.webp
├── portrait-2.jpg
├── portrait-2.webp
├── portrait-3.jpg
└── portrait-3.webp
```

### 4. Betöltési Sorrend Ellenőrzése
```html
<!-- A HTML-ben, a <head> végén kell lennie: -->
<link rel="stylesheet" href="/styles.css">

<!-- JAVASCRIPT — oldal vége előtt: -->
<script>
  // Header scroll detection
  const header = document.getElementById('siteHeader');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  });
  
  // ... (további scripts — lásd HTML fájlok)
</script>
```

---

## 🔗 URL Struktúra

A sitemap.xml alapján:
```
✅ /hu/                       → index-hu.html
✅ /hu/bemutatkozas/          → bemutatkozas-hu.html
✅ /de/                       → index-de.html
✅ /de/ueber-mich/            → ueber-mich-de.html
✅ /en/                       → index-en.html
✅ /en/about/                 → about-en.html
```

---

## 🖼️ Képek & Média

### Képforrások (Picture Element)
```html
<picture>
  <source srcset="/images/hero-1.webp" type="image/webp">
  <source srcset="/images/hero-1.jpg" type="image/jpeg">
  <img class="portrait-figure__img" src="/images/hero-1.jpg" alt="Mag. Tamas Toth">
</picture>
```

### Aspect-Ratio CSS
```css
/* 4:3 képarány — Főoldal első kép */
.portrait-figure--hero .portrait-figure__img {
  aspect-ratio: 4 / 3;
  object-fit: cover;
  object-position: center 20%;
}

/* 3:4 képarány — Főoldal második kép */
.portrait-figure--trust .portrait-figure__img {
  aspect-ratio: 3 / 4;
  object-fit: cover;
  object-position: center 15%;
}

/* 3:2 képarány — About/Bemutatkozás */
.portrait-figure--about .portrait-figure__img {
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center 20%;
}
```

### Mobil & Asztali Támogatás
```css
@media (max-width: 767px) {
  /* Mobil: szöveg és kép egymás alatt */
  .hero-images-grid {
    grid-template-columns: 1fr;
    gap: var(--space-3);
  }
}

@media (min-width: 768px) {
  /* Tablet+: szöveg és kép mellett */
  .hero-images-grid {
    grid-template-columns: 1fr 1fr;
    gap: var(--space-6);
  }
}
```

---

## ✅ Reszponzivitás Tesztelése

### Mobil (< 640px)
- [ ] Képek jó arányt tartanak (4:3, 3:4, 3:2)
- [ ] Szöveg olvasható, nem nyomódik az képekre
- [ ] Captions rejtve vannak
- [ ] FAB gomb jól pozicionálódik

### Tablet (640px - 1024px)
- [ ] Szöveg és kép részben egymás mellett
- [ ] Spacing megfelelő
- [ ] Oldalsáv jó

### Asztali (> 1024px)
- [ ] Harmonikus kép-szöveg layout
- [ ] Szellős, elegáns megjelenés
- [ ] Sorok és oszlopok jól igazítódnak

### Böngészők
- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari
- [ ] Mobile Safari (iOS)

---

## 🔍 Ellenőrzőlista — Bevezetés Után

```
CSS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
☐ styles-modified.css betöltödik
☐ Szín-sémák helyes
☐ Betűtípusok betöltődnek (Google Fonts)
☐ Captions nem láthatóak

HTML SZERKEZET
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
☐ Összes oldal megnyílik (HU, DE, EN)
☐ Navigáció helyes
☐ Nyelvváltó gomb működik
☐ FAB gomb megjelenik scroll után

KÉPEK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
☐ 4:3 kép helyesen arányozott (főoldal 1.)
☐ 3:4 kép helyesen arányozott (főoldal 2.)
☐ 3:2 kép helyesen arányozott (About)
☐ WebP és JPG formátumok támogatottak

RESZPONZIVITÁS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
☐ Mobil (320px) — szellős layout
☐ Tablet (768px) — kétoszlopos
☐ Asztali (1024px+) — harmonikus

FUNKCIÓ
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
☐ Header scroll detection működik
☐ Mobile menu toggle működik
☐ Cookie banner működik
☐ FAB gomb clickable
```

---

## 📧 Támogatás & Kérdések

Ha problémákba ütközöl:

1. **CSS nem tölt be?**
   - Ellenőrizd az útvonalat: `/styles.css`
   - Cache törlés: `Ctrl+Shift+Delete` (böngésző)

2. **Képek hiányoznak?**
   - Ellenőrizd: `/images/` mappában vannak-e
   - JPG és WebP párok szükségesek

3. **Layout nem szellős?**
   - Nézd meg a viewport width-et
   - CSS media queries helyes-e?

4. **Captions még mindig látszódnak?**
   - Ellenőrizd: `.portrait-figure__caption { display: none !important; }`

---

## 🎯 Összefoglalás

| Feladat | Státusz | Fájl |
|---------|---------|------|
| CSS módosítás | ✅ | `styles-modified.css` |
| HU főoldal | ✅ | `index-hu.html` |
| HU About | ✅ | `bemutatkozas-hu.html` |
| DE főoldal | ✅ | `index-de.html` |
| DE About | ✅ | `ueber-mich-de.html` |
| EN főoldal | ✅ | `index-en.html` |
| EN About | ✅ | `about-en.html` |
| Képarányok (4:3, 3:4, 3:2) | ✅ | CSS + HTML |
| Captions rejtés | ✅ | CSS |
| Szellős layout | ✅ | CSS Grid/Flexbox |
| Reszponzivitás | ✅ | Media Queries |

---

**Jó szerencsét az integrációhoz! 🚀**
