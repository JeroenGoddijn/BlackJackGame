// Create Empty Table

const playerTag = document.getElementById('player'),
    playerName = document.getElementById('player-name'),
    playerPoints = document.getElementById('player-points'),
    playerHand = document.getElementById('player-hand'),
    dealerTag = document.getElementById('dealer'),
    dealerName = document.getElementById('dealer-name'),
    dealerPoints = document.getElementById('dealer-points'),
    dealerHand = document.getElementById('dealer-hand'),
    newCard = document.createElement('img').setAttribute('class', 'col-1 player-card'),
    messageBoard = document.getElementById('messages');

// Global variables
let players = [];
let isPlayersTurn = true;
let gameStarted = false;
let messages = [];
let latestMessage = messages.length;
let playerBusts = false;
let dealerBusts = false;

// Create Card Deck (52 cards)
class Deck {
    constructor() {
        // declare empty deck array
        this.deck = [];
        // reset this deck (to make sure all cards are available)
        this.reset();
        // shuffle this deck
        this.shuffle();
    }
    
    // function to reset the deck when necessary
    reset(){
        this.deck = [];
        
        // define a (fixed) deck of cards
        // H=Hearts, S=Spades, D=Diamonds, C=Clubs (using abbreviations due to filenames cards)
        const suits = ['H', 'S', 'D', 'C'];
        const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];
        let points = '';

        for (let suit in suits) {
            for (let value in values) {
                // console.log(values[value]);
                let cardName = `${values[value]}${suits[suit]}`;
                let imageURL = ('images/cards/' + cardName +'.jpg');
                if(values[value] === 'J' || values[value] === 'Q' || values[value] === 'K') {
                    points = 10;
                } 
                else if(values[value] === 'A') {
                    points = 11;
                    }
                else {
                    points = values[value];
                }
                this.deck.push({'card':cardName, 'points':points, 'imageURL':imageURL});
                console.log({'card':cardName, 'points':points, 'imageURL':imageURL});
            }
        }
    }
    
    // function to shuffle the deck using Fisher-Yates Shuffle: https://bost.ocks.org/mike/shuffle/
    shuffle(){
        const deck = this.deck;
        let m = deck.length;
        let i;
    
        while(m){
        i = Math.floor(Math.random() * m--);
    
        [deck[m], deck[i]] = [deck[i], deck[m]];
        }
    
        return this;
    }
    
    // deal() 1 card and ramove it from end of deck array
    deal(){
        return this.deck.pop();
    }
}

const deck1 = new Deck();
deck1.shuffle()
console.log(deck1.deck);
// deck1.deal()
// console.log(deck1.deck);

// Create Player class
class Player {
    constructor(name, points) {
        // // declare empty player array
        // this.player = [];
        this.name = name;
        this.score = points;
    }

    hit() {
        let cardDealt = deck1.deal();
        let card = document.createElement('img');
        playerHand.appendChild(card);
        card.setAttribute('class', 'col-1 dealer-card');
        let cardImage = card.setAttribute('src', cardDealt.imageURL);
        console.log(cardDealt);
        player01.score += cardDealt.points;
        playerPoints.textContent = player01.score;
        console.log('playerPoints:', player01.score);
        console.log('dealerPoints:',dealer.score );
    }

};

// Create Dealer class
class Dealer {
    constructor(name, points) {
        // // declare empty dealer array
        // this.dealer = [];
        this.name = name;
        this.score = points;
    }

    hit() {
        let cardDealt = deck1.deal()
        let card = document.createElement('img');
        dealerHand.appendChild(card);
        card.setAttribute('class', 'col-1 dealer-card');
        let cardImage = card.setAttribute('src', cardDealt.imageURL);
        console.log(cardDealt);
        // Update dealer's score
        dealer.score += cardDealt.points;
        dealerPoints.textContent = dealer.score;  
        console.log('playerPoints:', player01.score);
        console.log('dealerPoints:',dealer.score );
    }

};

let dealer = new Dealer('dealer', 0);
let player01 = new Player(window.prompt("What is your name?"), 0);

// Welcome player by name
message = "Welcome, " + `${player01.name}`+ ". Let's play some BlackJack.";
messages.push(message);
messageBoard.textContent = messages[latestMessage];
console.log(latestMessage);
console.log(messages[latestMessage]);

