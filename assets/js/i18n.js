const defaultLang = 'en'; // Tema yüklenirken varsayılan dil
let translations = {};

// 1. Çeviri JSON dosyasını yükler
async function loadTranslations(lang) {
    try {
        const response = await fetch(`./assets/js/lang-${lang}.json`); 
        
        if (!response.ok) {
            throw new Error(`Failed to load translation file for ${lang}`);
        }
        
        translations = await response.json();
        applyTranslations(); // Yüklendikten sonra çeviriyi hemen uygula
    } catch (error) {
        console.error("Translation Error:", error);
    }
}

// 2. data-i18n özniteliği olan tüm elemanlara çeviriyi uygular
function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        
        if (translations[key]) {
            element.innerHTML = translations[key]; // HTML içeriğini çeviri ile değiştir
        }
    });
}

// 3. Ayarlar sayfasındaki dil seçiciyi dinler
function setupLanguageSwitcher() {
    const switcher = document.getElementById('language-selector');
    if (switcher) {
        switcher.addEventListener('change', (event) => {
            const selectedLang = event.target.value;
            localStorage.setItem('lang', selectedLang); 
            loadTranslations(selectedLang); // Yeni dili yükle
        });
        
        // Dil seçiciye geçerli seçimi yükle
        const storedLang = localStorage.getItem('lang') || defaultLang;
        switcher.value = storedLang;
    }
}

// 4. Tema ilk yüklendiğinde otomatik çalışan ana fonksiyon
document.addEventListener('DOMContentLoaded', () => {
    const storedLang = localStorage.getItem('lang') || defaultLang; 
    
    loadTranslations(storedLang); // Dili yükle
    setupLanguageSwitcher(); // Dil seçiciyi hazırla
});
