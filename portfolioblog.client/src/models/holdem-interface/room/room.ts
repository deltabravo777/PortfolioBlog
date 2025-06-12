import { PlayingCard } from "../card/playing-card";
import { Deck } from "../deck/deck";
import { Player } from "../player/player";

export class Room {
    deck: Deck;
    players: Player[] = [];

    constructor({ players }: { players: Player[] }) {
        this.deck = new Deck();
        this.players = players;
    }

    DrawAndDealPublicCard() {
        var drawnCard = this.deck.drawACard();
        for (let player of this.players) {
            player.addPublicCard(drawnCard);
        }
    }

    DrawAndDealPrivateCard() {
        for (let player of this.players) {
            var drawnCard = this.deck.drawACard();
            player.addPrivateCard(drawnCard);
        }
    }

    resetRound() {
        this.deck = new Deck();
        for (let player of this.players) {
            player.reset();
        }
    }

    getWinner() {
        let ranks: number[] = this.players.map((player) => player.totalRank);
        let maxRank = Math.max(...ranks);
        for (let player of this.players) {
            if (player.totalRank == maxRank) {
                player.winner = true;
            }
        }


    }


}