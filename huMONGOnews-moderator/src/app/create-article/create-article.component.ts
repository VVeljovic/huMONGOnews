import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { TextEditorComponent } from './../shared/text-editor/text-editor.component';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RichTextEditorModule } from '@syncfusion/ej2-angular-richtexteditor';
import { ButtonAllModule } from '@syncfusion/ej2-angular-buttons';
import { HttpClientModule } from '@angular/common/http';
import { ArticleService } from '../services/article.service';
import { Subject, map, take, takeUntil } from 'rxjs';

@Component({
  selector: 'app-create-article',
  standalone: true,
  imports: [
    CommonModule,
    TextEditorComponent,
    FormsModule,
    RichTextEditorModule,
    ButtonAllModule,
    HttpClientModule,
  ],
  templateUrl: './create-article.component.html',
  styleUrl: './create-article.component.css',
  providers: [ArticleService, ToastrService],
})
export class CreateArticleComponent implements OnInit, OnDestroy {
  @ViewChild('textEditor')
  public textEditorComponent!: TextEditorComponent;
  public articleId: string | null = null;

  private unsubscriber$ = new Subject<void>();

  constructor(
    private articleService: ArticleService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(
        map((params) => {
          return params.get('id') ?? '';
        })
      )
      .subscribe((articleId: string) => {
        this.articleId = articleId;
        console.log(articleId);
      });
  }

  ngOnDestroy(): void {
    this.unsubscriber$.next();
    this.unsubscriber$.complete();
  }

  onSave() {
    if (!this.articleId) throw Error(`Article ID not found in route!`);

    const contents = this.textEditorComponent.getHTMLValue();
    if (!contents) {
      this.toastr.info('Nothing to update.', 'Info');
      return;
    }

    this.articleService
      .updateContents(this.articleId, contents)
      .pipe(takeUntil(this.unsubscriber$))
      .subscribe((updatedArticle) => {
        this.toastr.success(
          `Succesfully updated article '${updatedArticle.title}'`
        );
      });
  }
}
