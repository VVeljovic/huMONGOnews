import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Article } from '../models/article.model';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor(private httpClient: HttpClient) {}

  createArticle(article: Article): Observable<Article> {
    return this.httpClient.post<Article>(
      `${environment.apiUrl}/article`,
      article
    );
  }

  updateContents(id: string, contents: string): Observable<Article> {
    return this.httpClient.put<Article>(
      `${environment.apiUrl}/article/contents/${id}`,
      { contents }
    );
  }
}
