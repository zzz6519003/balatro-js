//base code by 101computing.net

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
        if (!this.placeholder){
            console.error('Element with id $(placeholder) nopt found.')
            return;
        }

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
    if (!card.flipped){
        card1.flip();
        card2.flip();
        card3.flip();
        e1.innerHTML = "Reveal 4<sup>th</sup> card";
    } else if (!card4.flipped) {
        card4.flip();
        e1.innerHTML = "Reveal 5<sup>th</sup> card";

    } else if (!card5.flipped) {
        card5.flip();
        el.innerHTML="New Round";
    } else { 
        deal();
        e1.innerHTML="Reveal the first 3 cards.";
    }

}

deal();