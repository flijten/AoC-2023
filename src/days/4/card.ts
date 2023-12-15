import * as readline from 'readline';

export class Card {

    private myWinningNumbers: number[] = [];
    private myPlayerNumbers: number[] = [];
    private myScore: number = 0;

    constructor(public cardString: string) {
        let winningNumbers = cardString.split(': ')[1].split(' | ')[0].match(/\d+/g);
        let playerNumbers = cardString.split(': ')[1].split(' | ')[1].match(/\d+/g);
        
        if (winningNumbers) {
            this.myWinningNumbers = winningNumbers.map((value) => {
                return parseInt(value);
            });
        }

        if (playerNumbers) {    
            this.myPlayerNumbers = playerNumbers.map((value) => {
                return parseInt(value);
            });
        }

        let score = 0;
        playerNumbers?.forEach((value) => {
            if (winningNumbers?.includes(value)) {
                score = (score === 0 ? 1 : score + score);
            }
        });
        this.myScore = score;
    }

    winningNumbers(): number[] {
        return this.myWinningNumbers;
    }

    playerNumbers(): number[] {
        return this.myPlayerNumbers;
    }

    score(): number {
        return this.myScore
    }
}

export class PileOfScratchCards {
    private myScore = 0;
    
    constructor(readInterface: readline.Interface) {
      
        readInterface.on('line', (line) => {
            let aCard: Card = new Card(line);
            this.myScore += aCard.score();
        });
        
        readInterface.on('close', () => {
            //
        });
    }

    public score(): number {   
        return this.myScore;
    }
}