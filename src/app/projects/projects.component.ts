import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from '../services/project.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {

  isCreate : boolean = false;
  company: any;
  projects: any;
  selectedOption: string = 'in-progress'; 

  constructor(private router : Router,
    private projectService: ProjectService,
    private userService: UserService
  ){
    
  }

  ngOnInit(): void {

    this.company =  this.userService.getCompany();
    this.loadProjects({companyId: this.company, status: this.selectedOption});
  }

  openCreateProj(){
    this.isCreate = true;
    this.router.navigate([`/source/project-create`]);
  }

  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  loadProjects(project: any) {
    this.projectService.getAllProjects(project).subscribe(
      (response: any) => {
        this.projects = response;
        console.log("projects ",response)
      }
    )
  }

  gotoViewProj(project: any) {
    console.log("clicked project ", project)
    this.router.navigate([`/source/view-project/${project._id}`]);

  }

  onOptionChange() {
    // Call your function here
    console.log('Selected option:', this.selectedOption);

    this.loadProjects({companyId: this.company, status: this.selectedOption});
    // Call your functional method based on the selected option
    // For example: this.myFunction(this.selectedOption);
  }
  
}
