import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormGroup, FormArray, FormControl, Validators, FormBuilder } from '@angular/forms';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-edit',
  // templateUrl: './recipe-edit.page.html',
  templateUrl: './test-temp.html',
  styleUrls: ['./recipe-edit.page.scss'],
})
export class RecipeEditPage implements OnInit {

 recipeForm: FormGroup;
 id: number;
 editMode = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipesService,
    private formBuilder: FormBuilder
  ) { 
    // this.initForm()

    this.qsForm = this.formBuilder.group({
      quests: this.formBuilder.array([
        this.initQuests()
      ]),
      quests2: this.formBuilder.array([
        this.initQuests()
      ])
    });
    // this.route.params.subscribe((params: Params) => {
    //   this.id = +params['id'];
    //   this.editMode = params['id'] != null;
    //   this.initForm()
    // })
  }




  // ngOnInit() {
   
    // this.route.params.subscribe((params: Params) => {
    //   this.id = +params['id'];
    //   this.editMode = params['id'] != null;
    //   this.initForm()
    // })
  // }

get ingredientsControl(){
  return (this.recipeForm.get('ingredients') as FormArray).controls;
}

onAddIngredient(){
  //when ever this button is clicked, i add a new form group to the main form
  (<FormArray>this.recipeForm.get('ingredients')).push(
    new FormGroup({
      name: new FormControl(null, Validators.required),
      amount: new FormControl(null, [
        Validators.required, 
        Validators.pattern(/^[1-9]+[0-9]*$/)
      ])
    })
  )
}
onDeleteIngredient(index:number){
  (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
}
onCancel(){
  this.router.navigate(['../'], {relativeTo: this.route})
}

// onSubmit(){
//     if(this.editMode){
//       console.log(this.recipeForm, 'edited')
//     } else {
//       //
//       console.log(this.recipeForm, 'new form added')
//     }
//     this.onCancel();
    
// }

  private  initForm(){
    let recipeName = '';
    let reciepImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);
    if(this.editMode){
     const recipe = this.recipeService.getRecipe(this.id);
    //  recipeName = recipe.name;
    //  recipeDescription = recipe.description;
    //  reciepImagePath = recipe.imagePath;
      // if(recipe['ingredients']){
      //   for (let ingredient of recipe.ingredients){
      //     recipeIngredients.push(
      //       new FormGroup({
      //           name: new FormControl(ingredient.name, Validators.required),
      //           amount: new FormControl(ingredient.amount, [
      //             Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)
      //           ])
      //       })
      //     )
      //   }
      // }
      this.recipeForm = new FormGroup ({
        name: new FormControl(recipeName, Validators.required),
        imagePath: new FormControl(reciepImagePath, Validators.required),
        description: new FormControl(recipeDescription, Validators.required),
        ingredients: recipeIngredients
      })

    }
    
  }


//form array practice
qsForm: FormGroup;
singleChoice: any[] = [
  {
    nbr: '1',
    question: 'What is your job?',
    choice1: 'Full Stack Developer',
    choice2: 'Frontend Developer',
    choice3: 'Backend Developer',
    choice4: 'Database Administrator',
    choice: ''
  },
  {
    nbr: '2',
    question: 'Which frontend framework do you use?',
    choice1: 'Angular',
    choice2: 'React',
    choice3: 'Vue',
    choice4: 'Ember',
    choice: ''
  },
  {
    nbr: '3',
    question: 'Which backend framework do you use?',
    choice1: 'Spring',
    choice2: 'Django',
    choice3: 'Laravel',
    choice4: 'Ruby on Rails',
    choice: ''
  }
  ];
  multiChoice: any[] = [
    {
      nbr: '4',
      question: 'Choose one or more of your frontend skills!',
      choice1: 'Angular',
      choice2: 'React',
      choice3: 'Vue',
      choice4: 'Ember',
      choice: ''
    },
    {
      nbr: '5',
      question: 'Choose one or more of your backend skills!',
      choice1: 'Spring',
      choice2: 'Django',
      choice3: 'Laravel',
      choice4: 'Ruby on Rails',
      choice: ''
    }
    ];


    initQuests() {
      return this.formBuilder.group({
        nbr: '',
        question: '',
        choice1: '',
        choice2: '',
        choice3: '',
        choice4: '',
        choice: '',
      });
    }
    setQuest(quests: any) {
      const arr = new FormArray([]);
      quests.forEach((q: any) => {
        arr.push(this.formBuilder.group({
          nbr: q.nbr,
          question: q.question,
          nchoice1br: q.choice1,
          choice1: q.choice1,
          choice2: q.choice2,
          choice3: q.choice3,
          choice4: q.choice4,
          choice: ''
        }));
      });
      return arr;
    }
    ngOnInit() {
      this.qsForm = this.formBuilder.group({
        quests: this.setQuest(this.singleChoice),
        quests2: this.setQuest(this.multiChoice)
      });
    }

    selectChecked(i: any, value: any) {
      const formArray = this.qsForm.controls.quests2 as FormArray;
      const formGroup = formArray.at(i) as FormGroup;
      const choice = formGroup.controls.choice;
      if (choice.value.search(value) === -1) {
        if (choice.value !== '') {
          choice.setValue(choice.value + ',' + value);
        } else {
          choice.setValue(value);
        }
      } else {
        const splitted = choice.value.split(',');
        const idx = splitted.indexOf(value, 0);
        splitted.splice(idx, 1);
        choice.setValue(splitted.toString());
      }
    }
    onSubmit() {
      const submitData: any[] = [];
      this.qsForm.value.quests.forEach((qu: any) => {
        submitData.push({
          nbr: qu.nbr,
          question: qu.question,
          choice1: qu.choice1,
          choice2: qu.choice2,
          choice3: qu.choice3,
          choice4: qu.choice4,
          answer: qu.choice
        });
      });
      this.qsForm.value.quests2.forEach((qu2: any) => {
        submitData.push({
          nbr: qu2.nbr,
          question: qu2.question,
          choice1: qu2.choice1,
          choice2: qu2.choice2,
          choice3: qu2.choice3,
          choice4: qu2.choice4,
          answer: qu2.choice
        });
      });
      this.router.navigate(['/details/' + JSON.stringify(submitData)]);
    }



}
