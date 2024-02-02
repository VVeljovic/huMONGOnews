import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private httpClient:HttpClient) { }
  getFrontPosts()
  {
    return this.httpClient.get(`${environment.api}article/getLastNArticles/7`);
  }
  getTopViews()
  {
    return this.httpClient.get(`${environment.api}article/lastNWithMostViews/3`);
  }
}
