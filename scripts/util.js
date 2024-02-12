let currentNum = '';
let storedNum = '';
let operation = '';

const numberButtonHandler = (value) => {
  if (value === '.' && currentNum.includes('.')) return undefined;
  if (value === '0' && !currentNum) return undefined;
  // if the user entered num after the operation is finished it will start new calculation
  if (!currentNum && !operation && storedNum) storedNum = '';
  currentNum += value;
  return currentNum;
};

const resetButtonHandler = () => {
  currentNum = '';
  storedNum = '';
  operation = '';
  return currentNum;
};

const deleteButtonHandler = () => {
  const numLength = currentNum.length;
  if (!currentNum || currentNum === '0') return undefined;
  if (currentNum.length >= 1) currentNum = currentNum.substring(0, numLength - 1);
  return currentNum;
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
    return storedNum;
  }
  return undefined;
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

export {
  numberButtonHandler,
  resetButtonHandler,
  deleteButtonHandler,
  executeOperation,
  operationButtonHandler,
};
