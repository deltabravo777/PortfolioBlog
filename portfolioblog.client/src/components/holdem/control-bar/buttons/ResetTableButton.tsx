import * as React from 'react'
import { HoldemInterface } from '../../../../models/holdem-interface/HoldemInterface';

const ResetTableButton = ({ holdemInterface, setHoldemInterface }:
    { holdemInterface: HoldemInterface, setHoldemInterface: React.Dispatch<React.SetStateAction<HoldemInterface>> }) => {

    return (
        <button className="btn btn-outline-warning btn-sm" onClick={holdemInterface.deckDealingHandler?.ResetTable}>
            Reset Table
        </button>
    );
}

export default ResetTableButton;