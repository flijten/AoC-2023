import { SetOfHands } from "./SetOfHands";
import * as readline from 'readline';
import * as fs from 'fs';

export function seven() {

    const readInterface = readline.createInterface({
        input: fs.createReadStream('data\\days\\7.txt'),
        output: process.stdout,
        terminal: false
    });
    
    let aSetOfHands: SetOfHands = new SetOfHands(readInterface);

}