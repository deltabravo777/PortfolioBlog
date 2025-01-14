import * as React from 'react'
import { useEffect } from 'react'
import { MainInterface } from '../../models/main-interface/MainInterface';
import axios from 'axios'
import { aspnetUrl } from '../../environment/environment'
import { deepClone } from '../../utility/deepClone';
import { MusicPlaylist } from '../../models/blog/blog-playlist/music-playlist';
import { WindowDisplayEnum } from '../../models/window-display/window-display-emum';

const PlaylistsDisplayComponent = ({ mainInterface, setMainInterface }:
    { mainInterface: MainInterface, setMainInterface: React.Dispatch<React.SetStateAction<MainInterface>> }) => {


    useEffect(() => {
        console.log('PlaylistsDisplayComponent mounted');
        FetAllPlaylists();
    }, []);

    const setSinglePlaylist = (playlist: MusicPlaylist) => {
        console.log(`setting single article`)
        let copyMain = deepClone(mainInterface);
        copyMain.windowDisplayEnumValue = WindowDisplayEnum.singlePlaylist;
        copyMain.playlistObject.singlePlaylist = playlist;
        setMainInterface(copyMain);
    }

    const FetAllPlaylists = async () => {
        try {
            const response = await axios.get(`${aspnetUrl}/api/Playlist/GetAllPlaylists`);
            console.log(response.data);

            let copyMain = deepClone(mainInterface);
            copyMain.playlistObject.playlists = response.data;
            copyMain.playlistObject.playlists.sort((a: MusicPlaylist, b: MusicPlaylist) => b.rank - a.rank);
            setMainInterface(copyMain);

            //setSingleArticle(response.data); // Assuming response data is the list of articles
        } catch (error) {
            console.error('Error fetching articles:', error);
        }
    };

    const playlistDivs = mainInterface.playlistObject.playlists.map((playlist: MusicPlaylist) => (
        <div
            key={playlist.id}
            style={{
                height: "160px",
                //backgroundImage: `url(${require(`../../assets/blog-pictures/${article.photoPath}`)})`,
                backgroundImage: `url(../../src/assets/blog-pictures/${playlist.photoPath})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                margin: "5px",
                width: "32%",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
            className="article-tile"
            onClick={() => { setSinglePlaylist(playlist)} }
        >
            <h5 style={{
                textShadow: '1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black'
            }}>
                {playlist.title}
            </h5>
        </div>
    ));

    return (
        <div>
            
            <div className="row d-flex">
                <div className="col-sm-10 justify-content-between mx-auto">
                    <div className="row">
                        {playlistDivs}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PlaylistsDisplayComponent;