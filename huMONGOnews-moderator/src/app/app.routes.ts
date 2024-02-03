import { LogInComponent } from './log-in/log-in.component';
import { Routes } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ModeratorDashboardComponent } from './moderator-dashboard/moderator-dashboard.component';

export const routes: Routes = [
  {
    path: 'moderator-dashboard',
    pathMatch: 'full',
    component: ModeratorDashboardComponent,
  },
  { path: 'log-in', pathMatch: 'full', component: LogInComponent },
  { path: 'sign-up', pathMatch: 'full', component: SignUpComponent },
  { path: '', pathMatch: 'full', redirectTo: 'log-in' },
];
