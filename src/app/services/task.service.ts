import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = environment.apiUrl; // Replace with your actual API URL
  private service = 'tasks'
  constructor(private http: HttpClient) { }

  createTask(data: any){
    return this.http.post(`${this.apiUrl}/${this.service}/`, data);
  
  }

  findAllByQuary(quary:any){
    return this.http.post(`${this.apiUrl}/${this.service}/find`, quary);
  }

  getTaskById(id:any){
    return this.http.get(`${this.apiUrl}/${this.service}/${id}`);
  }
}
