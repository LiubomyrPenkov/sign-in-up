import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { User } from '../interfaces/user';
import { UserService } from '../user-service/user.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.less']
})
export class UserPageComponent implements OnInit {
  user: User;
  roles = ['user', 'admin'];
  editMode: boolean;
  newPassword: String;
  confirmPassword: String;
  confirmPasswordFailed: boolean;

  constructor(private authService: AuthService, private userService: UserService) { }

  ngOnInit() {
    this.user = this.authService.getToken();
  }

  logOut() {
    this.authService.removeToken();
  }

  editUser() {
    this.editMode = !this.editMode;
    this.resetForm();
  }

  cancel() {
    this.user = this.authService.getToken();
    this.editMode = !this.editMode;
  }

  save() {
    if (this.confirmPassword !== this.user.password) {
      this.confirmPasswordFailed = true;
    } else {
      this.user = this.userService.modifyUser(this.user.username, this.newPassword);
      this.authService.setToken(this.user);
      this.editMode = !this.editMode;
    }
  }

  resetForm() {
    this.confirmPassword = '';
    this.newPassword = '';
    this.confirmPasswordFailed = false;
  }
}
