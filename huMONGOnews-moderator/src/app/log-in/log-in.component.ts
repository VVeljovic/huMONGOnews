import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ModeratorService } from '../services/moderator.service';
import { Subject, takeUntil } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

const Error = {
  username: {
    pattern: 'Username should not contain any special characters',
  },
  password: {
    pattern:
      'Password must contain a minimum of 6 characters includes atleast 1 alphanumeric and special character',
  },
};

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    HttpClientModule,
    RouterLink,
  ],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css',
  providers: [ModeratorService],
})
export class LogInComponent implements OnInit, OnDestroy {
  errMsg: string[] = [];

  loginForm!: FormGroup;

  onDestroy$ = new Subject<void>();

  constructor(
    private moderatorService: ModeratorService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  buildForm() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    if (!this.loginForm.valid) {
      this.errMsg = [];
      if (!this.loginForm.get('username')?.valid) {
        this.errMsg.push(Error.username.pattern);
      }
      if (!this.loginForm.get('password')?.valid) {
        this.errMsg.push(Error.password.pattern);
      }
    } else {
      this.errMsg = [];
      const { username, pass } = this.loginForm.value;
      this.moderatorService
        .logIn(username, pass)
        .pipe(takeUntil(this.onDestroy$))
        .subscribe((data) => {
          console.log(data);

          if (data.success) {
            sessionStorage.setItem('moderator', JSON.stringify(data.moderator));
            this.toastr.success(data.message, 'Success');
          } else {
            this.toastr.error(data.message, 'Error');
            this.router.navigate(['moderator-dashboard']);
          }
        });
      this.loginForm.reset();
    }
  }
}
