//-------------
// DOM Elements
//-------------
const navbarElmt = document.querySelector('.navbar') as HTMLElement
const navbarHamburgerIconElmt = document.querySelector(
  '.navbar__hamburgerIcon'
) as HTMLDivElement

const signupBtnElmt = document.querySelectorAll(
  '.heroSection__signupBtn'
) as NodeListOf<HTMLButtonElement>

const formModalElmt = document.querySelector(
  '.formModal__overlay'
) as HTMLDivElement
const formModalCloseBtnElmt = document.querySelector(
  '.formModal__closeBtn'
) as HTMLSpanElement

const formElmt = document.querySelector('.form') as HTMLFormElement

const formConfirmationElmt = document.querySelector(
  '.formConfirmation'
) as HTMLDivElement
const formConfirmationCloseBtn = document.querySelector(
  '.formConfirmation__closeBtn'
) as HTMLButtonElement

//----------
// Functions
//----------

// Function that makes an element inactive by keeping only the base class (the first one) in the class list.
const closeElmt = (Elmt: HTMLElement) => {
  Elmt.className = `${Elmt.classList[0]}`
}
// Function that makes an element active by adding the base class followed by "--active" in the class list.
const openElmt = (Elmt: HTMLElement) => {
  Elmt.className += ` ${Elmt.classList[0]}--active`
}
// Function that toggles between active and inactive states.
const toggleElmt = (Elmt: HTMLElement) => {
  Elmt.className === `${Elmt.classList[0]}` ? openElmt(Elmt) : closeElmt(Elmt)
}

// Function that makes an element in error state by adding the base class followed by "--wrong" in the class list.
const setInputToWrong = (input: HTMLInputElement, option: boolean) => {
  option
    ? (input.className += ` ${input.classList[0]}--wrong`)
    : (input.className = `${input.classList[0]}`)
}

// Function that tests the value of a form data according to its key. It returns : the validity of the value and the error message if any.
const isInputValid: (
  key: string,
  value: FormDataEntryValue
) => { validity: boolean; errorMessage: string } = (key, value) => {
  let validity: boolean
  let errorMessage: string
  switch (key) {
    case 'first':
      validity = /[a-z]{2,}/gi.test(value.toString())
      errorMessage =
        'Veuillez entrer 2 caractères ou plus pour le champ du nom.'
      break
    case 'last':
      validity = /[a-z]{2,}/gi.test(value.toString())
      errorMessage =
        'Veuillez entrer 2 caractères ou plus pour le champ du nom.'
      break
    case 'email':
      validity = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(value.toString())
      errorMessage = 'Veuillez entrer une adresse mail valide.'
      break
    case 'birthdate':
      value.toString() === '' ? (validity = false) : (validity = true)
      errorMessage = 'Vous devez entrer votre date de naissance.'
      break
    case 'quantity':
      validity = /\b([0-9]|[1-9][0-9])\b/g.test(value.toString())
      errorMessage = 'Veuillez entrer un nombre de participations.'
      break
    case 'location':
      value.toString() === '' ? (validity = false) : (validity = true)
      errorMessage = 'Vous devez choisir une option.'
      break
    case 'agreement':
      value.toString() === 'on' ? (validity = true) : (validity = false)
      errorMessage =
        'Vous devez vérifier que vous acceptez les termes et conditions.'
      break
    case 'newsletter':
      validity = true
      errorMessage = ''
      break

    default:
      validity = false
      errorMessage = ''
      break
  }

  return { validity: validity, errorMessage: errorMessage }
}

// Function that gets all the data from the form, checks their validity and submits the form if everything is valid
const submitForm = (event: SubmitEvent) => {
  let formData = new FormData(formElmt)
  let formValidity = true
  const formInputKeys = [
    'first',
    'last',
    'email',
    'birthdate',
    'quantity',
    'location',
    'agreement',
    'newsletter',
  ]

  event.preventDefault()

  formInputKeys.forEach((key) => {
    !formData.has(key) && formData.append(key, '')
  })

  console.log(formData)

  for (const [key, value] of formData.entries()) {
    if (key === 'newsletter') continue

    const currentInputElem = document.querySelector(
      `input[name=${key}]`
    ) as HTMLInputElement

    const currentErrorElem = currentInputElem.parentElement?.querySelector(
      'span[class*="form__errorMessage"]'
    ) as HTMLSpanElement

    setInputToWrong(currentInputElem, false)
    closeElmt(currentErrorElem)
    currentErrorElem.innerText = ''

    if (!isInputValid(key, value).validity) {
      formValidity = false
      setInputToWrong(currentInputElem, true)
      openElmt(currentErrorElem)
      currentErrorElem.innerText = isInputValid(key, value).errorMessage
    }
  }

  formValidity && toggleElmt(formConfirmationElmt)
}

//----------------
// Event Listeners
//----------------

// Open the navbar with the hamburger icon.
navbarHamburgerIconElmt.addEventListener('click', () => toggleElmt(navbarElmt))

// Open the form modal with the sign up button
signupBtnElmt.forEach((btn) =>
  btn.addEventListener('click', () => openElmt(formModalElmt))
)

// Close the form modal with the close buttons
formModalCloseBtnElmt.addEventListener('click', () => {
  closeElmt(formModalElmt)
  closeElmt(formConfirmationElmt)
})
formConfirmationCloseBtn.addEventListener('click', () => {
  closeElmt(formModalElmt)
  closeElmt(formConfirmationElmt)
})

// Adds the submit action to the form
formElmt.addEventListener('submit', submitForm)
