import { Card } from "./Card";

export class Hand {
    static readonly HIGH_CARD: string = "high_card";
    static readonly FIVE_OF_A_KIND: string = "five_of_a_kind";
    static readonly FOUR_OF_A_KIND: string = "four_of_a_kind";
    static readonly FULL_HOUSE: string = "full_house";
    static readonly THREE_OF_A_KIND: string = "three_of_a_kind";
    static readonly TWO_PAIRS: string = "two_pairs";
    static readonly ONE_PAIR: string = "one_pair";


    private myHandType: string = Hand.HIGH_CARD;
    private myHand: string = "";

    constructor(handString: string) {

        this.myHand = handString;

        let uniqueCards: Map<string, number> = new Map<string, number>();

        for (let i = 0; i < handString.length; i++) {
            let char = handString[i];
            if (uniqueCards.has(char)) {
                uniqueCards.set(char, uniqueCards.get(char)! + 1);
            } else {
                uniqueCards.set(char, 1);
            }
        }

        // this relies heavily on order of checks
        if (uniqueCards.size === 1) {
            this.myHandType = Hand.FIVE_OF_A_KIND;
        } else if (uniqueCards.size === 2 && (Array.from(uniqueCards.values())[0] === 4 || Array.from(uniqueCards.values())[1] === 4)) { //sorry
            this.myHandType = Hand.FOUR_OF_A_KIND;
        } else if (uniqueCards.size === 2 && (Array.from(uniqueCards.values())[0] === 3 || Array.from(uniqueCards.values())[1] === 3)) { //sorry
            this.myHandType = Hand.FULL_HOUSE;
        } else if (uniqueCards.size === 3 && (Array.from(uniqueCards.values())[0] === 3 || Array.from(uniqueCards.values())[1] === 3 || Array.from(uniqueCards.values())[2] === 3)) { //sorry
            this.myHandType = Hand.THREE_OF_A_KIND;
        } else if (uniqueCards.size === 3) {
            // if there are three unique cards, but not a three of a kind, then then all other permutations are two pairs
            this.myHandType = Hand.TWO_PAIRS;
        } else if (uniqueCards.size === 4) {
            // if there are four unique cards, then there is only one pair
            this.myHandType = Hand.ONE_PAIR;
        } else {
            // not needed, but for clarity
            this.myHandType = Hand.HIGH_CARD;
        }
    }

    public type(): string {
        return this.myHandType;
    }

    public cardAtPosition(position: number): Card {
        return new Card(this.myHand[position]);
    }

    public isStrongerThan(anotherHand: Hand): boolean {
        for (let position = 0; position < 5; position++) {   
            if (this.cardAtPosition(position).isEqualTo(anotherHand.cardAtPosition(position))) {
                continue;   
            }

            if (this.cardAtPosition(position).isStrongerThan(anotherHand.cardAtPosition(position))) {
                return true;
            } else {
                return false;
            }
        }

        return false;
    }
}