// ===== SCROLL ANIMATION (Intersection Observer) =====
document.addEventListener('DOMContentLoaded', () => {
  const animatedElements = document.querySelectorAll('[data-animate]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Stagger animation for sibling elements
        const siblings = entry.target.parentElement.querySelectorAll('[data-animate]');
        const siblingIndex = Array.from(siblings).indexOf(entry.target);
        const delay = siblingIndex * 100;

        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);

        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  animatedElements.forEach(el => observer.observe(el));

  // ===== TESTIMONIAL CAROUSEL (Desktop) =====
  const track = document.querySelector('.testimonial-track');
  const dots = document.querySelectorAll('.dot');
  let currentIndex = 0;

  if (track && dots.length > 0 && window.innerWidth > 768) {
    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        currentIndex = parseInt(dot.dataset.index);
        updateCarousel();
      });
    });

    // Auto-advance every 5 seconds
    setInterval(() => {
      currentIndex = (currentIndex + 1) % dots.length;
      updateCarousel();
    }, 5000);
  }

  function updateCarousel() {
    if (window.innerWidth <= 768) return;

    const cards = track.querySelectorAll('.testimonial-card');
    if (cards.length === 0) return;

    const cardWidth = cards[0].offsetWidth;
    const gap = 32; // matches CSS gap
    const offset = currentIndex * (cardWidth + gap);

    track.style.transform = `translateX(-${offset}px)`;

    dots.forEach(d => d.classList.remove('active'));
    if (dots[currentIndex]) {
      dots[currentIndex].classList.add('active');
    }
  }

  // ===== ACCORDION (Disciplines) =====
  document.querySelectorAll('.accordion__header').forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isOpen = item.classList.contains('open');

      // Close all other items
      document.querySelectorAll('.accordion__item').forEach(i => {
        i.classList.remove('open');
      });

      // Toggle the clicked item
      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });

  // ===== SMOOTH SCROLL for CTA buttons =====
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ===== COUNTER ANIMATION for stats =====
  const statNumbers = document.querySelectorAll('.stat-card__number');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('counted');
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => counterObserver.observe(el));

  // ===== PHONE MASK =====
  const phoneInput = document.getElementById('phone');
  if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length > 11) value = value.slice(0, 11);
      if (value.length > 6) {
        value = `(${value.slice(0,2)}) ${value.slice(2,7)}-${value.slice(7)}`;
      } else if (value.length > 2) {
        value = `(${value.slice(0,2)}) ${value.slice(2)}`;
      } else if (value.length > 0) {
        value = `(${value}`;
      }
      e.target.value = value;
    });
  }

  // ===== FORM SUBMISSION =====
  const form = document.getElementById('enrollmentForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const phone = document.getElementById('phone').value;

      if (name && email && phone) {
        const btn = form.querySelector('.enrollment__submit');
        btn.textContent = 'ENVIADO COM SUCESSO!';
        btn.style.background = '#0A1F44';
        btn.classList.remove('pulse');
        setTimeout(() => {
          btn.textContent = 'QUERO CONCORRER A UMA BOLSA DE ESTUDOS';
          btn.style.background = '';
          btn.classList.add('pulse');
        }, 3000);
      }
    });
  }
});
