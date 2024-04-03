import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl; // Replace with your actual API URL
  private service = 'users'

  constructor(private http: HttpClient) { }

  // Register API
  register(userData: any) {
    return this.http.post(`${this.apiUrl}/${this.service}/register`, userData);
  }

  // Login API
  login(credentials: any) {
    return this.http.post(`${this.apiUrl}/${this.service}/login`, credentials);
  }

  getCompany(){
    return localStorage.getItem('userData')
  }
}