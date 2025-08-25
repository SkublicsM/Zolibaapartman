document.addEventListener("DOMContentLoaded", () => {
  // --- Navbar sticky logic ---
  const navbar = document.querySelector('.navbar');
  const header = document.getElementById('home');
  let lastScrolled = false;
  let lastScrollYMobile = window.scrollY;
  function onScroll() {
    const headerBottom = header.getBoundingClientRect().bottom;
    const shouldBeScrolled = headerBottom <= 0;
    if (shouldBeScrolled !== lastScrolled) {
      navbar.classList.toggle('scrolled', shouldBeScrolled);
      lastScrolled = shouldBeScrolled;
    }
  }
  function handleMobileHide(){
    // Unified auto-hide for all viewport widths
    const menuOpen = document.querySelector('.navbar-menu')?.classList.contains('active');
    if(menuOpen){ navbar.classList.remove('nav-hide'); lastScrollYMobile = window.scrollY; return; }
    if(window.scrollY > lastScrollYMobile && window.scrollY > 120){
      navbar.classList.add('nav-hide');
    } else {
      navbar.classList.remove('nav-hide');
    }
    lastScrollYMobile = window.scrollY;
  }
  window.addEventListener('scroll', () => {
    onScroll();
    handleMobileHide();
  });
  window.addEventListener('resize', handleMobileHide);
  onScroll();
  handleMobileHide();

  // --- Modal logic ---
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modal-img');
  const captionText = document.getElementById('modal-caption');
  const closeBtn = document.querySelector('.modal-close');
  const arrowLeft = document.querySelector('.modal-arrow-left');
  const arrowRight = document.querySelector('.modal-arrow-right');
  const galleryImages = Array.from(document.querySelectorAll('.gallery-grid img'));
  let currentIndex = 0;

  function showModal(index) {
    currentIndex = index;
    const img = galleryImages[currentIndex];
    modal.style.display = "flex";
    modalImg.src = img.src;
    modalImg.alt = img.alt;
    captionText.innerText = img.alt;
    setTimeout(() => modalImg.classList.add('modal-animate'), 10);
  }

  galleryImages.forEach((img, idx) => {
    img.onclick = function() {
      showModal(idx);
    }
  });

  modalImg.addEventListener('animationend', function() {
    this.classList.remove('modal-animate');
  });

  closeBtn.onclick = function() {
    modal.style.display = "none";
    modalImg.src = "";
    captionText.innerText = "";
  };

  modal.onclick = function(e) {
    if (e.target === modal) {
      modal.style.display = "none";
      modalImg.src = "";
      captionText.innerText = "";
    }
  };

  arrowLeft.onclick = function(e) {
    e.stopPropagation();
    currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    showModal(currentIndex);
  };
  arrowRight.onclick = function(e) {
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % galleryImages.length;
    showModal(currentIndex);
  };

  document.addEventListener('keydown', function(e) {
    if (modal.style.display === "flex") {
      if (e.key === "ArrowLeft") {
        arrowLeft.click();
      } else if (e.key === "ArrowRight") {
        arrowRight.click();
      } else if (e.key === "Escape") {
        closeBtn.click();
      }
    }
    let modalScale = 1;

  // Zoom modal image with Ctrl + scroll
  document.getElementById('modal').addEventListener('wheel', function(e) {
    if (e.ctrlKey) {
      e.preventDefault();
      if (e.deltaY < 0) {
        modalScale = Math.min(modalScale + 0.1, 3); // max 3x zoom
      } else {
        modalScale = Math.max(modalScale - 0.1, 1); // min 1x zoom
      }
      document.getElementById('modal-img').style.transform = `scale(${modalScale})`;
    }
  });

  // Reset zoom when modal closes
  document.querySelector('.modal-close').onclick = function() {
    document.getElementById('modal').style.display = "none";
    document.getElementById('modal-img').src = "";
    document.getElementById('modal-caption').innerText = "";
    modalScale = 1;
    document.getElementById('modal-img').style.transform = "scale(1)";
  };  
  });
  // --- Hamburger menu logic ---
  // Toggle hamburger menu on small screens
   const toggleBtn = document.querySelector('.navbar-toggle');
  const menu = document.querySelector('.navbar-menu');
  toggleBtn.addEventListener('click', () => {
    menu.classList.toggle('active');
  });
   // Close hamburger menu after clicking a link
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 700) {
        menu.classList.remove('active');
      }
    });
  });
    // ==== LANGUAGE TOGGLE LOGIC (navbar switch) ====
  const langButtons = document.querySelectorAll('.lang-opt');
  const navMap = {
    '#apartman':'apartman',
    '#gallery':'gallery',
    '#prices':'prices',
    '#booking-calendar':'booking',
    '#contact':'contact'
  };

  // Extend/define translations (keeping previous keys) ADD FULL INDEX KEYS
  const translations = {
    hu: {
      contact:"Kapcsolat", email:"Email:", phone:"Telefon:", english:"Angolul is beszélünk!", weSpeak:"We speak English!", prices:"Árak", booking:"Foglalás", gallery:"Galéria", apartman:"Apartman", calendar:"Foglalási naptár", map:"Hol található az apartman?", cta:"Lépjen kapcsolatba velünk!", heading:"ZOLIBA' Apartman", gallerySubtitle:"Tekintse meg apartmanjaink képeit!", bookingInfo:"Az alábbi naptárban ellenőrizheti a szabad időpontokat:",
      apartmentSectionTitle:"Az apartman",
      locationTitle:"Elhelyezkedés:",
      locationText:"Apartmanunk Gyöngyösfalu szívében, könnyen megközelíthető, csendes utcában helyezkedik el. Közel Szombathelyhez, Kőszeghez és a számtalan túrázási lehetőséghez. 1,5 kilométeres körzetben éjjel-nappali élelmiszerbolt és dohánybolt illetve számos étterem található.",
      equipmentTitle:"Felszereltség:",
      equipmentText:"200 m2-en akár 12 fő részére tudunk kényelmes elhelyezést biztosítani. A két emeleten elterülő 6-5 légterű (több háló, nappali, konyha, fürdőszoba) apartman elsősorban családok, baráti társaságok számára ideális. Mindkét emeleten síkképernyős tv áll vendégeink rendelkezésére.",
      gardenTitle:"Kert és kikapcsolódás:",
      gardenText:"Vendégeink részére nagyméretű, jól felszerelt beltéri és nyári konyha is áll rendelkezésre (hűtő, mikró, gáztűzhely, kávéfőző, tányérok, edények). Az apartman területén korlátlan, ingyenes internetelérést (WIFI) biztosított. Parkolásra a zárt udvarban van lehetőség ahol maximum 6 autónak tudunk parkolási lehetőséget biztosítani. Az udvaron egy almáskert, lugas, szalonnasütő, tárcsa, elektromos grill és bográcsozó is található.",
      recommendedTitle:"Kinek ajánljuk:",
      recommendedText:"Apartmanunk családok, baráti társaságok számára ideális, akár 3 generáció is kellemes napokat tölthet el nálunk. De várjuk pár napra érkező, párok, környéken dolgozó vagy átutazó vendégeinket is.",
      paymentTitle:"Fizetési lehetőségek:",
      paymentText:"Vendégeinknek lehetőségük van fizetni készpénzzel, átutalással.",
      galleryTitle:"Galéria",
      pricesTitle:"Árak",
      priceItem1:"1 szobás lakás: 30.000 Ft/éj-től",
      priceItem2:"2 szobás lakás: 45.000 Ft/éj-től",
      calendarTitle:"Foglalási naptár",
      bookingLabel:"Foglalás (Booking.com):",
      bookingLink:"Foglaljon a Booking.com-on",
      huLabel:"Magyar ",
      enLabel:"Angol ",
      gaborneName:"Skublics Gáborné",
      gaborName:"Skublics Gábor",
      markName:"Skublics Mark"
    },
    en: {
      contact:"Contact", email:"Email:", phone:"Phone:", english:"We speak English!", weSpeak:"", prices:"Prices", booking:"Booking", gallery:"Gallery", apartman:"Apartment", calendar:"Booking Calendar", map:"Where is the apartment?", cta:"Contact us!", heading:"ZOLIBA' Apartment", gallerySubtitle:"View photos of our apartments!", bookingInfo:"You can check available dates in the calendar below:",
      apartmentSectionTitle:"The Apartment",
      locationTitle:"Location:",
      locationText:"Our apartment is located in the heart of Gyöngyösfalu on a quiet, easily accessible street. Close to Szombathely, Kőszeg and numerous hiking opportunities. Within 1.5 km you find 24-hour grocery, tobacco shop and several restaurants.",
      equipmentTitle:"Equipment:",
      equipmentText:"On 200 m2 we can provide comfortable accommodation for up to 12 guests. Spread over two floors with multiple bedrooms, living rooms, kitchens and bathrooms – ideal for families or groups. Flat screen TVs on both floors.",
      gardenTitle:"Garden & Leisure:",
      gardenText:"A large, well-equipped indoor and summer kitchen is available (fridge, microwave, gas stove, coffee maker, plates, cookware). Unlimited free Wi‑Fi. Secure courtyard parking for up to 6 cars. Apple orchard, pergola, fire pit, disc grill, electric grill and cauldron area in the yard.",
      recommendedTitle:"Who it's for:",
      recommendedText:"Perfect for families and groups of friends – even three generations. Also ideal for couples, business travellers or passers-by.",
      paymentTitle:"Payment Options:",
      paymentText:"Guests may pay by cash or bank transfer.",
      galleryTitle:"Gallery",
      pricesTitle:"Prices",
      priceItem1:"1 bedroom apartment: from 30,000 HUF/night",
      priceItem2:"2 bedroom apartment: from 45,000 HUF/night",
      calendarTitle:"Booking Calendar",
      bookingLabel:"Reservation (Booking.com):",
      bookingLink:"Reserve on Booking.com",
      huLabel:"Hungarian ",
      enLabel:"English ",
      gaborneName:"Mrs. Gabor Skublics",
      gaborName:"Gabor Skublics",
      markName:"Mark Skublics"
    }
  };

  let currentLang = localStorage.getItem('site-lang') || 'hu';
  updateLanguage(currentLang);
  activateButton(currentLang);

  langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      if(lang!==currentLang){
        currentLang = lang;
        localStorage.setItem('site-lang', currentLang);
        updateLanguage(currentLang);
        activateButton(currentLang);
      }
    });
  });

  function activateButton(lang){
    langButtons.forEach(b=>b.classList.toggle('active', b.dataset.lang===lang));
  }

  function updateLanguage(lang){
    // Navbar links
    document.querySelectorAll('.navbar-menu a').forEach(a=>{
      const key = navMap[a.getAttribute('href')];
      if(key && translations[lang][key]) a.textContent = translations[lang][key];
    });
    // Headline & CTA & gallery subtitle & booking info
    document.querySelector('header h1') && (document.querySelector('header h1').textContent = translations[lang].heading);
    document.querySelector('.cta') && (document.querySelector('.cta').textContent = translations[lang].cta);
    const galP = document.querySelector('#gallery p'); if(galP) galP.textContent = translations[lang].gallerySubtitle;
    const bookP = document.querySelector('#booking-calendar p'); if(bookP) bookP.textContent = translations[lang].bookingInfo;
    // Apartment section heading
    const aptH2 = document.querySelector('#apartman h2'); if(aptH2) aptH2.textContent = translations[lang].apartmentSectionTitle;
    // Apartment feature paragraphs (ordered)
    const aptParas = document.querySelectorAll('#apartman .feature-block p');
    if(aptParas.length >= 5){
      aptParas[0].innerHTML = `<strong>${translations[lang].locationTitle}</strong><br>${translations[lang].locationText}`;
      aptParas[1].innerHTML = `<strong>${translations[lang].equipmentTitle}</strong><br>${translations[lang].equipmentText}`;
      aptParas[2].innerHTML = `<strong>${translations[lang].gardenTitle}</strong><br>${translations[lang].gardenText}`;
      aptParas[3].innerHTML = `<strong>${translations[lang].recommendedTitle}</strong><br>${translations[lang].recommendedText}`;
      aptParas[4].innerHTML = `<strong>${translations[lang].paymentTitle}</strong><br>${translations[lang].paymentText}`;
    }
    // Gallery heading
    const galleryH2 = document.querySelector('#gallery h2'); if(galleryH2) galleryH2.textContent = translations[lang].galleryTitle;
    // Prices section
    const pricesH2 = document.querySelector('#prices h2'); if(pricesH2) pricesH2.textContent = translations[lang].pricesTitle;
    const priceLis = document.querySelectorAll('#prices li');
    if(priceLis.length >= 2){
      priceLis[0].textContent = translations[lang].priceItem1;
      priceLis[1].textContent = translations[lang].priceItem2;
    }
    // Calendar heading
    const calH2 = document.querySelector('#booking-calendar h2'); if(calH2) calH2.textContent = translations[lang].calendarTitle;
    // Contact heading & block
    const contactH2 = document.querySelector('#contact h2'); if(contactH2) contactH2.textContent = translations[lang].contact;
    // Update granular contact labels
    document.querySelectorAll('.i18n-email-label').forEach(el=>{ if(translations[lang].email) el.textContent = translations[lang].email; });
    document.querySelectorAll('.i18n-phone-label').forEach(el=>{ if(translations[lang].phone) el.textContent = translations[lang].phone; });
    const englishLabel = document.querySelector('.i18n-english-label'); if(englishLabel) englishLabel.textContent = translations[lang].english;
    const weSpeakSpan = document.querySelector('.i18n-we-speak'); if(weSpeakSpan && translations[lang].weSpeak!==undefined) weSpeakSpan.textContent = translations[lang].weSpeak || translations[lang].english;
    const bookingLabel = document.querySelector('.i18n-booking-label'); if(bookingLabel && translations[lang].bookingLabel) bookingLabel.textContent = translations[lang].bookingLabel;
    const bookingLink = document.querySelector('.i18n-booking-link'); if(bookingLink && translations[lang].bookingLink) bookingLink.textContent = translations[lang].bookingLink;
    // Replace single-element badge updates with all matching elements
    document.querySelectorAll('.i18n-hu-label').forEach(el=>{ if(translations[lang].huLabel) el.textContent = translations[lang].huLabel; });
    document.querySelectorAll('.i18n-en-label').forEach(el=>{ if(translations[lang].enLabel) el.textContent = translations[lang].enLabel; });
    const gaborne = document.querySelector('.i18n-gaborne-name'); if(gaborne && translations[lang].gaborneName) gaborne.textContent = translations[lang].gaborneName;
    const gabor = document.querySelector('.i18n-gabor-name'); if(gabor && translations[lang].gaborName) gabor.textContent = translations[lang].gaborName;
    const mark = document.querySelector('.i18n-mark-name'); if(mark && translations[lang].markName) mark.textContent = translations[lang].markName;
    document.documentElement.lang = lang;
  }

  // Remove legacy icon logic if present
  const oldIcon = document.getElementById('lang-icon');
  if(oldIcon) oldIcon.remove();

  let touchStartX = null;

  modal.addEventListener('touchstart', function(e) {
    if (e.touches.length === 1) {
      touchStartX = e.touches[0].clientX;
    }
  });

  modal.addEventListener('touchend', function(e) {
    if (touchStartX !== null && e.changedTouches.length === 1) {
      const touchEndX = e.changedTouches[0].clientX;
      const deltaX = touchEndX - touchStartX;
      if (Math.abs(deltaX) > 50) { // Swipe threshold
        if (deltaX < 0) {
          // Swipe left: next image
          document.querySelector('.modal-arrow-right')?.click();
        } else {
          // Swipe right: previous image
          document.querySelector('.modal-arrow-left')?.click();
        }
      }
      touchStartX = null;
    }
  });

  // --- Back to Top Button Logic ---
  const toTopBtn = document.getElementById('toTop');
  function toggleToTop(){
    if(window.scrollY > 400){
      toTopBtn.classList.add('show');
    } else {
      toTopBtn.classList.remove('show');
    }
  }
  window.addEventListener('scroll', toggleToTop);
  toggleToTop();
  toTopBtn.addEventListener('click', () => {
    window.scrollTo({ top:0, behavior:'smooth' });
  });

  // Prevent toTop button overlapping footer
  const footer = document.querySelector('footer');
  function adjustToTopOffset(){
    if(!footer) return;
    const rect = footer.getBoundingClientRect();
    const overlap = window.innerHeight - rect.top; // positive when footer enters viewport
    if(overlap > 0){
      // Raise button by overlap plus base gap
      toTopBtn.style.bottom = (24 + overlap) + 'px';
    } else {
      toTopBtn.style.bottom = '24px';
    }
  }
  window.addEventListener('scroll', adjustToTopOffset);
  window.addEventListener('resize', adjustToTopOffset);
  adjustToTopOffset();
  // --- End Back to Top Button Logic ---
});