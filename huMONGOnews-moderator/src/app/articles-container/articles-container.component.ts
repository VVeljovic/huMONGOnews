import { Observable, Subject, map, of, switchMap, takeUntil } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {
  AsyncPipe,
  TitleCasePipe,
  CommonModule,
  JsonPipe,
} from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ArticleService } from '../services/article.service';
import { Article, ArticleState } from '../models/article.model';
import { Moderator } from '../models/moderator.model';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-articles-container',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    AsyncPipe,
    TitleCasePipe,
    JsonPipe,
    HttpClientModule,
    CardModule,
    ConfirmDialogModule,
    ButtonModule,
  ],
  templateUrl: './articles-container.component.html',
  styleUrl: './articles-container.component.css',
  providers: [ArticleService, ConfirmationService, ToastrService],
})
export class ArticlesContainerComponent implements OnInit, OnDestroy {
  public articleType$!: Observable<string>;
  public articles$: Observable<Article[]> = of([]);
  public moderator!: Moderator;
  private unsubscriber$ = new Subject<void>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private articleService: ArticleService,
    private confirmationService: ConfirmationService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.moderator = JSON.parse(sessionStorage.getItem('moderator') ?? '');

    if (!this.moderator._id) throw Error('No moderator found!');

    this.articleType$ = this.activatedRoute.paramMap.pipe(
      map((params) => {
        return params.get('type') ?? '';
      })
    );

    this.articles$ = this.articleType$.pipe(
      map(
        (articleType) => articleType.toUpperCase().slice(0, -1) as ArticleState
      ),
      switchMap((articleState) =>
        this.articleService.findArticlesInStateForModerator(
          this.moderator._id ?? '',
          articleState
        )
      )
    );
  }

  ngOnDestroy(): void {
    this.unsubscriber$.next();
    this.unsubscriber$.complete();
  }

  post(event: Event, id: string) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure that you want to proceed with posting?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'none',
      rejectIcon: 'none',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        this.articleService
          .patchState(id, 'POST')
          .pipe(takeUntil(this.unsubscriber$))
          .subscribe((data) => {
            this.toastr.success('Successfuly made a post!');
            this.router.navigate([
              '/moderator-dashboard',
              'articles-container',
              'posts',
            ]);
          });
      },
      reject: () => {
        this.toastr.info('You canceled posting.', 'Info');
      },
    });
  }

  archive(event: Event, id: string) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure that you want to proceed with archiving?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'none',
      rejectIcon: 'none',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        this.articleService
          .patchState(id, 'ARCHIVE')
          .pipe(takeUntil(this.unsubscriber$))
          .subscribe((data) => {
            this.toastr.success('Successfuly archived an article!');
            this.router.navigate([
              '/moderator-dashboard',
              'articles-container',
              'archives',
            ]);
          });
      },
      reject: () => {
        this.toastr.info('You canceled archiving.', 'Info');
      },
    });
  }

  edit(event: Event, id: string) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure that you want to go to edit?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'none',
      rejectIcon: 'none',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        this.toastr.info("You're in editing mode.");
        this.router.navigate(['/moderator-dashboard', 'create-article', id]);
      },
      reject: () => {
        this.toastr.info('You canceled editing.', 'Info');
      },
    });
  }
}
