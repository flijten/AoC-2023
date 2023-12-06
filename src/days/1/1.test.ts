import {describe, expect, test} from '@jest/globals';
import * as util from "./parseLineToNumber";

test('it returns -1 when line contains no numbers', () => {
    expect(util.parseLineToNumber("asdasd")).toBe(-1);
});

test('it finds two numbers', () => {
    expect(util.parseLineToNumber("1a9")).toBe(19);
});

test('it finds the first and last numbers amongst more than two', () => {
    expect(util.parseLineToNumber("1a6a7a8ayu6uy91")).toBe(11);
});

test('it returns a digit concatenated with itself when containing only one number', () => {
    expect(util.parseLineToNumber("9vxfg")).toBe(99);
});

test('it recognises written numbers', () => {
    expect(util.parseLineToNumber("sixaa7a8ayu6uy91")).toBe(61);
});

test('it recognises more written numbers', () => {
    expect(util.parseLineToNumber("asdaseightdasdasdseven")).toBe(87);
});

test('it returns a digit concatenated with itself when containing only one written number', () => {
    expect(util.parseLineToNumber("asdoneasq")).toBe(11);
});

test('it recognises all written numbers', () => {
    expect(util.parseLineToNumber("onetwothreefourfivesixseveneightnine")).toBe(19);
});

test('it recognises overlapping text', () => {
    expect(util.parseLineToNumber("oneight")).toBe(18);
});