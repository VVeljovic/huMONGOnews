import { LogInComponent } from './log-in/log-in.component';
import { Routes } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';

export const routes: Routes = [
  { path: 'log-in', pathMatch: 'full', component: LogInComponent },
  { path: 'sign-in', pathMatch: 'full', component: SignUpComponent },
];
