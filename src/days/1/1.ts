import * as readline from 'readline';
import * as fs from 'fs';
import { exit } from 'process';
import { parseLineToNumber } from './parseLineToNumber';

export function one()
{
    const readInterface = readline.createInterface({
        input: fs.createReadStream('data\\days\\1.1.txt'),
        output: process.stdout,
        terminal: false
    });
    
    let sum = 0;
    
    readInterface.on('line', (line) => {
        sum += parseLineToNumber(line);
    });
    
    readInterface.on('close', () => {
        console.log(sum);
    });
}