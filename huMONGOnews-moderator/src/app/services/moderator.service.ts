import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Moderator } from '../models/moderator.model';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ModeratorService {
  constructor(private httpClient: HttpClient) {}

  signUp(moderator: Moderator): Observable<Moderator> {
    return this.httpClient.post<Moderator>(
      `${environment.apiUrl}/moderator`,
      moderator
    );
  }

  logIn(
    username: string,
    password: string
  ): Observable<{
    message: string;
    success: boolean;
    moderator: Moderator | undefined;
  }> {
    return this.httpClient.get<{
      message: string;
      success: boolean;
      moderator: Moderator | undefined;
    }>(`${environment.apiUrl}/moderator/logIn/${username}/${password}`);
  }
}
