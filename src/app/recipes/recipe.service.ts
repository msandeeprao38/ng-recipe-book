import { Subject } from 'rxjs/Subject';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';

export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();
    private recipes: Recipe[] = [
    new Recipe(
        'A Test Recipe',
        'This is simply a test',
    'http://www.seriouseats.com/images/2015/09/20150914-pressure-cooker-recipes-roundup-09.jpg',
    [
        new Ingredient('Chicken', 3),
        new Ingredient('rice', 2)
    ]),
    new Recipe(
        'Another Test Recipe',
        'This is simply a test',
    'http://www.seriouseats.com/images/2015/09/20150914-pressure-cooker-recipes-roundup-09.jpg',
    [
        new Ingredient('Chicken', 3),
        new Ingredient('rice', 2)
    ])
  ];

  setRecipes(recipes: Recipe[]) {
      this.recipes = recipes;
      this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
      return this.recipes.slice();
  }
  getSelectedRecipe(index: number) {
    return this.recipes[index];
  }
  addRecipe(recipe: Recipe) {
      this.recipes.push(recipe);
      this.recipesChanged.next(this.recipes.slice());
  }
  updateRecipe(index: number, newRecipe: Recipe) {
      this.recipes[index] = newRecipe;
      this.recipesChanged.next(this.recipes.slice());
  }
  deleteRecipe(index: number) {
      this.recipes.splice(index, 1);
      this.recipesChanged.next(this.recipes.slice());
  }

}
