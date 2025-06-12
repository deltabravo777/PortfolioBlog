import * as React from 'react'
import { HoldemInterface } from '../../../../models/holdem-interface/HoldemInterface';

const DrawPrivateCardButton = ({ holdemInterface, setHoldemInterface }:
    { holdemInterface: HoldemInterface, setHoldemInterface: React.Dispatch<React.SetStateAction<HoldemInterface>> }) => {

    return (
        <button className="btn btn-outline-primary btn-sm" onClick={holdemInterface.deckDealingHandler?.DrawCardPrivate}>
            Draw Private Card
        </button>
    );
}

export default DrawPrivateCardButton;