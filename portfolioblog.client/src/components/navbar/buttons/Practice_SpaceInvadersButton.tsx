import * as React from 'react'
import { MainInterface } from '../../../models/main-interface/MainInterface';
import { deepClone } from '../../../utility/deepClone';
import { WindowDisplayEnum } from '../../../models/window-display/window-display-emum';

const PracticeSpaceInvadersButton = ({ mainInterface, setMainInterface }:
    { mainInterface: MainInterface, setMainInterface: React.Dispatch<React.SetStateAction<MainInterface>> }) => {

    const toggleToSpaceInvadersHomepage = () => {
        var copyMain = deepClone(mainInterface);
        copyMain.windowDisplayEnumValue = WindowDisplayEnum.practice_spaceInvaders;
        setMainInterface(copyMain);
    }

    return (
        //<i className="bi bi-rocket-takeoff-fill" onClick={toggleToSpaceInvadersHomepage} style={{ padding: '7px' }}></i>
        <i className="bi bi-activity" onClick={toggleToSpaceInvadersHomepage} style={{ padding: '7px' }}></i>
    );
}

export default PracticeSpaceInvadersButton;