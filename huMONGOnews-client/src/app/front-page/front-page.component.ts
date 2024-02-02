import { Component } from '@angular/core';
import { ArticleService } from '../services/article.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-front-page',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './front-page.component.html',
  styleUrl: './front-page.component.scss'
})
export class FrontPageComponent {
  articles:any ;
  topViews:any;
constructor(private articleService:ArticleService){
  this.articleService.getFrontPosts().subscribe((respo)=>{
    
    this.articles = respo;
    
  });
  this.articleService.getTopViews().subscribe((respo)=>{
    this.topViews=respo;

  })
}
}
