import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MainAuthComponent } from './main-auth.component';
import { RouterModule, Routes } from '@angular/router';

const route: Routes =[
                     {path:'',
                      component:MainAuthComponent,
                      children:[
                        {path:'',loadChildren:()=> import('./login/login.module').then(m => m.LoginPageModule)}
                      ]
                     }
                    ];
@NgModule({
  declarations: [MainAuthComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(route)
  ],
  exports:[RouterModule]
})
export class MainAuthModule { }
