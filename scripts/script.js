import * as util from './util.js';

const themesToggleElm = document.querySelector('.themes__toggle');
const keysElements = document.querySelectorAll('.calc__key');
const result = document.querySelector('.calc__result');

const updateScreen = (value) => {
  result.textContent = !value ? '0' : value;
};

const toggleDarkTheme = () => themesToggleElm.classList.toggle('themes__toggle--isActive');
const toggleDarkThemeByEnter = (event) => event.key === 'Enter' && themesToggleElm.classList.toggle('themes__toggle--isActive');

themesToggleElm.addEventListener('click', toggleDarkTheme);
themesToggleElm.addEventListener('keydown', toggleDarkThemeByEnter);

const keyButtonsHandler = (element) => {
  element.addEventListener('click', () => {
    const { type, value } = element.dataset;
    if (type === 'number') {
      const numberValue = util.numberButtonHandler(value);
      if (numberValue) {
        updateScreen(numberValue);
      }
    } else if (type === 'operation') {
      let buttonValue = '';
      switch (value) {
        case 'c':
          updateScreen(util.resetButtonHandler());
          break;
        case 'Backspace':
          buttonValue = util.deleteButtonHandler();
          if (buttonValue || buttonValue === '') {
            updateScreen(buttonValue);
          }
          break;
        case 'Enter':
          buttonValue = util.executeOperation(value);
          if (buttonValue) {
            updateScreen(buttonValue);
          }
          break;
        default:
          util.operationButtonHandler(value);
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
