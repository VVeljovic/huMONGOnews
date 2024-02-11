import {
  Observable,
  Subject,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  map,
  merge,
  of,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
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
import { DialogModule } from 'primeng/dialog';
import { TopNavigationComponent } from '../moderator-dashboard/top-navigation/top-navigation.component';
import { FeatherModule } from 'angular-feather';

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
    DialogModule,
    TopNavigationComponent,
    FeatherModule,
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
  private searchStringLocal$: Observable<string> = of('');

  constructor(
    private activatedRoute: ActivatedRoute,
    private articleService: ArticleService,
    private confirmationService: ConfirmationService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  onSearch(searchString: string) {
    this.articleService.onSearchChange(searchString);
  }

  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  ngOnInit(): void {
    // this.articleService.searchString$
    //   .pipe(debounceTime(500), distinctUntilChanged())
    //   .subscribe(console.log);

    this.moderator = JSON.parse(sessionStorage.getItem('moderator') ?? '');

    if (!this.moderator._id) throw Error('No moderator found!');

    this.articleType$ = this.activatedRoute.paramMap.pipe(
      map((params) => {
        return params.get('type') ?? '';
      }),
      map((articleType) => articleType.toUpperCase().slice(0, -1))
    );

    this.articles$ = combineLatest([
      this.articleService.searchString$.pipe(
        debounceTime(500),
        distinctUntilChanged()
      ),
      this.articleType$,
    ]).pipe(
      switchMap((value: [string, string]) => {
        const searchString = value[0];
        const articleType = value[1];

        console.log(searchString);
        console.log(articleType);

        return this.articleService.searchByContent(
          this.moderator._id ?? '',
          articleType as ArticleState,
          searchString
        );
      }),
      tap(console.log)
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
            this.articleService;
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

  edit(event: Event, id: string, contents: string) {
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

  public visibleArticleId: string = '';
  public visibleDialog = false;

  showDialog(id: string) {
    this.visibleArticleId = id;
    this.visibleDialog = true;
  }

  hideDialog() {
    this.visibleArticleId = '';
    this.visibleDialog = false;
  }
}
