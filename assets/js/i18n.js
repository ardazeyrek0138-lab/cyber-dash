const defaultLang = 'en'; // Tema yüklenirken varsayılan dil İngilizce
let translations = {}; // Çeviri metinlerinin saklandığı değişken

// 1. Çeviri JSON dosyasını yükler (Örn: lang-tr.json)
async function loadTranslations(lang) {
    try {
        // Dosya yolu: "./assets/js/lang-en.json" veya "./assets/js/lang-tr.json"
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

// 2. HTML elemanlarına data-i18n anahtarına göre çeviriyi uygular
function applyTranslations() {
    // data-i18n özniteliği olan tüm elemanları seç
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        
        // Eğer anahtar sözlükte varsa, içeriği değiştir
        if (translations[key]) {
            element.innerHTML = translations[key];
        }
    });
}

// 3. Ayarlar sayfasındaki dil seçiciyi dinler
function setupLanguageSwitcher() {
    const switcher = document.getElementById('language-selector');
    if (switcher) {
        switcher.addEventListener('change', (event) => {
            const selectedLang = event.target.value;
            // Kullanıcının seçimi kaydet (sayfa yenilense de hatırlar)
            localStorage.setItem('lang', selectedLang); 
            loadTranslations(selectedLang); // Yeni dili yükle ve uygula
        });
    }
}

// 4. Tema ilk yüklendiğinde otomatik çalışan ana fonksiyon
document.addEventListener('DOMContentLoaded', () => {
    // Kayıtlı dili (localStorage) kontrol et, yoksa varsayılanı kullan
    const storedLang = localStorage.getItem('lang') || defaultLang; 
    
    loadTranslations(storedLang); // Dili yükle
    setupLanguageSwitcher(); // Dil seçiciyi hazırla
    
    // Dil seçiciye geçerli seçimi yükle (menüde doğru dilin görünmesi için)
    const switcher = document.getElementById('language-selector');
    if (switcher) {
        switcher.value = storedLang;
    }
});
