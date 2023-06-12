const dayInput = document.querySelector('#dayInput');
const monthInput = document.querySelector('#monthInput');
const yearInput = document.querySelector('#yearInput');
const calBtn = document.querySelector('.calBtn');

calBtn.addEventListener('click', executeCal);

function getValue(type) {
  switch (type) {
    case 'day':
      return dayInput.value;
    case 'month':
      return monthInput.value;
    case 'year':
      return yearInput.value;
    default:
      return undefined;
  }
}

function executeCal() {
  console.log(getValue('day'));
}



