import { Routes } from '@angular/router';
import { CategoryPostsComponent } from './category-posts/category-posts.component';
import { FrontPageComponent } from './front-page/front-page.component';
import { HeaderComponent } from './header/header.component';
import { PaginationComponent } from './pagination/pagination.component';

export const routes: Routes = [
  { path: 'front-page', pathMatch: 'full', component: FrontPageComponent },
  { path: 'header', pathMatch: 'full', component: PaginationComponent },
  { path: 'category/:categoryName', pathMatch: 'full', component: CategoryPostsComponent },
];
