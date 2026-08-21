const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const setMenuIcon = (isOpen) => {
  menuToggle.innerHTML = isOpen
    ? '<svg class="menu-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>'
    : '<svg class="menu-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16"/></svg>';
};

const closeMenu = () => {
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open navigation');
  setMenuIcon(false);
  navLinks.classList.remove('is-open');
};

menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  if (isOpen) {
    closeMenu();
    return;
  }
  menuToggle.setAttribute('aria-expanded', 'true');
  menuToggle.setAttribute('aria-label', 'Close navigation');
  setMenuIcon(true);
  navLinks.classList.add('is-open');
});

document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', closeMenu);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});

document.addEventListener('click', (event) => {
  if (!navLinks.contains(event.target) && !menuToggle.contains(event.target)) {
    closeMenu();
  }
});

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
