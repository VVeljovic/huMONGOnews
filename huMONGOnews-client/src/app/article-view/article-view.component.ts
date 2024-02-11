import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { AsyncPipe, CommonModule, JsonPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ArticleService } from '../services/article.service';
import { Observable, map, switchMap, take, tap } from 'rxjs';
import { Article } from '../../../../huMONGOnews-moderator/src/app/models/article.model';
import { CommentsComponent } from '../comments/comments.component';

@Component({
  selector: 'app-article-view',
  standalone: true,
  imports: [
    HeaderComponent,
    CommonModule,
    HttpClientModule,
    AsyncPipe,
    JsonPipe,
    CommentsComponent,
  ],
  templateUrl: './article-view.component.html',
  styleUrl: './article-view.component.css',
  providers: [ArticleService],
})
export class ArticleViewComponent implements OnInit {
  public article$!: Observable<Article>;

  constructor(
    private articleService: ArticleService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.article$ = this.activatedRoute.paramMap.pipe(
      map((params) => {
        return params.get('id') ?? '';
      }),
      tap((articleId)=>{
        this.articleService.incrementViews(articleId).subscribe();
      }),
      switchMap((articleId) => {
        return this.articleService.findById(articleId);
      }),
    );
  }
}
