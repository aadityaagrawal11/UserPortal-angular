import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { FormComponent } from './register/form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {  AuthGuardService } from './guard/auth.guard';
import { TestComponent } from './Ag grid Dashboard/test.component';


const routes: Routes = [
   { path:'',    redirectTo:'login', pathMatch:'full' },  //Default Routing
  { path:'login',    component: LoginComponent },
  { path:'register', component: FormComponent },
  { path:'dashboard', component: DashboardComponent, canActivate: [AuthGuardService] },
  { path:'test',    component: TestComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
