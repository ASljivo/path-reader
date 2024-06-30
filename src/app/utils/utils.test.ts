import { MAP_FOUR, MAP_THREE, MAP_TWO } from 'src/constants/maps';
import { validateAndReadMap } from '../utils/utils';
import { MapResult } from '../models/maps';

describe('validateAndReadMap', () => {
  test('throws error when there are multiple start characters', () => {
    const map = [
      ['@', ' ', ' '],
      [' ', '@', ' '],
      [' ', ' ', 'x'],
    ];

    expect(() => validateAndReadMap(map)).toThrow('Multiple starts');
  });

  test('throws error when there are multiple end characters', () => {
    const map = [
      ['@', ' ', ' '],
      [' ', ' ', 'x'],
      [' ', ' ', 'x'],
    ];

    expect(() => validateAndReadMap(map)).toThrow('Multiple ends');
  });

  test('throws error when there is no start character', () => {
    const map = [
      [' ', ' ', ' '],
      [' ', ' ', ' '],
      [' ', ' ', 'x'],
    ];

    expect(() => validateAndReadMap(map)).toThrow('Missing start character');
  });

  test('throws error when there is no end character', () => {
    const map = [
      ['@', ' ', ' '],
      [' ', ' ', ' '],
      [' ', ' ', ' '],
    ];

    expect(() => validateAndReadMap(map)).toThrow('Missing end character');
  });

  test('returns correct letters and path for a valid map', () => {
    const expected: MapResult = {
      letters: 'ACB',
      path: '@---A---+|||C---+|B---x',
    };

    expect(validateAndReadMap(MAP_THREE)).toEqual(expected);
  });

  test('throws error when the path is broken', () => {
    expect(() => validateAndReadMap(MAP_FOUR)).toThrow('Broken path');
  });

  test('returns correct path when there is a loop in the path', () => {
    const expected: MapResult = {
      letters: 'ABD',
      path: '@|A+--B||+---D--+|x',
    };

    expect(validateAndReadMap(MAP_TWO)).toEqual(expected);
  });
});
