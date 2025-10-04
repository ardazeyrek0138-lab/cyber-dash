document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.getElementById('menu-toggle');
  const sidebar = document.getElementById('sidebar');
  const mainWrapper = document.getElementById('main-wrapper');

  if (menuToggle && sidebar && mainWrapper) {
    menuToggle.addEventListener('click', function () {
      sidebar.classList.toggle('toggled');
      mainWrapper.classList.toggle('sidebar-toggled');
    });
  }

  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navItems = document.querySelectorAll('#sidebar .nav-item');
  navItems.forEach(item => {
    const page = item.getAttribute('data-page');
    if (page === currentPage) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
});
