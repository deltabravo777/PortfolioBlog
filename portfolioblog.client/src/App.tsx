import { useEffect, useState } from 'react';
import './App.css';
import { baseUrl } from '../src/environment/environment'
import { MainInterface } from './models/main-interface/MainInterface';
import MainFunc from './func/main-func';
import { deepClone } from './utility/deepClone';
import NavBarTop from './components/navbar/NavBarTop';
import { WindowDisplayEnum } from './models/window-display/window-display-emum';
import MainWindowDisplayComponent from './components/main-window/MainWindowDisplayComponent';

function App() {

    const [mainInterface, setMainInterface] = useState<MainInterface>({
        user: "Daniel Bae",
        windowDisplayEnumValue: WindowDisplayEnum.homepage,

        wysiwygObject: {
            textFormInputString: ''
        },
        articleObject: {
            articles: []
        }

    });

    useEffect(() => {
        var mainCopy: MainInterface = deepClone(mainInterface);
        mainCopy.mainFuncHandler = MainFunc({ mainInterface, setMainInterface });
        setMainInterface(mainCopy);
    }, []); // Empty dependency array to mimic componentDidMount

    //mainFuncHandler = MainFunc({ mainInterface, setMainInterface });

    return (
        <div>
            <NavBarTop mainInterface={mainInterface} setMainInterface={setMainInterface} />

            <MainWindowDisplayComponent mainInterface={mainInterface} setMainInterface={setMainInterface} />

        </div>
    );

}

export default App;