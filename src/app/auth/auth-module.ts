import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Login } from './login/login';
import { Signup } from './signup/signup';

@NgModule({
  declarations: [
    Login,
    Signup
  ],
imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'login', component: Login },
      { path: 'signup', component: Signup}
    ])
  ]
})
export class AuthModule { }
