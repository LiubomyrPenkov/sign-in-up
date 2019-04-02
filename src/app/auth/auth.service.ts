import { Injectable } from '@angular/core';
import { UserService } from '../user-service/user.service';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private userService: UserService) { }

  singUp(username:String, password: String, role: ['user', 'admin']) {
    const user = this.userService.getUser(username);
    if (!user) {
      return this.userService.setUser({username, password, role});
    } else {
      return false;
    }
  }

  singIn(username: String, password: String): void{
    const user: User = this.userService.getUser(username, password);
    if (user) {
      this.setToken(user);
    }
  }

  getToken(): any {
    return JSON.parse(localStorage.getItem('token'));
  }

  setToken(user: User): void {
    localStorage.setItem('token', JSON.stringify(user));
  }

  removeToken(): void {
    localStorage.removeItem('token');
  }
}
