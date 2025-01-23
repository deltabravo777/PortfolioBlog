import * as React from 'react';
import { MainInterface } from '../../models/main-interface/MainInterface';
import WYSIWYGButton from './buttons/WYSIWYGButton';
import ArticleHomepageButton from './buttons/ArticleHomepageButton';
import MusicPlaylistsButton from './buttons/MusicPlaylistsButton';
import CreateArticleButton from './buttons/CreateArticleButton';

const NavBarTop = ({ mainInterface, setMainInterface }:
    { mainInterface: MainInterface, setMainInterface: React.Dispatch<React.SetStateAction<MainInterface>> }) => {
    return (
        <div style={{ width: '100%', backgroundColor: 'gray', height: '50px', margin: '0px', padding: '0px' }}
            className="d-flex flex-row align-items-center justify-content-between">
            <div></div>
            <div>
                <MusicPlaylistsButton mainInterface={mainInterface} setMainInterface={setMainInterface} />
                <ArticleHomepageButton mainInterface={mainInterface} setMainInterface={setMainInterface} />
                <CreateArticleButton mainInterface={mainInterface} setMainInterface={setMainInterface} />
                <WYSIWYGButton mainInterface={mainInterface} setMainInterface={setMainInterface} />
            </div>
        </div>
    );
}

export default NavBarTop;
