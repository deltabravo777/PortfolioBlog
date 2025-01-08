import * as React from 'react'
import { MainInterface } from '../../models/main-interface/MainInterface';
import { WindowDisplayEnum } from '../../models/window-display/window-display-emum';
import HomepageComponent from '../homepage/HomepageComponent';
import WYSIWYGDisplayComponent from '../wysiwyg/WYSIWYGDisplayComponent';

const MainWindowDisplayComponent = ({ mainInterface, setMainInterface }:
    { mainInterface: MainInterface, setMainInterface: React.Dispatch<React.SetStateAction<MainInterface>> }) => {


    return (
        <div>
            {mainInterface.windowDisplayEnumValue == WindowDisplayEnum.homepage
                &&
                <HomepageComponent mainInterface={mainInterface} setMainInterface={setMainInterface} />
            }

            {mainInterface.windowDisplayEnumValue == WindowDisplayEnum.wysiwyg
                &&
                <WYSIWYGDisplayComponent mainInterface={mainInterface} setMainInterface={setMainInterface} />
            }
        </div>
    );
}

export default MainWindowDisplayComponent;