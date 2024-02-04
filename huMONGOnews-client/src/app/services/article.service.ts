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
  nearestToYou(longitude:number,latitude:number,maxRange:number,skip:number,limit:number)
  {
    return this.httpClient.get(`${environment.api}article/findInRange/${longitude}/${latitude}/${maxRange}/${skip}/${limit}`);
  }
}
