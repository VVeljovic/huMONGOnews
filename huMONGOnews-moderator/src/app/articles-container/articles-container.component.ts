import { Observable, map } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AsyncPipe, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-articles-container',
  standalone: true,
  imports: [RouterModule, AsyncPipe, TitleCasePipe],
  templateUrl: './articles-container.component.html',
  styleUrl: './articles-container.component.css',
})
export class ArticlesContainerComponent implements OnInit {
  public articleType!: Observable<string>;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.articleType = this.activatedRoute.paramMap.pipe(
      map((params) => {
        return params.get('type') ?? '';
      })
    );
  }
}
