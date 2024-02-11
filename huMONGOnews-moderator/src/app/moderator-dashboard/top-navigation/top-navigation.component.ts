import { AsyncPipe, CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FeatherModule } from 'angular-feather';
import {
  Observable,
  Subject,
  debounceTime,
  distinct,
  distinctUntilChanged,
  tap,
} from 'rxjs';
import { ArticleService } from '../../services/article.service';

@Component({
  selector: 'app-top-navigation',
  standalone: true,
  imports: [
    CommonModule,
    FeatherModule,
    FormsModule,
    AsyncPipe,
    HttpClientModule,
  ],
  templateUrl: './top-navigation.component.html',
  styleUrl: './top-navigation.component.css',
  providers: [ArticleService],
})
export class TopNavigationComponent implements OnInit {
  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    // this.articleService.searchString$
    //   .pipe(debounceTime(500), distinctUntilChanged())
    //   .subscribe(console.log);
  }

  onSearch(searchString: string) {
    this.articleService.onSearchChange(searchString);
  }

  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }
}
