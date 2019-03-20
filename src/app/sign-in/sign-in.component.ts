import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from '../auth/auth.service.js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.less']
})
export class SignInComponent implements OnInit {
  form: FormGroup;
  email: AbstractControl;
  password: AbstractControl;
  info: any;

  constructor(private fb: FormBuilder, private AuthService: AuthService, private router: Router) { }

  ngOnInit() {
    this.form = this.fb.group({
      password: ['', [Validators.minLength(3), Validators.required]],
      email: ['', [Validators.email, Validators.required]]
    });

    this.password = this.form.get('password');
    this.email = this.form.get('email');
  }

  singIn(): void {
    this.info = this.AuthService.singIn(this.email.value, this.password.value);
    if (this.info.success) {
      this.router.navigate([this.info.role])
    }
  }

  handleResponse() {
    this.info.message = null;
    this.password.reset();
    this.email.reset();    
    if (this.info.error){
      this.router.navigate(['sign-in']);
    }
  }

}
