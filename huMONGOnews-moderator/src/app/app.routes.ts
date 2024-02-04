import { LogInComponent } from './log-in/log-in.component';
import { Routes } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ModeratorDashboardComponent } from './moderator-dashboard/moderator-dashboard.component';
import { ArticlesContainerComponent } from './articles-container/articles-container.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';

export const routes: Routes = [
  { path: 'log-in', pathMatch: 'full', component: LogInComponent },
  { path: 'sign-up', pathMatch: 'full', component: SignUpComponent },
  {
    path: 'moderator-dashboard/:type',
    component: ModeratorDashboardComponent,
    children: [
      {
        path: 'articles-container',
        component: ArticlesContainerComponent,
      },
      { path: 'profile-page', component: ProfilePageComponent },
    ],
  },
  { path: '', pathMatch: 'full', redirectTo: 'log-in' },
];
