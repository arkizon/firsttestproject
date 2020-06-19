import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipeStartPage } from './recipe-start.page';

const routes: Routes = [
  {
    path: '',
    component: RecipeStartPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipeStartPageRoutingModule {}
