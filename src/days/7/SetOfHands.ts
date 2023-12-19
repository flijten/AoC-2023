import * as readline from 'readline';
import { Hand } from './Hand';
import { HandAndBit } from './HandAndBid';

export class SetOfHands {
    private myScore = 0;
    
    private handsPerType: Map<string, HandAndBit[]> = new Map(
        [
            [Hand.FIVE_OF_A_KIND, []],
            [Hand.FOUR_OF_A_KIND, []],
            [Hand.FULL_HOUSE, []],
            [Hand.THREE_OF_A_KIND, []],
            [Hand.TWO_PAIRS, []],
            [Hand.ONE_PAIR, []],
            [Hand.HIGH_CARD, []]
        ]
    );

    constructor(readInterface: readline.Interface) {
      
        readInterface.on('line', (line) => {
            this.ingestLine(line);
        });
        
        readInterface.on('close', () => {  
            let unwrappedBids: number[] = [];

            this.unwrapBids(Hand.HIGH_CARD, unwrappedBids);
            this.unwrapBids(Hand.ONE_PAIR, unwrappedBids);
            this.unwrapBids(Hand.TWO_PAIRS, unwrappedBids);
            this.unwrapBids(Hand.THREE_OF_A_KIND, unwrappedBids);
            this.unwrapBids(Hand.FULL_HOUSE, unwrappedBids);
            this.unwrapBids(Hand.FOUR_OF_A_KIND, unwrappedBids);
            this.unwrapBids(Hand.FIVE_OF_A_KIND, unwrappedBids);

            unwrappedBids.forEach((bid, index) => {
               
                let scoreAddition =((index + 1) * bid);
                this.myScore += ((index + 1) * bid);
            });

            console.log(this.myScore);
        });
    }

    public totalWinnings() {
        return this.myScore;
    }

    private unwrapBids(aType: string, unwrappedBids: number[]) {
        if ( ! this.handsPerType.get(aType)) {
            return;
        }

        let bidsToUnwrap = this.handsPerType.get(aType)?.slice().reverse();
        bidsToUnwrap?.forEach((handAndBid) => {
            unwrappedBids.push(handAndBid.bid());
        });
    }

    private ingestLine(line: string) {
        let handString: string = line.split(' ')[0];
        let bid: number = parseInt(line.split(' ')[1]);
        let aHand: Hand = new Hand(handString);

        if (this.handsPerType.get(aHand.type())?.length === 0) {
            this.handsPerType.get(aHand.type())?.push(new HandAndBit(aHand, bid));
        } else {
            let handsOfType = this.handsPerType.get(aHand.type());
            if (handsOfType) {
                for (let index = 0; index < handsOfType.length; index++) {
                    let handAndBit = handsOfType[index];
                    if (aHand.isStrongerThan(handAndBit.hand())) {
                        handsOfType.splice(index, 0, new HandAndBit(aHand, bid));
                        return;
                    }
                }
                handsOfType.push(new HandAndBit(aHand, bid));
            }
        }
    }
}