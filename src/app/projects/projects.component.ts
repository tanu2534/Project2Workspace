import { Component, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from '../services/project.service';
import { UserService } from '../services/user.service';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import Swal from 'sweetalert2';
// import { Chart, registerables } from 'chart.js';


interface Project {
  _id: string;
  name: string;
  description: string;
  teamLeadName: string;
  startDate: string;
  teamLeadId: string;
  status: string;
  priority: string;
  tag: string;
  tasks: string[];
}

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {

  isCreate : boolean = false;
  company: any;
  // projects: any;
  selectedOption: string = 'in-progress'; 
  isAdmin : boolean = false;
  report : boolean = true  ;
  data : any;  
  projects: Project[] = [];
  comparativeChart: Chart | undefined;
  projectCharts: { [key: string]: Chart } = {};

  constructor(private router : Router,
    private projectService: ProjectService,
    private userService: UserService
  ){
    Chart.register(...registerables);
    
  }

  ngOnInit(): void {

    this.company =  this.userService.getCompany();
    this.loadProjects({companyId: this.company, status: this.selectedOption});
    const a = this.userService.getUser();
    console.log(" this user ",a);
    this.isAdmin = (a?.role !== 'member' && a?.role !== 'team-lead');
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
        console.log('Received projects:', response);
        this.projects = response;
        // if (!this.report) {
        //   this.createCharts();
        // }
      },
      error => {
        console.error('Error loading projects:', error);
      }
    );
  }

  removeProject(id: any) {

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      background: "#292929",
      color: "#ffffff",
      buttonsStyling: true,
      denyButtonColor: "#d33",
      confirmButtonColor: "#05faa0",
      // iconColor: "#05faa0",
      cancelButtonColor: "#d33"
    });

    swalWithBootstrapButtons.fire({
      title: "Dismiss Project?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      reverseButtons: true
      
    }).then((result) => {
      if (result.isConfirmed) {
       // Call service to delete member
        this.projectService.removeProject({companyId : this.company , projectId: id}).subscribe((response: any) => {
          swalWithBootstrapButtons.fire({
            title: "Dismissed!",
            text: "The Project has been Dismissed.",
            icon: "success"
          });
          this.router.navigate(['/source/projects']); // Navigate back to the team page after deletion
        }, error => {
          swalWithBootstrapButtons.fire({
            title: "Error",
            text: "Failed to Dismiss the Project.",
            icon: "error"
          });
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "The Project is safe :)",
          icon: "error"
        });
      }
    });

  }

  changeStatus(id :any, status : any){
    let a: any ;
    if(status === "completed"){
      a = "Closed"
    }else if(status === "in-progress"){
      a = "Start"
    }

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      background: "#292929",
      color: "#ffffff",
      buttonsStyling: true,
      denyButtonColor: "#d33",
      confirmButtonColor: "#05faa0",
      // iconColor: "#05faa0",
      cancelButtonColor: "#d33"
    });

    swalWithBootstrapButtons.fire({
      title: `${a} Project?`,
      // text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      reverseButtons: true
      
    }).then((result) => {
      if (result.isConfirmed) {
       // Call service to delete member
        this.projectService.changeStatus({companyId : this.company , projectId: id, status: status}).subscribe((response: any) => {
          swalWithBootstrapButtons.fire({
            title: `${a}!`,
            text:`The Project has been ${a}.`,
            icon: "success"
          });
          this.router.navigate(['/source/projects']); // Navigate back to the team page after deletion
        }, error => {
          swalWithBootstrapButtons.fire({
            title: "Error",
            text: "Failed to Dismiss the Project.",
            icon: "error"
          });
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          // text: "The Project is safe :)",
          icon: "error"
        });
      }
    });

  }


  

  ngOnDestroy() {
    if (this.comparativeChart) {
      this.comparativeChart.destroy();
    }
  
    Object.keys(this.projectCharts).forEach(chartId => {
      this.projectCharts[chartId].destroy();
    });
  }
  

  createCharts() {
    this.report = false ;
    setTimeout(() => {
      
      this.createComparativeChart();
    }, 1200);
    // this.projects.forEach(project => this.createProjectChart(project));
  }

  // ngAfterViewInit(): void {
  //   this.createCharts();
  // }
  


  createComparativeChart() {
    const ctx = document.getElementById('comparativeChart') as HTMLCanvasElement;
    if (ctx) {
      // If the chart already exists, destroy it before creating a new one
      if (this.comparativeChart) {
        this.comparativeChart.destroy();
      }
  
      // Define priority mappings
      const priorityMap: { [key: string]: number } = {
        'high': 3,
        'medium': 2,
        'low': 1
      };
  
      const config: ChartConfiguration = {
        type: 'bar',
        data: {
          labels: this.projects.map(p => p.name), // Project names as labels
          datasets: [
            {
              type: 'bar', // Bar chart for number of tasks
              label: 'Number of Tasks',
              data: this.projects.map(p => p.tasks.length),
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
              yAxisID: 'tasks',
              barPercentage: 0.5,
              categoryPercentage: 0.5,
            },
            {
              type: 'bar', // Bar chart for project duration
              label: 'Project Duration (days)',
              data: this.projects.map(p => {
                const start = new Date(p.startDate);
                const end = new Date(); // Assuming the current date as the end date for ongoing projects
                return Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
              }),
              backgroundColor: 'rgba(255, 206, 86, 0.6)',
              borderColor: 'rgba(255, 206, 86, 1)',
              borderWidth: 1,
              yAxisID: 'days',
              barPercentage: 0.5,
              categoryPercentage: 0.5,
            },
            {
              type: 'line', // Line chart for project priority
              label: 'Priority Level',
              data: this.projects.map(p => { console.log("so this is the love... " ,p.priority, priorityMap[p.priority]); return priorityMap[p.priority];} ), // Map priority to numeric value
              backgroundColor: 'rgba(153, 102, 255, 0.6)',
              borderColor: 'rgba(153, 102, 255, 1)',
              fill: false,
              tension: 0.4,
              yAxisID: 'priority'
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            tasks: {
              type: 'linear',
              display: true,
              position: 'left',
              title: { display: true, text: 'Number of Tasks' }
            },
            days: {
              type: 'linear',
              display: true,
              position: 'right',
              title: { display: true, text: 'Project Duration (days)' },
              grid: { drawOnChartArea: false }
            },
            priority: {
              type: 'linear',
              display: false
            }
          },
          plugins: {
            legend: {
              position: 'top'
            }
          }
        }
      };
  
      this.comparativeChart = new Chart(ctx, config);
    }
  }
  
  
  
  // createProjectChart(project: Project) {
  //   const ctx = document.getElementById(`chart-${project._id}`) as HTMLCanvasElement;
  //   if (ctx) {
  //     // If the chart already exists, destroy it before creating a new one
  //     if (this.projectCharts[project._id]) {
  //       this.projectCharts[project._id].destroy();
  //     }
  
  //     const config: ChartConfiguration = {
  //       type: 'doughnut',
  //       data: {
  //         labels: ['In Progress', 'Completed', 'Not Started'],
  //         datasets: [{
  //           data: [
  //             project.tasks.filter(t => t === 'in-progress').length,
  //             project.tasks.filter(t => t === 'completed').length,
  //             project.tasks.filter(t => t === 'not-started').length
  //           ],
  //           backgroundColor: ['#FFCE56', '#36A2EB', '#FF6384']
  //         }]
  //       },
  //       options: {
  //         responsive: true,
  //         plugins: {
  //           title: {
  //             display: true,
  //             text: `Task Status for ${project.name}`
  //           }
  //         }
  //       }
  //     };
  //     this.projectCharts[project._id] = new Chart(ctx, config);
  //   }
  // }
  

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
    if(!this.report){
       this.createCharts();
    }
  }
  
}
