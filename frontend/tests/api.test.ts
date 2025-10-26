import type { RecipeType } from '../src/types/recipe';
import { expect, it } from '@jest/globals';
import { RecipeMapper } from '../src/api/recipeMapper';
import { mockRecipeResponseBody } from './fixtures/mockResponse';

it('recipe mapper test', () => {
  const recipeMapper = new RecipeMapper();
  const recipe: RecipeType = recipeMapper.fromApi(mockRecipeResponseBody);

  expect(recipe.title).toBe('Mapo Tofu');
  expect(recipe.description).toBe('This mapo tofu recipe is the true blue');
  expect(recipe.duration.days).toBe('');
  expect(recipe.duration.hours).toBe('');
  expect(recipe.duration.minutes).toBe('35 minutes');
  expect(recipe.ingredients[0]).toBe('½ cup oil (divided)');
  expect(recipe.steps[0]).toBe('First, we toast the chilies');
  expect(recipe.image).toBe('9j');
});
