/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = document.getElementById('nav-menu'),
  navToggle = document.getElementById('nav-toggle'),
  navClose = document.getElementById('nav-close');

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.add('show-menu');
  });
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if (navClose) {
  navClose.addEventListener('click', () => {
    navMenu.classList.remove('show-menu');
  });
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link');

function linkAction() {
  const navMenu = document.getElementById('nav-menu');
  // When we click on each nav__link, we remove the show-menu class
  navMenu.classList.remove('show-menu');
}
navLink.forEach((n) => n.addEventListener('click', linkAction));

/*==================== ACCORDION SKILLS ====================*/

const skillsContent = document.getElementsByClassName('skills__content'),
  skillsHeader = document.querySelectorAll('.skills__header');

function toggleSkills() {
  let itemClass = this.parentNode.className;

  for (i = 0; i < skillsContent.length; i++) {
    skillsContent[i].className = 'skills__content skills__close';
  }

  if (itemClass === 'skills__content skills__close') {
    this.parentNode.className = 'skills__content skills__open';
  }
}

skillsHeader.forEach((el) => {
  el.addEventListener('click', toggleSkills);
});
/*==================== QUALIFICATION TABS ====================*/
const tabs = document.querySelectorAll('[data-target]'),
  tabContents = document.querySelectorAll('[data-content]');

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const target = document.querySelector(tab.dataset.target);

    // Add a class for the fade-out animation
    tabContents.forEach((tabContent) => {
      if (tabContent.classList.contains('qualification__active')) {
        tabContent.classList.add('qualification__fade-out');
        
        // Remove the active class after the animation completes
        setTimeout(() => {
          tabContent.classList.remove('qualification__active');
          tabContent.classList.remove('qualification__fade-out');
        }, 300);
      }
    });

    // Add the active class to the target with a delay for smooth transition
    setTimeout(() => {
      target.classList.add('qualification__active');
    }, 300);

    tabs.forEach((t) => {
      t.classList.remove('qualification__active');
    });
    tab.classList.add('qualification__active');
  });
});

/*==================== SERVICES MODAL ====================*/
const modelViews = document.querySelectorAll('.services__model'),
  modelBtns = document.querySelectorAll('.service__button'),
  modelCloses = document.querySelectorAll('.services__model-close');

// Fix modal function to properly handle the opening animation
let modal = function (modalIndex) {
  if (modelViews[modalIndex]) {
    // Show the modal first
    modelViews[modalIndex].classList.add('active-modal');
    
    // Prevent body scrolling when modal is open
    document.body.style.overflow = 'hidden';
  }
};

// Improved event listeners for opening modals
modelBtns.forEach((modelBtn) => {
  modelBtn.addEventListener('click', (e) => {
    // Prevent event bubbling
    e.preventDefault();
    e.stopPropagation();
    
    // Get the service index from the data attribute
    const serviceIndex = modelBtn.getAttribute('data-service');
    if (serviceIndex !== null) {
      modal(parseInt(serviceIndex));
    }
  });
});

// Improved close function for modals
const closeModal = function(modalEl) {
  if (modalEl && modalEl.classList.contains('active-modal')) {
    // Add closing animation class
    modalEl.classList.add('closing-modal');
    
    // Remove classes after animation completes
    setTimeout(() => {
      modalEl.classList.remove('active-modal');
      modalEl.classList.remove('closing-modal');
      
      // Restore body scrolling
      document.body.style.overflow = '';
    }, 300);
  }
};

// Close button event listeners
modelCloses.forEach((modelClose) => {
  modelClose.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Find the parent modal
    const modalEl = modelClose.closest('.services__model');
    closeModal(modalEl);
  });
});

// Close modal when clicking outside the content
modelViews.forEach((modelView) => {
  modelView.addEventListener('click', (e) => {
    // Only close if clicking on the overlay (not the content)
    if (e.target === modelView) {
      closeModal(modelView);
    }
  });
});

// Close modal with ESC key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    // Find any open modal and close it
    const openModal = document.querySelector('.services__model.active-modal');
    if (openModal) {
      closeModal(openModal);
    }
  }
});

/*==================== PORTFOLIO SWIPER  ====================*/
let swiperPortfolio = new Swiper('.portfolio__container', {
  cssMode: true,
  loop: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  }
});

/*==================== TESTIMONIAL ====================*/
let swiperTestimonial = new Swiper('.testimonial__container', {
  grabCursor: true,
  loop: true,
  spaceBetween: 48,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    dynamicBullets: true
  },
  breakpoints: {
    568: {
      slidesPerView: 2
    }
  }
});

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    sectionId = current.getAttribute('id');

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector('.nav__menu a[href*=' + sectionId + ']')
        .classList.add('active-link');
    } else {
      document
        .querySelector('.nav__menu a[href*=' + sectionId + ']')
        .classList.remove('active-link');
    }
  });
}
window.addEventListener('scroll', scrollActive);

/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader() {
  const nav = document.getElementById('header');
  // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
  if (this.scrollY >= 80) nav.classList.add('scroll-header');
  else nav.classList.remove('scroll-header');
}
window.addEventListener('scroll', scrollHeader);

/*==================== SHOW SCROLL UP ====================*/
function scrollUp() {
  const scrollUp = document.getElementById('scroll-up');
  // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
  if (this.scrollY >= 560) scrollUp.classList.add('show-scroll');
  else scrollUp.classList.remove('show-scroll');
}
window.addEventListener('scroll', scrollUp);

/*==================== DARK LIGHT THEME ====================*/
const themeButton = document.getElementById('theme-button');
const darkTheme = 'dark-theme';
const iconTheme = 'uil-sun';

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? 'dark' : 'light';
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? 'uil-moon' : 'uil-sun';

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](
    darkTheme
  );
  themeButton.classList[selectedIcon === 'uil-moon' ? 'add' : 'remove'](
    iconTheme
  );
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
  // Add or remove the dark / icon theme
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  // We save the theme and the current icon that the user chose
  localStorage.setItem('selected-theme', getCurrentTheme());
  localStorage.setItem('selected-icon', getCurrentIcon());
});
