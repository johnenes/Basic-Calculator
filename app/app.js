//// How to store information for what is currentl type on the screen 
//variable declearation usung constant  

const allClearButton      = document.querySelector('[data-all-clear]')
const deleteButton        = document.querySelector('[data-delete]');

const numberButtons       = document.querySelectorAll('[data-number]');
const operationButton     = document.querySelectorAll('[data-operation]');

const equalButton         = document.querySelector('[data-equal]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement  = document.querySelector('[data-current-operand]');




// loop through all the numbers
numberButtons.forEach(button  =>{
    button.addEventListener('click', ()=>{
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay();
    })
})



//loop through operation button + * - / 
operationButton.forEach(button  =>{
    button.addEventListener('click', ()=>{
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay();
    })
})

 

//create event linstener for equal to
equalButton.addEventListener('click', ()=>{
    calculator.computed();
    calculator.updateDisplay();
})    
 
//event listener for clearing all value in  the screen
allClearButton.addEventListener('click', ()=>{
    calculator.clearScreen();
    calculator.updateDisplay();
})    
 


// event listener for deleting vlaues one after the other
deleteButton.addEventListener('click', ()=>{
    calculator.delete();
    calculator.updateDisplay();
})    
 

class Calculator{
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clearScreen();
    }

    clearScreen(){
        //  the  functions  clearing values from the screen
        this.currentOperand = '';
        this.previousOperand ='';
        this.operation = undefined;   
    }
    

    appendNumber(number){
        // check that period is not added multiple time
        if(number ==='.'  && this.currentOperand.includes('.')) return;// this line  of code
        //check for . in the numbers 
        this.currentOperand =  this.currentOperand.toString() + number.toString();
        // this particular line of code don't allowed more than three (3) after .
    }



    getDisplayNumber(number){
        const stringNumber  = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1] 
      
        let integerDisplay 
        if(isNaN(integerDigits)){
            integerDisplay = ''

        }else{
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits:0
            })
        }
        if(decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`

        }else{
            return integerDisplay 
        }

    }

    updateDisplay(){
        this.currentOperandTextElement.innerText  = this.getDisplayNumber(this.currentOperand);

        if(this.operation != null){
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } 
        else{
            this.previousOperandTextElement.innerText= ''

        }
        
}

computed(){
    let computations 
    let previous = parseFloat(this.previousOperand)
    let current  = parseFloat(this.currentOperand)
    if (isNaN(previous) || isNaN(current)) return

    switch(this.operation){
        case'÷':
        computations = (previous / current);
        break;
        case'+':
        computations = (previous + current);
        break;
        case'*':
        computations = (previous * current);
        break;
        case'-':
        computations = (previous - current);
        break;
        default:
            return
        
    }
    this.currentOperand = computations;//bring the final conputation result on currentOperand 
    this.operation = undefined // return nothing once any of mathmatical symbols are press
    this.previousOperand ='' //clear the current value of  operations 

}


chooseOperation(operation){
    if(this.currentOperand ==='') return 
    if(this.previousOperand !== ''){
        this.comput();
    }
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = ''
}

delete(){
    this.currentOperand = this.currentOperand.toString().slice(0,-1);
}
 

}//end class calculator

 

// create class calculator
const calculator = new  Calculator(previousOperandTextElement, currentOperandTextElement);
