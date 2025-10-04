document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.getElementById('menu-toggle');
  const sidebar = document.getElementById('sidebar');
  const mainWrapper = document.getElementById('main-wrapper');

  if (menuToggle && sidebar && mainWrapper) {
    menuToggle.addEventListener('click', function (e) {
      e.preventDefault();
      sidebar.classList.toggle('toggled');
      mainWrapper.classList.toggle('sidebar-toggled');
    });
  }

  // Aktif sayfayı vurgula
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('#sidebar .nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
});
