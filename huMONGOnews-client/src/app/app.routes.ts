import { Routes } from '@angular/router';
import { CategoryPostsComponent } from './category-posts/category-posts.component';
import { FrontPageComponent } from './front-page/front-page.component';
import { HeaderComponent } from './header/header.component';
import { PaginationComponent } from './pagination/pagination.component';
import { CommentsComponent } from './comments/comments.component';

export const routes: Routes = [
  { path: 'front-page', pathMatch: 'full', component: FrontPageComponent },
  { path: 'header', pathMatch: 'full', component: PaginationComponent },
  { path: 'comments', pathMatch: 'full', component: CommentsComponent },
  { path: 'category/:categoryName', pathMatch: 'full', component: CategoryPostsComponent },
];
