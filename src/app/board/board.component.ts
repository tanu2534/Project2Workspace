import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { TaskService } from '../services/task.service';
import { startOfDay, endOfDay } from 'date-fns';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {
  users: any;
  duration: any = '100';
  isadmin : boolean = false;
  response : any ;
  loader : boolean = false;
  company: any;
  tasks: any;
  completedTasksCount: any;
  runningTasksCount: any;
  Priorties: any;
  data: any;
  data1: any;

  constructor(private userService: UserService,
    private router: Router,
    private taskService : TaskService,
    private projectService : ProjectService
  ) { }

  ngOnInit(): void {
    console.log(this.userService.getCompany(), this.userService.getUser()?._id);

    this.isadmin = (this.userService.getUser()?.role != 'team-lead' && this.userService.getUser()?.role != 'member');
    console.log("fghfgh  ", this.isadmin);
    this.company =   this.userService.getCompany();


   this.getResponse();

  

   this.userService.getAllUsers({companyId : this.userService.getCompany()}).subscribe(
    (response: any) => {
      this.users = response.users;
      console.log(this.users)
    }
   )

   this.loader = false;
  }


  getResponse(){
    const today = new Date();
    const startOfToday = startOfDay(today);
    const endOfToday = endOfDay(today);

    if(this.isadmin){

      this.taskService.findAllByQuary({
        status: "completed",
        endDate: {
          $gte: startOfToday,
          $lte: endOfToday
        },
        companyId : this.company
      }).subscribe(
        (response: any) => {
          console.log("response foe tas is ",response)
          this.response = response?.tasks;
        }
      )


    }else{
      this.taskService.findAllByQuary({
        companyId: this.userService.getCompany(),
        status: "in-progress",
        assignees: this.userService.getUser()?._id
      }).subscribe(
        (response: any) => {
          console.log("resp", response);
          this.response = response?.tasks;
        },
        (err) => {
          console.log("reee", err)
          this.response = [];
        }
      )
    }


    this.taskService.findAllByQuary({companyId : this.company}).subscribe(
     (async (res:any)=>{
       console.log("res from task ", res?.tasks)
       this.tasks = res?.tasks;
       this.completedTasksCount = await this.tasks?.filter((task: any) => task.status === 'completed')?.length;
       this.runningTasksCount = await this.tasks?.filter((task: any) => task.status === 'in-progress')?.length;
       const high = await this.tasks?.filter((task: any) => task.priority === 'high')?.length;
       const medium = await this.tasks?.filter((task: any) => task.priority === 'medium')?.length;
       const low = await this.tasks?.filter((task: any) => task.priority === 'low')?.length;
       console.log(this.tasks.length, this.completedTasksCount, this.runningTasksCount);
       this.data  = {
        labels: [ 'Total','Completed', 'In Progress', ],
        datasets: [{
          label: 'Tasks',
          data: [this.tasks?.length || 0, this.completedTasksCount || 0, this.runningTasksCount || 0],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
          ],
          borderWidth: 1
        }]
      };
        this.Priorties = {
          labels: [ 'High','Medium', 'Low', ],
          datasets: [{
            label: 'Priorties',
            data: [high || 0, medium || 0, low || 0],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 1
          }]
        };
     })
    );

    this.projectService.getAllProjects({ companyId: this.company }).subscribe(
      (response: any) => {
         console.log("project mile ha",response);
         const notStarted = response?.filter((project: any) => project.status === 'not-started')?.length;
         const completed  = response?.filter((project: any) => project.status === 'completed')?.length;
         const inProgress = response?.filter((project: any) => project.status === 'in-progress')?.length;
         this.data1  = {
          labels: [ 'Completed','In Progress', 'Not Started', ],
          datasets: [{
            label: 'Projects',
            data: [completed || 0, inProgress || 0, notStarted || 0],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 1
          }]
        }

        console.log(" data 1",this.data1)
      }
    )

  }

  openMem(row: any) {
    console.log("in board comp ",row);
   this.router.navigate([`/source/view-member/${row?.user?._id}` ])

  }

  markTaskAsDone(task : any) {
    // task.status = 'completed';
    // console.log("task",task)
    task.status = 'completed';
    task.endDate = new Date();

    this.taskService.updateTask(task._id,task).subscribe(
      (response) => {
        console.log("response for mark as complete task.",response);
        this.getResponse();
      },
      (err) => {
        console.log("reee", err)
      }
    )



  }


}
