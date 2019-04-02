import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserPageComponent } from './user-page.component';

const routes: Routes = [
    {
      path: 'user',
      component: UserPageComponent,
      children: [
        {
            path: ':id',
            component: UserPageComponent
        }
      ]
    }
  ];
  
  @NgModule({
    imports: [
      RouterModule.forChild(routes)
    ],
    exports: [
      RouterModule
    ]
  })
  export class UserPageRoutingModule { }