const inputValue = prompt('Input word(-s)');
findMiddleLetter(inputValue);

function findMiddleLetter(inputString) {
    if (inputString.length === 0 || inputString.trim().length === 0) {
        alert('Invalid input data');
        return;
    }

    if (inputString.length % 2 === 0) {
        alert(`"${inputString[inputString.length / 2 - 1] + inputString[inputString.length / 2]}"`);
    } else {
        alert(`"${inputString[Math.floor(inputString.length / 2) - 1]}"`);
    }
}