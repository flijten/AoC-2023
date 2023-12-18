
export class Race {

    private myNumberOfRecordBeatingOptions: number = 0;

    constructor(duration: number, recordDistance: number) {
        
        for (
            let startingSpeed: number = 0, timeSpentOnButton = 0; 
            startingSpeed < duration; 
            startingSpeed++, timeSpentOnButton++) {

            let timeLeftToRace = duration - timeSpentOnButton;

            if (timeLeftToRace * startingSpeed > recordDistance) {
                this.myNumberOfRecordBeatingOptions++;
            }
        }
    }

    numberOfRecordBeatingOptions(): number {
        return this.myNumberOfRecordBeatingOptions;
    }
}