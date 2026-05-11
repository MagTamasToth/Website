# Flat GitHub Pages deployment checklist

- Upload all files in this folder to the repository root.
- Keep the file name exactly `index.html`.
- GitHub Pages: main branch / root folder.
- Custom domain: `metallagentur.at`.
- CNAME file content: `metallagentur.at`.
- Test: `/`, `/de.html`, `/hu.html`, `/en.html`, sitemap.xml, robots.txt.

## Included fixes

- Full flat URL structure, no required `/de/`, `/hu/`, `/en/` folders.
- Domain normalized to `https://metallagentur.at/`.
- Google Fonts external requests removed from HTML heads.
- `fonts.css` uses GDPR-safe system/local fallback.
- Cookie notice links point to flat privacy pages.
- Sitemap generated for flat HTML URLs.
- Portrait files retained: `portrait_1.webp`, `portrait_2.webp`, `portrait_3.webp`.
