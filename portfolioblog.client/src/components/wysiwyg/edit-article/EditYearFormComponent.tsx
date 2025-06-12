import * as React from 'react'
import { deepClone } from '../../../utility/deepClone';
import { MainInterface } from '../../../models/main-interface/MainInterface';
//import { MainInterface } from '../../../../models/main-interface/MainInterface';
//import { deepClone } from '../../../../utility/deepClone';

const EditYearFormComponent = ({ mainInterface, setMainInterface }:
    { mainInterface: MainInterface, setMainInterface: React.Dispatch<React.SetStateAction<MainInterface>> }) => {

    const handleYearFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;

        // Cast newValue to a number
        const numberValue = Number(newValue);

        setMainInterface(prevState => {
            const copyMain: MainInterface = deepClone(prevState); // Clone the latest state
            if (copyMain.editorObject?.editingArticle) {
                copyMain.editorObject.editingArticle.year = numberValue;  // Set the casted number
            }
            return copyMain; // Return updated state
        });

        console.log("Input changed:", newValue, "Casted to number:", numberValue);
    };

    return (
        <form>
            <div className="form-row align-items-center">
                <div className="col-auto">
                    <div className="input-group mb-2">
                        <div className="input-group-prepend">
                            <div className="input-group-text">Year</div>
                        </div>
                        <input
                            type="text"
                            className="form-control"
                            id="inlineFormInputDay"
                            placeholder="Enter a year"
                            value={mainInterface.editorObject?.editingArticle?.year || ''}
                            onChange={handleYearFormChange}
                        />
                    </div>
                </div>
                {/*<div className="col-auto">*/}
                {/*    <button type="submit" className="btn btn-primary mb-2">Submit</button>*/}
                {/*</div>*/}
            </div>
        </form>
    );
}

export default EditYearFormComponent;
