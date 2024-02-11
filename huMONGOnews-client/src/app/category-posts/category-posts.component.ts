import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '../pagination/pagination.component';
import { Subscription } from 'rxjs';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-category-posts',
  standalone: true,
  imports: [
    HeaderComponent,
    CommonModule,
    PaginationComponent,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './category-posts.component.html',
  styleUrl: './category-posts.component.css',
})
export class CategoryPostsComponent implements OnInit {
  listOfArticles: any;
  subscription: Subscription;
  selectedNumber: number = 1;
  categoryName: string = '';
  longitude: number = 0;
  latitude: number = 0;
  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private articleService: ArticleService
  ) {
    this.route.paramMap.subscribe((params) => {
      this.categoryName = params.get('categoryName') || '';
      if (this.categoryName != 'near') {
        this.categoryService
          .getPaginatedPosts(this.categoryName, 1, 5)
          .subscribe((respo: any) => {
            this.listOfArticles = respo.articles.articles;

            this.categoryService.setNumberOfArticles(respo.length);
          });
      } else if (this.categoryName == 'near') {
        navigator.geolocation.getCurrentPosition((position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;

          console.log('Latitude:', this.latitude);
          console.log('Longitude:', this.longitude);
          this.articleService
            .nearestToYou(this.longitude, this.latitude, 500000, 1, 5)
            .subscribe((respo: any) => {
              this.listOfArticles = respo.articles;
              console.log(respo);
              this.categoryService.setNumberOfArticles(respo.total);
            });
        });
      }
    });

    this.subscription = this.categoryService.pageNumberSelected.subscribe(
      (respo) => {
        this.selectedNumber = respo;
        if (this.categoryName != 'near') {
          this.getPaginatedPosts();
        } else {
          this.getPaginatedGeoJson();
        }
      }
    );
  }
  ngOnInit(): void {
    // this.articleService.getMyLocation().subscribe((response)=>{console.log(response)})
  }
  getPaginatedPosts() {
    this.categoryService
      .getPaginatedPosts(this.categoryName, this.selectedNumber, 5)
      .subscribe((respo: any) => {
        this.listOfArticles = respo.articles.articles;
      });
  }
  getPaginatedGeoJson() {
    this.articleService
      .nearestToYou(
        this.longitude,
        this.latitude,
        500000,
        this.selectedNumber,
        5
      )
      .subscribe((respo: any) => {
        console.log(respo);
        this.listOfArticles = respo.articles;
      });
  }
}
