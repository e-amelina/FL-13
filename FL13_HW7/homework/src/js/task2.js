const startPrize = 100;
const startMaxNum = 5;
const startMinNum = 0;

playGame();

function playGame() {
    const play = confirm('Do you want to play a game?');
    if (play) {
        const result = runGame(startPrize, startMaxNum, startMinNum);
        alert(`Thank you for your participation. Your prize is: ${result}$`);
        playGame();
        return;
    } else {
        alert('You did not become a billionaire, but can.');
    }
}

function runGame(prize, maxNum, totalPrize) {
    const guessNum = Math.floor(0 - 0.5 + Math.random() * (maxNum - 0 + 1));
    const maxPrize = prize;

    let attemptsNum = 3;

    while (attemptsNum) {
        const playerNum = Number(prompt(`Choose a roulette pocket number from 0 to ${maxNum}
Attempts left: ${attemptsNum}\nTotal prize: ${totalPrize}$
Possible prize on current attempt: ${prize}$\n`));

        if (playerNum === guessNum) {
            totalPrize += prize;

            if (confirm(`Congratulation, you won!Your prize is: ${prize}$. Do you want to continue?`)) {
                return runGame(maxPrize * 2, maxNum * 2, totalPrize);
            }

            return totalPrize;
        } else {
            attemptsNum -= 1;
            prize /= 2;
        }
    }

    return totalPrize;
}