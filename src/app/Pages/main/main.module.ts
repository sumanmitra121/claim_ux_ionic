/* eslint-disable max-len */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { IncludeModule } from 'src/app/Include/include.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


const route: Routes= [
                      {path:'main',
                       component:MainComponent,
                       children:[
                          {path:'',redirectTo:'home',pathMatch:'full'},
                          {path:'home',loadChildren:()=>import('./dashboard/dashboard.module').then(m => m.DashboardPageModule)},
                          {path:'claim_dashboard',loadChildren:()=>import('./claim/claim-dashboard/claim-dashboard.module').then(m => m.ClaimDashboardPageModule)},
                          {path:'add_claim/:id',loadChildren:()=>import('./claim/add-claim/add-claim.module').then(m => m.AddClaimPageModule)},
                          {path:'reports/:type/:frm_dt/:to_dt',loadChildren:()=>import('../main/reports/reports.module').then(m => m.ReportsPageModule)},
                          {path:'imageUpload',loadChildren:()=>import('../main/upload-image/upload-image.module').then(m => m.UploadImagePageModule)}
                       ]
                      }
                      ];


@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(route)
  ],
  exports:[RouterModule]
})
export class MainModule { }
