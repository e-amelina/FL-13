function letterCount(inputString, searchingLetter) {
    return inputString.toUpperCase().split(searchingLetter.toUpperCase()).length - 1;
}

console.log(letterCount("Barry", "b"));