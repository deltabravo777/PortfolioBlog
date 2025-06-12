import * as React from 'react'
import { HoldemInterface } from '../../models/holdem-interface/HoldemInterface';
import { deepClone } from '../../utility/deepClone';

// @ts-ignore
const DeckDealingFunc = ({ holdemInterface, setHoldemInterface }:
    { holdemInterface: HoldemInterface, setHoldemInterface: React.Dispatch<React.SetStateAction<HoldemInterface>> }) => {

    const testMethod = () => {

    }

    //const DrawCardPublic = () => {
    //    setHoldemInterface((prevState) => {
    //        const copyMain: HoldemInterface = deepClone(prevState);
    //        var drawnCard = copyMain.room.deck.drawACard();
    //        for (let player of copyMain.room.players) {
    //            player.addPublicCard(drawnCard);
    //        }
    //        return copyMain;
    //    })
    //}

    const DrawCardPublic = () => {
        setHoldemInterface((prevState) => {
            const copyMain: HoldemInterface = deepClone(prevState);
            copyMain.room.DrawAndDealPublicCard();
            return copyMain;
        })
    }

    const DrawCardPrivate = () => {
        setHoldemInterface((prevState) => {
            const copyMain: HoldemInterface = deepClone(prevState);
            copyMain.room.DrawAndDealPrivateCard();
            return copyMain;
        })
    }

    const ResetTable = () => {
        setHoldemInterface((prevState) => {
            const copyMain: HoldemInterface = deepClone(prevState);
            copyMain.room.resetRound();
            return copyMain;
        })
    }

    const GetWinner = () => {
        setHoldemInterface((prevState) => {
            const copyMain: HoldemInterface = deepClone(prevState);
            copyMain.room.getWinner();
            return copyMain;
        })
    }

    return { testMethod, DrawCardPublic, DrawCardPrivate, ResetTable, GetWinner };
}
export default DeckDealingFunc;