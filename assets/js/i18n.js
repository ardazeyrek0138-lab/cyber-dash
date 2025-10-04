let currentLang = 'en';

async function loadTranslations(lang) {
  const response = await fetch(`assets/js/lang-${lang}.json`);
  return await response.json();
}

function applyTranslations(translations) {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[key]) {
      if (el.tagName === 'INPUT' && el.hasAttribute('data-i18n-placeholder')) {
        el.placeholder = translations[key];
      } else if (el.hasAttribute('data-i18n-title')) {
        el.title = translations[key];
      } else {
        el.textContent = translations[key];
      }
    }
  });
}

document.addEventListener('click', async (e) => {
  if (e.target.classList.contains('lang-btn')) {
    const lang = e.target.getAttribute('data-lang');
    currentLang = lang;
    const translations = await loadTranslations(lang);
    applyTranslations(translations);
    localStorage.setItem('preferredLang', lang);
  }
});

document.addEventListener('DOMContentLoaded', async () => {
  currentLang = localStorage.getItem('preferredLang') || 'en';
  const translations = await loadTranslations(currentLang);
  applyTranslations(translations);
});
