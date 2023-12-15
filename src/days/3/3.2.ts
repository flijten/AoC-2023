// okay, nu zo lelijk mogelijk :p

import * as readline from 'readline';
import * as fs from 'fs';

export function three()
{
    let lines: string[] = [];
    const readInterface = readline.createInterface({
        input: fs.createReadStream('data\\days\\3.txt'),
        output: process.stdout,
        terminal: false
    });
   
    
    readInterface.on('line', (line) => {
        lines.push(line);
    });
    
    readInterface.on('close', () => {
        //order of lines matters, so all logic here?
        let sum = 0;

        lines.forEach((line, index) => {
            let currentLine = line;
            let previousLine = lines[index - 1] ?? null;
            let nextLine = lines[index + 1] ?? null;


            // find all * in a line
            let matchedGear; 
            let regex =/\*/g;
            
            while ((matchedGear = regex.exec(currentLine)) !== null) {
                
                let matchedNumbers: number[] = [];

                if (previousLine) {
                    //find numbers in line
                    let previousMatch; 
                    let regex =/\d+/g;
                    
                    // check if number on line is adjacent to gear
                    while ((previousMatch = regex.exec(previousLine)) !== null) {
                        let startIndex = previousMatch.index;
                        let endIndex = previousMatch.index + previousMatch[0].length;

                        for (let i = startIndex; i <= endIndex; i++) {
                            if (i === matchedGear.index - 1) {
                                matchedNumbers.push(parseInt(previousMatch[0]));
                            }
                        }
                    }
                }
                // check alle 8 posities om de * heen
                // Als we een nummer tegenkomen, haal het hele nummer op?


                // if numbers contains exactly two numbers
                // add the product of the two numbers to the sum
            }
            
            // check if there is a number before or after it
        });
    });

    function testAdjacentLine(digitPos: number, currentLine: string, digitLength: number, adjacentLine: string, digit: number):boolean {
        let lowerBound = digitPos === 0 ? 0 : digitPos - 1;
        let upperBound =
            // number is a single digit and the last one of the line
            digitPos === currentLine.length - 1 ||
            // or it is a multidigit number where the last digit is the last of the line
            digitPos + digitLength === currentLine.length - 1 ?
            currentLine.length - 1 :
            digitPos + digitLength;

        for (let i = lowerBound; i <= upperBound; i++) {
            if (adjacentLine[i] && testChar(adjacentLine[i])) {
                // console.log(adjacentLine);
                // console.log(currentLine);
                // console.log(digitPos);
                // console.log(digitLength);
                // console.log(digit);
                // console.log(lowerBound);
                // console.log(upperBound);
                return true;
            }
        }
        return false;
    }

    function testCurrentLine(digitPos: number, digitLength: number, currentLine: string): boolean {
        
        if (digitPos !== 0 && testChar(currentLine[digitPos - 1])) {
            return true;
        }
        if (
            digitPos < currentLine.length - 1 && 
            digitPos + digitLength < currentLine.length &&
            testChar(currentLine[digitPos + digitLength])
        ) {
            return true;
        }
        return false;
    }

    function testChar(char: string): boolean {
        return char !== '.' && isNaN(Number(char));
    }
}