import * as React from 'react'
import { MainInterface } from '../../models/main-interface/MainInterface';

const SingleArticleDisplayComponent = ({ mainInterface, setMainInterface }:
    { mainInterface: MainInterface, setMainInterface: React.Dispatch<React.SetStateAction<MainInterface>> }) => {

    return (
        <div>
            <h4>{mainInterface.articleObject.singleArticle?.title}</h4>
            <br />
            <div className="row">
                <div className="col-sm-8">
                    <p style={{ whiteSpace: 'pre-wrap' }}>
                        {mainInterface.articleObject.singleArticle?.articleBody}
                    </p>
                </div>
            </div>
            

        </div>
    );
}

export default SingleArticleDisplayComponent;