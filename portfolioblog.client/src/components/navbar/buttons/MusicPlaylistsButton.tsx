import * as React from 'react'
import { MainInterface } from '../../../models/main-interface/MainInterface';
import { deepClone } from '../../../utility/deepClone';
import { WindowDisplayEnum } from '../../../models/window-display/window-display-emum';

const MusicPlaylistsButton = ({ mainInterface, setMainInterface }:
    { mainInterface: MainInterface, setMainInterface: React.Dispatch<React.SetStateAction<MainInterface>> }) => {

    const toggleToPlaylistsHomepage = () => {
        var copyMain = deepClone(mainInterface);
        copyMain.windowDisplayEnumValue = WindowDisplayEnum.playlists;
        setMainInterface(copyMain);
    }

    return (
        <i className="bi bi-file-earmark-music" onClick={toggleToPlaylistsHomepage} style={{ padding: '7px' }}></i>
    );
}

export default MusicPlaylistsButton;