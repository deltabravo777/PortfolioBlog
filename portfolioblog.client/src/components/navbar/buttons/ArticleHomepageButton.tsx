import * as React from 'react'
import { MainInterface } from '../../../models/main-interface/MainInterface';
import { deepClone } from '../../../utility/deepClone';
import { WindowDisplayEnum } from '../../../models/window-display/window-display-emum';

const ArticleHomepageButton = ({ mainInterface, setMainInterface }:
    { mainInterface: MainInterface, setMainInterface: React.Dispatch<React.SetStateAction<MainInterface>> }) => {

    const toggleToArticlesHomepage = () => {
        var copyMain = deepClone(mainInterface);
        copyMain.windowDisplayEnumValue = WindowDisplayEnum.articles;
        setMainInterface(copyMain);
    }

    return (
        <i className="bi bi-blockquote-right" onClick={toggleToArticlesHomepage} style={{ padding: '7px' }}></i>
    );
}

export default ArticleHomepageButton;