/*
 * Create a list that holds all of your cards
 */
let deck = [...document.getElementsByClassName('card')];
let showCards = [], wrongCards = [], moves = 0, time = 0;
let star = document.querySelector('.stars').innerHTML;
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

let restart = document.querySelector('.restart');

restart.addEventListener('click', function(){
    newGame(deck);
});

function newGame(deck){
    shuffle(deck);
    showCards = [], wrongCards = [], moves = 0, time = 0;
    document.getElementsByClassName('moves')[0].textContent = moves;
    document.querySelector('.stars').innerHTML = star;
    for(let i = 0; i < deck.length; i++) {
        deck[i].classList = ['card'];
        document.querySelector('.deck').appendChild(deck[i]);
    }
}
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


function click(card){





    // console.log(card.target);
    showCards.push(card.target);
    // console.log(showCards);
    card.target.classList.add('open', 'show');

    if(showCards.length == 2){
        
        if(showCards[0].firstElementChild.classList.value == showCards[1].firstElementChild.classList.value && showCards[0] != showCards[1]){
            console.log(true);

            showCards[0].classList.replace('open', 'match');
            showCards[1].classList.replace('open', 'match');
        } else {
            console.log(false);
            showCards[0].classList.replace('open', 'wrong');
            showCards[1].classList.replace('open', 'wrong');
            setTimeout(flipCards, 700);
            wrongCards = [...showCards]
        }
        showCards = [];
    }
    moveCounter()
    starRating(moves);
    if(document.getElementsByClassName('match').length == 16){
        document.querySelector('.container').style.display = 'none';
        document.querySelector('.congrats').style.display = 'block';
        document.querySelector('.post-stars').innerHTML = document.querySelector('.stars').innerHTML;
        document.querySelector('.post-moves').textContent = moves;
        document.querySelector('.post-time').textContent = time;
    }
}

let cards = document.getElementsByClassName('card');

for (i = 0; i < cards.length; i++){
    cards[i].addEventListener('click', function(card){
        click(card);
    });
}

function flipCards(){
    if(wrongCards.length > 0){
        wrongCards[0].classList.remove('show', 'wrong');
        wrongCards[1].classList.remove('show', 'wrong');
    }
}

setInterval(function timer(){
    document.querySelector('.timer').textContent = time;
    time++;
}, 1000)

function moveCounter(){
    moves++;
    document.querySelector('.moves').textContent = moves;
}
newGame(deck);

document.getElementsByClassName('new-game')[0].addEventListener('click', function(){
    document.querySelector('.congrats').style.display = 'none';
    document.querySelector('.container').style.display = 'flex';
    newGame(deck);
});

function starRating(moves){
    const stars = document.querySelector('.stars');

    if(moves == 33 || moves == 66){
        stars.firstElementChild.remove();
    }
}