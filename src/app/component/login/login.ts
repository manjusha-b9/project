import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';

import { Userserice } from '../../services/userserice';
import { User } from '../../module/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  private fb = inject(FormBuilder);
  private userservice = inject(Userserice);
  private router = inject(Router);

  isLogin = true;

  authForm = this.fb.nonNullable.group({
    name: [''],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  toggleForm(): void {
    this.isLogin = !this.isLogin;
    this.authForm.reset({
      name: '',
      email: '',
      password: ''
    });
  }

  submit(): void {

    if (this.authForm.invalid) {
      return;
    }

    if (this.isLogin) {

      this.userservice.login({
        email: this.authForm.value.email!,
        password: this.authForm.value.password!
      }).subscribe({

        next: (user: User) => {

          localStorage.setItem('userId', user.userId ?? '');
          localStorage.setItem('userName', user.name ?? '');

          alert('Login Successfully');
          this.router.navigate(['/product']);
        },

        error: () => {
          alert('Invalid Email or Password');
        }

      });

    } else {

      const newUser: User = {
        name: this.authForm.value.name!,
        email: this.authForm.value.email!,
        password: this.authForm.value.password!
      };

      this.userservice.register(newUser).subscribe({

        next: () => {
          alert('Registration Successful');
          this.isLogin = true;

          this.authForm.reset({
            name: '',
            email: '',
            password: ''
          });
        },

        error: () => {
          alert('Registration Failed');
        }

      });

    }

  }

}
