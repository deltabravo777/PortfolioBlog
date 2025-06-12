import * as React from 'react'
import { MainInterface } from '../../../models/main-interface/MainInterface';
import FileEditComponent from './FileEditComponent';
import EditMonthFormComponent from './EditMonthFormComponent';
import EditDayFormComponent from './EditDayFormComponent';
import EditYearFormComponent from './EditYearFormComponent';
import EditCategoryFormComponent from './EditCategoryFormComponent';
import EditRankFormComponent from './EditRankFormComponent';

const EditArticleDisplayComponent = ({ mainInterface, setMainInterface }:
    { mainInterface: MainInterface, setMainInterface: React.Dispatch<React.SetStateAction<MainInterface>> }) => {

    return (
        <div>
            {/*<div className="d-flex flex-row align-items-center">*/}
            {/*    <p className="mb-0">Title:</p>*/}
            {/*    <CreateTitleFormComponent mainInterface={mainInterface} setMainInterface={setMainInterface} />*/}
            {/*</div>*/}

            {/*<div>*/}
            {/*    inner chunk editing article*/}
            {/*</div>*/}

            <div>
                <FileEditComponent mainInterface={mainInterface} setMainInterface={setMainInterface} />
            </div>

            <div>
                <EditMonthFormComponent mainInterface={mainInterface} setMainInterface={setMainInterface} />
            </div>

            <div>
                <EditDayFormComponent mainInterface={mainInterface} setMainInterface={setMainInterface} />
            </div>

            <div>
                <EditYearFormComponent mainInterface={mainInterface} setMainInterface={setMainInterface} />
            </div>

            <div>
                <EditCategoryFormComponent mainInterface={mainInterface} setMainInterface={setMainInterface} />
            </div>

            <div>
                <EditRankFormComponent mainInterface={mainInterface} setMainInterface={setMainInterface} />
            </div>
        </div>
    );
}

export default EditArticleDisplayComponent;