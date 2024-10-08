//base code by 101computing.net

let rounds_won = 0;
let rounds_lost = 0;

class Deck {
    constructor(){
        this.deck = [];
        this.reset(); //adds 52 cards
        this.shuffle(); //shuffles the deck
    }

    reset(){
        this.deck = [];
        const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
        const values = ['Ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King'];

        for (let suit in suits){
            for (let value in values){
                this.deck.push(values[value]+ " of "+suits[suit]);
            }
        }
    }

    shuffle() {
        let numberOfCards = this.deck.length;
        for (var i=0; i<numberOfCards; i++){
            let j = Math.floor(Math.random() * numberOfCards);
            let tmp = this.deck[i];
            this.deck[i] = this.deck[j];
            this.deck[j] = tmp;
        }
    }

    deal(){
        return this.deck.pop();
    }

    isEmpty(){
        return (this.deck.length == 0);
    }

    length(){
        return this.deck.length;
    }

}

class Card{
    constructor(card){
        this.card = card;
        const cardValues = {"Ace of Hearts":1, "2 of Hearts":2, "3 of Hearts":3, "4 of Hearts":4, "5 of Hearts":5, "6 of Hearts":6, "7 of Hearts":7, "8 of Hearts":8, "9 of Hearts":9, "10 of Hearts":10, "Jack of Hearts":11, "Queen of Hearts":12, "King of Hearts":13, "Ace of Diamonds":1, "2 of Diamonds":2, "3 of Diamonds":3, "4 of Diamonds":4, "5 of Diamonds":5, "6 of Diamonds":6, "7 of Diamonds":7, "8 of Diamonds":8, "9 of Diamonds":9, "10 of Diamonds":10, "Jack of Diamonds":11, "Queen of Diamonds":12, "King of Diamonds":13, "Ace of Clubs":1, "2 of Clubs":2, "3 of Clubs":3, "4 of Clubs":4, "5 of Clubs":5, "6 of Clubs":6, "7 of Clubs":7, "8 of Clubs":8, "9 of Clubs":9, "10 of Clubs":10, "Jack of Clubs":11, "Queen of Clubs":12, "King of Clubs":13, "Ace of Spades":1, "2 of Spades":2, "3 of Spades":3, "4 of Spades":4, "5 of Spades":5, "6 of Spades":6, "7 of Spades":7, "8 of Spades":8, "9 of Spades":9, "10 of Spades":10, "Jack of Spades":11, "Queen of Spades":12, "King of Spades":13};

        this.value = cardValues[card];
        this.suit = card.substring(card.indexOf(" of ")+4);
        this.placeholder = null;
        this.flipped = false;

        var suits = {'Hearts': 0, 'Diamonds':13, 'Clubs':26, 'Spades':39}
        this.position = suits[this.suit] + this.value;
    }

    displayCard(placeholder,flipped=true){
        this.placeholder = document.getElementById(placeholder);


        this.placeholder.classList.add("card");
        this.flipped = flipped;
        if (flipped){
            this.placeholder.style.backgroundPosition = -150*this.position + "px";
        } else {
            this.placeholder.style.backgroundposition = "0px";
        }
    }


    flip(){
        if (this.flipped){
            this.placeholder.style.backgroundPosition = "0px";
            this.flipped = false;
        } else {
            this.placeholder.style.backgroundPosition = -150*this.position+"px";
            this.flipped=true;
        }
    }

}

const handRanks = { //mult values for each hand 
    'High Card': 1,
    'Pair': 2,
    'Two Pair': 3,
    'Three of a Kind': 4,
    'Straight': 5,
    'Flush': 6,
    'Full House': 7,
    'Four of a Kind': 8,
    'Straight Flush': 9,
    'Royal Flush': 10
};

function getCardCounts(deck) { //from a deck, get an understanding of the suits and values
    let valueCounts = {};
    let suitCounts = {};

    for (let card of deck) {
        valueCounts[card.value] = (valueCounts[card.value] || 0) + 1;
        suitCounts[card.suit] = (suitCounts[card.suit] || 0) + 1;
    }

    return { valueCounts, suitCounts };
}

function isFlush(deck) { //calculates if a deck has a flush
    const suits = deck.map(card => card.suit);
    return suits.every(suit => suit === suits[0]);
}

function isStraight(values) { //calculates if a deck has a straight
    values.sort((a, b) => a - b);
    for (let i = 0; i < values.length - 1; i++) {
        if (values[i] + 1 !== values[i + 1]) {
        return false;
        }
    }
    return true;
}

