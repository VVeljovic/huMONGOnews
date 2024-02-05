import { LogInComponent } from './log-in/log-in.component';
import { Routes } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ModeratorDashboardComponent } from './moderator-dashboard/moderator-dashboard.component';
import { ArticlesContainerComponent } from './articles-container/articles-container.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { CreateArticleComponent } from './create-article/create-article.component';
import { ArticleMetadataFormComponent } from './article-metadata-form/article-metadata-form.component';

export const routes: Routes = [
  { path: 'log-in', pathMatch: 'full', component: LogInComponent },
  { path: 'sign-up', pathMatch: 'full', component: SignUpComponent },
  {
    path: 'moderator-dashboard',
    component: ModeratorDashboardComponent,
    children: [
      { path: '', redirectTo: 'profile-page', pathMatch: 'full' },
      {
        path: 'create-article',
        component: CreateArticleComponent,
      },
      {
        path: 'articles-container/:type',
        component: ArticlesContainerComponent,
      },
      { path: 'profile-page', component: ProfilePageComponent },
    ],
  },
  {
    path: 'article-metadata-form-test',
    pathMatch: 'full',
    component: ArticleMetadataFormComponent,
  },
  { path: '', pathMatch: 'full', redirectTo: 'log-in' },
];
