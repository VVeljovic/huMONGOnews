import { Component } from '@angular/core';
import { CommentService } from '../services/comment.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss'
})
export class CommentsComponent {
  comments:any;
  constructor(private commentService:CommentService){
    this.commentService.getCommentsForPost('65bf77100d164175c563b1ac').subscribe((respo:any)=>{console.log(respo)
    
    this.comments=respo.comments;
    console.log(this.comments)
    })
  }
  getSubComm(comment:any)
  {
      console.log(comment);
  }
}
