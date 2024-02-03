import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  HtmlEditorService,
  ImageService,
  LinkService,
  QuickToolbarService,
  RichTextEditorModule,
  ToolbarService,
  RichTextEditor,
} from '@syncfusion/ej2-angular-richtexteditor';

@Component({
  selector: 'app-text-editor',
  standalone: true,
  imports: [CommonModule, RichTextEditorModule],
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
  private richTextEditor = new RichTextEditor();

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

  ngOnInit(): void {
    this.richTextEditor.appendTo('#contents');
  }

  public getHTMLValue(): string {
    return this.richTextEditor.value;
  }
}
