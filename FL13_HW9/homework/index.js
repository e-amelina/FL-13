function convert() {
    return [...arguments];
}

function executeforEach(sourceArray, callbackFunc) {
    for (let i = 0; i < sourceArray.length; i++) {
        callbackFunc(sourceArray[i]);
    }
}

function mapArray(sourceArray, callbackFunc) {
    const result = [];
    const newCallback = (el) => {
        result.push(callbackFunc(parseInt(el)));
    }
    executeforEach(sourceArray, newCallback);

    return result;
}

function filterArray(sourceArray, callbackFunc) {
    const result = [];
    const newCallback = (el) => {
        if (callbackFunc(el)) {
            result.push(el);
        }
    }
    executeforEach(sourceArray, newCallback);

    return result;
}

function containsValue(sourceArray, searchingNumber) {
    let result;
    const callbackFunc = (el) => {
        result = result || el === searchingNumber;
    }
    executeforEach(sourceArray, callbackFunc);

    return result;
}

function flipOver(inputString) {
    let reverseString = '';
    for (let i = inputString.length - 1; i >= 0; i--) {
        reverseString += inputString[i];
    }

    return reverseString;
}

function makeListFromRange(arrArgument) {
    let createdArr = [];
    if (arrArgument[0] > arrArgument[1]) {
        const curElem = arrArgument[0];
        arrArgument[0] = arrArgument[1];
        arrArgument[1] = curElem;
    }
    for (let i = 0; i < arrArgument[1] - arrArgument[0] + 1; i++) {
        createdArr.push(i + arrArgument[0]);
    }

    return createdArr;
}

function getArrayOfKeys(nameObject, nameKey) {
    const result = [];

    const callbackFunc = (el) => {
        result.push(el[nameKey]);
    }

    executeforEach(nameObject, callbackFunc)

    return result;
}

function substitute(sourceArray) {
    const MIN_VALUE = 10;
    const MAX_VALUE = 20;

    return mapArray(sourceArray, (el) => el > MIN_VALUE && el < MAX_VALUE ? '*' : el);
}

function getPastDay(date, countDayAgo) {
    date.setDate(date.getDate() - countDayAgo);

    return date.getDate();
}

function formatDate(date) {
    const MAX_LENGHT_TO_ADD_NULL = 9;

    return `${date.getFullYear()}/` +
        `${date.getMonth() > MAX_LENGHT_TO_ADD_NULL ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)}/` +
        `${date.getDate() > MAX_LENGHT_TO_ADD_NULL ? date.getDate() : '0' + date.getDate()} ` +
        `${date.getHours() > MAX_LENGHT_TO_ADD_NULL ? date.getHours() : '0' + date.getHours()}:` +
        `${date.getMinutes() > MAX_LENGHT_TO_ADD_NULL ? date.getMinutes() : '0' + date.getMinutes()}`;
}
