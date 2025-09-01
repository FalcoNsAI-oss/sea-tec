// Image Slider Functionality
class ImageSlider {
  constructor() {
    this.currentSlide = 0;
    this.slides = document.querySelectorAll('.slide');
    this.totalSlides = this.slides.length;
    this.sliderTrack = document.getElementById('sliderTrack');
    this.prevBtn = document.getElementById('prevBtn');
    this.nextBtn = document.getElementById('nextBtn');
    this.dotsContainer = document.getElementById('sliderDots');
    this.autoSlideInterval = null;
    
    this.init();
  }
  
  init() {
    this.createDots();
    this.bindEvents();
    this.updateSlider();
    this.startAutoSlide();
  }
  
  createDots() {
    for (let i = 0; i < this.totalSlides; i++) {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => this.goToSlide(i));
      this.dotsContainer.appendChild(dot);
    }
  }
  
  bindEvents() {
    this.prevBtn.addEventListener('click', () => this.prevSlide());
    this.nextBtn.addEventListener('click', () => this.nextSlide());
    
    // Pause auto-slide on hover
    this.sliderTrack.addEventListener('mouseenter', () => this.stopAutoSlide());
    this.sliderTrack.addEventListener('mouseleave', () => this.startAutoSlide());
  }
  
  updateSlider() {
    const translateX = -this.currentSlide * 100;
    this.sliderTrack.style.transform = `translateX(${translateX}%)`;
    
    // Update dots
    document.querySelectorAll('.dot').forEach((dot, index) => {
      dot.classList.toggle('active', index === this.currentSlide);
    });
  }
  
  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
    this.updateSlider();
  }
  
  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
    this.updateSlider();
  }
  
  goToSlide(index) {
    this.currentSlide = index;
    this.updateSlider();
  }
  
  startAutoSlide() {
    this.stopAutoSlide();
    this.autoSlideInterval = setInterval(() => {
      this.nextSlide();
    }, 4000);
  }
  
  stopAutoSlide() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
      this.autoSlideInterval = null;
    }
  }
}

// Video Auto-play on Scroll
class VideoController {
  constructor() {
    this.video = document.getElementById('autoVideo');
    this.videoOverlay = document.querySelector('.video-overlay');
    this.hasPlayed = false;
    
    this.init();
  }
  
  init() {
    this.bindScrollEvent();
  }
  
  bindScrollEvent() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
          this.playVideo();
        } else {
          this.pauseVideo();
        }
      });
    }, {
      threshold: 0.5
    });
    
    observer.observe(this.video);
  }
  
  playVideo() {
    if (this.video && !this.hasPlayed) {
      this.video.play().then(() => {
        this.videoOverlay.classList.add('hidden');
        this.hasPlayed = true;
      }).catch(error => {
        console.log('Video autoplay failed:', error);
      });
    }
  }
  
  pauseVideo() {
    if (this.video && this.hasPlayed) {
      this.video.pause();
    }
  }
}

// Scroll Animations
class ScrollAnimations {
  constructor() {
    this.init();
  }
  
  init() {
    this.setupIntersectionObserver();
    this.setupSmoothScrolling();
  }
  
  setupIntersectionObserver() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);
    
    // Observe sections for fade-in animations
    document.querySelectorAll('.gallery-section, .video-section, .about-section, .contact-section').forEach(section => {
      section.classList.add('fade-in');
      observer.observe(section);
    });
  }
  
  setupSmoothScrolling() {
    document.querySelectorAll('.nav-link, .cta-button').forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed nav
            window.scrollTo({
              top: offsetTop,
              behavior: 'smooth'
            });
          }
        }
      });
    });
  }
}

// Navigation Scroll Effect
class NavigationController {
  constructor() {
    this.nav = document.querySelector('.nav');
    this.init();
  }
  
  init() {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        this.nav.style.background = 'rgba(255, 255, 255, 0.98)';
        this.nav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
      } else {
        this.nav.style.background = 'rgba(255, 255, 255, 0.95)';
        this.nav.style.boxShadow = 'none';
      }
    });
  }
}

// Form Handler
class FormHandler {
  constructor() {
    this.form = document.querySelector('.form');
    this.init();
  }
  
