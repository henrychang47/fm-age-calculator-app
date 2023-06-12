const form = document.querySelector('form');
const dayInput = document.querySelector('#dayInput');
const monthInput = document.querySelector('#monthInput');
const yearInput = document.querySelector('#yearInput');
const calBtn = document.querySelector('.calBtn');
const yearNum = document.querySelector('#yearNum');
const monthNum = document.querySelector('#monthNum');
const dayNum = document.querySelector('#dayNum');
const errorMsgs = document.querySelectorAll('.errorMsg');

calBtn.addEventListener('click', executeCal);

function getValue() {
  return {
    'day': dayInput.value,
    'month': monthInput.value,
    'year': yearInput.value,
  }
}

function setDate({ year, month, day }) {
  yearNum.innerText = year;
  monthNum.innerText = month;
  dayNum.innerText = day;
}

function executeCal() {
  checkInputs();
}

function checkInputs() {
  clearInvalid();

  let values = getValue();
  let validInput = true;

  Object.keys(values).forEach(key => {
    if (values[key] === '') {
      displayErrorMsg(key, 'empty');
      validInput = false;
      values[key] = 1;
    }
  })

  let day = Number(values.day);
  let month = Number(values.month);
  let year = Number(values.year);

  if (isNaN(day) || day < 1 || day > 31) {
    displayErrorMsg('day', 'invalid');
    validInput = false;
  }
  if (isNaN(month) || month < 1 || month > 12) {
    displayErrorMsg('month', 'invalid');
    validInput = false;
  }
  if (isNaN(year) || year < 1) {
    displayErrorMsg('year', 'invalid');
    validInput = false;
  }

  return validInput;
}

function displayInvalid() {
  form.classList.add('invalid');
}

function clearInvalid() {
  form.classList.remove('invalid');
  errorMsgs.forEach(msg => msg.innerText = '');
}

function displayErrorMsg(target, errorType) {
  displayInvalid();

  const errorMsg = {
    'empty': 'This field is required',
    'invalid': `Must be a valid ${target}`
  }

  const targetIndex = {
    'day': 0,
    'month': 1,
    'year': 2
  }[target];

  errorMsgs[targetIndex].classList.add('display');
  errorMsgs[targetIndex].innerText = errorMsg[errorType];
}
