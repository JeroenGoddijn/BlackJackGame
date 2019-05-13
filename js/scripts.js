// Create Empty Table

const player = document.getElementById('player'),
    playerName = document.getElementById('player-name'),
    playerPoints = document.getElementById('player-points'),
    playerHand = document.getElementById('player-hand'),
    dealer = document.getElementById('dealer'),
    dealerName = document.getElementById('dealer-name'),
    dealerPoints = document.getElementById('dealer-points'),
    dealerHand = document.getElementById('dealer-hand'),
    newCard = document.createElement('img').setAttribute('class', 'col-1 player-card');

// Global variables
let isPlayersTurn = true;
let gameStarted = false;

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


// Deal 2 random cards to player (face up) and 2 random cards to dealer (face down)
// showCards = true for player, showCards = false for dealer until player stands
console.log(document.getElementById('deal-button'));
var dealClicked = document.getElementById('deal-button').addEventListener('click', function(){
    //write "deal" logic here
    // find player-div as starting point (defined as constant on top of file) and make sure it's empty
    playerHand.innerHTML = '';
    dealerHand.innerHTML = '';
    playerScore = 0;
    dealerScore = 0;

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
        playerScore += cardDealt.points;
        playerPoints.textContent = playerScore;

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
            dealerScore += cardDealt.points;
            dealerPoints.textContent = dealerScore;    
        }
        else {
            dealerPoints.textContent = 0;
        }

    }
});




// if player clicks HIT, give player another random card
// Hit player with 1 random card (face up)
// showCards = true for player, showCards = false for dealer until player stands
console.log(document.getElementById('hit-button'));
var dealClicked = document.getElementById('hit-button').addEventListener('click', function(){
    cardDealt = deck1.deal()
    let card = document.createElement('img');
    playerHand.appendChild(card);
    card.setAttribute('class', 'col-1 dealer-card');
    let cardImage = card.setAttribute('src', cardDealt.imageURL);
    console.log(cardDealt);
    playerScore += cardDealt.points;
    playerPoints.textContent = playerScore;

});
