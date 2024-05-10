/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close')

/*===== MENU SHOW =====*/
/* Validate if constant exists */
    if(navToggle){
        navToggle.addEventListener('click', ()=>{
            navMenu.classList.add('show-menu')
        })
    }

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
    if(navClose){
        navClose.addEventListener('click', ()=>{
            navMenu.classList.remove('show-menu')
        })
    }

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== ACCORDION SKILLS ====================*/

const skillsContent = document.getElementsByClassName('skills__content'),
    skillsHeader = document.querySelectorAll('.skills__header')


    function toggleSkills(){
        let itemClass = this.parentNode.className
        
        for (i = 0; i < skillsContent.length; i++) {
            skillsContent[i].className = 'skills__content skills__close'

        }

        if (itemClass === 'skills__content skills__close') {
            this.parentNode.className ='skills__content skills__open'
        }
    }

    skillsHeader.forEach((el) => {
        el.addEventListener('click', toggleSkills)
    })
/*==================== QUALIFICATION TABS ====================*/
const tabs = document.querySelectorAll('[data-target]'),
    tabContents = document.querySelectorAll('[data-content]')

tabs.forEach(tab =>{
    tab.addEventListener('click', ()=>{
        const target = document.querySelector(tab.dataset.target)

        tabContents.forEach(tabContent =>{
            tabContent.classList.remove('qualification__active')
        })
        target.classList.add('qualification__active')

        tabs.forEach(tab =>{
            tab.classList.remove('qualification__active')
        })
        tab.classList.add('qualification__active')
    })
})

/*==================== SERVICES MODAL ====================*/
const modelViews = document.querySelectorAll('.services__model'),
    modelBtns = document.querySelectorAll('.service__button'),
    modelCloses = document.querySelectorAll('.services__model-close')

let modal = function(modalClick){
    modelViews[modalClick].classList.add('active-modal')
}

modelBtns.forEach((modelBtn, i) =>{
    modelBtn.addEventListener('click', () =>{
        modal(i)
    })
})

modelCloses.forEach((modelClose) =>{
    modelClose.addEventListener('click', () =>{
        modelViews.forEach((modelView) =>{
            modelView.classList.remove('active-modal')
        })
    })
})

/*==================== PORTFOLIO SWIPER  ====================*/
let swiperPortfolio = new Swiper(".portfolio__container", {
    cssMode: true,
    loop: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    autoplay:{
        delay: 4000,
        disableOnInteraction: false
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});

/*==================== TESTIMONIAL ====================*/
let swiperTestimonial = new Swiper(".testimonial__container", {
    grabCursor: true,
    loop: true,
    spaceBetween: 48,
    autoplay:{
        delay: 4000,
        disableOnInteraction: false
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
    },
    breakpoints:{
        568:{
            slidesPerView: 2,
        }
    }
});

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/


/*==================== CHANGE BACKGROUND HEADER ====================*/ 


/*==================== SHOW SCROLL UP ====================*/ 


/*==================== DARK LIGHT THEME ====================*/ 