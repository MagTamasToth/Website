# DNS & E-Mail Konfiguration
## Hetzner DNS + GitHub Pages + ProtonMail
### www.metallagentur.at

---

## 1. GitHub Pages — CNAME im Repository

Die Datei `CNAME` im Root des Repositories enthält bereits:
```
www.metallagentur.at
```

GitHub Settings → Pages → Custom domain: `www.metallagentur.at` eintragen → **Enforce HTTPS** aktivieren.

---

## 2. Hetzner DNS Zone — Vollständige Konfiguration

Im Hetzner DNS Console (dns.hetzner.com) für die Zone `www.metallagentur.at`:

### A-Records (GitHub Pages IPs)
```
@    A    185.199.108.153    TTL 3600
@    A    185.199.109.153    TTL 3600
@    A    185.199.110.153    TTL 3600
@    A    185.199.111.153    TTL 3600
```

### CNAME für www
```
www  CNAME  DEIN-GITHUB-USERNAME.github.io.    TTL 3600
```
*(Ersetze DEIN-GITHUB-USERNAME durch den tatsächlichen GitHub-Benutzernamen)*

---

## 3. ProtonMail — E-Mail-Konfiguration

**Wichtig:** Damit E-Mails von Formularen (FormSubmit) und direkt an `tamas.toth@metallagentur.at` 
zugestellt werden, müssen folgende DNS-Einträge gesetzt sein.

Diese Werte findest du in: **ProtonMail → Einstellungen → Domain → DNS-Einträge**

### MX-Records (E-Mail-Empfang)
```
@    MX    10    mail.protonmail.ch.      TTL 3600
@    MX    20    mailsec.protonmail.ch.   TTL 3600
```

### SPF (verhindert Spam-Klassifizierung)
```
@    TXT    "v=spf1 include:_spf.protonmail.ch mx ~all"    TTL 3600
```

### DKIM (E-Mail-Signierung — Werte aus ProtonMail kopieren)
```
protonmail._domainkey    CNAME    protonmail.domainkey.XXXXXX.domains.proton.ch.
protonmail2._domainkey   CNAME    protonmail2.domainkey.XXXXXX.domains.proton.ch.
protonmail3._domainkey   CNAME    protonmail3.domainkey.XXXXXX.domains.proton.ch.
```
*(Die genauen Werte nach CNAME kommen aus den ProtonMail-Einstellungen — individuell pro Domain)*

### DMARC (E-Mail-Authentifizierungsrichtlinie)
```
_dmarc    TXT    "v=DMARC1; p=quarantine; rua=mailto:tamas.toth@metallagentur.at"    TTL 3600
```

---

## 4. FormSubmit — Aktivierung

FormSubmit muss einmalig bestätigt werden:

1. Website live schalten (GitHub Pages + Domain aktiv)
2. Kontaktformular auf der Website einmal absenden (beliebige Testdaten)
3. E-Mail von FormSubmit an `tamas.toth@metallagentur.at` öffnen
4. **"Confirm your email"** Button klicken
5. Ab sofort landen alle Formular-Einsendungen direkt im Posteingang

**E-Mail-Format:** Das Formular sendet eine klar strukturierte E-Mail mit allen ausgefüllten Feldern
(Name, Unternehmen, Funktion, Land, E-Mail, Telefon, Interesse, Branche, Nachricht).

---

## 5. Überprüfung

Nach dem DNS-Setup (Propagation: 1–24 Stunden):

```bash
# GitHub Pages IPs prüfen
dig www.metallagentur.at A

# MX-Records prüfen
dig www.metallagentur.at MX

# SPF prüfen
dig www.metallagentur.at TXT

# HTTPS prüfen
curl -I https://www.metallagentur.at
```

Online-Tools:
- https://mxtoolbox.com/SuperTool.aspx — alle DNS-Einträge prüfen
- https://www.mail-tester.com — E-Mail-Score testen
- https://dmarc.postmarkapp.com — DMARC prüfen

---

## 6. Checkliste vor Go-Live

- [ ] CNAME-Datei im GitHub-Repository vorhanden
- [ ] GitHub Pages: Custom domain eingetragen, HTTPS erzwungen
- [ ] Hetzner DNS: 4 × A-Records für GitHub Pages gesetzt
- [ ] Hetzner DNS: www CNAME gesetzt
- [ ] Hetzner DNS: MX-Records für ProtonMail gesetzt
- [ ] Hetzner DNS: SPF-TXT-Record gesetzt
- [ ] Hetzner DNS: 3 × DKIM-CNAMEs aus ProtonMail kopiert und gesetzt
- [ ] Hetzner DNS: DMARC-TXT-Record gesetzt
- [ ] ProtonMail: Domain verifiziert (grüner Haken in den Einstellungen)
- [ ] FormSubmit: Bestätigungsmail geöffnet und bestätigt
- [ ] Testformular ausgefüllt und E-Mail in ProtonMail angekommen
- [ ] Juristische Endprüfung von Impressum, Datenschutz und AGB

---

*Stand: Mai 2026*
