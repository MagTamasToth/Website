/* ==========================================================================
   Kontaktformular — FormSubmit AJAX + ProtonMail-kompatibel
   ========================================================================== */
(function () {
  'use strict';

  const ENDPOINT = 'https://formsubmit.co/ajax/tamas.toth@metallagentur.at';
  const MAILTO   = 'tamas.toth@metallagentur.at';

  const TEXTS = {
    de: {
      sending:  'Anfrage wird gesendet \u2026',
      success:  '\u2713 Ihre Anfrage ist eingegangen. Ich melde mich werktags innerhalb von 24\u00a0Stunden.',
      error:    'Beim Senden ist ein Fehler aufgetreten. Bitte schreiben Sie direkt an tamas.toth@metallagentur.at',
      consent:  'Bitte lesen und best\u00e4tigen Sie die Datenschutzerkl\u00e4rung, um fortzufahren.',
    },
    hu: {
      sending:  'Az \u00fczenet k\u00fcld\u00e9se folyamatban \u2026',
      success:  '\u2713 Megkeres\u00e9se meg\u00e9rkezett. Munkanapokon 24\u00a0\u00f3r\u00e1n bel\u00fcl v\u00e1laszolok.',
      error:    'Hiba t\u00f6rt\u00e9nt a k\u00fcld\u00e9s sor\u00e1n. K\u00e9rem, \u00edrjon k\u00f6zvetlen\u00fcl a tamas.toth@metallagentur.at c\u00edmre.',
      consent:  'K\u00e9rem, olvassa el \u00e9s fogadja el az adatv\u00e9delmi nyilatkozatot a folytat\u00e1shoz.',
    },
    en: {
      sending:  'Sending your enquiry \u2026',
      success:  '\u2713 Your enquiry has been received. On weekdays I reply within 24\u00a0hours.',
      error:    'An error occurred. Please email tamas.toth@metallagentur.at directly.',
      consent:  'Please read and accept the Privacy Policy to continue.',
    },
  };

  const FIELD_LABELS = {
    de: { name:'Name', company:'Unternehmen', role:'Funktion', country:'Land',
          email:'E-Mail', phone:'Telefon', interest:'Interesse',
          industry:'Branche', message:'Nachricht' },
    hu: { name:'N\u00e9v', company:'V\u00e1llalat', role:'Beoszt\u00e1s', country:'Orsz\u00e1g',
          email:'E-mail', phone:'Telefon', interest:'\u00c9rdekl\u0151d\u00e9s',
          industry:'Ipar\u00e1g', message:'\u00dczenet' },
    en: { name:'Name', company:'Company', role:'Role', country:'Country',
          email:'Email', phone:'Phone', interest:'Interest',
          industry:'Industry', message:'Message' },
  };

  function getLang(form) {
    return (form.dataset.lang || document.documentElement.lang || 'de').slice(0, 2);
  }
  function txt(form, key) {
    const l = getLang(form);
    return (TEXTS[l] || TEXTS.de)[key];
  }

  function showMsg(form, kind, html) {
    let box = form.querySelector('.form__feedback');
    if (!box) {
      box = document.createElement('p');
      box.className = 'form__feedback';
      const btn = form.querySelector('button[type="submit"]');
      btn ? btn.after(box) : form.appendChild(box);
    }
    box.className = 'form__feedback form__feedback--' + kind;
    box.innerHTML = html;
    box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function collectFields(form) {
    const out = {};
    const cbGroups = {};
    form.querySelectorAll('input[type="checkbox"]').forEach(cb => {
      if (cb.name === 'consent') return;
      if (cb.checked) (cbGroups[cb.name] = cbGroups[cb.name] || []).push(cb.value);
    });
    new FormData(form).forEach((v, k) => {
      if (['consent','_subject','_captcha','_template'].includes(k)) return;
      if (k in cbGroups) return;
      if (String(v).trim()) out[k] = String(v).trim();
    });
    Object.entries(cbGroups).forEach(([k, vs]) => { out[k] = vs.join(', '); });
    return out;
  }

  function buildBody(form, fields) {
    const lang = getLang(form);
    const lbl  = FIELD_LABELS[lang] || FIELD_LABELS.de;
    const now  = new Date().toLocaleString(
      lang === 'hu' ? 'hu-HU' : lang === 'de' ? 'de-AT' : 'en-GB',
      { dateStyle: 'long', timeStyle: 'short' }
    );
    const hdr = { de:'Neue Anfrage \u2014 www.metallagentur.at',
                  hu:'Új megkeres\u00e9s \u2014 www.metallagentur.at',
                  en:'New enquiry \u2014 www.metallagentur.at' }[lang];
    const order = ['name','company','role','country','email','phone','interest','industry','message'];
    let rows = '';
    order.forEach(k => { if (fields[k]) rows += (lbl[k] || k) + ': ' + fields[k] + '\n'; });
    Object.entries(fields).forEach(([k,v]) => { if (!order.includes(k) && v) rows += k+': '+v+'\n'; });
    return hdr + '\n' + '─'.repeat(48) + '\n' + rows + '─'.repeat(48) + '\n' + now;
  }

  function buildMailto(form) {
    const fields = collectFields(form);
    const lang   = getLang(form);
    const subj   = encodeURIComponent(
      (lang==='hu' ? 'Megkeres\u00e9s: ' : lang==='en' ? 'Enquiry from ' : 'Anfrage von ')
      + (fields.name||'') + (fields.company ? ' ('+fields.company+')' : '')
      + ' \u2014 www.metallagentur.at'
    );
    return 'mailto:' + MAILTO + '?subject=' + subj + '&body=' + encodeURIComponent(buildBody(form, fields));
  }

  function buildFD(form) {
    const lang   = getLang(form);
    const fields = collectFields(form);
    const body   = buildBody(form, fields);
    const subj   = (lang==='hu' ? 'Megkeres\u00e9s: ' : lang==='en' ? 'Enquiry from ' : 'Anfrage von ')
                 + (fields.name||'') + (fields.company ? ' ('+fields.company+')' : '')
                 + ' \u2014 www.metallagentur.at';
    const fd = new FormData();
    Object.entries(fields).forEach(([k,v]) => fd.append(k, v));
    fd.append('message',    body);
    fd.append('_subject',   subj);
    fd.append('_captcha',   'false');
    fd.append('_template',  'basic');
    return fd;
  }

  function handleSubmit(form) {
    return async function (e) {
      e.preventDefault();

      /* Consent-Prüfung */
      const cb = form.querySelector('input[name="consent"]');
      if (cb && !cb.checked) {
        showMsg(form, 'error', txt(form, 'consent'));
        cb.focus();
        const row = cb.closest('.consent-row') || cb.closest('label');
        if (row) { row.classList.add('consent-required-flash');
                   setTimeout(()=>row.classList.remove('consent-required-flash'), 1400); }
        return;
      }

      if (!form.checkValidity()) { form.reportValidity(); return; }

      const btn = form.querySelector('button[type="submit"]');
      const orig = btn ? btn.innerHTML : '';
      if (btn) { btn.disabled = true; btn.textContent = txt(form, 'sending'); }

      try {
        const res  = await fetch(ENDPOINT, {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: buildFD(form),
        });
        const data = await res.json().catch(() => ({}));
        if (res.ok && (data.success === 'true' || data.success === true || res.status === 200)) {
          showMsg(form, 'success', txt(form, 'success'));
          form.reset();
        } else {
          throw new Error('FormSubmit ' + res.status);
        }
      } catch (err) {
        const mailto = buildMailto(form);
        showMsg(form, 'error',
          txt(form, 'error') +
          ' &mdash; <a href="' + mailto + '" class="form__fallback-link" target="_blank" rel="noopener">E-Mail direkt &ouml;ffnen &rarr;</a>'
        );
        setTimeout(()=>{ window.location.href = mailto; }, 2500);
      } finally {
        if (btn) { btn.disabled = false; btn.innerHTML = orig; }
      }
    };
  }

  document.querySelectorAll('form[data-form="contact"]').forEach(form => {
    form.addEventListener('submit', handleSubmit(form));
    /* Datenschutz-Link in neuem Tab öffnen */
    const privLink = form.querySelector('input[name="consent"]')
                         ?.closest('label')?.querySelector('a');
    if (privLink) { privLink.target = '_blank'; privLink.rel = 'noopener noreferrer'; }
  });
})();
