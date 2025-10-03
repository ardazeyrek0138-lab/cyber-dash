const i18n = {
    currentLang: 'en', // Başlangıç dili
    translations: {}, // Çevirileri tutacak obje

    // JSON dosyalarını yükler
    loadTranslations: async function(lang) {
        try {
            const response = await fetch(`./assets/js/lang-${lang}.json`);
            if (!response.ok) {
                throw new Error(`Failed to load lang-${lang}.json`);
            }
            this.translations[lang] = await response.json();
        } catch (error) {
            console.error("Translation loading error:", error);
        }
    },

    // Tüm sayfayı çevirir
    translatePage: function() {
        const langData = this.translations[this.currentLang];
        if (!langData) return;

        // data-i18n etiketlerini çevir
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (langData[key]) {
                element.textContent = langData[key];
            }
        });

        // data-i18n-placeholder etiketlerini çevir
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            if (langData[key]) {
                element.setAttribute('placeholder', langData[key]);
            }
        });
        
        // data-i18n-title etiketlerini çevir
        document.querySelectorAll('[data-i18n-title]').forEach(element => {
            const key = element.getAttribute('data-i18n-title');
            if (langData[key]) {
                element.setAttribute('title', langData[key]);
            }
        });
        
        // Sayfa Başlığını (Title) çevir
        const titleElement = document.querySelector('title');
        const titleKey = document.querySelector('[data-i18n="page_title_' + this.currentLang + '"]'); // Örn: data-i18n="page_title_dashboard"
        if (titleElement) {
             const titleKeyElement = document.querySelector('[data-i18n^="page_title"]');
             if(titleKeyElement) {
                const key = titleKeyElement.getAttribute('data-i18n');
                if (langData[key]) {
                    titleElement.textContent = langData[key] + " | CYBER-DASH"; 
                }
             }
        }
    },

    // Dili değiştirir
    setLang: async function(newLang) {
        if (!this.translations[newLang]) {
            await this.loadTranslations(newLang);
        }
        this.currentLang = newLang;
        localStorage.setItem('cyber_dash_lang', newLang);
        document.documentElement.lang = newLang; // HTML lang attribute'unu ayarlar
        this.translatePage();
        
        // Ayarlar sayfasında bildirim gösterimi (varsa)
        if (newLang !== 'en') {
             //alert(this.translations[newLang]['alert_success_lang_change']); // Test amaçlı bildirimi açabilirsiniz
        }
    },

    // Başlatma fonksiyonu
    init: async function() {
        const savedLang = localStorage.getItem('cyber_dash_lang') || 'en';
        await this.loadTranslations('en'); // İngilizce'yi yükle
        await this.loadTranslations('tr'); // Türkçe'yi yükle
        
        // Kayıtlı dili ayarlar
        this.setLang(savedLang);

        // Dil Seçici olay dinleyicisi
        const langSelector = document.getElementById('language-selector');
        if (langSelector) {
            langSelector.value = savedLang;
            langSelector.addEventListener('change', (e) => {
                const selectedLang = e.target.value;
                this.setLang(selectedLang);
            });
            
            // Kaydet butonuna tıklama (eğer sadece selector yetmiyorsa)
            const saveButton = document.querySelector('[data-i18n="button_save"]');
             if (saveButton) {
                 saveButton.addEventListener('click', () => {
                     this.setLang(langSelector.value);
                 });
             }
        }
    }
};

// Sayfa yüklendiğinde çeviri sistemini başlat
document.addEventListener('DOMContentLoaded', () => {
    i18n.init();
});
