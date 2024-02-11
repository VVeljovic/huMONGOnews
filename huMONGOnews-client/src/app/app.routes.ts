import { Routes } from '@angular/router';
import { CategoryPostsComponent } from './category-posts/category-posts.component';
import { FrontPageComponent } from './front-page/front-page.component';
import { HeaderComponent } from './header/header.component';
import { PaginationComponent } from './pagination/pagination.component';
import { CommentsComponent } from './comments/comments.component';
import { ArticleViewComponent } from './article-view/article-view.component';

export const routes: Routes = [
  { path: 'front-page', pathMatch: 'full', component: FrontPageComponent },
  { path: 'comments', pathMatch: 'full', component: CommentsComponent },
  {
    path: 'category/:categoryName',
    pathMatch: 'full',
    component: CategoryPostsComponent,
  },
  {
    path: 'article-view/:id',
    pathMatch: 'full',
    component: ArticleViewComponent,
  },
  { path: '', redirectTo: 'front-page', pathMatch: 'full' },
];
