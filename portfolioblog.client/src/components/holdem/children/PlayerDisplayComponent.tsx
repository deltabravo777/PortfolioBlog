import * as React from 'react'
import { HoldemInterface } from '../../../models/holdem-interface/HoldemInterface';
import { Player } from '../../../models/holdem-interface/player/player';
import PlayerTileComponent from './PlayerTileComponent';

const PlayerDisplayComponent = ({ holdemInterface, setHoldemInterface }:
    { holdemInterface: HoldemInterface, setHoldemInterface: React.Dispatch<React.SetStateAction<HoldemInterface>> }) => {

    // Store the mapped players in a constant
    const playerTiles = holdemInterface.room.players.map((player: Player) => (
        <div key={player.name} className="col-md-6">
            <PlayerTileComponent player={player} id={player.name} />
        </div>
    ));

    return (
        <div className="container">
            <div className="row">
                {playerTiles} {/* Insert the mapped elements here */}
            </div>
        </div>
    );
}

export default PlayerDisplayComponent;
