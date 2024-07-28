import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.css']
})
export class ViewProjectComponent {

  constructor(private router : Router
    ,private projectService: ProjectService
  ) { }
  projectId : any = (this.router.url).split('/').pop();

  ngOnInit(): void {
 
   
    console.log(this.projectId);

    this.getP(this.projectId)


  

  }

  async getP(id:any){
    console.log(id);
    this.projectService.getProjectById(id).subscribe(
      (response: any) => {
        console.log(response);
      }
    )
  }
}
