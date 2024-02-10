import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private httpClient: HttpClient) {}

  createCategory(category: Category): Observable<Category> {
    return this.httpClient.post<Category>(
      `${environment.apiUrl}/category`,
      category
    );
  }

  findAllCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(`${environment.apiUrl}/category`);
  }
}
