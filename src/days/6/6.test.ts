import {describe, expect, test} from '@jest/globals';
import { Race } from './Race';

test('it calculates winning race options for example 1', () => {
    let aRace: Race = new Race(7,9 );
    expect(aRace.numberOfRecordBeatingOptions()).toEqual(4);
});

test('it calculates winning race options for example 2', () => {
    let aRace: Race = new Race(15, 40);
    expect(aRace.numberOfRecordBeatingOptions()).toEqual(8);
});

test('it calculates winning race options for example 3', () => {
    let aRace: Race = new Race(30, 200);
    expect(aRace.numberOfRecordBeatingOptions()).toEqual(9);
});