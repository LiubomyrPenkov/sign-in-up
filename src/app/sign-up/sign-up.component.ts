import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service.js';

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
  info: any;

  roles: string[] = ['user', 'admin'];

  constructor(private fb: FormBuilder, private AuthService: AuthService, private router: Router) { }

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
    const response = this.AuthService.singUp(this.email.value, this.password.value, this.role.value);
    this.info = response;
    this.password.reset();
    this.email.reset();    
  }

  handleResponse() {
    this.info.message = null;
    if (this.info.exist) {
      this.router.navigate(['sign-in']);
    } else if (this.info.created) {
      this.router.navigate([this.info.role])
    }
  }



}
