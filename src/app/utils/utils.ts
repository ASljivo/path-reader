import { DIRECTIONS } from 'src/constants/directions';
import { MapResult } from '../models/maps';

export function validateAndReadMap(map: string[][]): MapResult {
  let start: [number, number] | null = null;
  let end: [number, number] | null = null;

  // Find the start and end points
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] === '@') {
        if (start) {
          throw new Error('Multiple starts');
        }
        start = [i, j];
      }
      if (map[i][j] === 'x') {
        if (end) {
          throw new Error('Multiple ends');
        }
        end = [i, j];
      }
    }
  }

  if (!start) throw new Error('Missing start character');
  if (!end) throw new Error('Missing end character');

  let letters = '';
  let path = '';
  let [currentRow, currentCol] = start;
  let previousDirection: [number, number] | null = null;
  let visited = new Set<string>();

  while (true) {
    const currentChar = map[currentRow][currentCol];
    path += currentChar;
    if (/[A-Z]/.test(currentChar)) letters += currentChar;
    if (currentChar === 'x') {
      break;
    }

    visited.add(`${currentRow},${currentCol}`);

    let foundNextStep = false;
    for (const [dRow, dCol] of DIRECTIONS) {
      const newRow = currentRow + dRow;
      const newCol = currentCol + dCol;

      if (
        newRow >= 0 &&
        newRow < map.length &&
        newCol >= 0 &&
        newCol < map[newRow].length &&
        !visited.has(`${newRow},${newCol}`) &&
        map[newRow][newCol] !== ' ' &&
        (previousDirection === null ||
          previousDirection[0] !== -dRow ||
          previousDirection[1] !== -dCol)
      ) {
        previousDirection = [dRow, dCol];
        currentRow = newRow;
        currentCol = newCol;
        foundNextStep = true;
        break;
      }
    }

    if (!foundNextStep) {
      throw new Error('Broken path');
    }
  }

  return { letters, path };
}
