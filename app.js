class MyCalculator {
    constructor(previousOpButton, currentOpButton) {
        this.previousOpButton = previousOpButton;
        this.currentOpButton = currentOpButton;
        this.clear()
    }
    clear() {
        this.currentOperand ='';
        this.previousOperand = ''; 
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0,-1)
    }
    appendNumber(number) {

        if (number === '.' && this.currentOperand.includes('.')) {
            return
        }
        this.currentOperand = this.currentOperand.toString() + number.toString()

    }
    chooseOperation(operation) {
        if (this.currentOperand == ''){
            return
        }
        if (this.previousOperand !== ''){
            this.compute()
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = ''
    }
    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) {
            return
        }
        switch (this.operation) {
            case "+":
                computation = prev + current
                break;
            case "-":
                computation = prev - current
                break;
            case "×":
                computation = prev * current
                break;
            case "÷":
                computation = prev / current
                break;
                default:
                    return
        }

        this.currentOperand = computation;
        this.operation = undefined
        this.previousOperand = ''
    }
    getDisplayValue(number) {
        const stringNum = number.toString()
        const intergerDigits = parseFloat(stringNum.split('.')[0])
        const decimalDigits = stringNum.split('.')[1]
        let intergerDisplay 
        if (isNaN(intergerDigits)) {
            intergerDisplay = ''
        } else {
            intergerDisplay = intergerDigits.toLocaleString('en', 
            {maximumFractionDigits: 0})
        }

        if (decimalDigits != null) {
            return `${intergerDisplay}.${decimalDigits}`
        } else {
            return intergerDisplay
        }
        // const floatNum = parseFloat(number)
        // if (isNaN(floatNum)) {
        //     return ''
        // }
        // return floatNum.toLocaleString('en')
    }

    updateValue() {
        this.currentOpButton.innerText = this.getDisplayValue(this.currentOperand);
        if( this.operation != null){
        this.previousOpButton.innerText = `${this.getDisplayValue(this.previousOperand)} ${this.operation}`

        } else {
            this.previousOpButton.innerText = ''
        }

    }
}


const numButtons = document.querySelectorAll('.data-num');
const opButtons = document.querySelectorAll('.data-op');
const equalsButton = document.querySelector('.data-equal');
const delButton = document.querySelector('.data-del');
const previousOpButton = document.querySelector('.prev--op');
const currentOpButton = document.querySelector('.current--op');
const clearAllButton = document.querySelector('.data-clear');

numButtons.forEach(button => {
    button.addEventListener('click', ()=> {
        calculator.appendNumber(button.innerText);
        calculator.updateValue();
        // console.log(button);
    })
})


opButtons.forEach(botton => {
    botton.addEventListener('click', ()=> {
        calculator.chooseOperation(botton.innerText);
        calculator.updateValue();
        // console.log(button);
    })
})

const calculator = new MyCalculator(previousOpButton, currentOpButton);


equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateValue()
    console.log(equalsButton);
})

clearAllButton.addEventListener('click', ()=> {
    calculator.clear()
    calculator.updateValue()
})
delButton.addEventListener('click', ()=> {
    calculator.delete()
    calculator.updateValue()
})






// class User {

//   constructor(name) {
//     this.name = name;
//   }

//   sayHi() {
//     return this.name;
//   }

// }

// // Usage:
// let user = new User("John");
// console.log(user.sayHi());

// class Clock {
//   constructor({ template }) {
//     this.template = template;
//   }

//   render() {
//     let date = new Date();

//     let hours = date.getHours();
//     if (hours < 10) hours = '0' + hours;

//     let mins = date.getMinutes();
//     if (mins < 10) mins = '0' + mins;

//     let secs = date.getSeconds();
//     if (secs < 10) secs = '0' + secs;

//     let output = this.template
//       .replace('h', hours)
//       .replace('m', mins)
//       .replace('s', secs);

//     console.log(output);
//   }

//   stop() {
//     clearInterval(this.timer);
//   }

//   start() {
//     this.render();
//     this.timer = setInterval(() => this.render(), 1000);
//   }
// }


// let clock = new Clock({template: 'h:m:s'});
// clock.start();
// clock.stop();
