const numbersButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalButton = document.querySelector('[data-equals]');
const allClearButton = document.querySelector('[data-all-clear]');
const deleteButton = document.querySelector('[data-delete]')
const currentOperandValue = document.querySelector('[current-operand]');


numbersButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        console.log(btn.innerText)
    })
});

operationButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        console.log(btn.innerText)
    })
});

equalButton.addEventListener('click', (e) => {
    console.log(e.target.textContent)
});

allClearButton.addEventListener('click', (e) => {
    console.log(e.target.textContent)
});

deleteButton.addEventListener('click', (e) => {
    console.log(e.target.textContent)
});

