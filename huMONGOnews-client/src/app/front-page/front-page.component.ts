import { Component } from '@angular/core';
import { ArticleService } from '../services/article.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-front-page',
  standalone: true,
  imports: [CommonModule, HeaderComponent, RouterLink, RouterLinkActive],
  templateUrl: './front-page.component.html',
  styleUrl: './front-page.component.scss',
})
export class FrontPageComponent {
  articles: any;
  topViews: any;
  constructor(private articleService: ArticleService) {
    this.articleService.getFrontPosts().subscribe((respo) => {
      this.articles = respo;
      console.log(this.articles);
    });
    this.articleService.getTopViews().subscribe((respo) => {
      console.log(this.articles);
      this.topViews = respo;
    });
  }
}
