import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoginRequest, User } from '../module/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Userserice {
  
  private http=inject(HttpClient);
  private Api='http://localhost:3000';
  register(user:User):Observable<User>{
    return this.http.post<User>(`${this.Api}/register`,user);
  }
  login(user:LoginRequest):Observable<User>{
    return this.http.post<User>(`${this.Api}/login`,user);
  }
}
