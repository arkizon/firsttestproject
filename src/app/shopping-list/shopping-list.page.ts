import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.page.html',
  styleUrls: ['./shopping-list.page.scss'],
})
export class ShoppingListPage implements OnInit {
  ingredients: Ingredient[] = [
    {name:'apples', amount:5},
    {name:'fish', amount:6}
  ]
  constructor() { }

  ngOnInit() {
  }

  onEditItem(index: number){
      console.log(index)
  }

}
