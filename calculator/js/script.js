const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
const clearButton = document.getElementById('clear');



buttons.forEach(button => {
  if (!button.classList.contains('operator')) {
    button.addEventListener('click', appendInput);
  }
});


const operators = document.querySelectorAll('.operator');
operators.forEach(operator => {
  operator.addEventListener('click', performOperation);
});

clearButton.addEventListener('click', clearDisplay);

function appendInput() {
  const value = this.getAttribute('data-value');
  display.value += value;
}

function performOperation() {
  const operator = this.getAttribute('data-operator');
  const input = display.value;

  if (input.length === 0) {
    return;
  }

  if (operator === '=') {
    try {
      const result = eval(input);
      display.value = result;
    } catch (error) {
      display.value = 'Error';
    }
  } else {
    display.value += operator;
  }
}


  

function clearDisplay() {
  display.value = '';
}
