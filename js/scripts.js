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
    newCard = document.createElement('img').setAttribute('class', 'player-card'),
    messageBoard = document.getElementById('messages'),
    buttonsTag = document.getElementById('buttons'), 
    dealButton = document.getElementById('deal-button'),
    hitButton = document.getElementById('hit-button'),
    standButton = document.getElementById('stand-button');

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
        console.log(this.hand);
        // add points for new card to player's score
        this.score += cardDealt.points;
        playerPoints.textContent = this.score;
        console.log('playerPoints:', this.score);
        console.log('dealerPoints:',dealer.score );
        this.turnNumber += 1;

        // check for Aces if player score > 21
        if (this.score > 21) {
            for (let c in cardDealt) {
                // console.log('c=', dealer.hand[c]['card']);
                let cardValue = cardDealt['card'];
                // console.log('cardValue= ' + cardValue);
                let cardPoints = cardDealt['points'];
                // console.log('cardPoints= '+ cardPoints);
                // let aceIndex = player01.hand.indexOf(cardValue);
                // let aceIndex = Object.getOwnPropertyDescriptor(cardDealt, cardValue);
                // console.log('ace-index = ' + aceIndex);
                if (cardValue[0]==='A' && cardPoints === 11) {
                    console.log("I found an ACE in this hand");

                    console.log('cardValue= ' + cardValue);
                    console.log('cardPoints= '+ cardPoints);
                    // console.log('ace-index = ' + aceIndex);

                    cardDealt['points'] = 1;
                    console.log('New cardPoints= '+ cardPoints);
                    this.score -= 10;
                    playerPoints.textContent = this.score;
                    console.log(this.hand);
                    console.log(this.score);
                }
                else {
                    continue;
                }
            }
        }

        calcWinnerHit();
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
            dealerPoints.textContent = this.score;   

        }
    }
 
    hit() {
        let cardDealt = deck1.deal()
        let card = document.createElement('img');
        dealerHand.appendChild(card);
        card.setAttribute('class', 'dealer-card');
        let cardImage = card.setAttribute('src', cardDealt.imageURL);
        console.log(cardDealt);
        // add card to dealer's hand
        this.hand.push(cardDealt);
        console.log(this.hand);
        // add points for new card to dealer's score
        this.score += cardDealt.points;
        dealerPoints.textContent = this.score;  
        console.log('playerPoints:', this.score);
        console.log('dealerPoints:',this.score );
        // dealer.evaluateScores();
        calcWinnerStand();
        this.turnNumber += 1;
    }
};

function checkForAces(player) {
    for (let c in player.hand) {
        console.log('c=', player.hand[c]['card']);
        let cardValue = player.hand[c]['card'];
        if (cardValue.startsWith('A')) {
            console.log("I found an ACE in this hand");
            return true;
        }
        else {
            return false;
        }
    }        

}
// Once the dealer is at or above 17 points and the player has stopped hitting, a winner will be calculated
function calcWinnerBlackjack(){
    if (player01.score === 21 && player01.hand.length === 2) {
        // Uncomment the line below for debugging player score
        // console.log('Testing is player score = 21:', player01.score);
        // Update messageboard to announce winner
        let message = 'BlackJack! You win!!!';
        messages.push(message);
        let latestMessage = messages.length -1;
        // Uncomment the line below for debugging messageboard
        console.log('Latest Message: ',latestMessage);
        messageBoard.textContent = messages[latestMessage];        
        // deactivate HIT and STAND button
        hitButton.disabled = true; 
        standButton.disabled = true;    
    }
};

// Separate calc winner function for a "hit"
function calcWinnerHit(){
    if (dealer.score > 21 || player01.score > 21){
        let dealerAce = checkForAces(dealer);
        let player01Ace = checkForAces(player01);

        if (dealer.score >  21 && dealerAce === false){
            // Update messageboard to announce winner
            let message = 'You win!!!';
            messages.push(message);
            let latestMessage = messages.length -1;
            // Uncomment the line below for debugging messageboard
            console.log('Latest Message: ',latestMessage);
            messageBoard.textContent = messages[latestMessage];        
        }
        // else if (dealerAce === true) {
        //     for (let c in dealer.hand) {
        //         // console.log('c=', dealer.hand[c]['card']);
        //         let cardValue = dealer.hand[c]['card'];
        //         let cardPoints = dealer.hand[c]['points'];
        //         let aceIndex = dealer.hand.indexOf(cardValue);
        //         console.log('ace-index =', aceIndex);
        //         if (cardValue.startsWith('A') && cardPoints === 11) {
        //             console.log(cardDealt.points);
        //             console.log("I found an ACE in this hand");
        //             dealer.hand[c]['points'] = 1;
        //             console.log(cardPoints);
        //         }
        //         else {
        //             return false;
        //         }
        
        //     }
        // }


        if (player01.score > 21 && player01Ace === false){
            // Update messageboard to announce winner
            let message = 'The House wins.';
            messages.push(message);
            let latestMessage = messages.length -1;
            // Uncomment the line below for debugging messageboard
            // console.log('Latest Message: ',latestMessage);
            messageBoard.textContent = messages[latestMessage];  
            hitButton.disabled = true; 
            standButton.disabled = true;        
        }
        // else if (player01Ace === true) {
        //     for (let c in player01.hand) {
        //         // console.log('c=', dealer.hand[c]['card']);
        //         let cardValue = player01.hand[c]['card'];
        //         console.log('cardValue= ' + cardValue);
        //         let cardPoints = player01.hand[c]['points'];
        //         console.log('cardPoints= '+ cardPoints);
        //         // let aceIndex = player01.hand.indexOf(cardValue);
        //         let aceIndex = Object.getOwnPropertyDescriptor(player01.hand, cardValue);
        //         console.log('ace-index = ' + aceIndex);
        //         if (cardValue.startsWith('A') && cardPoints === 11) {
        //             console.log('cardValue= ' + cardValue);
        //             console.log('cardPoints= '+ cardPoints);
        //             console.log('ace-index = ' + aceIndex);

        //             console.log('cardDealtPoints = ' + cardDealt.points);
        //             console.log("I found an ACE in this hand");
        //             player01.hand[c]['points'] = 1;
        //             console.log('cardPoints= '+ cardPoints);
        //         }
        //         else {
        //             return false;
        //         }
        
        //     }
        // }

    }
};

