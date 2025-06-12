import * as React from 'react';
import { MainInterface } from '../../models/main-interface/MainInterface';
import WYSIWYGButton from './buttons/WYSIWYGButton';
import ArticleHomepageButton from './buttons/ArticleHomepageButton';
import MusicPlaylistsButton from './buttons/MusicPlaylistsButton';
import CreateArticleButton from './buttons/CreateArticleButton';
import HoldemButton from './buttons/HoldemButton';
import PracticeSpaceInvadersButton from './buttons/Practice_SpaceInvadersButton';
import SpaceInvadersButton from './buttons/SpaceInvadersButton';
import WordleButton from './buttons/WordleButton';

const NavBarTop = ({ mainInterface, setMainInterface }:
    { mainInterface: MainInterface, setMainInterface: React.Dispatch<React.SetStateAction<MainInterface>> }) => {
    return (
        <div style={{ width: '100%', backgroundColor: 'gray', height: '50px', margin: '0px', padding: '0px' }}
            className="d-flex flex-row align-items-center justify-content-between">
            <div></div>
            <div>
                <WordleButton mainInterface={mainInterface} setMainInterface={setMainInterface} />
                <SpaceInvadersButton mainInterface={mainInterface} setMainInterface={setMainInterface} />
                <PracticeSpaceInvadersButton mainInterface={mainInterface} setMainInterface={setMainInterface} />
                <HoldemButton mainInterface={mainInterface} setMainInterface={setMainInterface} />
                <MusicPlaylistsButton mainInterface={mainInterface} setMainInterface={setMainInterface} />
                <ArticleHomepageButton mainInterface={mainInterface} setMainInterface={setMainInterface} />
                <CreateArticleButton mainInterface={mainInterface} setMainInterface={setMainInterface} />
                <WYSIWYGButton mainInterface={mainInterface} setMainInterface={setMainInterface} />
            </div>
        </div>
    );
}

export default NavBarTop;