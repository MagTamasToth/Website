/* ==========================================================================
   Kontaktformular — FormSubmit Integration + mailto-Fallback
   ========================================================================== */

(function () {
  'use strict';

  const FORMSUBMIT_ENDPOINT = 'https://formsubmit.co/ajax/tamas.toth@metallagentur.at';
  const MAILTO_TARGET = 'tamas.toth@metallagentur.at';

  function showFeedback(form, kind, message) {
    let box = form.querySelector('.form__feedback');
    if (!box) {
      box = document.createElement('div');
      box.className = 'form__feedback';
      form.prepend(box);
    }
    box.className = 'form__feedback form__feedback--' + kind;
    box.textContent = message;
    box.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  function buildMailtoFallback(form) {
    const data = new FormData(form);
    const subject = encodeURIComponent(
      (data.get('subject') || 'Anfrage über magtamastoth.com').toString()
    );
    let body = '';
    data.forEach((value, key) => {
      if (key === '_captcha' || key === '_template' || key === '_subject') return;
      body += `${key}: ${value}\n`;
    });
    return `mailto:${MAILTO_TARGET}?subject=${subject}&body=${encodeURIComponent(body)}`;
  }

  function getFeedbackTexts(form) {
    const lang = (form.getAttribute('data-lang') || document.documentElement.lang || 'de').slice(0, 2);
    const dict = {
      de: {
        sending: 'Anfrage wird gesendet …',
        success: 'Vielen Dank! Ihre Anfrage ist eingegangen. Sie hören werktags innerhalb von 24 Stunden von mir.',
        error: 'Beim Senden ist ein Fehler aufgetreten. Bitte schreiben Sie direkt an tamas.toth@metallagentur.at.',
        consent: 'Bitte stimmen Sie der Datenverarbeitung zu, damit ich Ihre Anfrage bearbeiten darf.'
      },
      hu: {
        sending: 'Az üzenet küldése folyamatban …',
        success: 'Köszönöm! A megkeresése megérkezett. Munkanapokon 24 órán belül válaszolok.',
        error: 'Hiba történt a küldés során. Kérem, írjon közvetlenül a tamas.toth@metallagentur.at címre.',
        consent: 'Kérem, fogadja el az adatkezelést, hogy a megkeresését feldolgozhassam.'
      },
      en: {
        sending: 'Sending your enquiry …',
        success: 'Thank you. Your enquiry has been received. On weekdays I reply within 24 hours.',
        error: 'An error occurred while sending. Please email tamas.toth@metallagentur.at directly.',
        consent: 'Please agree to the data processing so I can handle your enquiry.'
      }
    };
    return dict[lang] || dict.de;
  }

  function handleSubmit(form) {
    return async (e) => {
      e.preventDefault();
      const t = getFeedbackTexts(form);

      // Consent-Check
      const consent = form.querySelector('input[name="consent"]');
      if (consent && !consent.checked) {
        showFeedback(form, 'error', t.consent);
        return;
      }

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.textContent : '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = t.sending;
      }

      try {
        const formData = new FormData(form);
        formData.append('_captcha', 'false');
        formData.append('_template', 'table');

        const response = await fetch(FORMSUBMIT_ENDPOINT, {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: formData
        });

        if (response.ok) {
          showFeedback(form, 'success', t.success);
          form.reset();
        } else {
          throw new Error('FormSubmit returned ' + response.status);
        }
      } catch (err) {
        // Mailto-Fallback öffnen
        const mailto = buildMailtoFallback(form);
        showFeedback(form, 'error', t.error);
        window.setTimeout(() => { window.location.href = mailto; }, 1200);
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
        }
      }
    };
  }

  // Init
  document.querySelectorAll('form[data-form="contact"]').forEach((form) => {
    form.addEventListener('submit', handleSubmit(form));
  });
})();
