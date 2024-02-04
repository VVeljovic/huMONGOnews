import { ModeratorService } from './../services/moderator.service';
import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, Provider } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Moderator } from '../models/moderator.model';
import { Subject, takeUntil } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

const Error = {
  username: {
    pattern: 'Username required',
  },
  password: {
    pattern: 'Password required',
  },
  email: {
    pattern: 'Invalid email provided',
  },
  firstName: {
    pattern: 'First name required',
  },
  lastName: {
    pattern: 'Last name required',
  },
};

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    HttpClientModule,
    RouterLink,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
  providers: [ModeratorService],
})
export class SignUpComponent implements OnInit, OnDestroy {
  errMsg: string[] = [];
  moderatorForm!: FormGroup;

  onDestroy$ = new Subject<void>();

  constructor(
    private moderatorService: ModeratorService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.moderatorForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    if (!this.moderatorForm.valid) {
      this.errMsg = [];
      if (!this.moderatorForm.get('username')?.valid) {
        this.errMsg.push(Error.username.pattern);
      }
      if (!this.moderatorForm.get('password')?.valid) {
        this.errMsg.push(Error.password.pattern);
      }
      if (!this.moderatorForm.get('email')?.valid) {
        this.errMsg.push(Error.email.pattern);
      }
      if (!this.moderatorForm.get('firstName')?.valid) {
        this.errMsg.push(Error.firstName.pattern);
      }
      if (!this.moderatorForm.get('lastName')?.valid) {
        this.errMsg.push(Error.lastName.pattern);
      }
    } else {
      this.errMsg = [];
      const moderator: Moderator = this.moderatorForm.value;

      this.moderatorService
        .signUp(moderator)
        .pipe(takeUntil(this.onDestroy$))
        .subscribe((_) => {
          this.toastr.success(
            'Succesfully signed up! Please log in with your credentials',
            'Success'
          );
          this.router.navigate(['log-in']);
        });

      this.moderatorForm.reset();
    }
  }
}
