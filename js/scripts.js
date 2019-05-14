// Create Empty Table

const playerTag = document.getElementById('player'),
    playerName = document.getElementById('player-name'),
    playerNameValue = playerName.querySelector('label'),
    playerPoints = document.getElementById('player-points'),
    playerHand = document.getElementById('player-hand'),
    dealerTag = document.getElementById('dealer'),
    dealerName = document.getElementById('dealer-name'),
    dealerPoints = document.getElementById('dealer-points'),
    dealerHand = document.getElementById('dealer-hand'),
    card = document.createElement('img'),
    newCard = document.createElement('img').setAttribute('class', 'col-1 player-card'),
    messageBoard = document.getElementById('messages'),
    buttonsTag = document.getElementById('buttons');

// Global variables
let cardDealt;
let players = [];
let isPlayersTurn = true;
let gameStarted = false;
let message;
let messages = [];
let latestMessage = messages.length - 1;
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
    constructor(name, points = 0, turnNumber = 0, isPlayersTurn = true, standClicked = false, playerBusts = false) {
        // // declare empty player array
        // this.player = [];
        this.name = name;
        this.score = points;
        this.turnNumber = turnNumber;
        this.hand = [];
        this.isPlayersTurn = isPlayersTurn;
        this.standClicked = standClicked;
        this.playerBusts = playerBusts;
        this.welcomePlayer(this.name);
    }

    welcomePlayer() {
        // Welcome player by name
        message = "Welcome, " + this.name + ". Let's play some BlackJack.";
        messages.push(message);
        let latestMessage = messages.length -1;
        messageBoard.textContent = messages[latestMessage];
        console.log(latestMessage);
        console.log(messages[latestMessage]);   
        playerNameValue.textContent = this.name +': ';     
    }

    deal() {
        // reset score to 0, since clicking DEAL starts new game
        this.score = 0;
        this.hand = [];
        // deal 2 cards to each player
        for(let i=0; i< 2; i++) {
            console.log(i);
            cardDealt = deck1.deal(i);
            let card = document.createElement('img');
            playerHand.appendChild(card);
            card.setAttribute('class', 'player-card');
            let cardImage = card.setAttribute('src', cardDealt.imageURL);
            console.log(cardDealt);
            this.hand.push(cardDealt);
            console.log(player01.hand);
            // Update player's score
            this.score += cardDealt.points;
            console.log(this.score);
            playerPoints.textContent = this.score;
        }
        this.turnNumber += 1;
    }

    hit() {
        let cardDealt = deck1.deal();
        let card = document.createElement('img');
        // console.log(card);
        playerHand.appendChild(card);
        card.setAttribute('class', 'player-card');
        let cardImage = card.setAttribute('src', cardDealt.imageURL);
        console.log(cardDealt);
        // add card to player's hand
        this.hand.push(cardDealt);
        console.log(player01.hand);
        // add points for new card to player's score
        player01.score += cardDealt.points;
        playerPoints.textContent = player01.score;
        console.log('playerPoints:', player01.score);
        console.log('dealerPoints:',dealer.score );
        this.turnNumber += 1;
    }
};

// Create Dealer class
class Dealer {
    constructor(name, points = 0, turnNumber = 0, isPlayersTurn = false, standClicked = false, playerBusts = false) {
        // // declare empty dealer array
        // this.dealer = [];
        this.name = name;
        this.score = points;
        this.turnNumber = turnNumber;
        this.hand = [];
        this.isPlayersTurn = isPlayersTurn;
        this.standClicked = standClicked;
        this.playerBusts = playerBusts;
    }

    deal(){
        // reset score to 0, since clicking DEAL starts new game
        this.score = 0;
        this.hand = [];
        console.log('dealerHand=', dealerHand);
        dealerHand.setAttribute('style','visibility: visible;');
        //deal 2 cards to dealer
        for(let j=0; j< 2; j++) {
            console.log(j);
            cardDealt = deck1.deal(j);
            this.hand.push(cardDealt);
            console.log(dealer.hand);
            // let card = document.createElement('img');
            // dealerHand.appendChild(card);
            // card.setAttribute('class', 'dealer-card');
            // let cardImage = card.setAttribute('src', 'images/cards/awesome_back.png');
            console.log(cardDealt);
            // Update dealer's score
            this.score += cardDealt.points;
        }
        
        this.turnNumber += 1;
    }

    showCards() {

        dealerHand.innerHTML = '';
        
        for(let cardNumber in this.hand) {
            // display dealer's cards
            console.log('card#', cardNumber);
            let card = document.createElement('img');
            dealerHand.appendChild(card);
            card.setAttribute('class', 'dealer-card');
            let cardImage = card.setAttribute('src', this.hand[cardNumber].imageURL);
            // display dealer's score
            dealerPoints.textContent = dealer.score;   

        }
    }
 
