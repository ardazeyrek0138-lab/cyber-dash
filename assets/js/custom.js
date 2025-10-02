// ====================================
// CYBER-DASH JS İŞLEVLERİ (custom.js)
// Hata Önleme ve Menü Kontrolü için.
// ====================================

// Grafik konteynerlerini depolamak için global değişken
const chartInstances = {};

// Chart.js kütüphanesi ile ilgili tüm grafikleri başlatan ana fonksiyon
function initCharts() {
    
    // YENİ KONTROL: Eğer grafik zaten varsa, onu yok et.
    function destroyExistingChart(chartId) {
        if (chartInstances[chartId]) {
            chartInstances[chartId].destroy();
            delete chartInstances[chartId];
        }
    }
    
    // --- GRAFİK TANIMLARI ---
    
    // Grafik 1: Ana Dashboard Çizgi Grafiği (index.html)
    const lineCtx = document.getElementById('lineChart');
    if (lineCtx) {
        destroyExistingChart('lineChart'); // Hata önleme
        chartInstances['lineChart'] = new Chart(lineCtx, {
            type: 'line',
            // ... (Grafik datası ve options buraya gelecek) ...
            data: { labels: ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem'], datasets: [{ label: 'Aylık Satışlar', data: [65, 59, 80, 81, 56, 55, 40], borderColor: 'rgb(0, 229, 255)', backgroundColor: 'rgba(0, 229, 255, 0.2)', tension: 0.4, pointRadius: 5, pointBackgroundColor: 'rgb(0, 229, 255)' }] },
            options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true, grid: { color: 'rgba(255, 255, 255, 0.1)' }, ticks: { color: '#e6edf3' } }, x: { grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: '#e6edf3' } } }, plugins: { legend: { labels: { color: '#e6edf3' } } } }
        });
    }

    // Grafik 2: Ana Dashboard Hilal Grafik (index.html)
    const doughnutCtx = document.getElementById('doughnutChart');
    if (doughnutCtx) {
        destroyExistingChart('doughnutChart'); // Hata önleme
        chartInstances['doughnutChart'] = new Chart(doughnutCtx, {
            type: 'doughnut',
            // ... (Grafik datası ve options buraya gelecek) ...
            data: { labels: ['Tamamlandı', 'Devam Ediyor', 'Beklemede'], datasets: [{ data: [75, 15, 10], backgroundColor: ['rgb(174, 0, 255)', 'rgb(0, 229, 255)', 'rgb(80, 80, 80)'], hoverOffset: 4 }] },
            options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { color: '#e6edf3' } } } }
        });
    }
    
    // ... (Diğer grafikler: trafficChart, deviceChart, funnelChart, için de aynı destroyExistingChart kuralını uygulayınız) ...
}

// DOMContentLoaded: Sayfa yüklendikten sonra çalışacak ana fonksiyon
document.addEventListener('DOMContentLoaded', function() {
    // custom.js - DOMContentLoaded fonksiyonunun içine ekle

    // ====================================
    // TEMA RENK DEĞİŞTİRME MANTIĞI
    // ====================================
    
    const colorSwatches = document.querySelectorAll('.color-swatch');
    const root = document.documentElement; // :root CSS değişkenlerine erişim

    // Renk kodları (Bunlar style.css'teki değişkenlere karşılık gelmeli)
    const colorMap = {
        'blue': { primary: '#00e5ff', shadow: 'rgba(0, 229, 255, 0.4)' },
        'purple': { primary: '#ae00ff', shadow: 'rgba(174, 0, 255, 0.4)' },
        'green': { primary: '#00ff80', shadow: 'rgba(0, 255, 128, 0.4)' },
        'red': { primary: '#ff3366', shadow: 'rgba(255, 51, 102, 0.4)' }
    };

    function changeThemeColor(newColor) {
        const colors = colorMap[newColor];
        
        // CSS değişkenlerini güncelle
        root.style.setProperty('--neon-blue', colors.primary);
        root.style.setProperty('--neon-purple', colors.primary); // Bu iki değişkeni de seçilen renge ayarla
        root.style.setProperty('--shadow-effect-neon', `0 0 10px ${colors.shadow}`);

        // Aktif butonu işaretle
        colorSwatches.forEach(swatch => {
            swatch.classList.remove('active');
        });
        document.querySelector(`.color-swatch.${newColor}`).classList.add('active');
    }

    // Swatch butonlarını dinle
    colorSwatches.forEach(swatch => {
        swatch.addEventListener('click', function() {
            const color = this.getAttribute('data-color');
            changeThemeColor(color);
            // NOT: Kullanıcının seçimi localStorage'a kaydedilerek kalıcı yapılabilir.
        });
    });

    // Sayfa yüklendiğinde varsayılan rengi ayarla (veya kaydedilmiş olanı yükle)
    changeThemeColor('blue');
    // ====================================
    // SIDEBAR AÇMA/KAPAMA MANTIĞI
    // ====================================
    const sidebar = document.getElementById('sidebar');
    const mainWrapper = document.getElementById('main-wrapper');
    const menuToggle = document.getElementById('menu-toggle');
    
    function toggleSidebar() {
        if (sidebar && mainWrapper) {
            sidebar.classList.toggle('collapsed');
            mainWrapper.classList.toggle('sidebar-collapsed');
        }
    }

    // Header'daki Hamburger menü butonunu dinle
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleSidebar);
    }
    
    // ====================================
    // GRAFİKLERİ BAŞLAT
    // ====================================
    // Sadece index.html veya analytics.html gibi grafik içeren sayfalarda çağırın
    // Bu, Chart.js hatasını (Canvas is already in use) çözecektir.
    initCharts(); 
    
    console.log("CYBER-DASH JS Başarıyla Yüklendi!");
});