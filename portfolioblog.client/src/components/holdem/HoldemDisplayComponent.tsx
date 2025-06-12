import * as React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { MainInterface } from '../../models/main-interface/MainInterface';
import { HoldemInterface } from '../../models/holdem-interface/HoldemInterface';
import { Deck } from '../../models/holdem-interface/deck/deck';
import DeckDisplayComponent from './children/DeckDisplayComponent';
import HoldemControlBarComponent from './control-bar/HoldemControlBarComponent';
import { Player } from '../../models/holdem-interface/player/player';
import { Room } from '../../models/holdem-interface/room/room';
import PlayerDisplayComponent from './children/PlayerDisplayComponent';
import { deepClone } from '../../utility/deepClone';
import MainHoldemFunc from '../../func/holdem/main-holdem-func';
import DeckDealingFunc from '../../func/holdem/deck-dealing-func';

const HoldemDisplayComponent = ({ mainInterface, setMainInterface }:
    { mainInterface: MainInterface, setMainInterface: React.Dispatch<React.SetStateAction<MainInterface>> }) => {

    const [holdemInterface, setHoldemInterface] = useState<HoldemInterface>({
        room: new Room({
            players: [
                new Player("Main player"),
                new Player("Player 1"),
                new Player("Player 2"),
                new Player("Player 3"),
                new Player("Player 4"),
                new Player("Player 5"),
            ],
        })
    });

    useEffect(() => {
        var mainCopy: HoldemInterface = deepClone(holdemInterface);
        mainCopy.mainHoldemHandler = MainHoldemFunc({ holdemInterface, setHoldemInterface });
        mainCopy.deckDealingHandler = DeckDealingFunc({ holdemInterface, setHoldemInterface });
        setHoldemInterface(mainCopy);
    }, []); // Empty dependency array to mimic componentDidMount

    return (
        <div className='container' style={{ margin:'0px' }}>
            <div className="d-flex align-items-center">
                <p className="mb-0">holdem works!</p>
                <i className="bi bi-suit-spade-fill" style={{ color: 'black' }}></i>
                <i className="bi bi-suit-heart-fill" style={{ color: 'red' }}></i>
                <i className="bi bi-suit-club-fill" style={{ color: 'blue' }}></i>
                <i className="bi bi-suit-diamond-fill" style={{ color: 'green' }}></i>
            </div>




            <div className='row'>
                <HoldemControlBarComponent holdemInterface={holdemInterface} setHoldemInterface={setHoldemInterface} />
            </div>

            
            <div className='row'>
                <div className='col-sm-2'>
                    <DeckDisplayComponent holdemInterface={holdemInterface} setHoldemInterface={setHoldemInterface} />
                </div>
                <div className='col-sm-10'>
                    <PlayerDisplayComponent holdemInterface={holdemInterface} setHoldemInterface={setHoldemInterface} />
                </div>
            </div>
        </div>
    );
}

export default HoldemDisplayComponent;