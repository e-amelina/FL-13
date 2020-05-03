function countPoints(arrMatchsResult) {
    return arrMatchsResult.reduce(function (points, currentScore) {
        let goals = currentScore.split(':');
        if (goals[0] > goals[1]) {
            points += 3;
        } else if (goals[0] === goals[1]) {
            points += 1;
        }
        return points;
    }, 0);
}

console.log(countPoints(['1:1', '1:2', '2:0', '4:2', '0:1', '2:3', '1:1', '0:1', '1:1', '3:0']));