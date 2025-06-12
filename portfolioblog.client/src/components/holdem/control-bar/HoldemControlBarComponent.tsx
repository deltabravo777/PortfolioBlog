import * as React from 'react'
import { HoldemInterface } from '../../../models/holdem-interface/HoldemInterface';
import ShuffleDeckButton from './buttons/ShuffleDeckButton';
import ResetTableButton from './buttons/ResetTableButton';
import DrawPrivateCardButton from './buttons/DrawPrivateCardButton';
import DrawPublicCardButton from './buttons/DrawPublicCardButton';
import GetWinnerButton from './buttons/GetWinnerButton';

const HoldemControlBarComponent = ({ holdemInterface, setHoldemInterface }:
    { holdemInterface: HoldemInterface, setHoldemInterface: React.Dispatch<React.SetStateAction<HoldemInterface>> }) => {


    return (
        <div className='d-flex'>
            <div>
                control bar
            </div>
            <div style={{ marginLeft:'4px' }}>
                another div
            </div>
            <div style={{ marginLeft: '4px' }}>
                <ShuffleDeckButton holdemInterface={holdemInterface} setHoldemInterface={setHoldemInterface} />
            </div>
            <div style={{ marginLeft: '4px' }}>
                <ResetTableButton holdemInterface={holdemInterface} setHoldemInterface={setHoldemInterface} />
            </div>
            <div style={{ marginLeft: '4px' }}>
                <DrawPublicCardButton holdemInterface={holdemInterface} setHoldemInterface={setHoldemInterface} />
            </div>
            <div style={{ marginLeft: '4px' }}>
                <DrawPrivateCardButton holdemInterface={holdemInterface} setHoldemInterface={setHoldemInterface} />
            </div>
            <div style={{ marginLeft: '4px' }}>
                <GetWinnerButton holdemInterface={holdemInterface} setHoldemInterface={setHoldemInterface} />
            </div>
        </div>
    );
}

export default HoldemControlBarComponent;