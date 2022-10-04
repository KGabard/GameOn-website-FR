"use strict";
// let navbar = document.getElementById('navbar')
// let hamburgerIcon = document.getElementById('navbar__hamburgerIcon')
// let toggleNav = () => {
//   navbar.className === 'navbar'
//     ? (navbar.className += ` navbar--active`)
//     : (navbar.className = 'navbar')
// }
// hamburgerIcon.addEventListener('click', toggleNav)
// // DOM Elements
// const modalbg = document.querySelector('.formModal__overlay')
// const modalBtn = document.querySelectorAll('.modal-btn')
// const form__data = document.querySelectorAll('.form__data')
// // launch modal event
// modalBtn.forEach((btn) => btn.addEventListener('click', launchModal))
// // launch modal form
// function launchModal() {
//   modalbg.style.display = 'block'
// }
// DOM Elements
// const formModal = document.querySelector('.formModal__overlay')
// const signupBtn = document.querySelectorAll('heroSection__signupBtn')
// const toggleModalForm = () => {
//   const label = 'formModal__overlay'
//   formModal.className === `${label}`
//     ? (formModal.className += ` ${label}--active`)
//     : (formModal.className = `${label}`)
// }
// DOM Elements
const navbar = document.querySelector('.navbar');
const navbar__hamburgerIcon = document.querySelector('.navbar__hamburgerIcon');
const formModal = document.querySelector('.formModal__overlay');
const formModal__closeBtn = document.querySelector('.formModal__closeBtn');
const signupBtn = document.querySelectorAll('.heroSection__signupBtn');
const form = document.querySelector('.form');
// let formInput__firstName = document.querySelector(
//   "input[name='first']"
// ) as HTMLInputElement
// let formInput__lastName = document.querySelector(
//   "input[name='last']"
// ) as HTMLInputElement
// let formInput__email = document.querySelector(
//   "input[name='email']"
// ) as HTMLInputElement
// let formInput__birthdate = document.querySelector(
//   "input[name='birthdate']"
// ) as HTMLInputElement
// let formInput__quantity = document.querySelector(
//   "input[name='quantity']"
// ) as HTMLInputElement
// let formInput__location = document.querySelectorAll(
//   "input[name='location']"
// ) as NodeListOf<HTMLInputElement>
// let formData : {
//   firstName: string,
//   lastName: string,
//   email: string,
//   birthdate: string,
//   quantity: number,
//   location: string,
// }
// let formData = {
//   first: '',
//   last: '',
//   email: '',
//   birthdate: '',
//   quantity: '',
//   location: '',
//   agreement: '',
//   newsletter: '',
// }
const formInputKeys = [
    'first',
    'last',
    'email',
    'birthdate',
    'quantity',
    'location',
    'agreement',
    'newsletter',
];
const isInputValid = (key, value) => {
    let validity;
    let errorMessage;
    switch (key) {
        case 'first':
            validity = /[a-z]{2,}/gi.test(value.toString());
            errorMessage =
                'Veuillez entrer 2 caractères ou plus pour le champ du nom.';
            break;
        case 'last':
            validity = /[a-z]{2,}/gi.test(value.toString());
            errorMessage =
                'Veuillez entrer 2 caractères ou plus pour le champ du nom.';
            break;
        case 'email':
            validity = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(value.toString());
            errorMessage = 'Veuillez entrer une adresse mail valide.';
            break;
        case 'birthdate':
            value.toString() === '' ? (validity = false) : (validity = true);
            errorMessage = 'Vous devez entrer votre date de naissance.';
            break;
        case 'quantity':
            validity = /\b([0-9]|[1-9][0-9])\b/g.test(value.toString());
            errorMessage = 'Veuillez entrer un nombre de participations.';
            break;
        case 'location':
            value.toString() === '' ? (validity = false) : (validity = true);
            errorMessage = 'Vous devez choisir une option.';
            break;
        case 'agreement':
            value.toString() === '' ? (validity = false) : (validity = true);
            errorMessage =
                'Vous devez vérifier que vous acceptez les termes et conditions.';
            break;
        default:
            validity = false;
            errorMessage = '';
            break;
    }
    return { validity: validity, errorMessage: errorMessage };
};
const submitForm = (event) => {
    var _a;
    event.preventDefault();
    console.log('submitted');
    console.log(event);
    let formData = new FormData(form);
    formInputKeys.forEach((key) => {
        !formData.has(key) && formData.append(key, '');
    });
    for (const [key, value] of formData.entries()) {
        const currentInputElem = document.querySelector(`input[name=${key}]`);
        // const currentChildren = currentInputElem.parentNode
        //   ?.childNodes as NodeListOf<HTMLElement>
        // let currentErrorElem: HTMLSpanElement
        // currentChildren.forEach((child) => {
        //   if (child.classList) {
        //     console.log(child.classList)
        //     if (child.classList.contains('form__errorMessage'))
        //       currentErrorElem = child
        //   }
        // })
        const currentErrorElem = (_a = currentInputElem.parentElement) === null || _a === void 0 ? void 0 : _a.querySelector('span[class="form__errorMessage"]');
        setInputToWrong(currentInputElem, false);
        currentErrorElem.innerText = '';
        if (!isInputValid(key, value).validity) {
            setInputToWrong(currentInputElem, true);
            currentErrorElem.innerText = isInputValid(key, value).errorMessage;
        }
    }
};
form.addEventListener('submit', submitForm);
const toggleModal = (modal) => {
    modal.className === `${modal.classList[0]}`
        ? (modal.className += ` ${modal.classList[0]}--active`)
        : (modal.className = `${modal.classList[0]}`);
};
const setInputToWrong = (input, option) => {
    option
        ? (input.className += ` ${input.classList[0]}--wrong`)
        : (input.className = `${input.classList[0]}`);
};
navbar__hamburgerIcon.addEventListener('click', () => toggleModal(navbar));
signupBtn.forEach((btn) => btn.addEventListener('click', () => toggleModal(formModal)));
formModal__closeBtn.addEventListener('click', () => toggleModal(formModal));
