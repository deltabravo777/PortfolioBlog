import { Suits } from "../../../../models/holdem-interface/card/suits";

export const getSuitSymbol = (suit: Suits) => {
    const suitStyles: { [key in Suits]: string } = {
        [Suits.Spade]: "black",
        [Suits.Heart]: "red",
        [Suits.Club]: "blue",
        [Suits.Diamond]: "green"
    };

    const iconClasses: { [key in Suits]: string } = {
        [Suits.Spade]: "bi bi-suit-spade-fill",
        [Suits.Heart]: "bi bi-suit-heart-fill",
        [Suits.Club]: "bi bi-suit-club-fill",
        [Suits.Diamond]: "bi bi-suit-diamond-fill"
    };

    return (
        <i className= { iconClasses[suit]} style = {{ color: suitStyles[suit] }}> </i>
    );
};