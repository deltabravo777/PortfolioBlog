import * as React from 'react'
import { MainInterface } from '../../../models/main-interface/MainInterface';
import { deepClone } from '../../../utility/deepClone';
import { WindowDisplayEnum } from '../../../models/window-display/window-display-emum';

const CreateArticleButton = ({ mainInterface, setMainInterface }:
    { mainInterface: MainInterface, setMainInterface: React.Dispatch<React.SetStateAction<MainInterface>> }) => {

    const toggleToCreateArticleHomepage = () => {
        var copyMain = deepClone(mainInterface);
        copyMain.windowDisplayEnumValue = WindowDisplayEnum.createArticle;
        setMainInterface(copyMain);
    }

    return (
        <i className="bi bi-calendar-plus" onClick={toggleToCreateArticleHomepage} style={{ padding: '7px' }}></i>
    );
}

export default CreateArticleButton;