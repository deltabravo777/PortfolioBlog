import * as React from 'react'
import { MainInterface } from '../../models/main-interface/MainInterface';
import { baseUrl } from '../../environment/environment';

const HomepageComponent = ({ mainInterface, setMainInterface }:
    { mainInterface: MainInterface, setMainInterface: React.Dispatch<React.SetStateAction<MainInterface>> }) => {


    return (
        <div>
            {baseUrl}
        </div>
    );
}

export default HomepageComponent;