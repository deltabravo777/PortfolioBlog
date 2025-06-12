import { Suits } from "./suits";

export class PlayingCard {
    cardNumber: number;
    suit: Suits;
    privateCard?: boolean;

    constructor(cardNumber: number, suit: Suits) {
        this.cardNumber = cardNumber;
        this.suit = suit;
    }

}