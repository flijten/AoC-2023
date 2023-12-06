import * as readline from 'readline';

export class GameList {
    private sumOfPossibleGameIds = 0;
    private aSumOfPowersOfCubes = 0;

    constructor(readInterface: readline.Interface) {
      
        readInterface.on('line', (line) => {
            let x: Game = new Game(line);
            this.aSumOfPowersOfCubes += x.powerOfCubes();
            if(x.isValid()) {
                this.sumOfPossibleGameIds += x.gameNumber();
            }
        });
        
        readInterface.on('close', () => {
            // console.log(this.sumOfPossibleGameIds);
        });
    }
    
    public sumOfValidGameIds(): number {
        return this.sumOfPossibleGameIds;
    }

    public sumOfPowersOfCubes(): number {   
        return this.aSumOfPowersOfCubes;
    }
}

export class Game {
   
    private sets: GameSet[] = [];
    private gameNumberInt: number = 0;
    private isValidBool: boolean = true;
    private minimalAmountOfBlueCubes: number = 0;
    private minimalAmountOfRedCubes: number = 0;
    private minimalAmountOfGreenCubes: number = 0;

    constructor(line: string) {
        let x = line.split(':');
        let setStrings = x[1].split(';');

        this.gameNumberInt = parseInt(x[0].replace('Game ', ''));
        
        setStrings.forEach(setString => {
            let aGameSet = new GameSet(setString)
            this.sets.push(aGameSet);

            this.setMinimalAmounts(aGameSet);
            this.setValidity(aGameSet);
        });
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

    public powerOfCubes(): number {
        return this.minimalAmountOfBlueCubes * this.minimalAmountOfRedCubes * this.minimalAmountOfGreenCubes;       
    }

    public getMinimalBlue(): number {
        return this.minimalAmountOfBlueCubes;
    }

    public getMinimalRed(): number {
        return this.minimalAmountOfRedCubes;
    }

    public getMinimalGreen(): number {
        return this.minimalAmountOfGreenCubes;
    }

    private setValidity(aGameSet: GameSet) {
        if ( ! aGameSet.isValid()) {
            this.isValidBool = false;
        }
    }
    
    private setMinimalAmounts(aGameSet : GameSet) {
        this.minimalAmountOfBlueCubes = Math.max(this.minimalAmountOfBlueCubes, aGameSet.numberOfBlueCubes());
        this.minimalAmountOfRedCubes = Math.max(this.minimalAmountOfRedCubes, aGameSet.numberOfRedCubes());
        this.minimalAmountOfGreenCubes = Math.max(this.minimalAmountOfGreenCubes, aGameSet.numberOfGreenCubes());
    
    }
}

export class GameSet {

    readonly maxRedCubes: number = 12;
    readonly maxGreenCubes: number = 13;
    readonly maxBlueCubes: number = 14;

    readonly red: string = 'red';
    readonly green: string = 'green';
    readonly blue: string = 'blue';

    private theNumberOfRedCubes: number = 0;
    private theNumberOfGreenCubes: number = 0;
    private theNumberOfBlueCubes: number = 0;

    private validity: boolean = false;

    constructor(setLine: string) {
        
        this.setColorAmounts(setLine);
        this.setValidity();
    }

    public isValid(): boolean {
        return this.validity;
    }

    public numberOfRedCubes(): number {
        return this.theNumberOfRedCubes;
    }

    public numberOfGreenCubes(): number {
        return this.theNumberOfGreenCubes;
    }

    public numberOfBlueCubes(): number {
        return this.theNumberOfBlueCubes;
    }

    private setValidity() {
        if (this.theNumberOfRedCubes > this.maxRedCubes || this.theNumberOfGreenCubes > this.maxGreenCubes || this.theNumberOfBlueCubes > this.maxBlueCubes) {
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
                this.theNumberOfRedCubes = amount;
            }

            if (color === this.green) {
                this.theNumberOfGreenCubes = amount;
            }

            if (color === this.blue) {
                this.theNumberOfBlueCubes = amount;
            }
        });
    }
}