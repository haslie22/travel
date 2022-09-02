//Burger handler 
(function () {
    const overlay = document.querySelector('.js-overlay');
    const burgerIcon = document.querySelector('.burger');
    const menu = document.querySelector('.header__nav');
    const closeIcon = document.querySelector('.header__nav-close');
    const menuLinksParent = document.querySelector('.header__list')
    const body = document.querySelector('body');

    function handleBurger() {
        menu.classList.toggle('header__nav_active');
        overlay.classList.toggle('js-overlay_active');
        body.classList.toggle('stop-scrolling');
    }
    
    burgerIcon.addEventListener('click', handleBurger);
    closeIcon.addEventListener('click', handleBurger);
    menuLinksParent.addEventListener('click', handleBurger, false);
    document.body.addEventListener('click', (event) => {
        if (event.target.classList.contains('js-overlay_active')) handleBurger()
    });
}());

//Adjust slider pagination for mobiles
 (function () {
     const firstDot = document.querySelector('#slide-0');
     const secondDot = document.querySelector('#slide-1');

    function changeActiveDotOnScreenSize() {
        if (window.innerWidth <= 390) {
            firstDot.click();
        }
        if (window.innerWidth > 390) {
            secondDot.click();
        }
    }
    
    window.addEventListener('resize', changeActiveDotOnScreenSize);
    changeActiveDotOnScreenSize();
}());

//Replace long paragraphs with shorter ones on mobiles  
function changeText() {
    const storiesDescriptionParagraphs = document.querySelectorAll('.stories__description');

    if (window.innerWidth <= 390) {
        for (let i = 0; i < storiesDescriptionParagraphs.length; i++) {
            let shortText = document.createElement('p');
            shortText.className = 'stories__description';
            shortText.innerHTML = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla.Lorem ipsum dolor sit a... ';
            storiesDescriptionParagraphs[i].replaceWith(shortText);
        }   
    }
    
    if (window.innerWidth > 390) {
        for (let i = 0; i < storiesDescriptionParagraphs.length; i++) {
            let fullText = document.createElement('p');
            fullText.className = 'stories__description';
            fullText.innerHTML = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit... ';
            storiesDescriptionParagraphs[i].replaceWith(fullText);
        }
    }
}

window.addEventListener('resize', changeText);
changeText();

//Popup handler
(function () {
    const popupOverlay = document.querySelector('.js-overlay-popup');
    const popupLogin = document.querySelector('.popup');
    const loginButton = document.querySelector('.header__button');
    const accountButton = document.querySelector('.header__item-account');
    const body = document.querySelector('body');
    const signInButton = document.querySelector('.popup__input-submit');
    const itemsToHide = ['.facebook-button', '.google-button', '.popup__divider', '.popup__forgot'];
    const switchToLogin = {
        '.popup__title-text': 'Log in to your account',
        '.popup__input-submit': 'Sign In',
        '.popup__footer-text': 'Don\'t have an account?',
        '.popup__footer-link': 'Register',
    };
    const switchToSignUp = {
        '.popup__title-text': 'Create account',
        '.popup__input-submit': 'Sign Up',
        '.popup__footer-text': 'Already have an account?',
        '.popup__footer-link': 'Log in',
    };

    function handlePopup(){
        popupLogin.classList.toggle('popup_active');
        popupOverlay.classList.toggle('js-overlay-popup_active');
        body.classList.toggle('stop-scrolling');
    }

    // Change login/register popup content
    function changePopup() {
        let switchTo = switchToSignUp;

        for (let item of itemsToHide) document.querySelector(item).classList.toggle('js-hide');

        if (!document.querySelector('.facebook-button').classList.contains('js-hide')) switchTo = switchToLogin;
        for (let element in switchTo) {
            let item = document.querySelector(element);
            item.textContent = switchTo[element];
        }
    }

    loginButton.addEventListener('click', handlePopup);
    accountButton.addEventListener('click', handlePopup);
    document.body.addEventListener('click', (event) => {
        if (event.target.classList.contains('js-overlay-popup_active')) handlePopup()
    });
    document.querySelector('.popup__footer-link').addEventListener('click', changePopup);

    //Input data alert
    document.querySelector('.popup__input-form').onsubmit = function () {
        alert(`Your e-mail: ${this['email'].value}\nYour password: ${this['password'].value}`);
        handlePopup();
    }
}());

//Slider handler
function getSliderPosition() {
    let slidesList = document.getElementsByName('slider-item');

    for (let i = 0; i < slidesList.length; i++) {
        if (slidesList[i].checked) return i;
    }
}

function desktopSliderHandler(event) {
    let slideNumber = +event.target.getAttribute('alt').at(-1);
    let sliderPosition = getSliderPosition();

    if (slideNumber === sliderPosition) return;
    if (slideNumber < sliderPosition) SliderHandler('left');
    else SliderHandler('right');
}

function SliderHandler(side) {
    let sliderPosition = getSliderPosition();
    let slidesList = document.getElementsByName('slider-item');

    if (side === 'right') sliderPosition++;
    else sliderPosition--;
    
    if (sliderPosition >= 0 && sliderPosition <= slidesList.length - 1) {
        document.getElementById(`slide-${sliderPosition}`).click();
    }
}

function darkenSliderArrows() {
    switch (getSliderPosition()) {
        case 0:
            document.querySelector('.arrow-left').style.opacity = '0.5';
            document.querySelector('.arrow-right').style.opacity = '1';
            break;
        case 1:
            document.querySelector('.arrow-left').style.opacity = '1';
            document.querySelector('.arrow-right').style.opacity = '1';
            break;
        case 2:
            document.querySelector('.arrow-left').style.opacity = '1';
            document.querySelector('.arrow-right').style.opacity = '0.5';
            break;
    }
}

function swapSlides(e) {
    let gallery = document.querySelector('.destinations__banner-gallery');
    gallery.classList.remove("slide-0_active", "slide-1_active", "slide-2_active");
    gallery.classList.add(`${e.target.id}_active`);
    darkenSliderArrows();
}

document.querySelector('.arrow-left').addEventListener('click', () => SliderHandler('left'));
document.querySelector('.arrow-right').addEventListener('click', () => SliderHandler('right'));
document.getElementsByName('slider-item').forEach((el) => el.addEventListener('click', swapSlides));
darkenSliderArrows();
for (let image of document.querySelectorAll('.banner__content img[src*="desk"]')) {
    image.addEventListener('click', desktopSliderHandler);
}