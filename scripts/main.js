class Calculator{
    constructor(prevText, curText){
        this.prevText=prevText
        this.curText=curText
        this.clear() 
    }

    clear(){
        this.currentOperand=''
        this.previousOperand=''
        this.operation=''
    }

    delete(){
        this.currentOperand=this.currentOperand.toString().slice(0,-1)
    }

    appendNumber(number){
        if(number==='.' && this.currentOperand.includes('.')) return
        this.currentOperand=this.currentOperand.toString()+number.toString()
    }

    chooseOperation(operation){
        if (this.currentOperand==='') return
        if (this.previousOperand!==''){
            this.compute()
        }
        this.operation=operation
        this.previousOperand=this.currentOperand
        this.currentOperand=''
    }

    compute(){
        let computation
        const prev=parseFloat(this.previousOperand)
        const current=parseFloat(this.currentOperand)
        if(isNaN(prev) || isNaN(current)) return
        switch(this.operation){
            case '+': computation=prev+current
            break
            case '-': computation=prev-current
            break
            case '×': computation=prev*current
            break
            case '÷': computation=prev/current
            break
            default:
                return
        }
        this.currentOperand=computation
        this.previousOperand=''
    }

    getDisplayNumber(number){
        const stringNumber= number.toString()
        const integerDigits=parseFloat(stringNumber.split('.')[0])
        const decimalDigits=stringNumber.split('.')[1]
        let integerDisplay
        if(isNaN(integerDigits)){
            integerDisplay=''
        }else{
            integerDisplay=integerDigits.toLocaleString('en',{
                maximumFractionDigits:0 })
        }
        if(decimalDigits!=null){
            return `${integerDisplay}.${decimalDigits}`
        } else{
            return integerDisplay
        }
    }

    updateDisplay(){
        this.curText.innerText=this.getDisplayNumber(this.currentOperand)
        if(this.operation!=null){
            this.prevText.innerText=`${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else{
            this.prevText.innerText=''
        }
    }
}


const numberButtons=document.querySelectorAll('[data-number]')
const operationButtons=document.querySelectorAll('[data-operation]')
const equalsButtons=document.querySelector('[data-equals]')
const deleteButtons=document.querySelector('[data-delete]')
const allClearButtons=document.querySelector('[data-all-clear]')
const prevText=document.querySelector('[data-prev]');
const curText=document.querySelector('[data-cur]');

const calculator=new Calculator(prevText, curText)

numberButtons.forEach(button => {
    button.addEventListener('click', ()=>{
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', ()=>{
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButtons.addEventListener('click', button=>{
    calculator.compute()
    calculator.updateDisplay()
})

allClearButtons.addEventListener('click', button=>{
    calculator.clear()
    calculator.updateDisplay()
})

deleteButtons.addEventListener('click', button=>{
    calculator.delete()
    calculator.updateDisplay()
})
