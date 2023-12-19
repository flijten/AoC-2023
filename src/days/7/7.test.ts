import {describe, expect, test} from '@jest/globals';
import { Hand } from './Hand';
import { Card } from './Card';
import * as readline from 'readline';
import { Readable } from 'stream';
import { SetOfHands } from './SetOfHands';

test('it finds a high card', () => {
    let aHand: Hand = new Hand("23456");
    expect(aHand.type()).toEqual(Hand.HIGH_CARD);
});

test('it finds a five of a kind', () => {
    let aHand: Hand = new Hand("AAAAA");
    expect(aHand.type()).toEqual(Hand.FIVE_OF_A_KIND);
});

test('it finds a four of a kind', () => {
    let aHand: Hand = new Hand("AA8AA");
    expect(aHand.type()).toEqual(Hand.FOUR_OF_A_KIND);
});

test('it finds a full house', () => {
    let aHand: Hand = new Hand("23332");
    expect(aHand.type()).toEqual(Hand.FULL_HOUSE);
});

test('it finds a three of a kind', () => {
    let aHand: Hand = new Hand("TTT98");
    expect(aHand.type()).toEqual(Hand.THREE_OF_A_KIND);
});

test('it finds two pairs', () => {
    let aHand: Hand = new Hand("23432");
    expect(aHand.type()).toEqual(Hand.TWO_PAIRS);
});

test('it finds A pair', () => {
    let aHand: Hand = new Hand("A23A4");
    expect(aHand.type()).toEqual(Hand.ONE_PAIR);
});

test('it recognises stronger hand', () => {
    let aStrongerHand: Hand = new Hand("KK677");
    let aWeakerHand: Hand = new Hand("KTJJT");

    expect(aStrongerHand.isStrongerThan(aWeakerHand)).toEqual(true);
});

test('it recognises another stronger hand', () => {
    let aStrongerHand: Hand = new Hand("QQQJA");
    let aWeakerHand: Hand = new Hand("T55J5");
   
    expect(aStrongerHand.isStrongerThan(aWeakerHand)).toEqual(true); 
});

// card

test('it recognises equal cards', () => {
    let aCard: Card = new Card(Card.A);
    let anotherCard: Card = new Card(Card.A);
    expect(aCard.isEqualTo(anotherCard)).toEqual(true);
});

test('it recognises inequal cards', () => {
    let aCard: Card = new Card(Card.A);
    let anotherCard: Card = new Card(Card.TWO);
    expect(aCard.isEqualTo(anotherCard)).toEqual(false);
});

test('it recognises stronger cards', () => {
    let aCard: Card = new Card(Card.A);
    let anotherCard: Card = new Card(Card.TWO);
    expect(aCard.isStrongerThan(anotherCard)).toEqual(true);
});

test('it recognises weaker cards', () => {
    let aCard: Card = new Card(Card.TWO);
    let anotherCard: Card = new Card(Card.A);
    expect(aCard.isStrongerThan(anotherCard)).toEqual(false);
});

test('it recognises more weaker cards', () => {
    let aCard: Card = new Card(Card.NINE);
    let anotherCard: Card = new Card(Card.T);
    expect(aCard.isStrongerThan(anotherCard)).toEqual(false);
});

// set of Hands

test('it can order a set of Hands and determine total winnings', async () => {
    let inputString = "32T3K 765\nT55J5 684\nKK677 28\nKTJJT 220\nQQQJA 483"
    let readInterface = readline.createInterface({
        input: Readable.from(inputString),
        output: process.stdout,
        terminal: false
    })
    
    let aSetOfHands: SetOfHands = new SetOfHands(readInterface);

    await new Promise(resolve => readInterface.on('close', resolve));

    expect(aSetOfHands.totalWinnings()).toEqual(6440);
});