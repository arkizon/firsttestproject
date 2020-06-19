import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.page.html',
  styleUrls: ['./recipes.page.scss'],
})
export class RecipesPage implements OnInit {
  recipes = [
    {name:'potatoe', description:'nice food', imagePath:'https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg', ingredients:"['fish', 'egg']"},
    {name:'sweet', description:'amazing food', imagePath:'https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg', ingredients:"['yam', 'chicken']"}
  ]
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  onCreateNewRecipe(){
    this.router.navigate(['/recipes/new']);
  }

}
