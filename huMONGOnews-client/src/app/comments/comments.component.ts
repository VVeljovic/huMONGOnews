import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommentService } from '../services/comment.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss'
})
export class CommentsComponent {
  @ViewChild('textarea', { static: false }) textarea!: ElementRef;
  @ViewChild('textarea2', { static: false }) textarea2!: ElementRef;

  comments:any;
  clicked:boolean[] = [];
  constructor(private commentService:CommentService){
    this.commentService.getCommentsForPost('65bf77100d164175c563b1ac').subscribe((respo:any)=>{console.log(respo)
    
    this.comments=respo.comments;
  
    })
  }
  sendComment() {
    const text = this.textarea.nativeElement.innerText;
    const comment = {
      content:text,
      dateCreated:Date.now(),
      userEmail:"vveljovic13@gmail.com",
      articleId:'65bf77100d164175c563b1ac'
    }
    this.commentService.sendComment(comment).subscribe((respo)=>{this.comments.push(respo)});
   
  }
 
  commentForm(i:any)
  {
    if(this.clicked[i]==true)
    this.clicked[i]=false;
  else
  {
    
    this.clicked[i]=true
  }
  }
  sendSubComm(i:any)
  {
    const text = this.textarea2.nativeElement.innerText;
    const comment = {
      content:text,
      dateCreated:Date.now(),
      userEmail:'vveljovic',
      articleId:'65bf77100d164175c563b1ac',
      commentId:this.comments[i]._id
    }
    this.commentService.sendSubComm(comment).subscribe((respo)=>{console.log(this.comments[i].comments.push(respo))})

  }
}
