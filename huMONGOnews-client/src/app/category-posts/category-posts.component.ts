import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-posts',
  standalone: true,
  imports: [HeaderComponent, CommonModule],
  templateUrl: './category-posts.component.html',
  styleUrl: './category-posts.component.css'
})
export class CategoryPostsComponent {
  listOfArticles:any;
constructor(private route:ActivatedRoute, private categoryService:CategoryService){
  this.route.paramMap.subscribe(params=>{
    const categoryName = params.get('categoryName');
    if(categoryName)
    {
      this.categoryService.loadCategory(categoryName).subscribe((respo:any)=>{console.log(respo)
      this.listOfArticles=respo.articles;
      console.log(this.listOfArticles);
      })
    }
  })
}

}
