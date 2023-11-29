const cardNumber = document.querySelector("#cardNumber");
const cardName = document.querySelector("#cardName");
const cardMonth = document.querySelector("#cardMonth");
const cardYear = document.querySelector("#cardYear");
const cardCvc = document.querySelector("#cardCvc");

const nameError = document.querySelector("#nameError");
const numberError = document.querySelector("#numberError");
const monthYearError = document.querySelector("#monthYearError");
const cvcError = document.querySelector("#cvcError");

const inputName = document.querySelector("#inputName");
const inputNumber = document.querySelector("#inputNumber");
const inputMonth = document.querySelector("#inputMonth");
const inputYear = document.querySelector("#inputYear");
const inputCvc = document.querySelector("#inputCvc");

const submitButton = document.querySelector("#submitButton");
const formBox = document.querySelector("#formBox");
const added = document.querySelector("#added");
const addedBtn = document.querySelector("#addedBtn");

const defaultNumber = "0000 0000 0000 0000";
const defaultName = "JANE APPLESEED";
const defaultMonthYear = "00";
const defaultCvc = "000";

let validateInputs = true;

const formError = document.querySelectorAll(".form__error");

inputName.addEventListener("input", () => {
  showCardDetails(cardName, inputName, defaultName, nameError);
});
inputNumber.addEventListener("input", () => {
  //inputNumber.value = formatNumber(inputNumber.value);
  showCardDetails(cardNumber, inputNumber, defaultNumber, numberError);
});
inputMonth.addEventListener("input", () => {
  showCardDetails(cardMonth, inputMonth, defaultMonthYear, monthYearError);
});
inputYear.addEventListener("input", () => {
  showCardDetails(cardYear, inputYear, defaultMonthYear, monthYearError);
});
inputCvc.addEventListener("input", () => {
  showCardDetails(cardCvc, inputCvc, defaultCvc, cvcError);
});

submitButton.addEventListener("click", () => {
  addErrorMessage(inputName, nameError);
  errorNumber(inputNumber, numberError);
  errorMonth(inputMonth, monthYearError);
  addErrorMessage(inputYear, monthYearError);
  addErrorMessage(inputCvc, cvcError);

  formError.forEach((element) => {
    if (element.hasAttribute("style")) validateInputs = false;
  });

  if (validateInputs) {
    formBox.classList.toggle("hide");
    added.classList.toggle("hide");
  }
  validateInputs = true;
});
addedBtn.addEventListener("click", () => {
  location.reload();
});

function addErrorMessage(inputTag, inputError) {
  if (!inputTag.value) {
    inputError.innerText = "Can't be blank!";
    inputTag.classList.add("form__input--error");
    inputError.style.display = "block";
  }
}

function errorMonth(inputTag, inputError) {
  if (!inputTag.value) {
    inputError.innerText = "Can't be blank!";
    inputTag.classList.add("form__input--error");
    inputError.style.display = "block";
  } else if (inputTag.value > 12 || inputTag.value < 1) {
    inputError.innerText = "Must be between 1 and 12";
    inputTag.classList.add("form__input--error");
    inputError.style.display = "block";
  }
  if (
    inputTag.value < 10 &&
    inputTag.value > 0 &&
    inputTag.value !== "" &&
    !inputTag.value.includes("0")
  ) {
    inputTag.value = "0" + inputTag.value;
    cardMonth.innerText = inputTag.value;
  }
}
function errorNumber(inputTag, inputError) {
  if (!inputTag.value) {
    inputError.innerText = "Can't be blank!";
    inputTag.classList.add("form__input--error");
    inputError.style.display = "block";
  } else if (inputTag.value.length !== 19) {
    inputError.innerText = "Card number must have 16 characters";
    inputTag.classList.add("form__input--error");
    inputError.style.display = "block";
  }
}

function showCardDetails(cardSection, cardInput, cardDefault, inputError) {
  cardInput.classList.remove("form__input--error");
  inputError.removeAttribute("style");
  cardSection.innerText = cardInput.value;
  if (!cardInput.value) {
    cardSection.innerText = cardDefault;
  }
}

function checkCvc(id) {
  let element = document.querySelector(`#${id}`);
  element.value = element.value.replace(/[^0-9]/g, "");
}

function checkNumber(id) {
  let element = document.querySelector(`#${id}`);
  element.value = element.value.replace(/[^0-9]/g, "");
  element.value = element.value.split("").reduce((seed, next, index) => {
    if (index !== 0 && !(index % 4)) seed += " ";
    return seed + next;
  }, "");
}

// const formatNumber = (number) => {
//   number = number.replace(/[^0-9]/g, "");
//   return number.split("").reduce((seed, next, index) => {
//     if (index !== 0 && !(index % 4)) seed += " ";
//     return seed + next;
//   }, "");
// };
