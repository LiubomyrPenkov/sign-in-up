import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service.js';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.less']
})
export class SignUpComponent implements OnInit {
  form: FormGroup;
  email: AbstractControl;
  password: AbstractControl;
  role: AbstractControl;
  message: String;

  roles: string[] = ['user', 'admin'];

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.form = this.fb.group({
      password: ['', [Validators.minLength(3), Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      role: ['user', Validators.required]
    });

    this.password = this.form.get('password');
    this.email = this.form.get('email');
    this.role = this.form.get('role');
  }

  save(): void {
    const user = this.authService.singUp(this.email.value, this.password.value, this.role.value);
    if (user) {
      this.authService.setToken(user);
      this.message = 'User created';
    } else {
      this.message = 'User already exists';
    }
    this.password.reset();
    this.email.reset();    
  }

  handleResponse() {
    this.message = null;
    let token: User = this.authService.getToken();
    if (token) {
      this.router.navigate([token.role]);
    } else {
      this.router.navigate(['sign-in']);
    }
  }



}
