import { Component } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {
  subscription:Subscription;
  numberOfPages:number=0;
  pagesArray:number[]=[];
  constructor(private categoryService:CategoryService){
    this.subscription=this.categoryService.numberOfArticles.subscribe((respo)=>{
     
      this.numberOfPages=Math.ceil(respo/5);
     this.pagesArray=Array.from({ length: this.numberOfPages }, (_, i) => i + 1);
    })
  }
  currentPage:number = 1;
onPageNumberClick(num:number){
  if(num<0)
  {
    this.categoryService.incrementOrDecrementPageNumber(num);
    if(num == -1)
    {
      this.currentPage--;
    }
    else
    {
      this.currentPage++;
    }
  }
  else
  {
    this.currentPage=num;
  this.categoryService.setPageNumber(num);
  }
}
}
