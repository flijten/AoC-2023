// Time:        48     93     84     66
// Distance:   261   1192   1019   1063
// 

import { Race } from "./Race";

export function six() {
let RaceOne: Race = new Race(48, 261);
let RaceTwo: Race = new Race(93, 1192);
let RaceThree: Race = new Race(84, 1019);
let RaceFour: Race = new Race(66, 1063);


console.log(
    RaceOne.numberOfRecordBeatingOptions() * 
    RaceTwo.numberOfRecordBeatingOptions() * 
    RaceThree.numberOfRecordBeatingOptions() * 
    RaceFour.numberOfRecordBeatingOptions()
);
}

export function sixB() {
    console.log(new Race(48938466, 261119210191063).numberOfRecordBeatingOptions());
};
