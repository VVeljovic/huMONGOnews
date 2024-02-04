import { TextEditorComponent } from './../shared/text-editor/text-editor.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RichTextEditorModule } from '@syncfusion/ej2-angular-richtexteditor';
import { ButtonAllModule } from '@syncfusion/ej2-angular-buttons';

@Component({
  selector: 'app-create-article',
  standalone: true,
  imports: [
    CommonModule,
    TextEditorComponent,
    FormsModule,
    RichTextEditorModule,
    ButtonAllModule,
  ],
  templateUrl: './create-article.component.html',
  styleUrl: './create-article.component.css',
})
export class CreateArticleComponent implements OnInit {
  @ViewChild('textEditor')
  public textEditorComponent!: TextEditorComponent;

  constructor() {}

  ngOnInit(): void {}

  onSave() {
    alert(this.textEditorComponent.getHTMLValue());
  }
}
