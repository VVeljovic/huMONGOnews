import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  showMoreOptions: boolean = false;
  listOfCategories:any;
  constructor(private router:Router, private categoryService:CategoryService){
    this.categoryService.getCategoriesNames().subscribe((respo)=>{
      this.listOfCategories= respo;
      console.log(this.listOfCategories)
    });
  }
  toggleMoreOptions() {
    this.showMoreOptions = !this.showMoreOptions;
  }
  navigateTo(path:string){
    if(path == 'front-page')
   { this.router.navigate([`/${path}`]); return;}

    this.router.navigate([`category/${path}`]);
  }
}
