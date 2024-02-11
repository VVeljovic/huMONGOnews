import { ActivatedRoute } from '@angular/router';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  HtmlEditorService,
  ImageService,
  LinkService,
  QuickToolbarService,
  RichTextEditorModule,
  ToolbarService,
  RichTextEditor,
  RichTextEditorComponent,
} from '@syncfusion/ej2-angular-richtexteditor';
import { ArticleService } from '../../services/article.service';
import { HttpClientModule } from '@angular/common/http';
import { Subject, map, switchMap, takeUntil } from 'rxjs';

@Component({
  selector: 'app-text-editor',
  standalone: true,
  imports: [
    CommonModule,
    RichTextEditorModule,
    FormsModule,
    HttpClientModule,
    AsyncPipe,
  ],
  templateUrl: './text-editor.component.html',
  styleUrl: './text-editor.component.css',
  providers: [
    ToolbarService,
    LinkService,
    ImageService,
    HtmlEditorService,
    QuickToolbarService,
    ArticleService,
  ],
})
export class TextEditorComponent implements OnInit, OnDestroy {
  public value: string = '';
  unsubscriber$ = new Subject<void>();

  @ViewChild('rte')
  private richTextEditor!: RichTextEditorComponent;

  public tools: object = {
    items: [
      'Undo',
      'Redo',
      '|',
      'Bold',
      'Italic',
      'Underline',
      'StrikeThrough',
      '|',
      'FontName',
      'FontSize',
      'FontColor',
      'BackgroundColor',
      '|',
      'SubScript',
      'SuperScript',
      '|',
      'LowerCase',
      'UpperCase',
      '|',
      'Formats',
      'Alignments',
      '|',
      'OrderedList',
      'UnorderedList',
      '|',
      'Indent',
      'Outdent',
      '|',
      'CreateLink',
      'Image',
      '|',
      'ClearFormat',
      'Print',
    ],
  };

  public quickTools: object = {
    image: [
      'Replace',
      'Align',
      'Caption',
      'Remove',
      'InsertLink',
      '-',
      'Display',
      'AltText',
      'Dimension',
    ],
  };

  constructor(
    private articleService: ArticleService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(
        map((params) => {
          return params.get('id') ?? '';
        }),
        switchMap((articleId: string) => {
          return this.articleService.findById(articleId);
        })
      )
      .pipe(takeUntil(this.unsubscriber$))
      .subscribe((article) => {
        console.log(article.contents);
        this.value = article.contents;
      });
  }

  ngOnDestroy(): void {
    this.unsubscriber$.next();
    this.unsubscriber$.complete();
  }

  rteCreated(): void {
    this.richTextEditor.insertImageSettings.saveFormat = 'Base64';
    this.richTextEditor.enablePersistence = true;
    this.richTextEditor.enableTabKey = true;
  }

  public getHTMLValue(): string | null {
    return this.value;
  }
}
