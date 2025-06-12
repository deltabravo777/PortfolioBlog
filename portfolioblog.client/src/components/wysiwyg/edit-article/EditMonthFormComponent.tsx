import * as React from 'react';
import { MainInterface } from '../../../models/main-interface/MainInterface';
import { CalendarMonths } from '../../../models/blog/blog-article/CalendarMonths';
import { deepClone } from '../../../utility/deepClone';
//import { MainInterface } from '../../../../models/main-interface/MainInterface';
//import 'bootstrap/dist/css/bootstrap.min.css';
//import { CalendarMonths } from '../../../../models/blog/blog-article/CalendarMonths';
//import { deepClone } from '../../../../utility/deepClone';

const EditMonthFormComponent = ({ mainInterface, setMainInterface }:
    { mainInterface: MainInterface, setMainInterface: React.Dispatch<React.SetStateAction<MainInterface>> }) => {

    const handleMonthSelect = (month: CalendarMonths) => {
        setMainInterface(prevState => {
            const copyMain: MainInterface = deepClone(prevState); // Clone the latest state
            if (copyMain.editorObject.editingArticle) {
                copyMain.editorObject.editingArticle.month = month; // Update the month
            }
            return copyMain; // Return updated state
        });
    };

    return (
        <div className="dropdown">
            <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown" // For Bootstrap 5
                aria-haspopup="true"
                aria-expanded="false"
            >
                {mainInterface.editorObject.editingArticle
                    &&
                    mainInterface.editorObject.editingArticle?.month != CalendarMonths.None
                    ? CalendarMonths[mainInterface.editorObject.editingArticle?.month]
                    : 'Select Month'}
            </button>

            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                {Object.values(CalendarMonths)
                    .filter((value) => typeof value === 'number') // Filter numeric enum values
                    .map((monthValue) => (
                        <button
                            key={monthValue}
                            className="dropdown-item"
                            onClick={() => handleMonthSelect(monthValue as CalendarMonths)}
                        >
                            {CalendarMonths[monthValue]}
                        </button>
                    ))}
            </div>
        </div>
    );
}

export default EditMonthFormComponent;
