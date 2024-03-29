import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpClient:HttpClient) { }
  getCommentsForPost(postId:string)
  {
    return this.httpClient.get(`${environment.api}article/${postId}`)
  }
  sendComment(comment:any)
  {
    return this.httpClient.post(`${environment.api}comment`,comment);
  }
  sendSubComm(comment:any)
  {
    return this.httpClient.post(`${environment.api}comment/createSubComment`,comment);
  }
}