  init() {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleSubmit();
    });
  }
  
  handleSubmit() {
    const formButton = this.form.querySelector('.form-button');
    const originalText = formButton.textContent;
    
    formButton.textContent = 'Gönderiliyor...';
    formButton.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
      formButton.textContent = 'Gönderildi ✓';
      formButton.style.background = '#10b981';
      
      setTimeout(() => {
        formButton.textContent = originalText;
        formButton.disabled = false;
        formButton.style.background = '';
        this.form.reset();
      }, 2000);
    }, 1500);
  }
}

// === Vertical Portrait Slider (vslider) ===
class VerticalSlider {
  constructor() {
    this.vp = document.getElementById('vsliderViewport');
    if (!this.vp) return; // slider not present
    this.slides = Array.from(this.vp.querySelectorAll('.vslide'));
    this.count = this.slides.length;
    this.prev = document.querySelector('.vslider-btn.vprev');
    this.next = document.querySelector('.vslider-btn.vnext');
    this.index = 0;
    this.timer = null;

    this.bind();
    this.goTo(0, false);
    this.startAuto();

    // Keep alignment on resize
    window.addEventListener('resize', () => this.goTo(this.index, false));
  }

  height() { return this.vp.clientHeight; }

  goTo(i, smooth = true) {
    if (!this.count) return;
    this.index = (i + this.count) % this.count; // wrap around
    this.vp.scrollTo({ top: this.index * this.height(), behavior: smooth ? 'smooth' : 'auto' });
  }

  nextSlide() { this.goTo(this.index + 1); }
  prevSlide() { this.goTo(this.index - 1); }

  startAuto() {
    this.stopAuto();
    this.timer = setInterval(() => this.nextSlide(), 3000); // 3s auto-advance
  }

  stopAuto() {
    if (this.timer) { clearInterval(this.timer); this.timer = null; }
  }

  bind() {
    // Buttons
    if (this.prev) this.prev.addEventListener('click', () => { this.prevSlide(); });
    if (this.next) this.next.addEventListener('click', () => { this.nextSlide(); });

    // Sync index after manual scroll (debounced)
    let t;
    this.vp.addEventListener('scroll', () => {
      clearTimeout(t);
      t = setTimeout(() => {
        const i = Math.round(this.vp.scrollTop / this.height());
        this.index = Math.max(0, Math.min(this.count - 1, i));
      }, 100);
    }, { passive: true });
  }
}

// === Portrait Video Controller (under Gallery) ===
class PortraitVideoController {
  constructor() {
    this.video = document.getElementById('portraitVideo');
    if (!this.video) return; // portrait video not present

    // Ensure attributes for mobile autoplay UX
    this.video.muted = true;
    this.video.setAttribute('muted', '');
    this.video.playsInline = true;
    this.video.setAttribute('playsinline', '');

    // Ensure source exists and points to video.mp4 (relative to index.html)
    this.ensureSource('video.mp4');

    // Auto play/pause when in view
    this.bindIntersection();
  }

  ensureSource(srcPath) {
    let source = this.video.querySelector('source');
    if (!source) {
      source = document.createElement('source');
      source.type = 'video/mp4';
      this.video.appendChild(source);
    }
    // Only set if empty or different
    const current = source.getAttribute('src');
    if (!current || current !== srcPath) {
      source.setAttribute('src', srcPath);
      this.video.load();
    }
  }

  bindIntersection() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
          this.playSafe();
        } else {
          this.video.pause();
        }
      });
    }, { threshold: 0.5 });

    observer.observe(this.video);
  }

  async playSafe() {
    try { await this.video.play(); } catch (_) { /* user gesture may be required; controls are visible */ }
  }
}
// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize old horizontal slider only if its elements exist
  const hasOld = document.getElementById('sliderTrack') &&
                 document.querySelectorAll('.slide').length &&
                 document.getElementById('prevBtn') &&
                 document.getElementById('nextBtn') &&
                 document.getElementById('sliderDots');
  if (hasOld) {
    new ImageSlider();
  }

  new VideoController();
  new PortraitVideoController();
  new ScrollAnimations();
  new NavigationController();
  new FormHandler();

  // Initialize the vertical slider if present
  if (document.getElementById('vsliderViewport')) {
    new VerticalSlider();
  }
});

// Add some extra smooth interactions
document.addEventListener('mousemove', (e) => {
  const heroBackground = document.querySelector('.hero-bg');
  if (heroBackground) {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    heroBackground.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
  }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const heroBackground = document.querySelector('.hero-bg');
  
  if (heroBackground) {
    heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});