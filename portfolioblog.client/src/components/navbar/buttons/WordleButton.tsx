import * as React from 'react'
import { MainInterface } from '../../../models/main-interface/MainInterface';
import { deepClone } from '../../../utility/deepClone';
import { WindowDisplayEnum } from '../../../models/window-display/window-display-emum';

const WordleButton = ({ mainInterface, setMainInterface }:
    { mainInterface: MainInterface, setMainInterface: React.Dispatch<React.SetStateAction<MainInterface>> }) => {

    const toggleToWordleHomepage = () => {
        var copyMain = deepClone(mainInterface);
        copyMain.windowDisplayEnumValue = WindowDisplayEnum.wordle;
        setMainInterface(copyMain);
    }

    return (
        <i className="bi bi-alphabet-uppercase" onClick={toggleToWordleHomepage} style={{ padding: '7px' }}></i>
        //<i className="bi bi-activity" onClick={toggleToSpaceInvadersHomepage} style={{ padding: '7px' }}></i>
    );
}

export default WordleButton;