// Separate calc winner function for a "hit"
function calcWinnerStand() {
    player01.standClicked = true;
    buttonsTag.setAttribute('style','visibility: hidden;');
    dealer.showCards();

    console.log('playerPoints:', player01.score);
    console.log('dealerPoints:',dealer.score );

    // If the dealer has 17 points off the deal without an Ace, 
    // most blackjack rules say the dealer will stand, even if a player has a higher total.
    if(dealer.score === 17 && dealer.hand.length === 2 && player01.score <=21) { // add dealer.hand does not contain ACE check
        // dealer stands, hence does nothing
        console.log('Dealer has 17 on deal and will stand.');
        let message = 'Dealer stands.';
        messages.push(message);
        let latestMessage = messages.length -1;
        // Uncomment the line below for debugging messageboard
        // console.log('Latest Message: ',latestMessage);
        messageBoard.textContent = messages[latestMessage];  

    }

    if (dealer.score > player01.score && dealer.score <= 21) {
        // Update messageboard to announce winner
        let message = 'The House wins.';
        messages.push(message);
        let latestMessage = messages.length -1;
        // Uncomment the line below for debugging messageboard
        // console.log('Latest Message: ',latestMessage);
        messageBoard.textContent = messages[latestMessage];  
        hitButton.disabled = true; 
        standButton.disabled = true;
    }

    // If the card total is 16 points or lower, the dealer will always draw another card from the deck. 
    else if (dealer.score < 17 && player01.score > dealer.score && player01.score <= 21){
        console.log('Testing is dealer score <= 16');
        // The dealer will continue drawing cards from the deck until the house hand has at least 17 points, 
        dealer.hit();
    }

    // else if(dealer.score === 17  ) { // dealer.hand does contain ACE
        // The dealer also might have a soft 17 hand, which is one that includes an Ace and any other cards 
        // whose combined value totals six points. Both land-based casinos and online blackjack casinos who 
        // support live dealer blackjack require dealers to take at least one more card with the dealer has a 
        // soft 17 showing. The dealer will continue taking more cards—until the house’s hand either becomes a 
        // hard 17 or higher, or the hand goes over 21 and goes bust.        else if (playerPoints > 21) {
    // }

    // or until it goes bust by going over 21. 
    else if (player01.score > dealer.score && player01.score <= 21 || dealer.score > 21 && player01.score <= 21) {
        // Update messageboard to announce winner
        let message = 'You win!!!';
        messages.push(message);
        let latestMessage = messages.length -1;
        // Uncomment the line below for debugging messageboard
        console.log('Latest Message: ',latestMessage);
        messageBoard.textContent = messages[latestMessage];        
    }

    else if (player01.score === dealer.score) {
        // Update messageboard to announce winner
        let message = 'Draw...';
        messages.push(message);
        let latestMessage = messages.length -1;
        // Uncomment the line below for debugging messageboard
        console.log('Latest Message: ',latestMessage);
        messageBoard.textContent = messages[latestMessage];        
    }
    dealButton.disabled = false; 
};


function main() {
    // hide HIT and STAND button until game is started by user clicking DEAL button
    hitButton.disabled = false; 
    standButton.disabled = false;
    playerHand.innerHTML = '';
    player01.deal();
    dealer.deal();
    //check if the player wins on initial hand
    calcWinnerBlackjack();
};

let dealer = new Dealer('dealer');
let player01 = new Player(window.prompt("What is your name?"));
hitButton.disabled = true; 
standButton.disabled = true;

// Deal 2 random cards to player (face up) and 2 random cards to dealer (face down)
// showCards = true for player, showCards = false for dealer until player stands
console.log(document.getElementById('deal-button'));
var dealClicked = document.getElementById('deal-button').addEventListener('click', function(){
    //write "deal" logic here
    // find player-div as starting point (defined as constant on top of file) and make sure it's empty
    main();
});

// if player clicks HIT, give player another random card
console.log(document.getElementById('hit-button'));
var hitClicked = document.getElementById('hit-button').addEventListener('click', function(){
    player01.hit();
});

// if player clicks STAND, give turn to dealer
console.log(document.getElementById('stand-button'));
var standClicked = document.getElementById('stand-button').addEventListener('click', function(){
    calcWinnerStand();

    console.log(messages);
});