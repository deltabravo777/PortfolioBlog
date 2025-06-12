import { PlayingCard } from "../card/playing-card";
import { Suits } from "../card/suits";

export class Player {
    name: string = '';

    constructor(name: string) {
        this.name = name
    }

    cards: PlayingCard[] = [];

    private _twos: number = 0;
    private _threes: number = 0;
    private _fours: number = 0;
    private _fives: number = 0;
    private _sixes: number = 0;
    private _sevens: number = 0;
    private _eights: number = 0;
    private _nines: number = 0;
    private _tens: number = 0;
    private _jacks: number = 0;
    private _queens: number = 0;
    private _kings: number = 0;
    private _aces: number = 0;

    private _spades: number = 0;
    private _hearts: number = 0;
    private _clubs: number = 0;
    private _diamonds: number = 0;

    private _pairs: number = 0;
    private _triples: number = 0;
    private _quads: number = 0;

    public orderedSet: number[] = [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    public pairValues: Set<number> = new Set<number>();
    public tripleValues: Set<number> = new Set<number>();
    public quadValues: Set<number> = new Set<number>();

    public flushSuit: Suits | null = null;
    public topStraight: number = 0;
    public kickerValue: number = 0;
    public totalRank: number = 0;
    public winner: boolean = false;

    private _hasFlush: boolean = false;
    get hasFlush(): boolean { return this._hasFlush; }
    set hasFlush(value) {
        this._hasFlush = true;
        this.rank = 6;
    }


    private _hasStraight: boolean = false;
    get hasStraight() { return this._hasStraight }
    set hasStraight(value) {
        this._hasStraight = value;
    }


    private _rank: number = 0;
    get rank(): number { return this._rank; }
    set rank(value) {
        this._rank = value;
    }

    //-- Number Cards --
    get twos(): number { return this._twos; }
    set twos(value: number) {
        this._twos = value;
        this.handleSetMethod(2, value);
    }

    get threes(): number { return this._threes; }
    set threes(value: number) {
        this._threes = value;
        this.handleSetMethod(3, value);
    }

    get fours(): number { return this._fours; }
    set fours(value: number) {
        this._fours = value;
        this.handleSetMethod(4, value);
    }

    get fives(): number { return this._fives; }
    set fives(value: number) {
        this._fives = value;
        this.handleSetMethod(5, value);
    }

    get sixes(): number { return this._sixes; }
    set sixes(value: number) {
        this._sixes = value;
        this.handleSetMethod(6, value);
    }

    get sevens(): number { return this._sevens; }
    set sevens(value: number) {
        this._sevens = value;
        this.handleSetMethod(7, value);
    }

    get eights(): number { return this._eights; }
    set eights(value: number) {
        this._eights = value;
        this.handleSetMethod(8, value);
    }

    get nines(): number { return this._nines; }
    set nines(value: number) {
        this._nines = value;
        this.handleSetMethod(9, value);
    }

    get tens(): number { return this._tens; }
    set tens(value: number) {
        this._tens = value;
        this.handleSetMethod(10, value);
    }

    get jacks(): number { return this._jacks; }
    set jacks(value: number) {
        this._jacks = value;
        this.handleSetMethod(11, value);
    }

    get queens(): number { return this._queens; }
    set queens(value: number) {
        this._queens = value;
        this.handleSetMethod(12, value);
    }

    get kings(): number { return this._kings; }
    set kings(value: number) {
        this._kings = value;
        this.handleSetMethod(13, value);
    }

    get aces(): number { return this._aces; }
    set aces(value: number) {
        this._aces = value;
        this.handleSetMethod(14, value);
    }

    // -- Suits --
    get spades(): number { return this._spades; }
    set spades(value: number) {
        this._spades = value;
        this.checkFlush(value, Suits.Spade);
    }

    get hearts(): number { return this._hearts; }
    set hearts(value: number) {
        this._hearts = value;
        this.checkFlush(value, Suits.Heart);
    }

    get clubs(): number { return this._clubs; }
    set clubs(value: number) {
        this._clubs = value;
        this.checkFlush(value, Suits.Club);
    }

    get diamonds(): number { return this._diamonds; }
    set diamonds(value: number) {
        this._diamonds = value;
        this.checkFlush(value, Suits.Diamond);
    }

    //-- Combinations --
    get pairs(): number { return this._pairs; }
    set pairs(value: number) {
        this._pairs = value;
    }

    get triples(): number { return this._triples; }
    set triples(value: number) {
        this._triples = value;
    }

    get quads(): number { return this._quads; }
    set quads(value: number) {
        this._quads = value;
    }

    get topPair(): number {
        return this.pairValues.size > 0 ? Math.max(...this.pairValues) : 0;
    }
    get secondTopPair(): number {
        if (this.pairValues.size < 2) return 0; // Return 0 if there aren't at least two values

        const sortedPairs = [...this.pairValues].sort((a, b) => b - a); // Sort in descending order
        return sortedPairs[1]; // Return the second highest value
    }

    get topTriple(): number {
        return this.tripleValues.size > 0 ? Math.max(...this.tripleValues) : 0;
    }
    get secondTopTriple(): number {
        if (this.tripleValues.size < 2) return 0; // Return 0 if there aren't at least two values

        const sortedTriples = [...this.tripleValues].sort((a, b) => b - a); // Sort in descending order
        return sortedTriples[1]; // Return the second highest value
    }


    get topQuad(): number {
        return this.quadValues.size > 0 ? Math.max(...this.quadValues) : 0;
    }

    public reset(): void {
        this.cards = [];
        this._twos = 0;
        this._threes = 0;
        this._fours = 0;
        this._fives = 0;
        this._sixes = 0;
        this._sevens = 0;
        this._eights = 0;
        this._nines = 0;
        this._tens = 0;
        this._jacks = 0;
        this._queens = 0;
        this._kings = 0;
        this._aces = 0;

        this._spades = 0;
        this._hearts = 0;
        this._clubs = 0;
        this._diamonds = 0;

        this._pairs = 0;
        this._triples = 0;
        this._quads = 0;

        this.orderedSet = [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        this.pairValues.clear();
        this.tripleValues.clear();
        this.quadValues.clear();

        this._rank = 0;
        this._hasFlush = false;
        this._hasStraight = false;
        this.topStraight = 0;

        this.flushSuit = null;
        this.topStraight = 0;
        this.kickerValue = 0;
        this.totalRank = 0;
        this.winner = false;
    }


    checkFlush(value: number, suit: Suits) {
        if (value >= 5) {
            this.hasFlush = true;
            this.flushSuit = suit;
            //-- this is a prop that also sets the rank to 6
        }
    }


    addPublicCard(card: PlayingCard) {
        card.privateCard = false;
        this.addCardToHand(card);
    }

    addPrivateCard(card: PlayingCard) {
        card.privateCard = true;
        this.addCardToHand(card);
    }

    addCardToHand(card: PlayingCard) {
        this.cards.push(card);
        this.orderedSet[card.cardNumber] = 1;
        if (card.cardNumber == 14) {
            this.orderedSet[1] = 1
        }


        // Create a dictionary that maps card numbers to corresponding count properties
        const cardCountDict: { [key: number]: keyof Player } = {
            2: "twos",
            3: "threes",
            4: "fours",
            5: "fives",
            6: "sixes",
            7: "sevens",
            8: "eights",
            9: "nines",
            10: "tens",
            11: "jacks",
            12: "queens",
            13: "kings",
            14: "aces"
        };

        // Get the count property name from the dictionary based on the card number
        const cardCountProperty = cardCountDict[card.cardNumber];

        if (cardCountProperty) {
            // Type assertion here to tell TypeScript that this is a valid property and is of type number
            (this[cardCountProperty] as number) += 1; // Increment the corresponding count
        }
        else {
            throw new Error('Invalid card number');
        }

        const suitCountDict: { [key in Suits]: keyof Player } = {
            [Suits.Spade]: "spades",
            [Suits.Heart]: "hearts",
            [Suits.Club]: "clubs",
            [Suits.Diamond]: "diamonds"
        };

        // Get the suit property name from the dictionary based on the card's suit
        const suitProperty = suitCountDict[card.suit];

        if (suitProperty) {
            // Type assertion here as well for suit properties
            (this[suitProperty] as number) += 1; // Increment the corresponding suit count
        }
        else {
            throw new Error('Invalid Suit');
        }

        this.straightCheck();
        this.calculateRank();
        this.calculateKickers();
    }

    private handleSetMethod(cardNumber: number, count: number): void {
        if (count === 2) {
            this.hasTwoSetMethod(cardNumber);
        } else if (count === 3) {
            this.hasThreeSetMethod(cardNumber);
        } else if (count === 4) {
            this.hasFourSetMethod(cardNumber);
        }
    }

    hasTwoSetMethod(cardNumber: number) {
        this.pairs++;
        this.pairValues.add(cardNumber);
    }

    hasThreeSetMethod(cardNumber: number) {
        this.pairs--;
        this.triples++;
        this.pairValues.delete(cardNumber);
        this.tripleValues.add(cardNumber);
    }

    hasFourSetMethod(cardNumber: number) {
        this.triples--;
        this.quads++;
        this.tripleValues.delete(cardNumber);
        this.quadValues.add(cardNumber);
        if (this.rank < 8) {
            this.rank = 8;
        }
    }

    get haspair(): boolean {
        return this.pairs > 0;
    }

    get hasTwoPair(): boolean {
        return this.pairs > 1;
    }

    get hasTriple(): boolean {
        return this.triples > 0;
    }

    get hasQuads(): boolean {
        return this.quads > 0;
    }

    get hasFullhouse(): boolean {
        return (this.pairs > 0) && (this.triples > 0);
    }

    calculateRank() {
        // 1 topcard
        // 2 one pair
        // 3 two pair
        // 4 triple
        // 5 straight
        // 6 flush
        // 7 full house
        // 8 four of a kind
        // 9 straight flush
        // 10 royal flush

        if (this.cards.length >= 4) {
            if (this.hasStraight && this.hasFlush) {
                if (this.topStraight == 14) {
                    this.rank = 10;
                    return;
                }
                else {
                    let straightCards = this.cards.filter((card) => card.cardNumber <= this.topStraight && card.cardNumber >= this.topStraight - 4);
                    let flushCards = straightCards.filter((card) => card.suit == this.flushSuit);
                    if (flushCards.length > 4) {
                        this.rank = 9;
                        return;
                    }
                    else {
                        //continue;
                    }
                    
                }
            }
            if (this.hasQuads) {
                this.rank = 8;
                return;
            }
            else if (this.hasTriple && this.haspair || this.tripleValues.size > 1) {
                this.rank = 7;
                return;
            }
            else if (this.hasFlush) {
                //this.rank = 6;
                return;
            }
            else if (this.hasStraight) {
                //this.rank = 5;
                return;
            }
        }

        if (this.hasTriple) {
            this.rank = 4;
            return;
        }
        else if (this.pairs >= 2) {
            this.rank = 3;
            return;
        }
        else if (this.haspair) {
            this.rank = 2;
            return;
        }
        else {
            this.rank = 1;
            return;
        }

    }

    calculateKickers() {
        // 1 topcard
        // 2 one pair
        // 3 two pair
        // 4 triple
        // 5 straight
        // 6 flush
        // 7 full house
        // 8 four of a kind
        // 9 straight flush
        // 10 royal flush

        var kickerValueArray: number[] = [];
        var sortedCards = [...this.cards].sort((card1, card2) => card2.cardNumber - card1.cardNumber);

        switch (this.rank) {

            case 1:
                // top card
                for (let i = 0; i < 5; i++) {
                    var popped = sortedCards.shift();
                    if (popped == undefined) {
                        break;
                    }
                    else {
                        kickerValueArray.push(popped.cardNumber);

                    }
                }
                break;

            case 2:
                // one pair
                kickerValueArray.push(this.topPair);
                sortedCards.filter((card) => card.cardNumber != this.topPair);
                for (let i = 0; i < 3; i++) {
                    var popped = sortedCards.shift();
                    if (popped == undefined) {
                        break;
                    }
                    else {
                        kickerValueArray.push(popped.cardNumber);
                    }
                }
                break;

            case 3:
                // two pair
                kickerValueArray.push(this.topPair);
                kickerValueArray.push(this.secondTopPair);
                sortedCards.filter((card) => card.cardNumber != this.topPair && card.cardNumber != this.secondTopPair);

                var popped = sortedCards.shift();
                if (popped == undefined) {
                    break;
                }
                else {
                    kickerValueArray.push(popped.cardNumber);
                }
                break;

            case 4:
                // triple
                kickerValueArray.push(this.topTriple);
                sortedCards.filter((card) => card.cardNumber != this.topTriple);

                for (let i = 0; i < 2; i++) {
                    var popped = sortedCards.shift();
                    if (popped == undefined) {
                        break;
                    }
                    else {
                        kickerValueArray.push(popped.cardNumber);
                    }
                }
                break;

            case 5:
                // straight
                kickerValueArray.push(this.topStraight);
                break;

            case 6:
                // flush
                sortedCards.filter((card) => card.suit == this.flushSuit);
                for (let i = 0; i < 5; i++) {
                    var popped = sortedCards.shift();
                    if (popped == undefined) {
                        throw new Error(`there should be 5 cards here`);
                    }
                    else {
                        kickerValueArray.push(popped.cardNumber);
                    }
                }
                break;

            case 7:
                // full house
                if (this.tripleValues.size > 1) {
                    kickerValueArray.push(this.topTriple);
                    kickerValueArray.push(this.secondTopTriple);
                    break;
                }
                else {
                    kickerValueArray.push(this.topTriple);
                    kickerValueArray.push(this.topPair);
                    break;
                }

            case 8:
                // four of a kind
                kickerValueArray.push(this.topQuad);
                sortedCards.filter((card) => card.cardNumber != this.topQuad);
                var popped = sortedCards.shift();
                if (popped == undefined) {
                    break;
                }
                else {
                    kickerValueArray.push(popped.cardNumber);
                }
                break;

            case 9:
                // straight flush
                let filteredCards = sortedCards
                    .filter((card) => card.suit == this.flushSuit)
                    .filter((card) => card.cardNumber <= this.topStraight);

                let maxCardNumber = Math.max(...filteredCards.map((card) => card.cardNumber));
                kickerValueArray.push(maxCardNumber);
                break;

            case 10:
                // royal flush
                break;
        }

        for (let i = 0; i < 5; i++) {
            kickerValueArray.push(0);
        }

        kickerValueArray = kickerValueArray.map(value => value / 15);
        let totalKickerValue = kickerValueArray
            .map((value, index) => value * Math.pow(10, -2 * index)) // Apply the transformation
            .reduce((sum, value) => sum + value, 0); // Sum the elements

        this.kickerValue = totalKickerValue;
        this.totalRank = this.rank + this.kickerValue;
    }

    straightCheck() {
        if (this.cards.length < 5) {
            return;
        }

        console.log(`we are doing the straight check`);

        for (let i = 10; i >= 1; i--) {
            //public orderedSet: number[] = [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0]
            let sum =
                this.orderedSet[i] +
                this.orderedSet[i + 1] +
                this.orderedSet[i + 2] +
                this.orderedSet[i + 3] +
                this.orderedSet[i + 4]

            console.log(`sum for straight check for player ${this.name} is ${sum}`);

            if (sum == 5) {
                this.hasStraight = true;
                this.topStraight = i + 4;
                this.rank = 5;
                return;
            }
        }
    }


}