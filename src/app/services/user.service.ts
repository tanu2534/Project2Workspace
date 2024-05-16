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
  
  loadMembers(id:any){
    return this.http.post(`${this.apiUrl}/${this.service}/users`, id);

  }
  
  findOne(quary:any){
    return this.http.post(`${this.apiUrl}/${this.service}/find`, quary);

  }

 

  getCompany(){
    const data =  localStorage.getItem('userData')?? '';
    const res = JSON.parse(data)
    return res.user.company;
    // console.log(res.user)
  }
  getName(){
    const data =  localStorage.getItem('userData')?? '';
    const res = JSON.parse(data)
    return res.user.name;
  }
  getEmail(){
    const data =  localStorage.getItem('userData')?? '';
    const res = JSON.parse(data)
    return res.user.email;
  }
  getUserId(){
    const data =  localStorage.getItem('userData')?? '';
    const res = JSON.parse(data)
    return res.user._id;
  }

  getAllUsers(data:any){
    return this.http.post(`${this.apiUrl}/${this.service}/all-users`, data)
  }
}