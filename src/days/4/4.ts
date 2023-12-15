import * as readline from 'readline';
import * as fs from 'fs';
import { PileOfScratchCards } from './card';

export function Four() {
    const readInterface = readline.createInterface({
        input: fs.createReadStream('data\\days\\4.txt'),
        output: process.stdout,
        terminal: false
    });

    let aPileOfScratchCards: PileOfScratchCards = new PileOfScratchCards(readInterface);

    readInterface.on('close', () => {
        console.log(aPileOfScratchCards.score());
    });

}