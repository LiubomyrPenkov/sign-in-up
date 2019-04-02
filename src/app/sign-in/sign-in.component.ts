import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from '../auth/auth.service.js';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.less']
})
export class SignInComponent implements OnInit {
  form: FormGroup;
  email: AbstractControl;
  password: AbstractControl;
  message: String;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.form = this.fb.group({
      password: ['', [Validators.minLength(3), Validators.required]],
      email: ['', [Validators.email, Validators.required]]
    });

    this.password = this.form.get('password');
    this.email = this.form.get('email');
  }

  singIn(): void {
    this.authService.singIn(this.email.value, this.password.value);
    let token: User = this.authService.getToken();
    if (token) {
      this.router.navigate([token.role]);
    } else {
      this.message = 'Incorrect credentials';
    }
  }

  handleResponse() {
    this.message = null;
    this.form.reset();
  }

}
