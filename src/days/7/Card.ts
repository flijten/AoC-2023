export class Card {
    static readonly A: string = "A";
    static readonly K: string = "K";
    static readonly Q: string = "Q";
    static readonly J: string = "J";
    static readonly T: string = "T";
    static readonly NINE: string = "9";
    static readonly EIGHT: string = "8";
    static readonly SEVEN: string = "7";
    static readonly SIX: string = "6";
    static readonly FIVE: string = "5";
    static readonly FOUR: string = "4";
    static readonly THREE: string = "3";
    static readonly TWO: string = "2";

    private myValue: string = "";
    
    constructor(cardString: string) {
        this.myValue = cardString;
    }

    public isEqualTo(anotherCard: Card): boolean {
        return this.myValue === anotherCard.myValue;
    }

    public isStrongerThan(anotherCard: Card): boolean {
        if (this.isEqualTo(anotherCard)) {
            return false;
        }
        
        return this.cardOrder(this.myValue) > this.cardOrder(anotherCard.myValue);
    }

    public value() {
        return this.myValue;
    }

    private cardOrder(value: string): number {
        let cardOrder = {[Card.TWO]: 0, [Card.THREE]: 1, [Card.FOUR]: 2, [Card.FIVE]: 3, [Card.SIX]: 4, [Card.SEVEN]: 5, [Card.EIGHT]: 6, [Card.NINE]: 7, [Card.T]: 8, [Card.J]: 9, [Card.Q]: 10, [Card.K]: 11, [Card.A]: 12};

        return cardOrder[value];
    }   
}