import {describe, expect, test} from '@jest/globals';
import * as readline from 'readline';
import { Game, GameSet, GameList } from './game';
import { Readable } from 'stream';

// game

test('it creates 6 sets', () => {
    let x: Game = new Game(
        "Game 96: 1 green, 5 red, 13 blue; 1 green, 2 red, 13 blue; 2 green, 2 red, 17 blue; 3 red, 1 green; 6 red, 2 green; 1 green, 7 blue, 4 red"
    );
    expect(x.amountOfSets()).toBe(6);
});

test('it creates 4 sets', () => {
    let x: Game = new Game(
        "Game 96: 1 green, 5 red, 13 blue; 1 green, 13 blue; 2 green, 2 red, 17 blue; 3 red, 1 green"
    );
    expect(x.amountOfSets()).toBe(4);
});

test('it finds a game number', () => {   
    let x: Game = new Game(
        "Game 96: 1 green, 5 red, 13 blue; 1 green, 13 blue; 2 green, 2 red, 17 blue; 3 red, 1 green"
    );
    expect(x.gameNumber()).toBe(96);
});

test('it finds another game number', () => {   
    let x: Game = new Game(
        "Game 4: 1 green, 5 red, 13 blue; 1 green, 13 blue; 2 green, 2 red, 17 blue; 3 red, 1 green"
    );
    expect(x.gameNumber()).toBe(4);
});

test('it (the game) can determine validity', () => {   
    let x: Game = new Game(
        "Game 4: 1 green, 5 red, 13 blue; 1 green, 13 blue; 2 green, 2 red, 7 blue; 3 red, 1 green"
    );
    expect(x.isValid()).toBe(true);
});

test('it (the game) can determine non-validity', () => {   
    let x: Game = new Game(
        "Game 4: 1 green, 5 red, 13 blue; 1 green, 13 blue; 2 green, 2 red, 7 blue; 3 red, 20 green"
    );
    expect(x.isValid()).toBe(false);
});

test('it (the game) can determine non-validity when multiple sets are invalid', () => {   
    let x: Game = new Game(
        "Game 4: 1 green, 16 red, 13 blue; 1 green, 13 blue; 2 green, 2 red, 7 blue; 3 red, 20 green"
    );
    expect(x.isValid()).toBe(false);
});

// gameList

test('it outputs the sum of valid game IDs]',async () => {   
    let inputString = "Game 4: 1 green, 5 red, 13 blue; 1 green, 13 blue; 2 green, 2 red, 17 blue; 3 red, 1 green\nGame 5: 1 green, 5 red, 13 blue; 1 green, 13 blue; 12 green, 4 red, 1 blue; 3 red, 1 green\nGame 6: 1 green, 5 red, 13 blue; 1 green, 13 blue; 2 green, 2 red, 11 blue; 3 red, 1 green"
    let readInterface = readline.createInterface({
        input: Readable.from(inputString),
        output: process.stdout,
        terminal: false
    })
    let x: GameList = new GameList(readInterface);

    await new Promise(resolve => readInterface.on('close', resolve));

    expect(x.sumOfValidGameIds()).toBe(11);
});

// gameSet

test('it can determine validity', () => {
    let x = new GameSet(
        '1 green, 5 red, 13 blue'
    );
    expect(x.isValid()).toBe(true);
});

test('it can deal with only red', () => {
    let x = new GameSet(
        '12 red'
    );
    expect(x.isValid()).toBe(true);
});

test('it can deal with only green', () => {
    let x = new GameSet(
        '13 green'
    );
    expect(x.isValid()).toBe(true);
});

test('it can deal with only blue', () => {
    let x = new GameSet(
        '14 blue'
    );
    expect(x.isValid()).toBe(true);
});

test('itinvalidates red', () => {
    let x = new GameSet(
        '1 green, 13 red, 13 blue'
    );
    expect(x.isValid()).toBe(false);
});

test('it invalidates green', () => {
    let x = new GameSet(
        '14 green, 5 red, 13 blue'
    );
    expect(x.isValid()).toBe(false);
});

test('it invalidates blue', () => {
    let x = new GameSet(
        '1 green, 5 red, 15 blue'
    );
    expect(x.isValid()).toBe(false);
});

// challenge two

test('it can find the smallest amounts of cubes per color', () => {   
    let x: Game = new Game(
        "Game 4: 1 green, 0 red, 3 blue; 3 green, 2 red, 1 blue"
    );
    expect(x.getMinimalGreen()).toBe(3);
    expect(x.getMinimalRed()).toBe(2);
    expect(x.getMinimalBlue()).toBe(3);
});


test('it can find the power of the smallest amounts of cubes per color', () => {   
    let x: Game = new Game(
        "Game 4: 1 green, 0 red, 3 blue; 3 green, 2 red, 1 blue"
    );
    expect(x.powerOfCubes()).toBe(18) // 3 * 2 * 3;
});


test('it can find the power of the smallest amounts of cubes per color', async () => {   
    let inputString = "Game 4: 1 green, 0 red, 3 blue; 3 green, 2 red, 1 blue\nGame 5: 2 green, 2 red, 2 blue; 3 green, 3 red, 3 blue";
        let readInterface = readline.createInterface({
        input: Readable.from(inputString),
        output: process.stdout,
        terminal: false
    })
    let x: GameList = new GameList(readInterface);

    await new Promise(resolve => readInterface.on('close', resolve));
    expect(x.sumOfPowersOfCubes()).toBe(45) // 3 * 2 * 3 + 3 * 3 * 3 = 18 + 27 = 45;
});