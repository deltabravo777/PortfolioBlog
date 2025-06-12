import * as React from 'react'
import { HoldemInterface } from '../../../../models/holdem-interface/HoldemInterface';

const GetWinnerButton = ({ holdemInterface, setHoldemInterface }:
    { holdemInterface: HoldemInterface, setHoldemInterface: React.Dispatch<React.SetStateAction<HoldemInterface>> }) => {

    return (
        <button className="btn btn-outline-primary btn-sm" onClick={holdemInterface.deckDealingHandler?.GetWinner}>
            Get Winner
        </button>
    );
}

export default GetWinnerButton;