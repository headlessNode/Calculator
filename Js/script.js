//Variables
let screen = document.querySelector('.calc-screen');
let firstNumber = '';
let secondNumber = '';
let operator = '';
let display = '';
let decimalAllowed = true;



//BASIC MATH FUNCTIONS
const add = (...args) => args.reduce((a,b) => a+b);

const multiply = (...args) => args.reduce((a,b) => a*b);

const divide = (...args) => args.reduce((a,b) => a/b);

const subtract = (...args) => args.reduce((a,b) => a-b);

//OPERATION FUNCTION
const operate = (firstNumber, operator, secondNumber) => {

    if(operator === '+'){
        return add(firstNumber,secondNumber);
    }
    else if(operator === '-'){
        return subtract(firstNumber, secondNumber);
    }
    else if(operator === '*'){
        return multiply(firstNumber, secondNumber);
    }
    else if(operator === '/'){
        return divide(firstNumber, secondNumber);
    }
}


//DISPLAY FUNCTION
const populateDisplay = (e) => {
    
    let buttonPressed = '';
    if (e.type.startsWith('click')) {
        buttonPressed = e.target.textContent;
    } else if (e.type.startsWith('key')) {
        buttonPressed = e.key;
    }

    if(buttonPressed >= 0 && buttonPressed <= 9){
        
        if(operator === ''){
            firstNumber += buttonPressed;
            display = firstNumber;
            
        }
        else{
            secondNumber += buttonPressed;
            display = firstNumber + operator + secondNumber;
            
        }
    }

    else if(buttonPressed === '+' || buttonPressed === '-' || buttonPressed === '*' || buttonPressed === '/'){


        if(firstNumber === ''){
            firstNumber = '0';
            operator = buttonPressed;
            display = firstNumber + operator;
        }

        else if(secondNumber === ''){
            operator = buttonPressed;
            display += operator;
            decimalAllowed = true;
        }
        else{
            firstNumber = parseFloat(firstNumber);
            secondNumber = parseFloat(secondNumber);
            firstNumber = operate(firstNumber, operator, secondNumber);
            firstNumber = firstNumber.toString();
            secondNumber = '';
            operator = buttonPressed;
            display = firstNumber + operator;
        }
    }

    else if(buttonPressed === 'C' || buttonPressed === 'c'){
        firstNumber = '';
        secondNumber = '';
        operator = '';
        display = '';
        screen.textContent = '';
        decimalAllowed = true;
    }

    else if(buttonPressed === 'Del' || buttonPressed === 'Backspace'){
        if(secondNumber === '' && operator === ''){
            firstNumber = firstNumber.slice(0 , firstNumber.length - 1);
            display = display.slice(0, display.length -1);
            decimalAllowed = true;
        }
        else if(operator != '' && secondNumber === ''){
            display = display.slice(0, display.length -1);
            operator = '';
            decimalAllowed = true;
        }
        else{
            secondNumber = secondNumber.slice(0, secondNumber.length -1);
            display = display.slice(0, display.length - 1);
            decimalAllowed = true;
        }
        
    }

    else if(buttonPressed === '.'){
        if(decimalAllowed){
            if(operator === '' && firstNumber != ''){
                firstNumber += '.';
                display += '.';
                decimalAllowed = false;
            }
            else if(operator === '' && firstNumber === ''){
                firstNumber = '0.';
                display += firstNumber;
                decimalAllowed = false;
            }
            else if (operator != '' & secondNumber != ''){
                secondNumber += '.';
                display += '.';
                decimalAllowed = false;
            }
            else if(operator != '' && secondNumber === ''){
                secondNumber = '0.';
                display += secondNumber;
                decimalAllowed = false;
            }
        }

    }

    screen.textContent = display;

    if(buttonPressed === '='){
        let result = '';
        if(secondNumber != ''){
            firstNumber = parseFloat(firstNumber);
            secondNumber = parseFloat(secondNumber);
            if(operator === '+' ){ 
                result = operate(firstNumber, operator, secondNumber);
                result = result.toFixed(2);
                screen.textContent = result;
            }
            else if(operator === '-'){
                result = operate(firstNumber, operator, secondNumber);
                result = result.toFixed(2);
                screen.textContent = result;
            }
            else if(operator === '*'){
                result = operate(firstNumber, operator, secondNumber);
                result = result.toFixed(2);
                screen.textContent = result;

            }
            else if(operator === '/'){
                result = operate(firstNumber, operator, secondNumber);
                result = result.toFixed(2);
                screen.textContent = result;
            }
        }

    }

}

//ADD EVENT LISTENER
const buttonIds = [
    '.clr-btn', '.divide-btn', '.mult-btn', '.dlt-btn',
    '.seven-btn', '.eight-btn', '.nine-btn', '.minus-btn',
    '.four-btn', '.five-btn', '.six-btn', '.plus-btn',
    '.one-btn', '.two-btn', '.three-btn', '.eq-btn',
    '.zero-btn', '.dot-btn'
];

buttonIds.forEach(buttonId => {
    const button = document.querySelector(buttonId);
    button.addEventListener('click', populateDisplay);
});

document.addEventListener('keydown', populateDisplay);






