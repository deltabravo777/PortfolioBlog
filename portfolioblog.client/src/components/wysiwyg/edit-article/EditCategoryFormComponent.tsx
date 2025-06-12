import * as React from 'react';
//import { MainInterface } from '../../../../models/main-interface/MainInterface';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MainInterface } from '../../../models/main-interface/MainInterface';
import { ArticleCategories } from '../../../models/blog/blog-article/ArticleCategories';
import { deepClone } from '../../../utility/deepClone';
//import { ArticleCategories } from '../../../../models/blog/blog-article/ArticleCategories'; // Import your ArticleCategories enum
//import { deepClone } from '../../../../utility/deepClone';

// Utility function to add spaces between camel case words
const formatEnumDisplay = (enumValue: string) => {
    return enumValue.replace(/([a-z0-9])([A-Z])/g, '$1 $2');
};

const EditCategoryFormComponent = ({ mainInterface, setMainInterface }:
    { mainInterface: MainInterface, setMainInterface: React.Dispatch<React.SetStateAction<MainInterface>> }) => {

    const handleCategorySelect = (category: ArticleCategories) => {
        setMainInterface(prevState => {
            const copyMain: MainInterface = deepClone(prevState); // Clone the latest state
            if (copyMain.editorObject.editingArticle) {
                copyMain.editorObject.editingArticle.category = category; // Update the category
            }
            return copyMain; // Return updated state
        });
    };

    return (
        <div className="dropdown">
            <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownCategoryButton"
                data-bs-toggle="dropdown" // For Bootstrap 5
                aria-haspopup="true"
                aria-expanded="false"
            >
                {mainInterface.editorObject.editingArticle?.category !== ArticleCategories.None
                    ? formatEnumDisplay(ArticleCategories[mainInterface.editorObject.editingArticle!.category])
                    : 'Select Category'}
            </button>

            <div className="dropdown-menu" aria-labelledby="dropdownCategoryButton">
                {Object.values(ArticleCategories)
                    .filter((value) => typeof value === 'number') // Filter numeric enum values
                    .map((categoryValue) => (
                        <button
                            key={categoryValue}
                            className="dropdown-item"
                            onClick={() => handleCategorySelect(categoryValue as ArticleCategories)}
                        >
                            {formatEnumDisplay(ArticleCategories[categoryValue])}
                        </button>
                    ))}
            </div>
        </div>
    );
}

export default EditCategoryFormComponent;
