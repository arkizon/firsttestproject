import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RecipeStartPage } from './recipe-start.page';

describe('RecipeStartPage', () => {
  let component: RecipeStartPage;
  let fixture: ComponentFixture<RecipeStartPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeStartPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RecipeStartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
