import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '',loadChildren: () => import('../app/Pages/Authentication/main-auth.module').then( m => m.MainAuthModule)},
  {path: '',loadChildren: () => import('../app/Pages/main/main.module').then( m => m.MainModule)},
  {
    path: 'add-claim',
    loadChildren: () => import('./Pages/main/claim/add-claim/add-claim.module').then( m => m.AddClaimPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
