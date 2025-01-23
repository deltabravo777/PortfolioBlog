import * as React from 'react';
import { MainInterface } from '../../../../models/main-interface/MainInterface';
import { deepClone } from '../../../../utility/deepClone';

const SelectRankFormComponent = ({ mainInterface, setMainInterface }:
    { mainInterface: MainInterface, setMainInterface: React.Dispatch<React.SetStateAction<MainInterface>> }) => {

    const handleRankFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;

        // Cast newValue to a number
        const numberValue = Number(newValue);

        setMainInterface(prevState => {
            const copyMain: MainInterface = deepClone(prevState); // Clone the latest state
            if (copyMain.newArticleObject?.newArticle) {
                copyMain.newArticleObject.newArticle.rank = numberValue;  // Set the casted number
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
                            <div className="input-group-text">Rank</div>
                        </div>
                        <input
                            type="text"
                            className="form-control"
                            id="inlineFormInputRank"
                            placeholder="Enter a rank"
                            value={mainInterface.newArticleObject?.newArticle?.rank || ''}
                            onChange={handleRankFormChange}
                        />
                    </div>
                </div>
            </div>
        </form>
    );
}

export default SelectRankFormComponent;
