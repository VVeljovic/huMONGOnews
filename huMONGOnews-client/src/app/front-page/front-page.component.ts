import { Component } from '@angular/core';
import { ArticleService } from '../services/article.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-front-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './front-page.component.html',
  styleUrl: './front-page.component.scss'
})
export class FrontPageComponent {
  articles:any ;
constructor(private articleService:ArticleService){
  this.articleService.getFrontPosts().subscribe((respo)=>{
    console.log(respo)
    this.articles = respo;
    console.log(this.articles);
  });
}
}
