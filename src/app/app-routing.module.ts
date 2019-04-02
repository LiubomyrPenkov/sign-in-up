import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { UserPageComponent } from './user-page/user-page.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: 'sign-in',
    component: SignInComponent
  }, {
    path: 'sign-up',
    component: SignUpComponent
  }, {
    path: 'admin',
    component: AdminPageComponent,
    canActivate: [AuthGuard]
  }, {
  //   path: 'user',
  //   component: UserPageComponent,
  //   canActivate: [AuthGuard]  
  // }, {
    path: '',
    redirectTo: 'sign-in',
    pathMatch: 'full'
  }, {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
