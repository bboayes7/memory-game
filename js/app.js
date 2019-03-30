/*
 * Create a list that holds all of your cards
 */
let deck = [...document.getElementsByClassName('card')];

/* Game variables
 * showCards - used for matching 2 cards and setting background to .open class until appropriately matched
 * wrongCards - used for setting card's background to .wrong class temporarily
 * moves - used to hold how many moves a player used
 * time - used to hold how long a player has been playing
 */
let showCards = [], wrongCards = [], moves = 0, time = 0;

/* Query Selector Variables
*  stars - the star rating on the page
*  restart - the restart button
*/
let stars = document.querySelector('.stars').innerHTML;
let restart = document.querySelector('.restart');

//Restart button event listener
restart.addEventListener('click', function(){
    newGame(deck);
});

document.querySelector('.fa-redo').addEventListener('mouseover', function(){
    document.querySelector('.fa-redo').classList.toggle('fa-spin');
});

document.querySelector('.fa-redo').addEventListener('mouseout', function(){
    document.querySelector('.fa-redo').classList.toggle('fa-spin');
});

//New Game function
function newGame(deck){
    shuffle(deck);
    showCards = [], wrongCards = [], moves = 0, time = 0;
    document.getElementsByClassName('moves')[0].textContent = moves;
    document.querySelector('.stars').innerHTML = stars;
    for(let i = 0; i < deck.length; i++) {
        deck[i].classList = ['card'];
        document.querySelector('.deck').appendChild(deck[i]);
    }
    if(document.querySelector('.deck').classList.contains('animated')){
        document.querySelector('.deck').classList.remove('animated', 'fadeIn');
    } else{
        document.querySelector('.deck').classList.add('animated', 'fadeIn');
    }
}


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
function click(card) {
    //Display Card
    display(card);

    //Add Card to Open Cards
    openCards(card);

    //If list has another card, check to see if two cards match
    if(showCards.length == 2){
        if(showCards[0] == showCards[1]){
            showCards.pop();
            return;
        }
        //Check if the two cards have the same class value and check if the card being clicked on isn't the same card
        if(showCards[0].firstElementChild.className == showCards[1].firstElementChild.className && showCards[0] !== showCards[1]){
            matchedCards();
        } else {
            unmatchedCards();
        }

        //empty list of open cards
        showCards = [];
    }

    //Increment move counter
    moveCounter();
    
    //Update star rating
    starRating(moves);

    //Check if all cards are matched
    gameOver();
}

//Display Card Symbol
function display(card) {
    card.target.classList.add('open', 'show', 'animated', 'fadeIn', 'faster');
}

//Open Cards
function openCards(card){
    showCards.push(card.target);
}

//Matched Cards
function matchedCards(){
    showCards[0].classList.replace('open', 'match');
    showCards[1].classList.replace('open', 'match');
}

//Unmatched Cards
function unmatchedCards(){
    showCards[0].classList.replace('open', 'wrong');
    showCards[1].classList.replace('open', 'wrong');
    setTimeout(flipCards, 400);
    wrongCards = [...showCards]
}

//Flip back the cards
function flipCards(){
    if(wrongCards.length > 0){
        wrongCards[0].classList.remove('show', 'wrong', 'animated', 'fadeIn', 'faster');
        wrongCards[1].classList.remove('show', 'wrong', 'animated', 'fadeIn', 'faster');
    }
}

//Move Counter
function moveCounter(){
    moves++;
    document.querySelector('.moves').textContent = moves;
}

//Star Rating
function starRating(moves){
    if(document.querySelector('.stars').children.length == 1){
        return;
    }    
    if(moves == 33 || moves == 66 || time == 100){
        document.querySelector('.stars').firstElementChild.remove();
    }
    
}

//Game Over
function gameOver(){
    if(document.getElementsByClassName('match').length == 16){
        document.querySelector('.container').style.display = 'none';
        document.querySelector('.congrats').style.display = 'block';
        document.querySelector('.congrats').classList.add('slideInUp');
        document.querySelector('.post-stars').innerHTML = document.querySelector('.stars').innerHTML;
        bigStars();
        document.querySelector('.post-moves').textContent = moves;
        document.querySelector('.post-time').textContent = time;
        confetti();
    }
}

//Timer
setInterval(function timer(){
    document.querySelector('.timer').textContent = time;
    time++;
}, 1000);



// replaces end game pop up with the game
document.getElementsByClassName('new-game')[0].addEventListener('click', function(){
    document.querySelector('.congrats').style.display = 'none';
    document.querySelector('.container').style.display = 'flex';
    newGame(deck);
});

//Start up page
document.querySelector('.deck').style.display = 'none';  //dont display deck
document.querySelector('section').style.display = 'none'; //dont display game header

//displays everything needed to play the game and starts timer
document.querySelector('.start-game').addEventListener('click', function(){
    document.querySelector('.deck').style.display = 'flex';
    document.querySelector('section').style.display = 'block';
    document.querySelector('.start').style.display = 'none';
    newGame(deck);
});

//Event Delegation
document.querySelector('.deck').addEventListener('click', function(card){
    if(card.target.tagName != 'LI' || card.target.classList.contains('match')){
        return;
    } else{
        click(card);
    }
});


//Turn small stars into larger stars at the end of game
function bigStars(){
    let smallStars = document.querySelector('.post-stars').children;
    for (let star of smallStars){
        star.firstChild.classList.add('fa-3x', 'animated', 'bounceIn', 'infinite');
    }
}