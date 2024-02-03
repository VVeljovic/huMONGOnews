import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '../pagination/pagination.component';
import { Subscription } from 'rxjs';

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
constructor(private route:ActivatedRoute, private categoryService:CategoryService){
  this.route.paramMap.subscribe(params=>{
    this.categoryName = params.get('categoryName')||'';
    if(this.categoryName)
    {
      this.categoryService.getPaginatedPosts(this.categoryName,1,5).subscribe((respo:any)=>{console.log(respo)
      this.listOfArticles=respo.articles.articles;
      
      this.categoryService.setNumberOfArticles(respo.length);
      console.log(this.listOfArticles);
      
      })
    }
  })
  this.subscription = this.categoryService.pageNumberSelected.subscribe((respo)=>{
    this.selectedNumber=respo;
    console.log(this.selectedNumber);
    this.getPaginatedPosts();
  })
}
getPaginatedPosts(){
  console.log('a')
  this.categoryService.getPaginatedPosts(this.categoryName,this.selectedNumber,5).subscribe((respo:any)=>{
    
    this.listOfArticles=respo.articles.articles;
  })
}
}
