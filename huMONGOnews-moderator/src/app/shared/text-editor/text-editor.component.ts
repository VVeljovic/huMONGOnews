import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
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

@Component({
  selector: 'app-text-editor',
  standalone: true,
  imports: [CommonModule, RichTextEditorModule, FormsModule],
  templateUrl: './text-editor.component.html',
  styleUrl: './text-editor.component.css',
  providers: [
    ToolbarService,
    LinkService,
    ImageService,
    HtmlEditorService,
    QuickToolbarService,
  ],
})
export class TextEditorComponent implements OnInit {
  public value: string | null = null;

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

  ngOnInit(): void {}

  rteCreated(): void {
    this.richTextEditor.insertImageSettings.saveFormat = 'Base64';
  }

  public getHTMLValue(): string | null {
    return this.value;
  }
}
