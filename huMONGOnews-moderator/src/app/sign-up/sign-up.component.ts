import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
      'Password must contain a minimum of 6 characters includes at least 1 alphanumeric and special character',
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
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FlexLayoutModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent implements OnInit {
  errMsg: string[] = [];
  moderatorForm!: FormGroup;

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.moderatorForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[\w\s]+$/),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{5,}'
        ),
      ]),
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
      console.log(this.moderatorForm.value);
      this.moderatorForm.reset();
      alert('Registration Successful');
    }
  }
}
