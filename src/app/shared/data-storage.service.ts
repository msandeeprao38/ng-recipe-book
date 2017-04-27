import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataStorageService {

  constructor(private http: Http,
    private recipeService: RecipeService,
    private auth: AuthService) {}
  storeRecipes() {
      const token = this.auth.getToken();
      return this.http.put('https://ng-recipe-book-25244.firebaseio.com/recipes.json?auth=' + token,
        this.recipeService.getRecipes());
  }
  fetchRecipes() {
      const token = this.auth.getToken();
      this.http.get('https://ng-recipe-book-25244.firebaseio.com/recipes.json?auth=' + token)
        .map(
            (response: Response) => {
                const recipes: Recipe[] = response.json();
                for (let recipe of recipes) {
                    if (!recipe['ingredients']) {
                        recipe['ingredients'] = [];
                    }
                }
                return recipes;
            }
        )
        .subscribe(
            (recipes: Recipe[]) => {
            this.recipeService.setRecipes(recipes);
            },
            (error) => console.log(error)
      );
      ;
  }
}
