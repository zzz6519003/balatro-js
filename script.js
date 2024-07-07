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
    ////
}