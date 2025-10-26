import { expect, it } from '@jest/globals';
import { scaleIngredient } from '../src/utils/amountFormatter';

const ingredients = [
  "1-2 fresh Thai bird chili peppers (thinly sliced)",
  "½ cup oil",
  "1/2- 1 1/2 tablespoons Sichuan peppercorns (powdered or finely ground, reserving 1/4 teaspoon for garnish at the end; if you want a milder flavor use 1/2 or 1 teaspoon ground Sichuan peppercorn)",
  "1 1/2 teaspoons cornstarch",
  "1 to 2 dried red chili peppers"
];

it('Simple Whole Number Test x2', () => {
  const testStr = '1 cup oil';
  const formattedLine = scaleIngredient(testStr, 2);

  expect(formattedLine).toBe('2 cup oil');
});

it('Simple Whole Number Test Half', () => {
  const testStr = '1 cup oil';
  const formattedLine = scaleIngredient(testStr, 0.5);

  expect(formattedLine).toBe('½ cup oil');
});

it('Two Whole Number Test Two', () => {
  const testStr = '1-2 fresh Thai bird chili peppers (thinly sliced)';
  const formattedLine = scaleIngredient(testStr, 2);

  expect(formattedLine).toBe('2-4 fresh Thai bird chili peppers (thinly sliced)');
});

it('Two Whole Number Test Half', () => {
  const testStr = '1-2 fresh Thai bird chili peppers (thinly sliced)';
  const formattedLine = scaleIngredient(testStr, 0.5);

  expect(formattedLine).toBe('½-1 fresh Thai bird chili peppers (thinly sliced)');
});

it('None standard fraction Test', () => {
  const testStr = '0.33 cup oil';
  const formattedLine = scaleIngredient(testStr, 0.5);

  expect(formattedLine).toBe('0.165 cup oil');
});

it('Mixed Fraction Test', () => {
  const testStr = '1 1/2 tablespoons';
  const formattedLine = scaleIngredient(testStr, 2);

  expect(formattedLine).toBe('3 tablespoons');
});

it('Mixed Fraction Range Test', () => {
  const testStr = '1/2- 1 1/2 tablespoons';
  const formattedLine = scaleIngredient(testStr, 2);

  expect(formattedLine).toBe('1- 3 tablespoons');
});

it('Two amounts separated by to Test', () => {
  const testStr = '1 to 2 dried red chili peppers';
  const formattedLine = scaleIngredient(testStr, 2);

  expect(formattedLine).toBe('2 to 4 dried red chili peppers');
});

it('Amount in parenthesis Test', () => {
  const testStr = '1 dried red chili peppers (1/4 teaspoon)';
  const formattedLine = scaleIngredient(testStr, 2);

  expect(formattedLine).toBe('2 dried red chili peppers (½ teaspoon)');
});