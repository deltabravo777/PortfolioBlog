import { useEffect, useState } from 'react';
import './App.css';
import { MainInterface } from './models/main-interface/MainInterface';
import MainFunc from './func/main-func';
import { deepClone } from './utility/deepClone';
import NavBarTop from './components/navbar/NavBarTop';
import { WindowDisplayEnum } from './models/window-display/window-display-emum';
import MainWindowDisplayComponent from './components/main-window/MainWindowDisplayComponent';
import ArticlesFunc from './func/article/ArticlesFunc';
import PlaylistsFunc from './func/playlist/PlaylistsFunc';
import { ArticleEditMode } from './models/main-interface/editor/ArticleEditMode';
import { CalendarMonths } from './models/blog/blog-article/CalendarMonths';
import { ArticleCategories } from './models/blog/blog-article/ArticleCategories';

function App() {

    const [mainInterface, setMainInterface] = useState<MainInterface>({
        user: "Daniel Bae",
        windowDisplayEnumValue: WindowDisplayEnum.homepage,
        jsonHeaders: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },

        wysiwygObject: {
            textFormInputString: ''
        },
        articleObject: {
            articles: [],
            singleArticle: null
        },
        playlistObject: {
            playlists: [],
            singlePlaylist: null
        },
        editorObject: {
            articleEditMode: ArticleEditMode.None,
            editingArticle: null
        },
        newArticleObject: {
            newArticle: {
                id: 0, // Low numeric value
                encryptedId: null, // Corresponds to nullable field
                title: "", // Empty string as default
                articleBody: "", // Empty string for body
                photoPath: "", // Empty string for photo path
                year: 0, // Low numeric value for year
                month: CalendarMonths.None, // Placeholder for the first value in CalendarMonths enum
                day: 0, // Low numeric value for day
                rank: 0, // Low numeric value for rank
                category: ArticleCategories.None, // Placeholder for a category in ArticleCategories enum
            }
        }

    });

    useEffect(() => {
        var mainCopy: MainInterface = deepClone(mainInterface);
        mainCopy.mainFuncHandler = MainFunc({ mainInterface, setMainInterface });
        mainCopy.articlesHandler = ArticlesFunc({ mainInterface, setMainInterface });
        mainCopy.playlistsHandler = PlaylistsFunc({ mainInterface, setMainInterface });
        setMainInterface(mainCopy);
    }, []); // Empty dependency array to mimic componentDidMount

    //mainFuncHandler = MainFunc({ mainInterface, setMainInterface });

    return (
        <div>
            <NavBarTop mainInterface={mainInterface} setMainInterface={setMainInterface} />

            <MainWindowDisplayComponent mainInterface={mainInterface} setMainInterface={setMainInterface} />

        </div>
    );

}

export default App;