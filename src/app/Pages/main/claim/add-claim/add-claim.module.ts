import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddClaimPageRoutingModule } from './add-claim-routing.module';

import { AddClaimPage } from './add-claim.page';
import { IncludeModule } from 'src/app/Include/include.module';
import { IonicSelectableModule } from 'ionic-selectable';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AddClaimPageRoutingModule,
    IncludeModule,
    IonicSelectableModule,
  ],
  declarations: [AddClaimPage],
})
export class AddClaimPageModule {}
