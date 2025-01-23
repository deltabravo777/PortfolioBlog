import * as React from 'react'
import { MainInterface } from '../../models/main-interface/MainInterface';
import axios from 'axios'
import { aspnetUrl } from '../../environment/environment'
import { deepClone } from '../../utility/deepClone';
import { MusicPlaylist } from '../../models/blog/blog-playlist/music-playlist';
import { WindowDisplayEnum } from '../../models/window-display/window-display-emum';

const PlaylistsFunc = ({ mainInterface, setMainInterface }:
    { mainInterface: MainInterface, setMainInterface: React.Dispatch<React.SetStateAction<MainInterface>> }) => {


    const FetchAllPlaylists = async () => {
        try {
            const response = await axios.get(`${aspnetUrl}/api/Playlist/GetAllPlaylists`);
            console.log(response.data);

            //let copyMain = deepClone(mainInterface);
            ////console.log(copyMain)
            //copyMain.playlistObject.playlists = response.data;
            //copyMain.playlistObject.playlists.sort((a: MusicPlaylist, b: MusicPlaylist) => b.rank - a.rank);
            //setMainInterface(copyMain);
            setMainInterface(prevState => {
                let copyMain = deepClone(prevState);
                //console.log('Before update:', copyMain);
                copyMain.playlistObject.playlists = response.data;
                copyMain.playlistObject.playlists.sort((a: MusicPlaylist, b: MusicPlaylist) => b.rank - a.rank);
                //console.log('After update:', copyMain);
                return copyMain;
            });

            //setSingleArticle(response.data); // Assuming response data is the list of articles
        } catch (error) {
            console.error('Error fetching articles:', error);
        }
    };

    return { FetchAllPlaylists }
}

export default PlaylistsFunc;