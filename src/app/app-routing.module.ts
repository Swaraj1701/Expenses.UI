import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { TransactionListComponent } from './components/transaction-list/transaction-list.component';
import { TransactionFormComponent } from './components/transaction-form/transaction-form.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {path:'login', component: LoginComponent},
  {path:'signup', component: SignupComponent},
  {path:'transactions', component: TransactionListComponent,
    canActivate: [authGuard]
  },
  {path:'add', component: TransactionFormComponent, canActivate: [authGuard]},
  {path:'edit/:id', component: TransactionFormComponent, canActivate: [authGuard]},
  {path:'**', redirectTo:'/transactions'},
  // {path:'', redirectTo:'/transactions', pathMatch:'full',
  //   canActivate: [authGuard]
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
