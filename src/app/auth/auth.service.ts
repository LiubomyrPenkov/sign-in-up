import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  singUp(username:String, password: String, role: String) {
    let users: any = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find((user)=>{
      return user.username === username;
    });

    if (user) {
      return {
        message: 'User already exists, please sing in',
        exist: true
      };
    } else {
      users.push({username, password, role});
      localStorage.setItem('users', JSON.stringify(users));
      return {
        message: 'User is created',
        created: true,
        role: role 
      }
    }
  }

  singIn(username:String, password: String) {
    let users: any = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find((user)=>{
      return user.username === username && user.password === password;
    });
    if (user) {
      return {
        success: true,
        role: user.role 
      }
    } else {
      return {
        message: 'Incorrect credentials',
        error: true
      }
    }
  }

}
