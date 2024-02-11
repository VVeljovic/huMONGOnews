import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CommentService } from '../services/comment.service';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss',
})
export class CommentsComponent implements OnInit {
  @ViewChild('textarea', { static: false }) textarea!: ElementRef;
  @ViewChild('textarea2', { static: false }) textarea2!: ElementRef;
  email: string = '';
  comments: any;
  clicked: boolean[] = [];

  @Input() articleId!: string;

  constructor(private commentService: CommentService) {}

  ngOnInit(): void {
    console.log(this.articleId);
    this.commentService
      .getCommentsForPost(this.articleId)
      .subscribe((respo: any) => {
        console.log(respo);

        this.comments = respo.comments ?? [];
      });
  }

  sendComment() {
    console.log(this.email);
    const text = this.textarea.nativeElement.innerText;
    const comment = {
      content: text,
      dateCreated: Date.now(),
      userEmail: this.email,
      articleId: this.articleId,
    };
    this.commentService.sendComment(comment).subscribe((respo) => {
      this.comments.push(respo);
      this.email = '';
      this.textarea.nativeElement.innerText = '';
    });
  }

  commentForm(i: any) {
    if (this.clicked[i] == true) this.clicked[i] = false;
    else {
      this.clicked[i] = true;
    }
  }
  sendSubComm(i: any) {
    const text = this.textarea2.nativeElement.innerText;
    const comment = {
      content: text,
      dateCreated: Date.now(),
      userEmail: this.email,
      articleId: this.articleId,
      commentId: this.comments[i]._id,
    };
    this.commentService.sendSubComm(comment).subscribe((respo) => {
      console.log(this.comments[i].comments.push(respo));

      this.email = '';
      this.textarea2.nativeElement.innerText = '';
    });
  }
}
