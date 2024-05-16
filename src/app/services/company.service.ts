import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private apiUrl = environment.apiUrl; // Replace with your actual API URL
  private service = 'company'

  constructor(private http: HttpClient) { }

  // getTeams(company: string) {
  //   return this.http.post(`${this.apiUrl}/${this.service}/find`, company);
  // }

  findOne(company: any) {
    return this.http.post(`${this.apiUrl}/${this.service}/find`, company);
  }
  getCompanyById(id:any){
    return this.http.get(`${this.apiUrl}/${this.service}/${id}`);
  }
}
