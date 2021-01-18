/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */

const sectionObj = {
    sectionList: document.querySelectorAll('section'),
    activeSection: "section1",
    activeBefore: "section1",
    stateChange: false,
    setStateChange(value) {
        this.stateChange = value;
    },
    setActive(name) {
        this.activeBefore = this.activeSection;
        this.activeSection = name;
    },
    getActive() {
        return this.activeSection;
    },
    getActiveBefore() {
        return this.activeBefore;
    }
};

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

const setAttributes = (el, attrs) => {
    for (let key in attrs) {
        el.setAttribute(key, attrs[key]);
    }
};

const setVisible = element => document.querySelector(`#${element}`).style.display = "block";

const setInVisible = element => document.querySelector(`#${element}`).style.display = "none";

const createBtn = (parentSelector, position, attrs, text)=> {
    let btn = document.createElement('button');
    btn.textContent = text;
    setAttributes(btn, attrs);
    document.querySelector(parentSelector).insertAdjacentHTML(position, btn.outerHTML);
}

/**
 * @param dasder
 */


/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav

const generateNavi = () => {
    let fragment = document.createDocumentFragment();

    for (let section of sectionObj.sectionList) {
        const listItem = document.createElement('li');
        const newLink = document.createElement('a');
        listItem.setAttribute('class', `first-level-navi`);
        setAttributes(newLink, {'class': 'menu__link', 'data-link': `#${section.id}`})
        newLink.textContent = `${section.attributes['data-nav'].textContent}`;
        listItem.appendChild(newLink);
        fragment.appendChild(listItem);
    }
    document.getElementById('navbar__list'). appendChild(fragment)
}

document.addEventListener('DOMContentLoaded', () => generateNavi());

// Add class 'active' to section when near top of viewport

const setSectionActive = () => {
    for (let section of sectionObj.sectionList) {
        if (section.getBoundingClientRect().y > 50 || section.getBoundingClientRect().y < -50 || section.id === sectionObj.getActive()) {
            continue;
        }
        sectionObj.setActive(section.id);
        sectionObj.setStateChange(true);
    }

    if (sectionObj.stateChange) {
        setTimeout( () => {
            document.querySelector(`#${sectionObj.getActiveBefore()}`).classList.remove('active-class');
            document.querySelector(`#${sectionObj.getActive()}`).classList.add("active-class");
            sectionObj.setStateChange(false);
        }, 0);
    }
}

document.addEventListener('scroll', setSectionActive);

// Scroll to section on navi link click

document.querySelector('#navbar__list').addEventListener('click', evt => {
    if (evt.target.nodeName === 'A') {
        let el = document.querySelector(evt.target.attributes['data-link'].textContent);
        scrollTo(el.offsetLeft, el.offsetTop)
        evt.preventDefault();
    }
});

// Scroll to top onclick to button

createBtn('main', 'beforeend', {'onclick': 'scrollToTop()', 'class': 'btn', 'id': 'scrollUpBtn'}, 'scroll to top')
const scrollToTop = () => document.documentElement.scrollIntoView();

// Toggle section onclick to button

for (let section of sectionObj.sectionList) {
    createBtn(`#${section.id} .landing__container`, 'afterbegin', {'onclick': 'scrollToTop()', 'data-btn': section.id ,'class': 'btn', 'id': 'toggleBtn'}, `toggle ${section.id}`)
}

// change visibility of navbar and scroll button

document.addEventListener('scroll', e => {
    setTimeout(() => {
        if (document.documentElement.scrollTop < 20) {
            setInVisible('scrollUpBtn');
            setVisible('navbar__list');
        } else {
            setVisible('scrollUpBtn');
            setInVisible('navbar__list');
        }
    }, 0);
});

