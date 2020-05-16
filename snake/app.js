document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.grid div');
    const scoreDisplay = document.querySelector('span');
    const startBtn = document.querySelector('.start');

    const width = 10;
    let appleIndex = 0;
    let currentSnake = [2, 1, 0]; // [headIndex, ...body, tailIndex]
    let direction = 1; // 1 > right, -1 < left, -10 ^ top, 10 v bottom
    let score = 0;
    let speed = 0.9;
    let intervalTime = 0;
    let interval = 0;

    // start or restart game
    function startGame() {
        currentSnake.forEach(e => squares[e].classList.remove('snake'));
        squares[appleIndex].classList.remove('apple');
        clearInterval(interval);
        score = 0;
        randomApple();
        direction = 1;
        scoreDisplay.innerText = score;
        intervalTime = 900;
        currentSnake = [2, 1, 0];
        currentSnake.forEach(e => squares[e].classList.add('snake'));
        interval = setInterval(moveOutComes, intervalTime);
    }

    // function that deals with the movement of snake
    function moveOutComes() {
        // snake hitting borders and hitting self
        if (
            (currentSnake[0] + width >= (width * width) && direction === width ) || //if snake hits bottom
            (currentSnake[0] % width === width -1 && direction === 1) || //if snake hits right wall
            (currentSnake[0] % width === 0 && direction === -1) || //if snake hits left wall
            (currentSnake[0] - width < 0 && direction === -width) ||  //if snake hits the top
            squares[currentSnake[0] + direction].classList.contains('snake') //if snake goes into itself
        ) {
            return clearInterval(interval) //this will clear the interval if any of the above happen
        }

        const tail = currentSnake.pop() // gives tail element and removes it from snake
        squares[tail].classList.remove('snake') // remove class snake from tail
        currentSnake.unshift(currentSnake[0] + direction) // gives direction to the head of the snake

        // if head of snake gets apple
        if (squares[currentSnake[0]].classList.contains('apple')) {
            squares[currentSnake[0]].classList.remove('apple');
            squares[tail].classList.add('snake');
            currentSnake.push(tail)
            randomApple();
            score++
            scoreDisplay.textContent = score;
            clearInterval(interval)
            intervalTime = intervalTime * speed;
            interval = setInterval(moveOutComes, intervalTime);
        }
        squares[currentSnake[0]].classList.add('snake');
    }

    // generate new apple once apple is eaten
    function randomApple() {
        do{
        appleIndex = Math.floor(Math.random() * squares.length)
        } while(squares[appleIndex].classList.contains('snake')) // making sure apples dont appear on the snake
        squares[appleIndex].classList.add('apple')
    }


    // assign function to keycodes
    function control(e) {
        if(e.keyCode === 39) {
            direction = 1 //if we press the right arrow on our keyboard, the snake will go right one
        } else if (e.keyCode === 38) {
            direction = -width // if we press the up arrow, the snake will go back ten divs, appearing to go up
        } else if (e.keyCode === 37) {
            direction = -1 // if we press left, the snake will go left one div
        } else if (e.keyCode === 40) {
            direction = +width //if we press down, the snake head will instantly appear in the div ten divs from where you are now
        }
    }

    document.addEventListener('keyup', control);
    startBtn.addEventListener('click', startGame)
})