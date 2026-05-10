// ==================== INISIALISASI AOS ====================
AOS.init({
  duration: 800,
  once: true,
  offset: 100
});

// ==================== LIGHTBOX GAMBAR & VIDEO ====================
const portfolioGrid = document.querySelector('.portfolio-grid');

if (portfolioGrid) {
  portfolioGrid.addEventListener('click', function (e) {
    const trigger = e.target.closest('.project-trigger');
    if (!trigger) return;

    e.preventDefault();

    const projectId = trigger.getAttribute('data-project');
    const isVideo = trigger.getAttribute('data-type') === 'video';
    const videoUrl = trigger.getAttribute('href');

   // --- HANDLER VIDEO (tanpa panah sama sekali) ---
    if (isVideo && videoUrl) {
      const lightbox = GLightbox({
        elements: [
          {
            href: videoUrl,
            type: 'video',
            title: trigger.getAttribute('data-title') || ''
          }
        ],
        autoplayVideos: true,
        touchNavigation: false,
        loop: false,
        keyboardNavigation: false,
        gallery: { enabled: false },
        closeOnOutsideClick: true
      });

      lightbox.open();

      // Hapus total tombol panah setelah lightbox termuat
      function removeArrows() {
        const nextBtn = document.querySelector('.glightbox-container .gnext');
        const prevBtn = document.querySelector('.glightbox-container .gprev');
        if (nextBtn) nextBtn.remove(); // hapus total, bukan sembunyikan
        if (prevBtn) prevBtn.remove();
      }

      // Jalankan berkali-kali untuk memastikan
      setTimeout(removeArrows, 50);
      setTimeout(removeArrows, 200);
      lightbox.on('open', removeArrows);
      return;
    }

    // --- HANDLER GAMBAR (MULTI-GAMBAR PER PROJECT) ---
    const allItems = document.querySelectorAll(`[data-project="${projectId}"]`);
    const elements = Array.from(allItems).map(function (item) {
      return {
        href: item.getAttribute('href'),
        type: 'image',
        title: item.getAttribute('data-title') || ''
      };
    });

    const lightbox = GLightbox({
      elements: elements,
      gallery: { enabled: elements.length > 1 },
      touchNavigation: true,
      loop: false,
      autoplayVideos: false
    });

    lightbox.open();
  });
}

// ==================== NAVIGASI AKTIF (SCROLL SPY) ====================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', function () {
  const scrollY = window.scrollY;

  sections.forEach(function (section) {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinks.forEach(function (link) {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
});

// ==================== HAMBURGER MENU MOBILE ====================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-links');

hamburger.addEventListener('click', function () {
  navMenu.classList.toggle('open');
});

navLinks.forEach(function (link) {
  link.addEventListener('click', function () {
    navMenu.classList.remove('open');
  });
});

// ==================== BACK TO TOP ====================
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', function () {
  if (window.scrollY > 500) {
    backToTop.classList.add('show');
  } else {
    backToTop.classList.remove('show');
  }
});

backToTop.addEventListener('click', function () {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ==================== FILTER GALERI ====================
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item'); // hanya thumbnail utama

filterBtns.forEach(function (btn) {
  btn.addEventListener('click', function () {
    filterBtns.forEach(function (b) {
      b.classList.remove('active');
    });
    btn.classList.add('active');

    const filterValue = btn.getAttribute('data-filter');

    portfolioItems.forEach(function (item) {
      const itemFilter = item.getAttribute('data-filter');
      if (filterValue === 'all' || itemFilter === filterValue) {
        item.style.display = 'block';
        item.style.opacity = '1';
        item.style.transform = 'scale(1)';
      } else {
        item.style.display = 'none';
        item.style.opacity = '0';
        item.style.transform = 'scale(0.8)';
      }
    });
  });
});

console.log('✅ JS final: video tanpa panah, gambar multi-project, filter, scroll spy aktif.');