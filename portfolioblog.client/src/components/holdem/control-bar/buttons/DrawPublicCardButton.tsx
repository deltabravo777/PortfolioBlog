import * as React from 'react'
import { HoldemInterface } from '../../../../models/holdem-interface/HoldemInterface';

const DrawPublicCardButton = ({ holdemInterface, setHoldemInterface }:
    { holdemInterface: HoldemInterface, setHoldemInterface: React.Dispatch<React.SetStateAction<HoldemInterface>> }) => {

    return (
        <button className="btn btn-outline-primary btn-sm" onClick={holdemInterface.deckDealingHandler?.DrawCardPublic}>
            Draw Public Card
        </button>
    );
}

export default DrawPublicCardButton;