// Deal 2 random cards to player (face up) and 2 random cards to dealer (face down)
// showCards = true for player, showCards = false for dealer until player stands
console.log(document.getElementById('deal-button'));
var dealClicked = document.getElementById('deal-button').addEventListener('click', function(){
    //write "deal" logic here
    // find player-div as starting point (defined as constant on top of file) and make sure it's empty
    playerHand.innerHTML = '';
    dealerHand.innerHTML = '';
    player01.score = 0;
    dealer.score = 0;

    // deal 2 cards to each player
    for(let i=0; i< 2; i++) {
        console.log(i);
        cardDealt = deck1.deal(i)
        let card = document.createElement('img');
        playerHand.appendChild(card);
        card.setAttribute('class', 'col-1 dealer-card');
        let cardImage = card.setAttribute('src', cardDealt.imageURL);
        console.log(cardDealt);
        // Update player's score
        // playerScore += cardDealt.points;
        player01.score += cardDealt.points;
        console.log(player01);
        console.log(player01.score);
        playerPoints.textContent = player01.score;
    }

    //deal 2 cards to dealer
    for(let j=0; j< 2; j++) {
        console.log(j);
        cardDealt = deck1.deal(j)
        let card = document.createElement('img');
        dealerHand.appendChild(card);
        card.setAttribute('class', 'col-1 dealer-card');
        let cardImage = card.setAttribute('src', cardDealt.imageURL);
        console.log(cardDealt);
        // Update dealer's score
        if (!isPlayersTurn) {
            dealerPoints.setAttribute('style','visibility: visible;');
        }
        else {
            dealerPoints.setAttribute('style','visibility: hidden;');
        }
        dealer.score += cardDealt.points;
        dealerPoints.textContent = dealer.score;    
    }
});

// if player clicks HIT, give player another random card
// Hit player with 1 random card (face up)
// showCards = true for player, showCards = false for dealer until player stands
console.log(document.getElementById('hit-button'));
var hitClicked = document.getElementById('hit-button').addEventListener('click', function(){
    player01.hit();
});

// if player clicks STAND, give turn to dealer
// showCards = true for player, showCards = false for dealer until player stands
// Hit dealer with 1 random card (face up) if dealerScore < 17
console.log(document.getElementById('stand-button'));
var standClicked = document.getElementById('stand-button').addEventListener('click', function(){
    isPlayersTurn = false;
    if (!isPlayersTurn) {
        dealerPoints.setAttribute('style','visibility: visible;');
    }
    else {
        dealerPoints.setAttribute('style','visibility: hidden;');
    }
    console.log('playerPoints:', player01.score);
    console.log('dealerPoints:',dealer.score );

    console.log(dealer.score <= player01.score);
    while (dealer.score <= player01.score) {
        dealer.hit();
    }
});




// If the card total is 16 points or lower, the dealer will always draw another card from the deck. 
// The dealer will continue drawing cards from the deck until the house hand has at least 17 points, 
// or until it goes bust by going over 21. If the dealer has 17 points off the deal without an Ace, 
// most blackjack rules say the dealer will stand, even if a 21 player has a higher total.

// The dealer also might have a soft 17 hand, which is one that includes an Ace and any other cards 
// whose combined value totals six points. Both land-based casinos and online blackjack casinos who 
// support live dealer blackjack require dealers to take at least one more card with the dealer has a 
// soft 17 showing. The dealer will continue taking more cards—until the house’s hand either becomes a hard 17 or higher, 
// or the hand goes over 21 and goes bust.
function evaluateScores() {
    if(playerPoints === 21) {
        message = 'You have BlackJack! You win!!!';
        messages.push(message);
        messageBoard.textContent = messages[latestMessage];        
    }
    // If player has more than 21 points, the house wins
    else if (playerPoints > 21) {
        playerBusts = true;
        isPlayersTurn = false;
        message = "You went BUST! The house wins.";
        messages.push(message);
        messageBoard.textContent = messages[latestMessage];
    }
    // If dealer has 17 points or more, the house stands

    // If player has <= 21 points
    else if(playerPoints >=17 && playerPoints <=21) {
            cardDealt = deck1.deal()
            let card = document.createElement('img');
            playerHand.appendChild(card);
            card.setAttribute('class', 'col-1 dealer-card');
            let cardImage = card.setAttribute('src', cardDealt.imageURL);
            console.log(cardDealt);
            playerScore += cardDealt.points;
            playerPoints.textContent = playerScore;
    }
    else {
        message = 'You win! Congratulations.'
        messages.push(message);
        messageBoard.textContent = message;    
    }
}