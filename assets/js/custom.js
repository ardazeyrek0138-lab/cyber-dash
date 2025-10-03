$(document).ready(function() {
    
    // ==============================================
    // SIDEBAR AÇMA/KAPAMA İŞLEVİ (Kritik Çözüm)
    // ==============================================
    $('#menu-toggle').on('click', function() {
        // Sidebar'ın kaymasını sağlar
        $('#sidebar').toggleClass('toggled'); 
        // Ana içeriği ve topbar'ı hareket ettirir
        $('#main-wrapper').toggleClass('sidebar-toggled');
        $('#topbar').toggleClass('sidebar-toggled'); 
    });

    // Sayfa yüklendiğinde varsayılan ayarlar
    if ($(window).width() < 768) {
        $('#sidebar').addClass('toggled');
        $('#main-wrapper').addClass('sidebar-toggled');
        $('#topbar').addClass('sidebar-toggled');
    }

    // ==============================================
    // TEMA RENK DEĞİŞTİRME ÖRNEĞİ (Settings Sayfası İçin)
    // ==============================================
    $('.color-swatch').on('click', function() {
        var newColor = $(this).data('color');
        
        // Aktif sınıfı kaldır/ekle
        $('.color-swatch').removeClass('active');
        $(this).addClass('active');

        // Burada body'ye ana renk sınıfını ekleyip/kaldırabilirsiniz.
        // Örn: $('body').attr('data-theme-color', newColor);
    });

    // ==============================================
    // KARANLIK MODU GEÇİŞİ ÖRNEĞİ
    // ==============================================
    $('#darkToggle').on('change', function() {
        if ($(this).is(':checked')) {
            $('body').removeClass('light-mode');
        } else {
            $('body').addClass('light-mode');
        }
    });

    // Not: Tüm Chart.js grafik tanımlamaları da buraya taşınmalıdır
    // veya HTML dosyasında <script> tagları arasında kalmalıdır.

});
