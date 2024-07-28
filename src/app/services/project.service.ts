import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = environment.apiUrl; // Replace with your actual API URL
  private service = 'projects'

  constructor(private http: HttpClient) { }

  createProject(data: any) {
    return this.http.post(`${this.apiUrl}/${this.service}`, data);
  }

  getAllProjects(data:any){
    return this.http.post(`${this.apiUrl}/${this.service}/find`, data);
  }

  getProjectById(id:any){
    return this.http.get(`${this.apiUrl}/${this.service}/${id}`);
  }
}
