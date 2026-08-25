const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const setMenuIcon = (isOpen) => {
  menuToggle.innerHTML = isOpen
    ? '<svg class="menu-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>'
    : '<svg class="menu-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16"/></svg>';
};
const closeMenu = () => {
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', '打开导航');
  setMenuIcon(false);
  navLinks.classList.remove('is-open');
};
menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  if (isOpen) closeMenu();
  else {
    menuToggle.setAttribute('aria-expanded', 'true');
    menuToggle.setAttribute('aria-label', '关闭导航');
    setMenuIcon(true);
    navLinks.classList.add('is-open');
  }
});
const scrollToNavTarget = (event) => {
  const link = event.currentTarget;
  const targetId = link.getAttribute('href').slice(1);
  event.preventDefault();
  closeMenu();

  if (targetId === 'top') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  const target = document.getElementById(targetId);
  if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
};
document.querySelectorAll('.nav-links a[href^="#"]').forEach((link) => {
  link.addEventListener('click', scrollToNavTarget);
});

if (window.location.hash) {
  const initialTarget = document.getElementById(window.location.hash.slice(1));
  if (initialTarget) initialTarget.scrollIntoView({ behavior: 'auto', block: 'start' });
}
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeMenu(); });
document.addEventListener('click', (event) => {
  if (!navLinks.contains(event.target) && !menuToggle.contains(event.target)) closeMenu();
});
window.addEventListener('resize', () => { if (window.innerWidth > 640) closeMenu(); });

document.querySelectorAll('.faq-item button').forEach((button) => {
  button.addEventListener('click', () => {
    const item = button.parentElement;
    const answer = document.getElementById(button.getAttribute('aria-controls'));
    const wasOpen = button.getAttribute('aria-expanded') === 'true';
    document.querySelectorAll('.faq-item').forEach((faqItem) => {
      faqItem.classList.remove('open');
      const faqButton = faqItem.querySelector('button');
      faqButton.setAttribute('aria-expanded', 'false');
      faqButton.querySelector('span').textContent = '＋';
      document.getElementById(faqButton.getAttribute('aria-controls')).hidden = true;
    });
    if (!wasOpen) {
      item.classList.add('open');
      button.setAttribute('aria-expanded', 'true');
      button.querySelector('span').textContent = '−';
      answer.hidden = false;
    }
  });
});

document.querySelectorAll('[data-service]').forEach((link) => {
  link.addEventListener('click', () => {
    const typeField = document.querySelector('select[name="type"]');
    if (typeField) typeField.value = link.dataset.service;
  });
});

const inquiryForm = document.querySelector('#inquiry-form');
const formSuccess = document.querySelector('#form-success');
inquiryForm.addEventListener('submit', (event) => {
  event.preventDefault();
  formSuccess.hidden = false;
  inquiryForm.querySelector('button[type="submit"]').hidden = true;
  formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});
