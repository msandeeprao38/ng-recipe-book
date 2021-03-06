import { Component, OnInit } from '@angular/core';
import {  ActivatedRoute, Params, Router } from '@angular/router';
import {  FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import {  RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editmode = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editmode = params['id'] != null;
          this.initForm();
        }
      );
  }

    private initForm() {
      let recipeName = '';
      let recipeImagePath = '';
      let recipeDescription = '';
      let recipeIngredients = new FormArray([]);

      if (this.editmode) {
        const recipe = this.recipeService.getSelectedRecipe(this.id);
        recipeName = recipe.name;
        recipeImagePath = recipe.imagePath;
        recipeDescription = recipe.description;
        if (recipe['ingredients']) {
          recipe.ingredients.map(ingredient => {
            recipeIngredients.push(
              new FormGroup({
                'name': new FormControl(ingredient.name, Validators.required),
                'amount': new FormControl(ingredient.amount, [
                  Validators.required,
                  Validators.pattern(/^[1-9]+[0-9]*$/),
                  ]),
              })
            );
          });
        }
      }
      this.recipeForm = new FormGroup({
        'name': new FormControl(recipeName, Validators.required),
        'imagePath': new FormControl(recipeImagePath, Validators.required),
        'description': new FormControl(recipeDescription, Validators.required),
        'ingredients': recipeIngredients,
      });
    }

    onAddIngredient() {
      (<FormArray>this.recipeForm.get('ingredients')).push(
        new FormGroup({
          'name': new FormControl(null, Validators.required),
          'amount': new FormControl(null, [
              Validators.required,
              Validators.pattern(/^[1-9]+[0-9]*$/),
            ]),
        })
      );
    }
    onDeleteIngredient(index: number) {
      (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
    }
    onSubmit() {
      if (this.editmode) {
        this.recipeService.updateRecipe(this.id, this.recipeForm.value);
      } else {
        this.recipeService.addRecipe(this.recipeForm.value);
      }
      this.router.navigate(['../'], {relativeTo: this.route});
    }
    onCancel() {
      this.router.navigate(['../'], {relativeTo: this.route});
    }
    getControls() {
      return (<FormArray>this.recipeForm.get('ingredients')).controls;
    }

}
