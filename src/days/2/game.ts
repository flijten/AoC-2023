import * as readline from 'readline';

export class GameList {
    private sumOfPossibleGameIds = 0;

    constructor(readInterface: readline.Interface) {
      
        readInterface.on('line', (line) => {
            let x: Game = new Game(line);
            if(x.isValid()) {
                this.sumOfPossibleGameIds += x.gameNumber();
            }
        });
        
        readInterface.on('close', () => {
            console.log(this.sumOfPossibleGameIds);
        });
    }
    
    public sumOfValidGameIds(): number {
        return this.sumOfPossibleGameIds;
    }
}

export class Game {

    private sets: GameSet[] = [];
    private gameNumberInt: number = 0;
    private isValidBool: boolean = true;

    constructor(line: string) {
        let x = line.split(':');
        let setStrings = x[1].split(';');

        this.gameNumberInt = parseInt(x[0].replace('Game ', ''));
        
        setStrings.forEach(setString => {
            this.sets.push(new GameSet(setString));
        });
        this.setValidity();
    }

    public amountOfSets() {
        return this.sets.length;
    }

    public gameNumber(): number {
        return this.gameNumberInt;
    }

    public isValid(): boolean {
        return this.isValidBool;
    }

    private setValidity() {
        this.sets.forEach(set => {        
            if ( ! set.isValid()) {
                this.isValidBool = false;
            }
        });
    }
}

export class GameSet {

    readonly maxRedCubes: number = 12;
    readonly maxGreenCubes: number = 13;
    readonly maxBlueCubes: number = 14;

    readonly red: string = 'red';
    readonly green: string = 'green';
    readonly blue: string = 'blue';

    private numberOfRedCubes: number = 0;
    private numberOfGreenCubes: number = 0;
    private numberOfBlueCubes: number = 0;

    private validity: boolean = false;

    constructor(setLine: string) {
        
        this.setColorAmounts(setLine);
        this.setValidity();
    }

    public isValid(): boolean {
        return this.validity;
    }

    private setValidity() {
        if (this.numberOfRedCubes > this.maxRedCubes || this.numberOfGreenCubes > this.maxGreenCubes || this.numberOfBlueCubes > this.maxBlueCubes) {
            this.validity = false;
        } else {
            this.validity = true;
        }
    }

    private setColorAmounts(gameString: string) {
        let x = gameString.split(',');

        x.forEach(colorAndAmount => {
            let colorAndAmountArray = colorAndAmount.trim().split(' ');
            let color = colorAndAmountArray[1];
            let amount = parseInt(colorAndAmountArray[0]);

            if (color === this.red) {
                this. numberOfRedCubes = amount;
            }

            if (color === this.green) {
                this.numberOfGreenCubes = amount;
            }

            if (color === this.blue) {
                this.numberOfBlueCubes = amount;
            }
        });
    }
}