import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipesPage } from './recipes.page';

const routes: Routes = [
  {
    path: '',
    component: RecipesPage, 
    children: [
      {path: '', loadChildren: () => import('./recipe-start/recipe-start.module').then( m => m.RecipeStartPageModule) },
      {path: 'new',  loadChildren: () => import('./recipe-edit/recipe-edit.module').then( m => m.RecipeEditPageModule)},
      {path: ':id',  loadChildren: () => import('./recipe-detail/recipe-detail.module').then( m => m.RecipeDetailPageModule)},
      {
        path: ':id/edit',
        loadChildren: () => import('./recipe-edit/recipe-edit.module').then( m => m.RecipeEditPageModule)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipesPageRoutingModule {}
