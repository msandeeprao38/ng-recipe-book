import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe;
  id: number;

  constructor(private recipeService: RecipeService,
    private shoppinglistService: ShoppingListService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    // const id = +this.route.snapshot.params['id'];
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.recipe = this.recipeService.getSelectedRecipe(this.id);
        }
      );
  }

  addToShoppingList() {
    this.shoppinglistService.addToIngredients(this.recipe.ingredients);
  }
  toEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }
  deleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
}
