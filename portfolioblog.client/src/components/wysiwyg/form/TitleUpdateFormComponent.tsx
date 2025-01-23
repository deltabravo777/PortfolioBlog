import * as React from 'react'
import { MainInterface } from '../../../models/main-interface/MainInterface';
import { deepClone } from '../../../utility/deepClone';

const TitleUpdateFormComponent = ({ mainInterface, setMainInterface }:
    { mainInterface: MainInterface, setMainInterface: React.Dispatch<React.SetStateAction<MainInterface>> }) => {

    const handleTitleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;

        setMainInterface(prevState => {
            const copyMain: MainInterface = deepClone(prevState); // Clone the latest state
            if (copyMain.editorObject.editingArticle) {
                copyMain.editorObject.editingArticle.title = newValue;
            } 
            return copyMain; // Return updated state
        });

        console.log("Input changed:", newValue);
        // Add additional logic here if needed
    };


    return (
        <input
            type="text"
            className="form-control form-control-sm"
            id="textInput"
            placeholder="Type something"
            value={mainInterface.editorObject.editingArticle?.title}
            onChange={handleTitleFormChange}
        />
    );
}

export default TitleUpdateFormComponent;