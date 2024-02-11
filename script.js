const themesToggleElm = document.querySelector('.themes__toggle');
const keysElements = document.querySelectorAll('.calc__key');

const toggleDarkTheme = () => themesToggleElm.classList.toggle('themes__toggle--isActive');
const toggleDarkThemeByEnter = (event) => event.key === 'Enter' && themesToggleElm.classList.toggle('themes__toggle--isActive');

themesToggleElm.addEventListener('click', toggleDarkTheme);
themesToggleElm.addEventListener('keydown', toggleDarkThemeByEnter);
const result = document.querySelector('.calc__result');

let currentNum = '';
let storedNum = '';
let operation = '';

const updateScreen = (value) => {
  result.textContent = !value ? '0' : value;
};

const numberButtonHandler = (value) => {
  if (value === '.' && currentNum.includes('.')) return;
  if (value === '0' && !currentNum) return;
  // if the user entered num after the operation is finished it will start new calculation
  if (!currentNum && !operation && storedNum) storedNum = '';
  currentNum += value;
  updateScreen(currentNum);
};

const resetButtonHandler = () => {
  currentNum = '';
  storedNum = '';
  operation = '';
  updateScreen(currentNum);
};

const deleteButtonHandler = () => {
  const numLength = currentNum.length;
  if (!currentNum || currentNum === '0') return;
  if (currentNum.length >= 1) currentNum = currentNum.substring(0, numLength - 1);
  updateScreen(currentNum);
};

const executeOperation = () => {
  /* When an operation like subtraction (-),
  multiplication (*), division (/), or modulus (%)
  is performed, all the values that are not numbers
  are converted into the number data type */
  if (currentNum && storedNum && operation) {
    switch (operation) {
      case '+':
        storedNum = parseFloat(storedNum) + parseFloat(currentNum);
        break;
      case '-':
        storedNum -= currentNum;
        break;
      case '*':
        storedNum *= currentNum;
        break;
      case '/':
        storedNum /= currentNum;
        break;
      default:
    }
    currentNum = '';
    operation = '';
    updateScreen(storedNum);
  }
};

const operationButtonHandler = (operationValue) => {
  if (!currentNum && !storedNum) return;
  if (currentNum && !storedNum) {
    storedNum = currentNum;
    currentNum = '';
    operation = operationValue;
  } else if (storedNum) {
    if (currentNum) executeOperation();
    operation = operationValue;
  }
};

const keyButtonsHandler = (element) => {
  element.addEventListener('click', () => {
    const { type, value } = element.dataset;
    if (type === 'number') {
      numberButtonHandler(value);
    } else if (type === 'operation') {
      switch (value) {
        case 'c':
          resetButtonHandler();
          break;
        case 'Backspace':
          deleteButtonHandler();
          break;
        case 'Enter':
          executeOperation();
          break;
        default:
          operationButtonHandler(value);
      }
    }
  });
};

keysElements.forEach(keyButtonsHandler);

const availableNumbers = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '.',
];
const availableOperations = ['+', '-', '*', '/'];
const availableKeys = [
  ...availableNumbers,
  ...availableOperations,
  'Backspace',
  'Enter',
  'c',
];

// const keyboardWithoutHover = (key) => {
//   if (availableNumbers.includes(key)) {
//     numberButtonHandler(key);
//   } else if (availableOperations.includes(key)) {
//     operationButtonHandler(key);
//   } else if (key === 'Backspace') {
//     deleteButtonHandler();
//   } else if (key === 'Enter') {
//     executeOperation();
//   } else if (key === 'c') {
//     resetButtonHandler();
//   }
// };

const keyboardWithHover = (key) => {
  if (availableKeys.includes(key)) {
    const elem = document.querySelector(`[data-value="${key}"]`);

    elem.classList.add('hover');
    elem.click();
    setTimeout(() => elem.classList.remove('hover'), 100);
  }
};

window.addEventListener('keydown', (event) => {
  //   keyboardWithoutHover(event.key);
  keyboardWithHover(event.key);
});
