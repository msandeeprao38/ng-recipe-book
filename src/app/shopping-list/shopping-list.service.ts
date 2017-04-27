import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService {
    ingredientsChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();

    private ingredients: Ingredient[] = [
    new Ingredient('Tomato', 10),
    new Ingredient('Apples', 5)
  ];
    getIngredients() {
        return this.ingredients.slice();
    }
    getIngredient(index: number) {
        return this.ingredients[index];
    }
    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    addToIngredients(ingredients: Ingredient[]) {
        // ingredients.map(ing => {
        //     this.ingredients.push(ing);
        // });
        // Above logic also works but here we will use the ES6 spread operator
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.next(this.ingredients.slice());
    }
    updateIngredient(index: number, ingredient: Ingredient) {
        this.ingredients[index] = ingredient;
        this.ingredientsChanged.next(this.ingredients.slice());
    }
    deleteIngredient(index: number) {
        this.ingredients.splice(index, 1);
        this.ingredientsChanged.next(this.ingredients.slice());
    }
}
