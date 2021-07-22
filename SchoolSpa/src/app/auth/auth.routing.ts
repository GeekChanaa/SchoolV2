import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';


export const AppRoutes: Routes= [
  { path : '' , component : LoginComponent },
  { path : 'login' , component : LoginComponent },
  { path : 'register' , component : RegisterComponent },
  { path : 'forgot-password' , component : ForgotPasswordComponent },
  { path : 'reset-password' , component : ResetPasswordComponent },

  
]

@NgModule({
  imports: [RouterModule.forChild(AppRoutes)],
  exports: [RouterModule],
})
export class AuthRoutingModule{
}
