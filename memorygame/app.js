document.addEventListener('DOMContentLoaded', () => {
    const cardsArray = [
        { name: 'img1', img: 'images/img1.jpg', },
        { name: 'img1', img: 'images/img1.jpg', },
        { name: 'img2', img: 'images/img2.jpg', },
        { name: 'img2', img: 'images/img2.jpg', },
        { name: 'img3', img: 'images/img3.jpg', },
        { name: 'img3', img: 'images/img3.jpg', },
        { name: 'img4', img: 'images/img4.jpg', },
        { name: 'img4', img: 'images/img4.jpg', },
        { name: 'img5', img: 'images/img5.jpg', },
        { name: 'img5', img: 'images/img5.jpg', },
        { name: 'img6', img: 'images/img6.jpg', },
        { name: 'img6', img: 'images/img6.jpg', },
    ];

    cardsArray.sort(() => 0.5 - Math.random());

    const grid = document.querySelector('.grid');
    const resultDisplay = document.querySelector('#result');

    var cardsChosen = [];
    var cardsChosenId = [];
    var cardsWon = [];

    // create board
    function createBoard() {
        for (let i = 0; i < cardsArray.length; i++) {
            var card = document.createElement('img');
            card.setAttribute('src', 'images/img9.jpg');
            card.setAttribute('data-id', i);
            card.addEventListener('click', flipcard);
            grid.appendChild(card);
        }
    }

    function checkForMatch() {
        var cards = document.querySelectorAll('img');
        // console.log('all cards', cards);
        const optionOneId = cardsChosenId[0];
        const optionTwoId = cardsChosenId[1];
        if (cardsChosen[0] === cardsChosen[1]) {
            // alert ('you found a match');
            cards[optionOneId].setAttribute('src', 'images/img10.jpg')
            cards[optionTwoId].setAttribute('src', 'images/img10.jpg')
            cardsWon.push(cardsChosen);
        } else {
            cards[optionOneId].setAttribute('src', 'images/img9.jpg')
            cards[optionTwoId].setAttribute('src', 'images/img9.jpg')
            // alert('Sorry try again');
        }
        cardsChosen = [];
        cardsChosenId = [];
        resultDisplay.textContent = cardsWon.length;

        if(cardsWon.length === cardsArray.length / 2) {
            resultDisplay.textContent = 'Congratulations! you have found them all!'
        }
    }

    // flip card
    function flipcard() {
        var cardId = this.getAttribute('data-id');
        cardsChosen.push(cardsArray[cardId].name);
        cardsChosenId.push(cardId);
        this.setAttribute('src', cardsArray[cardId].img)

        if (cardsChosen.length === 2) {
            setTimeout(checkForMatch, 500);
        }
    }

    createBoard();
})