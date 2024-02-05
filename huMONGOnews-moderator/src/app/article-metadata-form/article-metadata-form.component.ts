import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-article-metadata-form',
  standalone: true,
  imports: [InputTextModule],
  templateUrl: './article-metadata-form.component.html',
  styleUrl: './article-metadata-form.component.css',
})
export class ArticleMetadataFormComponent {}
