import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { MainInterface } from '../../models/main-interface/MainInterface';

const WordleDisplayComponent = ({
    mainInterface,
    setMainInterface,
}: {
    mainInterface: MainInterface;
    setMainInterface: React.Dispatch<React.SetStateAction<MainInterface>>;
}) => {
   
    return (
        <div>
           wordle display component works!
        </div>
    );
};

export default WordleDisplayComponent;
