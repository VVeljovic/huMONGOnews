import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

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
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FlexLayoutModule],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css',
})
export class LogInComponent {
  errMsg: string[] = [];

  loginForm!: FormGroup;

  ngOnInit() {
    this.buildForm();
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
      console.log(this.loginForm.value);
      this.loginForm.reset();
      alert('Login Successfully');
    }
  }
}
