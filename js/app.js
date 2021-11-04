//NAVBAR
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click',()=> {
        nav.classList.toggle('nav-active');

        navLinks.forEach((link, index) => {
            if(link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 5 + 0.5}s`;
            }
        });  
        
        burger.classList.toggle('toggle');

        if(nav.classList.contains('nav-active')) {
            document.querySelector('.heading-primary--main').style.animation = `hide 0.5s ease forwards`;
            document.querySelector('.heading-primary--sub').style.animation = `hide 0.5s ease forwards`;
        } else {
            document.querySelector('.heading-primary--main').style.animation = '';
            document.querySelector('.heading-primary--sub').style.animation = '';
        }
    });
}

navSlide();

//CAROUSEL
var carouselIndex = 0;
showPictures();

function showPictures() {
    var i;
    var carousel = document.getElementsByClassName('carousel');
    for(i=0; i<carousel.length; i++) {
        carousel[i].style.display = "none";
    }

    carouselIndex++;

    if(carouselIndex > carousel.length) {carouselIndex = 1}
    carousel[carouselIndex-1].style.display = "block";
    carousel[carouselIndex-1].style.animation = `slideshow 2s`;
    setTimeout(showPictures, 5000);
}



//SCROLLED BAR
window.addEventListener('scroll', function () {
    let navbar = document.querySelector('nav');
    let windowPosition = window.scrollY > 145;
    navbar.classList.toggle('scrolling-active', windowPosition);
})



//OBSERVER (ANIMATIONS)
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.intersectionRatio > 0) {
            modify(entry.target);
        }
    })
})

function modify(el) {

    if(el.className === 'carousel-container') {
        el.style.animation = `showFromLeft 2s ease-out forwards`;
    }

    if(el.className === 'carousel__text') {
        el.style.animation = `showFromRight 2s ease-out forwards`;
    }

    if(el.className === 'mountain__text') {
        el.style.animation = `show 2s ease forwards`;
    }

    if(el.className === 'row__packages') {
        el.style.animation = `showUp 1.5s ease-in forwards`;
    }

    if(el.className === 'journey-animation') {
        el.style.animation = `showFromLeft 2s ease forwards`;
    }

    if(el.className === 'journey__text') {
        el.style.animation = `showFromRight 2s ease-out forwards`;
    }
}

observer.observe(document.querySelector('.carousel-container'));
observer.observe(document.querySelector('.carousel__text'));
observer.observe(document.querySelector('.mountain__text'));
observer.observe(document.querySelector('.row__packages'));
observer.observe(document.querySelector('.journey-animation'));
observer.observe(document.querySelector('.journey__text'));