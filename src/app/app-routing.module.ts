import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import {GstAddComponent} from './gst-add/gst-add.component';
import {GstEditComponent} from './gst-edit/gst-edit.component';
import {GstGetComponent} from './gst-get/gst-get.component';
import {LoginComponent} from './login/login.component';


const routes: Routes = [
  {
    path: 'api/create',
    component: GstAddComponent
  },
  {
    path: 'api/edit/:id',
    component: GstEditComponent
  },
  {
    path: 'api',
    component: GstGetComponent
  },
  {
    path: 'api/auth/login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
