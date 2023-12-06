import * as readline from 'readline';
import * as fs from 'fs';
import { GameList } from './game';

export function two() {
    const readInterface = readline.createInterface({
        input: fs.createReadStream('data\\days\\2.txt'),
        output: process.stdout,
        terminal: false
    });

    let ListOfGames: GameList = new GameList(readInterface);

    readInterface.on('close', () => {
        console.log(ListOfGames.sumOfValidGameIds());
    });

}