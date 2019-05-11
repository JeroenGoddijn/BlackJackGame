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
        const values = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'];

        for (let suit in suits) {
            for (let value in values) {
                this.deck.push(`${values[value]}${suits[suit]}`);
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


// 
// Deal 2 random cards to player (face up) and 2 random cards to dealer (face down)
// showCards = true for player, showCards = false for dealer until player stands
console.log(document.getElementById('deal-button'));
var dealClicked = document.getElementById('deal-button').addEventListener('click', function(){
    //write "deal" logic here
    // find player-div as starting point
    // playerHand.appendChild(newCard).setAttribute('src', 'images/cards' + deck1.deal());
    // playerHand.appendChild(newCard).setAttribute('src', deck1.deal());
    cardDealt = deck1.deal()
    playerHand.innerHTML = '';
    for(var i=0; i< 2; i++) {
        var card = document.createElement('img');
        playerHand.appendChild(card);
        card.setAttribute('class', 'col-1 player-card');
        var cardImage = card.setAttribute('src', ('images/cards/' + cardDealt + '.jpg'));
        card.appendChild(cardImage);
    }
});




// if player clicks HIT, give player another random card
