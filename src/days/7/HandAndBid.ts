import { Hand } from "./Hand";

export class HandAndBit {
    myHand: Hand;
    myBid: number;
   
    constructor(aHand: Hand, aBid: number) {
        this.myHand = aHand;
        this.myBid = aBid;
    }

    hand(): Hand {
        return this.myHand;
    }

    bid(): number {
        return this.myBid;
    }
}