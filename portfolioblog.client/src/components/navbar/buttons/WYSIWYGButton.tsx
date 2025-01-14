import * as React from 'react'
import { MainInterface } from '../../../models/main-interface/MainInterface';
import { deepClone } from '../../../utility/deepClone';
import { WindowDisplayEnum } from '../../../models/window-display/window-display-emum';

const WYSIWYGButton = ({ mainInterface, setMainInterface }:
    { mainInterface: MainInterface, setMainInterface: React.Dispatch<React.SetStateAction<MainInterface>> }) => {

    const toggleToWYSIWYGPage = () => {
        var copyMain = deepClone(mainInterface);
        copyMain.windowDisplayEnumValue = WindowDisplayEnum.wysiwyg;
        setMainInterface(copyMain);
    }

    return (
        <i className="bi bi-calendar2-plus" onClick={ toggleToWYSIWYGPage} style={{ padding: '7px' }}></i>
    );
}

export default WYSIWYGButton;