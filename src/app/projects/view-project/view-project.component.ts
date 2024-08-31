import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.css']
})
export class ViewProjectComponent {
  tasks: any;
  teamLead: any;

  constructor(private router : Router
    ,private projectService: ProjectService
  ) { }
  projectId : any = (this.router.url).split('/').pop();
  project: any

  ngOnInit(): void {
 
   
    console.log(this.projectId);

    this.getP(this.projectId)


  

  }

  async getP(id:any){
    console.log(id);
    this.projectService.getProjectById(id).subscribe(
      (response: any) => {
        console.log(response);
        this.project = response;
        this.tasks = response.tasks;
        this.teamLead = response.employee;
      }
    )
  }


  getStatusClass(status: any): string {
    switch(status.toLowerCase()) {
      case 'completed': return 'status-completed';
      case 'in-progress': return 'status-in-progress';
      case 'not-started': return 'status-not-started';
      default: return '';
    }
  }

  getPriorityClass(): string {
    switch(this.project.priority) {
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return '';
    }
  }
}
