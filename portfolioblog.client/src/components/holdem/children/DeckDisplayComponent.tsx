import * as React from 'react'
import { HoldemInterface } from '../../../models/holdem-interface/HoldemInterface';
import { Suits } from '../../../models/holdem-interface/card/suits';
import { getSuitSymbol } from './card-display/getSuitSymbol';
import { getCardName } from './card-display/getCardName';

const DeckDisplayComponent = ({ holdemInterface, setHoldemInterface }:
    { holdemInterface: HoldemInterface, setHoldemInterface: React.Dispatch<React.SetStateAction<HoldemInterface>> }) => {
    // Map the cards to JSX elements
    const forLoopDeckCards = holdemInterface.room.deck.cards.map((card, index) => (
        <div key={index} className="row align-items-center">
            <div className="d-flex align-items-center">
                
                {/* Suit Symbol */}
                {getSuitSymbol(card.suit)}

                {/* Card Number */}
                <div className="me-2">{getCardName(card.cardNumber)}</div>

            </div>
        </div>
    ));

    return (
        <div className="container">
            <div className="row">{forLoopDeckCards}</div>
        </div>
    );
};

// Function to convert suits to symbols with color
//const getSuitSymbol = (suit: Suits) => {
//    const suitStyles: { [key in Suits]: string } = {
//        [Suits.Spade]: "black",
//        [Suits.Heart]: "red",
//        [Suits.Club]: "blue",
//        [Suits.Diamond]: "green"
//    };

//    const iconClasses: { [key in Suits]: string } = {
//        [Suits.Spade]: "bi bi-suit-spade-fill",
//        [Suits.Heart]: "bi bi-suit-heart-fill",
//        [Suits.Club]: "bi bi-suit-club-fill",
//        [Suits.Diamond]: "bi bi-suit-diamond-fill"
//    };

//    return (
//        <i className={iconClasses[suit]} style={{ color: suitStyles[suit] }}></i>
//    );
//};


// Function to convert card number to full name
//const getCardName = (cardNumber: number): string => {
//    const cardNames: { [key: number]: string } = {
//        2: "Two", 3: "Three", 4: "Four", 5: "Five", 6: "Six",
//        7: "Seven", 8: "Eight", 9: "Nine", 10: "Ten",
//        11: "Jack", 12: "Queen", 13: "King", 14: "Ace"
//    };

//    return cardNames[cardNumber] || cardNumber.toString();
//};

export default DeckDisplayComponent;
