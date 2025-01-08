import * as React from 'react'
import { MainInterface } from '../../models/main-interface/MainInterface';

const WYSIWYGDisplayComponent = ({ mainInterface, setMainInterface }:
    { mainInterface: MainInterface, setMainInterface: React.Dispatch<React.SetStateAction<MainInterface>> }) => {


    return (
        <div>
            <p>WYSIWYG works!</p>
        </div>
    );
}

export default WYSIWYGDisplayComponent;