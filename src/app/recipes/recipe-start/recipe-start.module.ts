import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecipeStartPageRoutingModule } from './recipe-start-routing.module';

import { RecipeStartPage } from './recipe-start.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecipeStartPageRoutingModule
  ],
  declarations: [RecipeStartPage]
})
export class RecipeStartPageModule {}
