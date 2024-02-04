import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '../pagination/pagination.component';
import { Subscription } from 'rxjs';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-category-posts',
  standalone: true,
  imports: [HeaderComponent, CommonModule,PaginationComponent],
  templateUrl: './category-posts.component.html',
  styleUrl: './category-posts.component.css'
})
export class CategoryPostsComponent {
  listOfArticles:any;
  subscription:Subscription;
  selectedNumber:number = 1;
  categoryName:string='';
constructor(private route:ActivatedRoute, private categoryService:CategoryService, private articleService:ArticleService){
  this.route.paramMap.subscribe(params=>{
    this.categoryName = params.get('categoryName')||'';
    if(this.categoryName!='near')
    {
      this.categoryService.getPaginatedPosts(this.categoryName,1,5).subscribe((respo:any)=>{
      this.listOfArticles=respo.articles.articles;
      
      this.categoryService.setNumberOfArticles(respo.length);
    
      
      })
    }
    else if(this.categoryName=='near')
    {
      this.articleService.nearestToYou(19.8335,45.2671,100000,1,5).subscribe((respo:any)=>{
        this.listOfArticles=respo.articles
        console.log(respo)
        this.categoryService.setNumberOfArticles(respo.total);
      })
    }
  })
  
  this.subscription = this.categoryService.pageNumberSelected.subscribe((respo)=>{
    this.selectedNumber=respo;
    if(this.categoryName!='near')
   {
    
    
    this.getPaginatedPosts();
   }
   else
   {
    this.getPaginatedGeoJson();
   }
  })
}
getPaginatedPosts(){
 
  this.categoryService.getPaginatedPosts(this.categoryName,this.selectedNumber,5).subscribe((respo:any)=>{
    
    this.listOfArticles=respo.articles.articles;
  })
}
getPaginatedGeoJson()
{
  this.articleService.nearestToYou(19.8335,45.2671,100000,this.selectedNumber,5).subscribe((respo:any)=>{console.log(respo);this.listOfArticles=respo.articles})
}
}
