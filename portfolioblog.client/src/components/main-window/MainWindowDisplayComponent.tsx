import * as React from 'react'
import { MainInterface } from '../../models/main-interface/MainInterface';
import { WindowDisplayEnum } from '../../models/window-display/window-display-emum';
import HomepageComponent from '../homepage/HomepageComponent';
import WYSIWYGDisplayComponent from '../wysiwyg/WYSIWYGDisplayComponent';
import ArticlesDisplayComponent from '../articles/ArticlesDisplayComponent';
import SingleArticleDisplayComponent from '../articles/SingleArticleDisplayComponent';
import PlaylistsDisplayComponent from '../playlists/PlaylistsDisplayComponent';
import SinglePlaylistDisplayComponent from '../playlists/SinglePlaylistDisplayComponent';
import CreateArticleDisplayComponent from '../articles/create-article/CreateArticleDisplayComponent';
import HoldemDisplayComponent from '../holdem/HoldemDisplayComponent';
import PracticeSpaceInvacdersDisplayComponent from '../practice-spaceinvaders/PracticeSpaceInvadersDisplayComponent';
import SpaceInvadersDisplayComponent from '../spaceinvaders/SpaceInvadersDisplayComponent';
import WordleDisplayComponent from '../wordle/WordleDisplayComponent';

const MainWindowDisplayComponent = ({ mainInterface, setMainInterface }:
    { mainInterface: MainInterface, setMainInterface: React.Dispatch<React.SetStateAction<MainInterface>> }) => {


    return (
        <div>
            {mainInterface.windowDisplayEnumValue == WindowDisplayEnum.homepage
                &&
                <HomepageComponent mainInterface={mainInterface} setMainInterface={setMainInterface} />
            }

            {mainInterface.windowDisplayEnumValue == WindowDisplayEnum.wysiwyg
                &&
                <WYSIWYGDisplayComponent mainInterface={mainInterface} setMainInterface={setMainInterface} />
            }

            {mainInterface.windowDisplayEnumValue == WindowDisplayEnum.articles
                &&
                <ArticlesDisplayComponent mainInterface={mainInterface} setMainInterface={setMainInterface} />
            }

            {mainInterface.windowDisplayEnumValue == WindowDisplayEnum.singleArticle
                &&
                <SingleArticleDisplayComponent mainInterface={mainInterface} setMainInterface={setMainInterface} />
            }

            {mainInterface.windowDisplayEnumValue == WindowDisplayEnum.playlists
                &&
                <PlaylistsDisplayComponent mainInterface={mainInterface} setMainInterface={setMainInterface} />
            }

            {mainInterface.windowDisplayEnumValue == WindowDisplayEnum.singlePlaylist
                &&
                <SinglePlaylistDisplayComponent mainInterface={mainInterface} setMainInterface={setMainInterface} />
            }

            {mainInterface.windowDisplayEnumValue == WindowDisplayEnum.createArticle
                &&
                <CreateArticleDisplayComponent mainInterface={mainInterface} setMainInterface={setMainInterface} />
            }

            {mainInterface.windowDisplayEnumValue == WindowDisplayEnum.holdem
                &&
                <HoldemDisplayComponent mainInterface={mainInterface} setMainInterface={setMainInterface} />
            }

            {mainInterface.windowDisplayEnumValue == WindowDisplayEnum.practice_spaceInvaders
                &&
                <PracticeSpaceInvacdersDisplayComponent mainInterface={mainInterface} setMainInterface={setMainInterface} />
            }

            {mainInterface.windowDisplayEnumValue == WindowDisplayEnum.spaceInvaders
                &&
                <SpaceInvadersDisplayComponent mainInterface={mainInterface} setMainInterface={setMainInterface} />
            }

            {mainInterface.windowDisplayEnumValue == WindowDisplayEnum.wordle
                &&
                <WordleDisplayComponent mainInterface={mainInterface} setMainInterface={setMainInterface} />
            }

        </div>
    );
}

export default MainWindowDisplayComponent;