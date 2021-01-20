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

/**
 * @description Represents the sections
 * @param {boolean} a boolean value - indicates a stateChange of the Object
 * @param {string} sectionName - the css selector of the currently active section
 */

const sectionObj = {
    sectionList: document.querySelectorAll('section'),
    activeSection: "section1",
    activeBefore: "section1",
    stateChange: false,
    setStateChange(value) {
        this.stateChange = value;
    },
    setActive(sectionName) {
        this.activeBefore = this.activeSection;
        this.activeSection = sectionName;
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

/**
 * @description Sets multiple attributes for an element
 * @param {object} element - The element that shell get the new attributes
 * @param {object} attributes - An object with the attribute as a key and its value
 */

const setAttributes = (el, attrs) => {
    for (let key in attrs) {
        el.setAttribute(key, attrs[key]);
    }
};

/**
 * @description Helper functions to set elements visible or invisible
 * @param {object} element - The element whos style display changes
 * */
const setVisible = element => document.querySelector(`#${element}`).classList.remove("invisible-class");
const setInVisible = element => document.querySelector(`#${element}`).classList.add("invisible-class");

/**
 * @description Helper functions to create buttons
 * @param {string} parentSelector - A string with the css selector
 * @param {string} position - A string that holds information about the position of the button
 * @param {object} attrs - An object with attributes as key and there values for the button
 * @param {string} text - The buttons text
 * */
const createBtn = (parentSelector, position, attrs, text) => {
    let btn = document.createElement('button');
    btn.textContent = text;
    setAttributes(btn, attrs);
    document.querySelector(parentSelector).insertAdjacentHTML(position, btn.outerHTML);
}

/**
 * End Helper Functions

 * Begin Main Functions
 *
 */

/**
 * @description Creates a nav bar on DOMContentLoaded
 * */

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
    document.getElementById('navbar__list').appendChild(fragment);
}

document.addEventListener('DOMContentLoaded', () => generateNavi());

/**
 * @description Adds class 'active' on scroll
 * */

const setSectionActive = () => {
    for (let section of sectionObj.sectionList) {
        if (section.getBoundingClientRect().y > 50 || section.getBoundingClientRect().y < -50 || section.id === sectionObj.getActive()) {
            continue;
        }
        sectionObj.setActive(section.id);
        sectionObj.setStateChange(true);
    }

    if (sectionObj.stateChange) {
        setTimeout(() => {
            document.querySelector(`#${sectionObj.getActiveBefore()}`).classList.remove('active-class');
            document.querySelector(`a[data-link="#${sectionObj.getActiveBefore()}"]`).classList.remove('active-class');
            document.querySelector(`#${sectionObj.getActive()}`).classList.add("active-class");
            document.querySelector(`a[data-link="#${sectionObj.getActive()}"]`).classList.add("active-class");
            sectionObj.setStateChange(false);
        }, 0);
    }
}

document.addEventListener('scroll', setSectionActive);

/**
 * @description Adds a click event to the nav bar`s items
 * */

document.querySelector('#navbar__list').addEventListener('click', evt => {
    if (evt.target.nodeName === 'A') {
        let el = document.querySelector(evt.target.attributes['data-link'].textContent);
        el.scrollIntoView();
        evt.preventDefault();
    }
});

/**
 * @description Click to button handler
 * */

const btnClick = evt => {
    if (evt.target.nodeName === 'BUTTON') {
        if (evt.target.id === 'scrollUpBtn') {
            document.documentElement.scrollIntoView();
        } else {
            let el = document.querySelector(`#${evt.target.attributes['data-btn'].textContent}`);
            el.classList.toggle('invisible-class');
            evt.preventDefault();
        }
    }
}

document.querySelector(`main`).addEventListener('click', btnClick);

/**
 * @description Creates a scroll to button
 * */

createBtn('main', 'beforeend', {'class': 'btn', 'id': 'scrollUpBtn'}, 'scroll to top');

/**
 * @description Creates a toggle section button
 * */

for (let section of sectionObj.sectionList) {
    createBtn(`#${section.id}`, 'beforebegin', {
        'data-btn': section.id,
        'class': 'btn',
        'id': 'toggleBtn'
    }, `toggle ${section.id}`);
}

/**
 * @description Changes the visibility of the navbar and scrollUpButton on scroll
 * */

document.addEventListener('scroll', e => {
    setVisible('navbar__list');
    setTimeout(() => {
        if (document.documentElement.scrollTop < 20) {
            setInVisible('scrollUpBtn');
        } else {
            setVisible('scrollUpBtn');
        }
    }, 0);
    setTimeout(() => {
        if (document.documentElement.scrollTop > 20) {
            setInVisible('navbar__list');
        }
    }, 1000);
});

/**
 * End Main Functions
 * */
