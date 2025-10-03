const defaultLang = 'en';
let translations = {};

// Yeni çeviri anahtarı için boş bir global değişken tanımlıyoruz
let currentLangCode = defaultLang; 

// 1. Çeviri JSON dosyasını yükler
async function loadTranslations(lang, showSuccess = false) { // showSuccess parametresi eklendi
    try {
        currentLangCode = lang; // Dil kodunu güncelliyoruz
        const response = await fetch(`./assets/js/lang-${lang}.json`); 
        
        if (!response.ok) {
            throw new Error(`Failed to load translation file for ${lang}`);
        }
        
        translations = await response.json();
        applyTranslations();

        // Eğer başarılı mesajı gösterilmesi gerekiyorsa (yani dil yeni değiştiyse)
        if (showSuccess) {
            // Başarılı mesajı anahtarını kullanarak çeviriyoruz
            const successMessage = translations['alert_success_lang_change'] || 'Language switched successfully!'; 
            alert(successMessage);
        }

    } catch (error) {
        console.error("Translation Error:", error);
    }
}

// 2. HTML elemanlarına data-i18n anahtarına göre çeviriyi uygular (Değişmedi)
function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        
        if (translations[key]) {
            element.innerHTML = translations[key];
        }
    });
}

// 3. Ayarlar sayfasındaki dil seçiciyi dinler (Değişti)
function setupLanguageSwitcher() {
    const switcher = document.getElementById('language-selector');
    if (switcher) {
        switcher.addEventListener('change', (event) => {
            const selectedLang = event.target.value;
            localStorage.setItem('lang', selectedLang); 
            
            // Başarılı mesajı göstermek için ikinci parametreyi 'true' yaptık
            loadTranslations(selectedLang, true); 
        });
        
        const storedLang = localStorage.getItem('lang') || defaultLang;
        switcher.value = storedLang;
    }
}

// 4. Tema ilk yüklendiğinde otomatik çalışan ana fonksiyon (Değişmedi)
document.addEventListener('DOMContentLoaded', () => {
    const storedLang = localStorage.getItem('lang') || defaultLang; 
    
    loadTranslations(storedLang); 
    setupLanguageSwitcher(); 
});
