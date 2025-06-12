import * as React from 'react'
import { deepClone } from '../../../utility/deepClone';
import { MainInterface } from '../../../models/main-interface/MainInterface';
import { WindowDisplayEnum } from '../../../models/window-display/window-display-emum';


const HoldemButton = ({ mainInterface, setMainInterface }:
    { mainInterface: MainInterface, setMainInterface: React.Dispatch<React.SetStateAction<MainInterface>> }) => {

    const toggleToHoldem = () => {
        var copyMain = deepClone(mainInterface);
        copyMain.windowDisplayEnumValue = WindowDisplayEnum.holdem;
        setMainInterface(copyMain);
    }

    return (
        <i className="bi bi-dice-6" onClick={toggleToHoldem} style={{ padding: '7px' }}></i>
    );
}

export default HoldemButton;