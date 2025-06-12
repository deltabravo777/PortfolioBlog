import * as React from 'react'
import { HoldemInterface } from '../../../../models/holdem-interface/HoldemInterface';
import { deepClone } from '../../../../utility/deepClone';

const ShuffleDeckButton = ({ holdemInterface, setHoldemInterface }:
    { holdemInterface: HoldemInterface, setHoldemInterface: React.Dispatch<React.SetStateAction<HoldemInterface>> }) => {

    const shuffleDeck = () => {
        holdemInterface.room.deck.shuffle();

        setHoldemInterface(prevState => {
            const copyMain: HoldemInterface = deepClone(prevState); // Clone the latest state
            return copyMain; // Return updated state
        });

    }

    return (
        <button className="btn btn-outline-primary btn-sm" onClick={shuffleDeck}>
            Shuffle Deck
        </button>
    );
}

export default ShuffleDeckButton;