import * as React from 'react';
import { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill's CSS for styling
import { MainInterface } from '../../../models/main-interface/MainInterface';
import { deepClone } from '../../../utility/deepClone';
import CreateTitleFormComponent from './child-components/CreateTitleFormComponent';
import FileUploadComponent from '../../file-upload/FileUploadComponent';
import SelectMonthFormComponent from './child-components/SelectMonthFormComponent';
import SelectDayFormComponent from './child-components/SelectDayFormComponent';
import SelectYearFormComponent from './child-components/SelectYearFormComponent';
import SelectCategoryFormComponent from './child-components/SelectCategoryFormComponent';
import SelectRankFormComponent from './child-components/SelectRankFormComponent';
import { BlogArticle } from '../../../models/blog/blog-article/BlogArticle';

const CreateArticleDisplayComponent = ({ mainInterface, setMainInterface }:
    { mainInterface: MainInterface, setMainInterface: React.Dispatch<React.SetStateAction<MainInterface>> }) => {

    const [editorContent, setEditorContent] = useState<string>('');

    // useEffect with async function
    useEffect(() => {
        // Declare an async function within the effect
        const initializeComponent = async () => {
            console.log("Component initialized");

            // Example: Set initial values or perform setup logic if needed
            setEditorContent(mainInterface.newArticleObject?.newArticle?.articleBody || ''); // Set the editor content if available

            // Call your async method to fetch articles
            let response: BlogArticle[] = await mainInterface.articlesHandler?.FetchAllArticles();
            // Assuming articleObject.articles is an array of articles with a 'rank' property
            const maxRank = Math.max(...response.map(article => article.rank));
            setMainInterface(prevState => {
                const copyMain: MainInterface = deepClone(prevState); // Clone the latest state
                copyMain.newArticleObject.newArticle!.rank = maxRank + 1;
                return copyMain; // Return updated state
            });

            // You can perform other initializations here if needed
        };

        // Call the async function
        initializeComponent();
    }, []); // Empty dependency array ensures this runs only once (on component mount)

    const handleContentChange = (content: string) => {
        setEditorContent(content);

        setMainInterface(prevState => {
            const copyMain: MainInterface = deepClone(prevState); // Clone the latest state
            if (copyMain.newArticleObject.newArticle) {
                copyMain.newArticleObject.newArticle.articleBody = content;
            }

            return copyMain; // Return updated state
        });
    };

    const handleSaveArticle = async () => {
        let newArticle = mainInterface.newArticleObject.newArticle;
        if (newArticle) {
            //newArticle.articleBody = newArticle?.articleBody.replace(/<p>\s*<\/p>/g, "<br />");
            newArticle.articleBody = newArticle?.articleBody.replace(/<p>\s*(<br\s*\/?>)?\s*<\/p>/g, "<br />");

            if (newArticle?.day == 0 || newArticle?.month == 0 || newArticle?.year == 0) {
                alert("please fill in the date")
            } else {
                await mainInterface.articlesHandler?.UploadNewArticle(newArticle as BlogArticle);
            }

            if (false) setMainInterface(prevState => {
                const copyMain: MainInterface = deepClone(prevState);
                copyMain.articleObject.articles.push(newArticle); // Add the new article to the list
                return copyMain;
            });
        }


        //alert('Article saved successfully!');
    };

    return (
        <div>
            <p>Create Article works!</p>

            <div className="d-flex flex-row align-items-center">
                <p className="mb-0">Title:</p>
                <CreateTitleFormComponent mainInterface={mainInterface} setMainInterface={setMainInterface} />
            </div>

            <div>
                <FileUploadComponent mainInterface={mainInterface} setMainInterface={setMainInterface} />
            </div>

            <div>
                <SelectMonthFormComponent mainInterface={mainInterface} setMainInterface={setMainInterface} />
            </div>

            <div>
                <SelectDayFormComponent mainInterface={mainInterface} setMainInterface={setMainInterface} />
            </div>

            <div>
                <SelectYearFormComponent mainInterface={mainInterface} setMainInterface={setMainInterface} />
            </div>

            <div>
                <SelectCategoryFormComponent mainInterface={mainInterface} setMainInterface={setMainInterface} />
            </div>

            <div>
                <SelectRankFormComponent mainInterface={mainInterface} setMainInterface={setMainInterface} />
            </div>

            <div id="createArticleContainer" className="d-flex flex-column gap-2">
                <ReactQuill
                    value={editorContent}
                    onChange={handleContentChange}
                    theme="snow" // You can use "bubble" for a different theme
                    style={{ border: 'solid 1px gray', height: '300px' }} // Set a static height
                />
            </div>
            <div style={{ height: "40px" }}></div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0 0px' }}>
                <button
                    className="btn btn-primary"
                    style={{
                        width: '100%',
                        maxWidth: '300px', // Optional: Restrict button width for better usability
                        padding: '12px 16px',
                        marginTop: '10px',
                        fontSize: '16px',
                        borderRadius: '4px',
                    }}
                    onClick={handleSaveArticle}
                >
                    Save Article
                </button>
            </div>
        </div>
    );
};

export default CreateArticleDisplayComponent;
