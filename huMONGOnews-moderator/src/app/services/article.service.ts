import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Article, ArticleState } from '../models/article.model';
import {
  Observable,
  Subject,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  tap,
} from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  public currentEditingDocumentContents: string | null = null;

  public searchString$ = new Subject<string>();

  public searchStringEmitter = new EventEmitter<string>();

  constructor(private httpClient: HttpClient) {}

  onSearchChange(searchString: string) {
    this.searchStringEmitter.emit(searchString);
    this.searchString$.next(searchString);
  }

  createArticle(article: Article): Observable<Article> {
    return this.httpClient.post<Article>(
      `${environment.apiUrl}/article`,
      article
    );
  }

  findById(id: string) {
    return this.httpClient.get<Article>(`${environment.apiUrl}/article/${id}`);
  }

  searchByContent(
    moderatorId: string,
    articleState: ArticleState,
    search: string
  ): Observable<Article[]> {
    return this.httpClient.get<Article[]>(
      `${environment.apiUrl}/article/searchByContent/moderator/${moderatorId}/state/${articleState}/?search=${search}`
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
