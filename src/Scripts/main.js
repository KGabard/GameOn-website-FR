let navbar = document.getElementById('navbar')
let hamburgerIcon = document.getElementById('navbar__hamburgerIcon')

let toggleNav = () => {
  console.log('ok')
  navbar.className === 'navbar'
    ? (navbar.className += ` navbar--active`)
    : (navbar.className = 'navbar')
}

hamburgerIcon.addEventListener('click', toggleNav)

// DOM Elements
const modalbg = document.querySelector('.bground')
const modalBtn = document.querySelectorAll('.modal-btn')
const formData = document.querySelectorAll('.formData')

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener('click', launchModal))

// launch modal form
function launchModal() {
  modalbg.style.display = 'block'
}
