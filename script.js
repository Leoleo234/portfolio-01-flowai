const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
menuToggle.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!open));
  navLinks.classList.toggle('is-open', !open);
});
document.querySelectorAll('.nav-links a').forEach(link => link.addEventListener('click', () => {
  menuToggle.setAttribute('aria-expanded', 'false');
  navLinks.classList.remove('is-open');
}));
document.querySelectorAll('.faq-item button').forEach(button => button.addEventListener('click', () => {
  const item = button.parentElement;
  const wasOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(el => el.classList.remove('open'));
  document.querySelectorAll('.faq-item button span').forEach(el => el.textContent = '＋');
  if (!wasOpen) { item.classList.add('open'); button.querySelector('span').textContent = '−'; }
}));
