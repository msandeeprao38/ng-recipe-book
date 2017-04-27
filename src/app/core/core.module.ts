import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './../app-routing.module';
import { SharedModule } from './../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';

import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { RecipeService } from '../recipes/recipe.service';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';

@NgModule({
    declarations: [
        HeaderComponent,
        HomeComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        AppRoutingModule
    ],
    exports: [
        HeaderComponent,
        AppRoutingModule
    ],

  providers: [ShoppingListService, RecipeService, DataStorageService, AuthService]
})

export class CoreModule {}
