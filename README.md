# Mag. Tamas Toth — Website

Dreisprachige (DE/HU/EN) statische Website für Mag. Tamas Toth, Handelsagent in Wien.  
Gebaut für **GitHub Pages** — kein Build-Step, kein Framework, reines HTML/CSS/JS.

---

## Struktur

```
site/
├── index.html              # Sprachweiche mit Auto-Redirect
├── sitemap.xml
├── robots.txt
├── 404.html
│
├── assets/
│   ├── css/styles.css      # Gesamtes Design-System
│   ├── js/script.js        # Header, Mobile Menu, Reveal-Animation
│   └── js/contact.js       # FormSubmit AJAX + Fallback
│
├── de/                     # Deutsch (11 Inhaltsseiten + 3 Rechtsseiten)
│   ├── index.html
│   ├── leistungen/
│   ├── branchen/
│   ├── regionen/
│   ├── loesungen/
│   ├── ueber-mich/
│   ├── faq/
│   ├── kontakt/
│   ├── impressum/
│   ├── datenschutz/
│   └── agb/
│
├── hu/                     # Ungarisch (11 Inhaltsseiten + 3 Rechtsseiten)
│   ├── index.html
│   ├── szolgaltatasok/
│   ├── iparagak/
│   ├── regiok/
│   ├── megoldasok/
│   ├── bemutatkozas/
│   ├── gyik/
│   ├── kapcsolat/
│   ├── impresszum/
│   ├── adatvedelem/
│   └── aszf/
│
└── en/                     # Englisch (11 Inhaltsseiten + 3 Rechtsseiten)
    ├── index.html
    ├── services/
    ├── industries/
    ├── regions/
    ├── solutions/
    ├── about/
    ├── faq/
    ├── contact/
    ├── imprint/
    ├── privacy/
    └── terms/
```

---

## GitHub Pages — Setup (5 Schritte)

### 1. Repository anlegen

```bash
# Neues Repository auf github.com anlegen (z. B. "magtamastoth-site")
# Dann lokal initialisieren:
git init
git remote add origin https://github.com/DEIN-USERNAME/magtamastoth-site.git
```

### 2. Dateien hochladen

```bash
# Alle Dateien aus dem site/-Verzeichnis in das Root des Repos kopieren
cp -r site/* .
git add .
git commit -m "Initial website launch"
git push -u origin main
```

### 3. GitHub Pages aktivieren

Auf github.com → Repository → **Settings** → **Pages**  
→ Source: **Deploy from a branch**  
→ Branch: **main** / **(root)**  
→ **Save**

Die Website ist nach wenigen Minuten unter `https://DEIN-USERNAME.github.io/magtamastoth-site/` erreichbar.

### 4. Eigene Domain einrichten (metallagentur.at)

**Im Repository:**  
Eine Datei `CNAME` im Root anlegen mit dem Inhalt:
```
metallagentur.at
```

**Beim Domain-Registrar (z. B. GoDaddy, INWX, Namecheap):**

| Typ | Name | Wert |
|-----|------|------|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | DEIN-USERNAME.github.io |

GitHub Pages → Custom domain: `metallagentur.at` eintragen → **Enforce HTTPS** aktivieren.

### 5. FormSubmit aktivieren

Beim ersten Absenden des Kontaktformulars schickt FormSubmit eine Bestätigungs-E-Mail an  
`tamas.toth@metallagentur.at`. Diese einmalig bestätigen.

---

## Logo einfügen

1. Logo-Datei (SVG oder PNG, mind. 200×60 px) unter `assets/logo/logo.svg` ablegen.
2. In allen `index.html`-Dateien den `.site-logo`-Block ersetzen:

```html
<!-- vorher: -->
<a class="site-logo" href="/de/">
  <span class="site-logo__mark">TT</span>
  <span>Mag. Tamas Toth</span>
</a>

<!-- nachher: -->
<a class="site-logo" href="/de/">
  <img src="/assets/logo/logo.svg" alt="Mag. Tamas Toth" width="160" height="40">
</a>
```

---

## Portrait-Foto einfügen

Im Code sind alle Portrait-Platzhalter mit diesem Kommentar markiert:

```html
<!-- Portrait-Platzhalter: hier später echtes Foto einfügen -->
```

1. Foto als `portrait.jpg` (mind. 600×750 px, WebP für Performance optional) unter `assets/img/` ablegen.
2. Den `<figure class="portrait-placeholder">…</figure>`-Block ersetzen durch:

```html
<figure>
  <img src="/assets/img/portrait.jpg" 
       alt="Mag. Tamas Toth — Handelsagent in Wien"
       width="600" height="750"
       loading="lazy">
</figure>
```

---

## Domain-Anpassung

Alle kanonischen URLs, hreflang-Links, JSON-LD und Sitemap verwenden aktuell:

```
https://metallagentur.at/
```

Falls eine andere Domain verwendet wird (z. B. `www.toth-handelsagent.at`), alle Vorkommen ersetzen:

```bash
find . -name "*.html" -o -name "*.xml" | xargs sed -i 's|metallagentur.at|NEUE-DOMAIN.at|g'
```

---

## Kontaktformular — Fallback

Das Formular sendet via FormSubmit AJAX. Falls JavaScript deaktiviert ist oder FormSubmit nicht erreichbar,  
öffnet sich ein `mailto:`-Link mit vorausgefüllten Feldern. Kein serverseitiges Hosting notwendig.

Formular-Endpoint: `https://formsubmit.co/ajax/tamas.toth@metallagentur.at`

---

## Design-System

| Token | Wert |
|-------|------|
| `--color-ink` | `#0F1A2B` |
| `--color-paper` | `#FAFAF7` |
| `--color-paper-warm` | `#F2EFE7` |
| `--color-accent` | `#B8860B` (Goldocker) |
| `--color-burgundy` | `#6B2C2A` |
| Font Display | Cormorant Garamond |
| Font Body | Inter |
| Font Mono | JetBrains Mono |

---

## Rechtlicher Hinweis

Impressum, Datenschutz und AGB sind als juristische Entwürfe konzipiert.  
**Eine anwaltliche Endprüfung wird vor dem Live-Gang empfohlen**, insbesondere für:
- Datenschutzklauseln zum Drittland-Transfer (FormSubmit/USA)
- Provisions- und Haftungsklauseln in den AGB
- Angaben zur Gewerbeberechtigung GISA 38742828 (Finanztippgeber)

---

## Technische Details

- Kein Build-Step, kein Framework, keine Abhängigkeiten
- Fonts: Google Fonts (CDN, preconnect gesetzt)
- Bilder: noch keine (nur Platzhalter)
- Accessibility: Skip-Links, ARIA-Labels, semantisches HTML
- SEO: JSON-LD (Person, ProfessionalService, FAQPage, BreadcrumbList), hreflang, sitemap.xml
- Performance: defer-JS, CSS-Variablen, minimale DOM-Tiefe

---

*Erstellt: Mai 2026 · Version 1.0*
