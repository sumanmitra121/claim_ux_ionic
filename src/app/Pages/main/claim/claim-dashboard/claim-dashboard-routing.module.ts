import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClaimDashboardPage } from './claim-dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: ClaimDashboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClaimDashboardPageRoutingModule {}
