import random from 'lodash/random';
import { colors } from '@material-ui/core';

export const colorsArray = Object.values(colors).reduce((currentColors, color) => {
  currentColors.push(...Object.values(color));
  return currentColors;
}, []);

export function* colorCycler(): IterableIterator<string> {
  while (true) {
    const index = random(0, colorsArray.length - 1);
    yield colorsArray[index];
  }
}

export const colorGenerator = colorCycler();
