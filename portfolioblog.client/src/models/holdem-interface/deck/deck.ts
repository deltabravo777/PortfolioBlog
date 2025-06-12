import { PlayingCard } from "../card/playing-card";
import { Suits } from "../card/suits";

export class Deck {
    cards: PlayingCard[] = [];

    constructor() {
        this.newDeck();
    }

    newDeck() {
        this.cards = [];
        const suits = [Suits.Spade, Suits.Heart, Suits.Club, Suits.Diamond];

        // Loop through each suit
        for (const suit of suits) {
            // Loop through ranks from 14 down to 2
            for (let rank = 14; rank >= 2; rank--) {
                this.cards.push(new PlayingCard(rank, suit));
            }
        }
    }

    shuffle(): void {
        for (let i = 0; i < 6; i++) { // Shuffle 6 times
            for (let j = this.cards.length - 1; j > 0; j--) {
                const randomIndex = Math.floor(Math.random() * (j + 1));
                [this.cards[j], this.cards[randomIndex]] = [this.cards[randomIndex], this.cards[j]]; // Swap
            }
        }
    }

    drawACard(): PlayingCard {
        var card = this.cards.shift();
        return card as PlayingCard;
    }

}