import * as React from 'react';
import { Player } from '../../../models/holdem-interface/player/player';
import { getSuitSymbol } from './card-display/getSuitSymbol';
import { getCardName } from './card-display/getCardName';
import { CardCombosEnum } from '../../../models/holdem/CardCombosEnum';

const PlayerTileComponent = ({ player, id }: { player: Player; id: string }) => {

    const forLoopPlayerCards = player.cards.map((card, index) => (
        <div key={index} className="row align-items-center">
            <div className="d-flex align-items-center">
                {/* Suit Symbol */}
                {getSuitSymbol(card.suit)}
                {/* Card Number */}
                <div className="me-2">{getCardName(card.cardNumber)}</div>
            </div>
        </div>
    ));

    const formatPokerHandRank = (rank: CardCombosEnum): string => {
        const formattedRank = CardCombosEnum[rank]
            .replace(/([A-Z])/g, " $1") // Add space before capital letters
            .trim(); // Remove leading space

        return `${formattedRank}`;
    };


    return (
        <div id={id} style={{ marginBottom: '6px' }} >
            <div>{player.name}</div>
            {player.winner && <div style={{ color: 'forestgreen' }}>Winner!</div>}
            <div>{forLoopPlayerCards}</div>
            <div>Rank: {player.totalRank} {formatPokerHandRank(player.rank)}</div>
            
        </div>
    );
};

export default PlayerTileComponent;
