/*
  Psikolog Simge Akgül web sitesi için ana JavaScript dosyası.
  Bu dosya sitenin TÜM sayfalarında (Ana Sayfa ve Blog Yazıları) çalışır.
  
  İçerik:
  1.  Header (Menü Çubuğu) Kaydırma Efekti (Ana sayfa ve bloglara özel)
  2.  Mobil Menü (Hamburger) Açma/Kapatma
  3.  Pürüzsüz Kaydırma (Smooth Scroll) & Mobil Link Kapatma
  4.  "Başa Dön" Butonu
  5.  Çerez Onay Banner'ı
  6.  Hakkımda (About) Bölümü Resim Geçişi (Sadece Ana Sayfada)
  7.  Yorumlar (Testimonials) Slider (Sadece Ana Sayfada)
  8.  S.S.S. (FAQ) Akordiyon (Sadece Ana Sayfada)
  9.  Galeri Lightbox (Sadece Ana Sayfada - CSS'teki .active class'ına göre)
  10. Kaydırma ile Gelen Animasyonlar (Scroll Animation)
  11. İletişim Formu Floating (Yüzen) Etiketler (Sadece Ana Sayfada)
*/

// Tüm DOM içeriği yüklendikten sonra kodun çalışmasını sağlar.
document.addEventListener("DOMContentLoaded", function () {
  
  // --- 1. HEADER (MENÜ ÇUBUĞU) KAYDIRMA EFEKTİ ---
  const header = document.querySelector(".site-header");
  
  if (header) {
    const heroSection = document.getElementById("hero"); // Sadece ana sayfada var

    function handleScroll() {
      if (window.scrollY > 50) {
        header.classList.add("scrolled");
      } else {
        // Eğer 'hero' bölümü varsa (yani ana sayfadaysak) 'scrolled' class'ını kaldır.
        // Blog sayfalarındaysak (hero yok) ve en üstteysek,
        // header'ın 'scrolled' kalmasını sağla ki görünmez olmasın.
        if (heroSection) {
          header.classList.remove("scrolled");
        }
      }
    }
    
    // Sayfa yüklendiğinde ve kaydırıldığında kontrol et
    handleScroll();
    window.addEventListener("scroll", handleScroll);
  }

  // --- 2. MOBİL MENÜ (HAMBURGER) AÇMA/KAPATMA ---
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", function () {
      hamburger.classList.toggle("active");
      navLinks.classList.toggle("active");
    });
  }

  // --- 3. PÜRÜZSÜZ KAYDIRMA (SMOOTH SCROLL) & MOBİL LİNK KAPATMA ---
  const allNavLinks = document.querySelectorAll(".nav-link");

  allNavLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      // Tıkladıktan sonra mobil menüyü her zaman kapat
      if (hamburger && navLinks) {
        hamburger.classList.remove("active");
        navLinks.classList.remove("active");
      }

      const href = link.getAttribute("href");
      
      // Eğer link "#" ile başlıyorsa (örn: #about) bu, ANA SAYFA içi bir linktir.
      if (href.startsWith("#")) {
        e.preventDefault(); // Varsayılan atlama davranışını engelle
        const targetElement = document.querySelector(href);
        
        if (targetElement) {
          const headerOffset = header ? header.offsetHeight : 0;
          const elementPosition = targetElement.offsetTop;
          const offsetPosition = elementPosition - headerOffset - 20; // 20px ek pay
          
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      }
      // Eğer link "index.html#" ile başlıyorsa (örn: index.html#about)
      // bu, BLOG sayfasından ana sayfaya dönen bir linktir.
      // Bu durumda JS bir şey yapmasın, linkin normal çalışmasına izin ver.
    });
  });

  // --- 4. "BAŞA DÖN" BUTONU ---
  const backToTopBtn = document.getElementById("backToTopBtn");

  if (backToTopBtn) {
    window.addEventListener("scroll", function() {
      if (window.scrollY > 300) {
        backToTopBtn.style.display = "block"; // CSS'teki .show class'ı yerine doğrudan
      } else {
        backToTopBtn.style.display = "none"; // CSS'te display:none kullanıldığı için
      }
    });

    backToTopBtn.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  // --- 5. ÇEREZ ONAY BANNER'I ---
  const cookieBanner = document.getElementById("cookieConsent");
  const acceptCookiesBtn = document.getElementById("acceptCookies");

  if (cookieBanner && acceptCookiesBtn) {
    // Sayfa yüklendiğinde çerez kabul edilmiş mi diye bak
    if (!localStorage.getItem("cookieConsentAccepted")) {
      cookieBanner.classList.add("show");
    }

    acceptCookiesBtn.addEventListener("click", function () {
      localStorage.setItem("cookieConsentAccepted", "true");
      cookieBanner.classList.remove("show");
    });
  }

  // --- 6. HAKKIMDA (ABOUT) BÖLÜMÜ RESİM GEÇİŞİ ---
  const aboutSlides = document.querySelectorAll(".about-slide");
  if (aboutSlides.length > 0) {
    let currentSlide = 0;
    setInterval(() => {
      aboutSlides[currentSlide].classList.remove("active");
      currentSlide = (currentSlide + 1) % aboutSlides.length;
      aboutSlides[currentSlide].classList.add("active");
    }, 4000); // 4 saniyede bir resim değişir
  }

  // --- 7. YORUMLAR (TESTIMONIALS) SLIDER ---
  const sliderTrack = document.querySelector(".slider-track");
  const slides = document.querySelectorAll(".slide");
  const prevBtn = document.querySelector(".slider-button.prev");
  const nextBtn = document.querySelector(".slider-button.next");

  if (sliderTrack && slides.length > 0 && prevBtn && nextBtn) {
    let currentIndex = 0;
    let autoPlayInterval;

    function updateSlider() {
      sliderTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    function nextSlide() {
      currentIndex = (currentIndex + 1) % slides.length;
      updateSlider();
    }

    function prevSlide() {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      updateSlider();
    }
    
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 7000); // 7 saniyede bir otomatik döner
    }
    
    function resetAutoPlay() {
        clearInterval(autoPlayInterval);
        startAutoPlay();
    }

    nextBtn.addEventListener("click", () => {
        nextSlide();
        resetAutoPlay();
    });
    
    prevBtn.addEventListener("click", () => {
        prevSlide();
        resetAutoPlay();
    });
    
    startAutoPlay(); // Slider'ı başlat
  }

  // --- 8. S.S.S. (FAQ) AKORDİYON ---
  const faqItems = document.querySelectorAll(".faq-item");
  if (faqItems.length > 0) {
    faqItems.forEach(item => {
      const question = item.querySelector(".faq-question");
      question.addEventListener("click", () => {
        const wasActive = item.classList.contains("active");
        
        // Önce tüm item'ları kapat (Sadece birinin açık kalmasını sağlar)
        faqItems.forEach(i => i.classList.remove("active"));
        
        // Eğer zaten açık değilse, şimdi aç
        if (!wasActive) {
          item.classList.add("active");
        }
        // CSS, .active class'ına göre .faq-answer'ı gösterecek
        // ve + ikonunu - (rotate(45deg)) yapacak.
      });
    });
  }

  // --- 9. GALERİ LIGHTBOX ---
  // CSS dosyanızda '.lightbox.active' kullandığınız için kodu güncelledim.
  const galleryImages = document.querySelectorAll(".gallery-image");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.querySelector(".lightbox-close");

  if (galleryImages.length > 0 && lightbox && lightboxImg && closeBtn) {
    galleryImages.forEach(image => {
      image.addEventListener("click", () => {
        lightboxImg.src = image.src;
        lightbox.classList.add("active"); // '.active' kullanılıyor
      });
    });

    closeBtn.addEventListener("click", () => {
      lightbox.classList.remove("active"); // '.active' kullanılıyor
    });
    
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove("active"); // Dışarı tıklayınca kapat
      }
    });
  }

  // --- 10. KAYDIRMA İLE GELEN ANİMASYONLAR (SCROLL ANIMATION) ---
  // CSS dosyanızda '.animate-on-scroll.is-visible' kullandığınızı gördüm.
  const animatedElements = document.querySelectorAll(".animate-on-scroll");
  if (animatedElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // 'is-visible' class'ı CSS'teki animasyonu (opacity: 1) tetikler
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target); // Animasyon sadece bir kez çalışsın
        }
      });
    }, {
      threshold: 0.1 // Elementin %10'u görününce tetikle
    });

    animatedElements.forEach(el => {
      observer.observe(el);
    });
  }

  // --- 11. İLETİŞİM FORMU FLOATING (YÜZEN) ETİKETLER ---
  // CSS dosyanızda '.form-group.focused' kullandığınızı gördüm.
  const formGroups = document.querySelectorAll(".form-group");

  if (formGroups.length > 0) {
    formGroups.forEach(group => {
      const input = group.querySelector("input, textarea");
      if (input) {
        // Sayfa yüklendiğinde (örn. tarayıcı otomatik doldurduysa) kontrol et
        if (input.value) {
          group.classList.add("focused");
        }
        
        // Odaklanınca etiketi yukarı al
        input.addEventListener("focus", () => {
          group.classList.add("focused");
        });
        
        // Odaktan çıkınca değeri kontrol et (boşsa etiketi indir)
        input.addEventListener("blur", () => {
          if (!input.value) {
            group.classList.remove("focused");
          }
        });
      }
    });
  }

}); // DOMContentLoaded bitti