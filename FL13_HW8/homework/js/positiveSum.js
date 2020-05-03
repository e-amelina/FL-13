function positiveSum(arrayNumber) {
    return arrayNumber.reduce(function (sum, item) {
        sum += item > 0 ? item : 0;
        return sum;
    }, 0);
}

console.log(positiveSum([0, -3, 5, 7]));