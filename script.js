class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear = () => {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete = () => {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber = (number) => {
        if (number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation = (operation) => {
        if (this.currentOperand.length === 1 && this.currentOperand.includes('-')) return;
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation === 'n x' ? '^' : operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';

        if (this.operation === '√') {
            this.compute();
        }
    }

    handlerMinus = () => {
        if (this.currentOperand.length !== 0) {
            if (this.currentOperand.length === 1 && this.currentOperand.includes('-')) return;
            this.chooseOperation('-')
        } else {
            this.appendNumber('-');
        }
    }

    compute = () => {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);

        if (this.operation === '√') {
            computation = Math.sqrt(prev);
            this.currentOperand = computation;
            this.operation = undefined;
            this.previousOperand = '';
        }

        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '÷':
                computation = prev / current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '^':
                computation = Math.pow(prev, current);
                break;
            default:
                return;
        }

        if (isNaN(prev) || isNaN(current)) return;

        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }

    displayNumber = (number) => {
        if (number === '-') return '-';
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0})
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay = () => {
        this.currentOperandTextElement.innerText = this.displayNumber(this.currentOperand);
        if (this.operation != null) {
            this.previousOperandTextElement.innerText =
                this.previousOperand < 0
                    ? `(${this.previousOperand}) ${this.operation}`
                    : `${this.previousOperand} ${this.operation}`;
        } else {
            this.previousOperandTextElement.innerText = '';
        }

    }
}


const numbersButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const minusButton = document.querySelector('[data-minus]')
const equalsButton = document.querySelector('[data-equals]');
const allClearButton = document.querySelector('[data-all-clear]');
const deleteButton = document.querySelector('[data-delete]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numbersButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

minusButton.addEventListener('click', () => {
    calculator.handlerMinus();
    calculator.updateDisplay();
})

equalsButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
})

allClearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
})

