import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient:HttpClient) { }
  getCategoriesNames(){
    return this.httpClient.get(`${environment.api}category/categoryNames`);
  }
  loadCategory(categoryName:string){
    return this.httpClient.get(`${environment.api}category/byName/${categoryName}`)
  }
}