function getHandRank(deck) { //gets rank of hand
    const { valueCounts, suitCounts } = getCardCounts(deck);
    const values = Object.keys(valueCounts).map(Number);
    const counts = Object.values(valueCounts);
    const isFlushHand = isFlush(deck);
    const isStraightHand = isStraight(values);

    if (isFlushHand && isStraightHand && Math.max(...values) === 14) return 'Royal Flush';
    if (isFlushHand && isStraightHand) return 'Straight Flush';
    if (counts.includes(4)) return 'Four of a Kind';
    if (counts.includes(3) && counts.includes(2)) return 'Full House';
    if (isFlushHand) return 'Flush';
    if (isStraightHand) return 'Straight';
    if (counts.includes(3)) return 'Three of a Kind';
    if (counts.filter(count => count === 2).length === 2) return 'Two Pair';
    if (counts.includes(2)) return 'Pair';

    return 'High Card';
}

function mult_analyzer(deck) { //uses hand rank to attribute right multiplier
    const bestHand = getHandRank(deck);
    return handRanks[bestHand];
}


const deck = new Deck();

let card1,card2,card3,card4,card5,playerCard1,playerCard2;

function deal (){
    if (deck.length()<7){
        deck.reset();
        deck.shuffle();
    }
    card1 = new Card(deck.deal());
    card2 = new Card(deck.deal());
    card3 = new Card(deck.deal());
    card4 = new Card(deck.deal());
    card5 = new Card(deck.deal());
    playerCard1 = new Card(deck.deal());
    playerCard2 = new Card(deck.deal());

    card1.displayCard("card1",false);  
    card2.displayCard("card2",false);  
    card3.displayCard("card3",false);  
    card4.displayCard("card4",false);  
    card5.displayCard("card5",false);  
    playerCard1.displayCard("playerCard1",true);  
    playerCard2.displayCard("playerCard2",true); 

}


function nextStep(e1){
    if (!card1.flipped){ //Second Round
        required = Math.floor(Math.random() * (251 - 25) + 25); // random requirement between 25 and 250
        active_deck = [playerCard1, playerCard2, card1, card2, card3]
        total_value = playerCard1.value + playerCard2.value + card1.value + card2.value + card3.value; //change this now for deck
        mult = mult_analyzer(active_deck) // ADD MULT_ANALYZER DOWN LINE, KEEPS CHECKING BASED ON THE NEW CARDS
        total_all = total_value * mult 
        
        card1.flip();
        card2.flip();
        card3.flip();
        e1.innerHTML = "Reveal 4<sup>th</sup> card";
        document.getElementById('required').innerHTML = "Required to win:" + required;
        document.getElementById('value').innerHTML = "Value:" + total_value;
        document.getElementById('mult').innerHTML = "Mult:" + mult;
        document.getElementById('total').innerHTML = "Total:" + total_all;
    } else if (!card4.flipped) { //Third Round
        active_deck = [playerCard1, playerCard2, card1, card2, card3, card4]
        total_value = total_value + card4.value;
        mult = mult_analyzer(active_deck)
        total_all = total_value * mult 

        card4.flip();
        e1.innerHTML = "Reveal 5<sup>th</sup> card";
        document.getElementById('value').innerHTML = "Value:" + total_value;
        document.getElementById('mult').innerHTML = "Mult:" + mult;
        document.getElementById('total').innerHTML = "Total:" + total_all;

    } else if (!card5.flipped) { // Last Round
        active_deck = [playerCard1, playerCard2, card1, card2, card3, card4, card5]
        total_value = total_value + card5.value;
        mult = mult_analyzer(active_deck)
        total_all = total_value * mult 

        card5.flip();
        document.getElementById('value').innerHTML = "Value:" + total_value;
        document.getElementById('mult').innerHTML = "Mult:" + mult;
        document.getElementById('total').innerHTML = "Total:" + total_all;

        if (total_all >= required){
            document.getElementById('win').innerHTML = "You won!";
            rounds_won += 1;
            document.getElementById('win_stat').innerHTML = "Rounds won:" + rounds_won;
            //change the required to a higher number
        } else {
            document.getElementById('win').innerHTML = "You lost!";
            rounds_lost += 1;
            document.getElementById('lost_stat').innerHTML = "Rounds lost:" + rounds_lost;
        }

        e1.innerHTML="New Round";
    } else { // First Round
        total_value = 0;
        card1.flip();
        card2.flip();
        card3.flip();
        card4.flip();
        card5.flip();

        deal();
        e1.innerHTML="Reveal the first 3 cards.";
        total_value = playerCard1.value + playerCard2.value
        mult = 1 // placeholder
        total_all = total_value * mult 
        document.getElementById('required').innerHTML = "Required to win:" + required;
        document.getElementById('value').innerHTML = "Value:" + total_value;
        document.getElementById('mult').innerHTML = "Mult:" + mult;
        document.getElementById('total').innerHTML = "Total:" + total_all;
    }

}

deal();