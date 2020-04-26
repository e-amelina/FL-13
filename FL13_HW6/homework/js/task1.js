const checkNumber = prompt('Input check number');
const tipPercentage = prompt('Input tip percentage');

validation(transformInputsToNumber(checkNumber, '$'), transformInputsToNumber(tipPercentage, '%'));

function validation(checkNumber, tipPercentage) {
    if (
        isNaN(checkNumber) ||
        isNaN(tipPercentage) ||
        checkNumber <= 0 ||
        tipPercentage <= 0 ||
        tipPercentage >= 100
    ) {
        alert('Invalid input data');
        return;
    }

    const checkNum = transformResult(checkNumber.toFixed(2));
    const tipPercent = transformResult(tipPercentage.toFixed(2));
    const tipAmount = transformResult((checkNumber * (tipPercentage / 100)).toFixed(2));
    const totalSum = checkNum + tipAmount;


    alert(`Check number: ${checkNum}\nTip: ${tipPercent}%\nTip amount: ${tipAmount}$\nTotal sum to pay: ${totalSum}$`);

}

function transformInputsToNumber(str, delimetr) {
    if (str.indexOf(delimetr) === str.length - 1) {
        str = str.slice(0, str.length - 1);

        return Number(str);
    }

    return Number(str);
}


function transformResult(inputNumber) {
    if (inputNumber === Math.floor(inputNumber)) {
        return Math.floor(inputNumber);
    } else {
        if (inputNumber * 100 % 10 !== 0) {
            return inputNumber;
        }

        return Math.floor(inputNumber * 10) / 10;
    }
}