import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  constructor() { }


  getRecipe(id:number){
    return id;
  }
}
