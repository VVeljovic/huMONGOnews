import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Article, ArticleState } from '../models/article.model';
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

  patchState(id: string, state: ArticleState) {
    return this.httpClient.patch<Article>(
      `${environment.apiUrl}/article/patchState/${id}/${state}`,
      {}
    );
  }

  updateContents(id: string, contents: string): Observable<Article> {
    return this.httpClient.put<Article>(
      `${environment.apiUrl}/article/contents/${id}`,
      { contents }
    );
  }

  findArticlesInStateForModerator(moderatorId: string, state: ArticleState) {
    return this.httpClient.get<Article[]>(
      `${environment.apiUrl}/article/moderator/${moderatorId}/state/${state}`
    );
  }
}
