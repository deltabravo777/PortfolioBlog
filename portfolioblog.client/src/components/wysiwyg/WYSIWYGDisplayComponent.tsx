import * as React from 'react';
import { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill's CSS for styling
import { MainInterface } from '../../models/main-interface/MainInterface';
import { deepClone } from '../../utility/deepClone';
import { BlogArticle } from '../../models/blog/blog-article/BlogArticle';
import { ArticleEditMode } from '../../models/main-interface/editor/ArticleEditMode';
import TitleUpdateFormComponent from './form/TitleUpdateFormComponent';
import EditArticleDisplayComponent from './edit-article/EditArticleDisplayComponent';

const WYSIWYGDisplayComponent = ({ mainInterface, setMainInterface }:
    { mainInterface: MainInterface, setMainInterface: React.Dispatch<React.SetStateAction<MainInterface>> }) => {

    const [editorContent, setEditorContent] = useState<string>('');
    const [remainingHeight, setRemainingHeight] = useState<number>(300); // Default height

    const calculateRemainingHeight = () => {
        const headerHeight = document.getElementById('dropdownContainer')?.getBoundingClientRect().top || 0;
        const windowHeight = window.innerHeight;
        setRemainingHeight(windowHeight - headerHeight - 33); // Add some margin
    };

    useEffect(() => {
        calculateRemainingHeight(); // Initial calculation
        window.addEventListener('resize', calculateRemainingHeight);
        return () => window.removeEventListener('resize', calculateRemainingHeight);
    }, []);

    const handleContentChange = (content: string) => {
        setEditorContent(content);

        setMainInterface(prevState => {
            const copyMain: MainInterface = deepClone(prevState); // Clone the latest state
            copyMain.wysiwygObject.textFormInputString = content;
            return copyMain; // Return updated state
        });
    };

    const FetchAllArticles = () => {
        mainInterface.articlesHandler?.FetchAllArticles();
    };

    const FetchAllPlaylists = () => {
        mainInterface.playlistsHandler?.FetchAllPlaylists();
    };

    const convertPlainTextToHtml = (text: string): string => {
        return text.split('\n').map(line => `<p>${line}</p>`).join('');
    };

    const selectArticleForEdit = (article: BlogArticle) => {
        console.log(article);

        let displayText = convertPlainTextToHtml(article.articleBody);
        setEditorContent(displayText);

        setMainInterface(prevState => {
            const copyMain: MainInterface = deepClone(prevState); // Clone the latest state
            copyMain.editorObject.articleEditMode = ArticleEditMode.article;
            copyMain.editorObject.editingArticle = article;
            return copyMain; // Return updated state
        });
    }


    return (
        <div>
            <p>WYSIWYG works!</p>
            <div id="dropdownContainer" className="d-flex flex-row align-items-center gap-2">
                <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={FetchAllArticles}
                >
                    Fetch Articles
                </button>
                <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={FetchAllPlaylists}
                >
                    Fetch Playlists
                </button>

                {/* Articles Dropdown */}
                {mainInterface.articleObject.articles.length > 0 && (
                    <div className="dropdown">
                        <button
                            className="btn btn-sm btn-outline-secondary dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            Select an Article
                        </button>
                        <ul
                            className="dropdown-menu"
                            aria-labelledby="dropdownMenuButton"
                            style={{
                                maxHeight: `${remainingHeight}px`,
                                overflowY: 'auto',
                            }}
                        >
                            {mainInterface.articleObject.articles.map((article, index) => (
                                <li key={index}>
                                    <button className="dropdown-item" type="button" onClick={() => selectArticleForEdit(article)}>
                                        {article.title}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Playlists Dropdown */}
                {mainInterface.playlistObject.playlists.length > 0 && (
                    <div className="dropdown">
                        <button
                            className="btn btn-sm btn-outline-secondary dropdown-toggle"
                            type="button"
                            id="playlistsDropdown"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            Select a Playlist
                        </button>
                        <ul
                            className="dropdown-menu"
                            aria-labelledby="playlistsDropdown"
                            style={{
                                maxHeight: `${remainingHeight}px`,
                                overflowY: 'auto',
                            }}
                        >
                            {mainInterface.playlistObject.playlists.map((playlist, index) => (
                                <li key={index}>
                                    <button className="dropdown-item" type="button">
                                        {playlist.title}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            <br />
            <div>
                {
                    mainInterface.editorObject.articleEditMode == ArticleEditMode.article
                    &&
                    <div>
                            <div className="d-flex flex-row align-items-center">
                                <p className="mb-0">Title:</p>
                                <TitleUpdateFormComponent mainInterface={mainInterface} setMainInterface={setMainInterface} />
                            </div>
                            <EditArticleDisplayComponent mainInterface={mainInterface} setMainInterface={setMainInterface} />
                    </div>
                    
                }
                
            </div>
            <br />
            <ReactQuill
                value={editorContent}
                onChange={handleContentChange}
                theme="snow" // You can use "bubble" for a different theme
                style={{ border: 'solid 1px gray' }}
            />
        </div>
    );
};

export default WYSIWYGDisplayComponent;
