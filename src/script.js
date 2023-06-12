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

function setDate([year, month, day]) {
  if (isNaN(year)) {
    yearNum.innerText = '--';
    monthNum.innerText = '--';
    dayNum.innerText = '--';
    return;
  }
  let [currentYear, currentMonth, currentDay] = [0, 0, 0];

  const yearTimer = setInterval(() => {
    if (currentYear === year) clearInterval(yearTimer);
    yearNum.innerText = currentYear++;
  }, 1000 / year);

  const monthTimer = setInterval(() => {
    if (currentMonth === month) clearInterval(monthTimer);
    monthNum.innerText = currentMonth++;
  }, 800 / month);

  const dayTimer = setInterval(() => {
    if (currentDay === day) clearInterval(dayTimer);
    dayNum.innerText = currentDay++;
  }, 800 / day);
}

function executeCal() {
  if (checkInputs()) {
    setDate(calculateAge(getValue()));
  } else {
    setDate(['--', '--', '--']);
  }
}

function calculateAge({ day, month, year }) {
  const birthday = new Date(year, month - 1, day);
  const today = new Date();
  const ageInSecond = Math.floor((today - birthday) / 1000);
  const ageInDay = Math.floor(ageInSecond / 86400);
  const ageOfYear = Math.floor(ageInDay / 365);
  const ageOfMonth = Math.floor(ageInDay / 30.437 % 12);
  const ageOfDay = Math.floor(ageInDay % 30.437);

  return [ageOfYear, ageOfMonth, ageOfDay];
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

  if (new Date() < new Date(values.year, values.month - 1, values.day)) {
    displayInvalid();
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