    hit() {
        let cardDealt = deck1.deal()
        let card = document.createElement('img');
        dealerHand.appendChild(card);
        card.setAttribute('class', 'col-1 dealer-card');
        let cardImage = card.setAttribute('src', cardDealt.imageURL);
        console.log(cardDealt);
        // add card to dealer's hand
        this.hand.push(cardDealt);
        console.log(dealer.hand());
        // add points for new card to dealer's score
        this.score += cardDealt.points;
        dealerPoints.textContent = this.score;  
        console.log('playerPoints:', this.score);
        console.log('dealerPoints:',this.score );
        // dealer.evaluateScores();
        this.turnNumber += 1;
    }
};

let dealer = new Dealer('dealer');
let player01 = new Player(window.prompt("What is your name?"));

// Deal 2 random cards to player (face up) and 2 random cards to dealer (face down)
// showCards = true for player, showCards = false for dealer until player stands
console.log(document.getElementById('deal-button'));
var dealClicked = document.getElementById('deal-button').addEventListener('click', function(){
    //write "deal" logic here
    // find player-div as starting point (defined as constant on top of file) and make sure it's empty
    playerHand.innerHTML = '';

    player01.deal();

    dealer.deal();

    if(player01.score === 21 && standClicked === false) {
        console.log('Testing is score = 21:', this.score);
        let message = 'BlackJack! You win!!!';
        messages.push(message);
        let latestMessage = messages.length -1;
        console.log('Latest Message: ',latestMessage);
        messageBoard.textContent = messages[latestMessage];        
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
    player01.standClicked = true;

    buttonsTag.setAttribute('style','visibility: hidden;');

    dealer.showCards();

    console.log('playerPoints:', player01.score);
    console.log('dealerPoints:',dealer.score );

    // If player has more than 21 points, the house wins
    if (player01.score > 21 && standClicked === false) {
        console.log('Testing is score > 21');
        playerBusts = true;
        isPlayersTurn = false;
        message = "You went BUST! The house wins.";
        messages.push(message);
        let latestMessage = messages.length -1;
        console.log('Latest Message: ',latestMessage);
        messageBoard.textContent = messages[latestMessage];
    }
    
    else if(dealer.score <= 16 && this.standClicked === false) {
        // If the card total is 16 points or lower, the dealer will always draw another card from the deck. 
        console.log('Testing is dealer score <= 16');
        dealer.hit();

        message = 'Dealer takes another card.';
        messages.push(message);
        let latestMessage = messages.length -1;
        console.log('Latest Message: ',latestMessage);
        messageBoard.textContent = messages[latestMessage];
        }
        // The dealer will continue drawing cards from the deck until the house hand has at least 17 points, 
        // or until it goes bust by going over 21. 
        else if(dealer.score > 21) {
            console.log('Testing is dealer score > 21');
            dealer.standClicked;
            message = 'Dealer went BUST!! You win!!!';
            messages.push(message);
            let latestMessage = messages.length -1;
            console.log('Latest Message: ',latestMessage);
            messageBoard.textContent = messages[latestMessage];    
        }

        // If the dealer has 17 points off the deal without an Ace, 
        // most blackjack rules say the dealer will stand, even if a player has a higher total.
        else if(dealer.score === 17 && dealer.standClicked === false) {
            console.log('Testing is dealer score = 17');
            message = 'Dealer stands.';
            messages.push(message);
            let latestMessage = messages.length -1;
            console.log('Latest Message: ',latestMessage);
            messageBoard.textContent = messages[latestMessage];    
        }

        // else if(){
        // The dealer also might have a soft 17 hand, which is one that includes an Ace and any other cards 
        // whose combined value totals six points. Both land-based casinos and online blackjack casinos who 
        // support live dealer blackjack require dealers to take at least one more card with the dealer has a 
        // soft 17 showing. The dealer will continue taking more cards—until the house’s hand either becomes a 
        // hard 17 or higher, or the hand goes over 21 and goes bust.        else if (playerPoints > 21) {
        // }

        else if(dealer.score >= 17 && dealer.score <= 21 && dealer.standClicked === false) {
            console.log('Type of score: ', typeof(this.score), ' Type of standClicked: ', typeof(this.standClicked));
            // If dealer has 17 points or more, the house stands
            console.log('Testing is dealer score between 17 and 21');
            message = 'Dealer stands.';
            messages.push(message);
            latestMessage = messages.length -1;
            console.log('Latest Message: ',latestMessage);
            messageBoard.textContent = messages[latestMessage];    

            return this.isPlayersTurn = false;
        }

    console.log('Is dealer-score <= player-score?', dealer.score <= player01.score);
    if (dealer.score < player01.score) {
        let message = 'You win!';
        messages.push(message);
        let latestMessage = messages.length -1;
        console.log('Latest Message: ',latestMessage);
        messageBoard.textContent = messages[latestMessage];    
}
    else if (dealer.score > player01.score) {
        let message = 'The House wins!';
        messages.push(message);
        let latestMessage = messages.length -1;
        console.log('Latest Message: ',latestMessage);
        messageBoard.textContent = messages[latestMessage];    
    }
    else {
        let message = 'It\s a draw. The dealer should have taken 1 more card!';
        messages.push(message);
        let latestMessage = messages.length -1;
        console.log('Latest Message: ',latestMessage);
        messageBoard.textContent = messages[latestMessage];    
    }
console.log(messages);
});