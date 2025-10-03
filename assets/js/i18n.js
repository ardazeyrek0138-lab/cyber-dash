const defaultLang = 'en';
let translations = {};

async function loadTranslations(lang) {
    // Doğru JSON dosyasını yüklüyoruz:
    const response = await fetch(`./assets/js/lang-${lang}.json`); 
    translations = await response.json();
    applyTranslations();
}

function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[key]) {
            // Burada HTML içeriğini çeviri ile değiştiriyoruz
            element.innerHTML = translations[key]; 
        }
    });
}

function setupLanguageSwitcher() {
    const switcher = document.getElementById('language-selector');
    if (switcher) {
        switcher.addEventListener('change', (event) => {
            const selectedLang = event.target.value;
            localStorage.setItem('lang', selectedLang);
            loadTranslations(selectedLang);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const storedLang = localStorage.getItem('lang') || defaultLang;
    loadTranslations(storedLang);
    setupLanguageSwitcher();
});
