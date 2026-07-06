// Basic interactive behaviors: nav toggle, reveal on scroll, project modal, form handling

document.addEventListener('DOMContentLoaded', () => {
  // Header nav toggle for mobile
  const navToggle = document.querySelector('.nav-toggle');
  const primaryNav = document.getElementById('primary-navigation');

  if (navToggle && primaryNav) {
    navToggle.addEventListener('click', () => {
      const isVisible = primaryNav.getAttribute('data-visible') === 'true';
      primaryNav.setAttribute('data-visible', String(!isVisible));
      navToggle.setAttribute('aria-expanded', String(!isVisible));
    });

    // Close nav on link click (mobile)
    primaryNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        primaryNav.setAttribute('data-visible', 'false');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Insert current year in footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // IntersectionObserver for reveal animations
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  reveals.forEach(el => revealObserver.observe(el));

  // Project modal logic
  const modal = document.getElementById('project-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalTech = document.getElementById('modal-tech');
  const modalLive = document.getElementById('modal-live');
  const modalClose = document.querySelector('.modal-close');

  document.querySelectorAll('.view-project').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const card = e.target.closest('.project-card');
      if (!card) return;
      const title = card.getAttribute('data-title') || 'Project';
      const desc = card.getAttribute('data-desc') || '';
      const tech = card.getAttribute('data-tech') || '';
      const link = card.getAttribute('data-link') || '#';

      modalTitle.textContent = title;
      modalDesc.textContent = desc;
      modalTech.textContent = tech;
      modalLive.setAttribute('href', link);

      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';

      // Focus trap minimally
      modalClose.focus();
    });
  });

  function closeModal() {
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') closeModal();
  });

  // Simple client-side form feedback (Netlify will handle submission)
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');

  if (form) {
    form.addEventListener('submit', (e) => {
      // Let Netlify handle the POST; show a friendly inline message
      status.textContent = 'Sending…';
      // Allow the native submit to proceed; after submission Netlify will redirect or show success.
      // For AJAX submission you'd preventDefault and POST via fetch to "/", but we'll keep it simple to remain Netlify-friendly.
      setTimeout(() => {
        status.textContent = 'If the form does not submit, please email you@example.com directly.';
      }, 2000);
    });
  }

  // Progressive enhancement: set progress bar widths from CSS variables (already set inline)
  // No further JS required.
});
