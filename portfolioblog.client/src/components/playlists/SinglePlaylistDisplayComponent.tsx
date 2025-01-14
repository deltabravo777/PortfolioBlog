import * as React from 'react'
import { MainInterface } from '../../models/main-interface/MainInterface';

const SinglePlaylistDisplayComponent = ({ mainInterface, setMainInterface }:
    { mainInterface: MainInterface, setMainInterface: React.Dispatch<React.SetStateAction<MainInterface>> }) => {

    return (
        <div>
            <h4>{mainInterface.playlistObject.singlePlaylist?.title}</h4>
            <br />
            <div className="row">
                <div className="col-sm-8">
                    <p style={{ whiteSpace: 'pre-wrap' }}>
                        {mainInterface.playlistObject.singlePlaylist?.playlistBody}
                    </p>
                </div>
            </div>


        </div>
    );
}

export default SinglePlaylistDisplayComponent;