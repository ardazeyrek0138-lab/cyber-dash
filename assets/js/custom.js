// Update year
document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

// Dark mode toggle
const darkToggle = document.getElementById('darkToggle');
if(darkToggle){
  darkToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    darkToggle.setAttribute('aria-pressed', document.body.classList.contains('dark-mode'));
  });
}
