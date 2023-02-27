"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

//// How to store information for what is currentl type on the screen 
//variable declearation usung constant  
var allClearButton = document.querySelector('[data-all-clear]');
var deleteButton = document.querySelector('[data-delete]');
var numberButtons = document.querySelectorAll('[data-number]');
var operationButton = document.querySelectorAll('[data-operation]');
var equalButton = document.querySelector('[data-equal]');
var previousOperandTextElement = document.querySelector('[data-previous-operand]');
var currentOperandTextElement = document.querySelector('[data-current-operand]'); // loop through all the numbers

numberButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
}); //loop through operation button + * - / 

operationButton.forEach(function (button) {
  button.addEventListener('click', function () {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
}); //create event linstener for equal to

equalButton.addEventListener('click', function () {
  calculator.computed();
  calculator.updateDisplay();
}); //event listener for clearing all value in  the screen

allClearButton.addEventListener('click', function () {
  calculator.clearScreen();
  calculator.updateDisplay();
}); // event listener for deleting vlaues one after the other

deleteButton.addEventListener('click', function () {
  calculator["delete"]();
  calculator.updateDisplay();
});

var Calculator =
/*#__PURE__*/
function () {
  function Calculator(previousOperandTextElement, currentOperandTextElement) {
    _classCallCheck(this, Calculator);

    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clearScreen();
  }

  _createClass(Calculator, [{
    key: "clearScreen",
    value: function clearScreen() {
      //  the  functions  clearing values from the screen
      this.currentOperand = '';
      this.previousOperand = '';
      this.operation = undefined;
    }
  }, {
    key: "appendNumber",
    value: function appendNumber(number) {
      // check that period is not added multiple time
      if (number === '.' && this.currentOperand.includes('.')) return; // this line  of code
      //check for . in the numbers 

      this.currentOperand = this.currentOperand.toString() + number.toString(); // this particular line of code don't allowed more than three (3) after .
    }
  }, {
    key: "getDisplayNumber",
    value: function getDisplayNumber(number) {
      var stringNumber = number.toString();
      var integerDigits = parseFloat(stringNumber.split('.')[0]);
      var decimalDigits = stringNumber.split('.')[1];
      var integerDisplay;

      if (isNaN(integerDigits)) {
        integerDisplay = '';
      } else {
        integerDisplay = integerDigits.toLocaleString('en', {
          maximumFractionDigits: 0
        });
      }

      if (decimalDigits != null) {
        return "".concat(integerDisplay, ".").concat(decimalDigits);
      } else {
        return integerDisplay;
      }
    }
  }, {
    key: "updateDisplay",
    value: function updateDisplay() {
      this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);

      if (this.operation != null) {
        this.previousOperandTextElement.innerText = "".concat(this.getDisplayNumber(this.previousOperand), " ").concat(this.operation);
      } else {
        this.previousOperandTextElement.innerText = '';
      }
    }
  }, {
    key: "computed",
    value: function computed() {
      var computations;
      var previous = parseFloat(this.previousOperand);
      var current = parseFloat(this.currentOperand);
      if (isNaN(previous) || isNaN(current)) return;

      switch (this.operation) {
        case '÷':
          computations = previous / current;
          break;

        case '+':
          computations = previous + current;
          break;

        case '*':
          computations = previous * current;
          break;

        case '-':
          computations = previous - current;
          break;

        default:
          return;
      }

      this.currentOperand = computations; //bring the final conputation result on currentOperand 

      this.operation = undefined; // return nothing once any of mathmatical symbols are press

      this.previousOperand = ''; //clear the current value of  operations 
    }
  }, {
    key: "chooseOperation",
    value: function chooseOperation(operation) {
      if (this.currentOperand === '') return;

      if (this.previousOperand !== '') {
        this.comput();
      }

      this.operation = operation;
      this.previousOperand = this.currentOperand;
      this.currentOperand = '';
    }
  }, {
    key: "delete",
    value: function _delete() {
      this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }
  }]);

  return Calculator;
}(); //end class calculator
// create class calculator


var calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);
//# sourceMappingURL=app.dev.js.map
