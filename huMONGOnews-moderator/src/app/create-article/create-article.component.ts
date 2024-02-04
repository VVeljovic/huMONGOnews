import { Component } from '@angular/core';
import { TextEditorComponent } from '../shared/text-editor/text-editor.component';

@Component({
  selector: 'app-create-article',
  standalone: true,
  imports: [TextEditorComponent],
  templateUrl: './create-article.component.html',
  styleUrl: './create-article.component.css',
})
export class CreateArticleComponent {}
