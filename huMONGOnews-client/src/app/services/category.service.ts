import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient:HttpClient) { }
  public currentPageNumber = 1;
  pageNumberSelected = new EventEmitter<number>();
  numberOfArticles = new EventEmitter<number>();
  setPageNumber(pageNumber:number){
    this.currentPageNumber = pageNumber;
    this.pageNumberSelected.emit(pageNumber);
  }
  incrementOrDecrementPageNumber(num:number){
    if(num == -1)
    this.currentPageNumber--;
    else
    this.currentPageNumber++;
    const pageNumber:number = this.currentPageNumber;
    console.log(pageNumber);
    this.pageNumberSelected.emit(pageNumber);
  }
  setNumberOfArticles(numberOfArticles:number)
  {
    this.numberOfArticles.emit(numberOfArticles);
  }
  getCategoriesNames(){
    return this.httpClient.get(`${environment.api}category/categoryNames`);
  }
  loadCategory(categoryName:string){
    return this.httpClient.get(`${environment.api}category/byName/${categoryName}`)
  }
  getPaginatedPosts(categoryName:string,page:number,limit:number)
  {
    return this.httpClient.get(`${environment.api}category/paginated/${categoryName}/${page}/${limit}`);
  }
}
