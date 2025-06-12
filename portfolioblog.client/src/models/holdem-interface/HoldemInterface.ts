import DeckDealingFunc from "../../func/holdem/deck-dealing-func";
import MainHoldemFunc from "../../func/holdem/main-holdem-func";
import { Deck } from "./deck/deck";
import { Player } from "./player/player";
import { Room } from "./room/room";

export interface HoldemInterface {
    room: Room;

    mainHoldemHandler?: ReturnType<typeof MainHoldemFunc>
    deckDealingHandler?: ReturnType<typeof DeckDealingFunc>
}