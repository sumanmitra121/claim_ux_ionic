import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ClaimDashboardPageRoutingModule } from './claim-dashboard-routing.module';
import { ClaimDashboardPage } from './claim-dashboard.page';
import { IncludeModule } from 'src/app/Include/include.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClaimDashboardPageRoutingModule,
    IncludeModule,
    NgxDatatableModule
  ],
  declarations: [ClaimDashboardPage],
  schemas:[CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA]
})
export class ClaimDashboardPageModule {}
