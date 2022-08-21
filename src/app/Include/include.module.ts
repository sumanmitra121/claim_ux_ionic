import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CardComponent } from '../Component/card/card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from '../Component/header/header.component';


@NgModule({
  declarations: [CardComponent,HeaderComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
  ],
  exports:[CardComponent,HeaderComponent]
})
export class IncludeModule { }
