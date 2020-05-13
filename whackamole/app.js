document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.square');
    const mole = document.querySelector('.mole');
    const timeLeft = document.querySelector('#time-left');
    let score = document.querySelector('#score');

    let result = 0;
    let currentTime = timeLeft.textContent;

    function randomSquare() {
        squares.forEach(square => {
            square.classList.remove('mole')
        })
        let randomPosition = squares[Math.floor(Math.random() * 9)]
        randomPosition.classList.add('mole')

        // save this random position's id as hit position which can be used to say whether or not user clicked it
        hitPosition = randomPosition.id;
    }

    squares.forEach(square => {
        square.addEventListener('mouseup', () => {
            if (square.id === hitPosition) {
                result = result + 1;
                score.textContent = result;
            }
        })
    })

    function moveMole() {
        let timerId = null;
        timerId = setInterval(randomSquare, 1000);
    }

    moveMole()

    function countDown() {
        currentTime--;
        timeLeft.textContent = currentTime;

        if (currentTime === 0) {
            clearInterval(timerId);
            alert('GAME OVER ! Your final score is'+ result);
        }
    }

    let timerId = setInterval(countDown, 1000)

});
