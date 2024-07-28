import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private apiUrl = environment.apiUrl; // Replace with your actual API URL
  private service = 'teams'

  constructor(private http: HttpClient) { }

  createTeam(data:any){
    return this.http.post(`${this.apiUrl}/${this.service}/`, data);

  }

  findAllByQuary(quary:any){
    return this.http.post(`${this.apiUrl}/${this.service}/find`, quary);
  }

  getTeamById(id:any){
    return this.http.get(`${this.apiUrl}/${this.service}/${id}`);
  }
}
