import { Routes } from '@angular/router';
import { CategoryPostsComponent } from './category-posts/category-posts.component';
import { FrontPageComponent } from './front-page/front-page.component';
import { HeaderComponent } from './header/header.component';

export const routes: Routes = [
  { path: 'front-page', pathMatch: 'full', component: FrontPageComponent },
  { path: 'header', pathMatch: 'full', component: HeaderComponent },
  { path: 'category/:categoryName', pathMatch: 'full', component: CategoryPostsComponent },
];
