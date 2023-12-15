import {describe, expect, test} from '@jest/globals';
import * as readline from 'readline';
import { PileOfScratchCards, Card } from './card';
import { Readable } from 'stream';

// Card

test('it has winning numbers', () => {
    let aCard: Card = new Card(
        "Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53"
    );
    expect(aCard.winningNumbers()).toEqual([41, 48, 83, 86, 17]);
});

test('it has player numbers', () => {
    let aCard: Card = new Card(
        "Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53"
    );
    expect(aCard.playerNumbers()).toEqual([83, 86, 6, 31, 17, 9, 48, 53]);
});

it('scores the right points for a Card', () => {
    let aCard: Card = new Card(
        "Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53"
    );
    expect(aCard.score()).toEqual(8);
});

// PileOfScratchCards

test('it scores the whole set',async () => {   
    let inputString = "Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53\nCard 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19\nCard 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1\nCard 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83\nCard 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36\nCard 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11"
    let readInterface = readline.createInterface({
        input: Readable.from(inputString),
        output: process.stdout,
        terminal: false
    })
    let aPileOfScratchCards: PileOfScratchCards = new PileOfScratchCards(readInterface);

    await new Promise(resolve => readInterface.on('close', resolve));

    expect(aPileOfScratchCards.score()).toBe(13);
});