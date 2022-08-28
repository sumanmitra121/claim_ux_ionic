import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CardComponent } from '../Component/card/card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from '../Component/header/header.component';
import { RefreshComponent } from '../Component/refresh/refresh.component';


@NgModule({
  declarations: [CardComponent,HeaderComponent,RefreshComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
  ],
  exports:[CardComponent,HeaderComponent,RefreshComponent]
})
export class IncludeModule { }
