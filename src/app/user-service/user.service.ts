import { Injectable } from '@angular/core';
import { User } from '../interfaces/user'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  getUser(username: String, password?: String): User {
    const users: Array<User> = this.getUsers();

    const user: User = users.find((user: User): boolean=>{
      if (password) {
        return user.username === username && user.password === password;
      } else {
        return user.username === username;
      }  
    });
    return user;
  }

  setUser(user: User): User {
    let users: User[] = this.getUsers();
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    return user;
  }

  private getUsers(): Array<User> | []{
    return JSON.parse(localStorage.getItem('users')) || [];
  }

  modifyUser(username: String, password: String, role?: ['user', 'admin']) {
    let users: User[] = this.getUsers();

    const user: User = users.find((user: User): boolean=>{
      return user.username === username;
    });
    
    user.password = password;
    if (role) {
      user.role = role;
    }
    localStorage.setItem('users', JSON.stringify(users));
    return user;
  }
}
