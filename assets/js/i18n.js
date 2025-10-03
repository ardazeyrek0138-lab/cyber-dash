const i18nElements = document.querySelectorAll('[data-i18n]');
const langSwitcher = document.getElementById('langSwitcher');

async function loadLang(lang) {
  const res = await fetch(`assets/js/lang-${lang}.json`);
  const dict = await res.json();

  i18nElements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    if(dict[key]) el.textContent = dict[key];
  });
}

if(langSwitcher){
  langSwitcher.addEventListener('change', e => {
    loadLang(e.target.value);
  });
}

// Load default language
loadLang('en');
