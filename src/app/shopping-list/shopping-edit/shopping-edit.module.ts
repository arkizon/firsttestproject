import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShoppingEditPageRoutingModule } from './shopping-edit-routing.module';

import { ShoppingEditPage } from './shopping-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShoppingEditPageRoutingModule
  ],
  declarations: [ShoppingEditPage]
})
export class ShoppingEditPageModule {}
