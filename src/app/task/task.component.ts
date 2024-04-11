import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../services/task.service';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
company : any ;
tasks: any;
  completedTasksCount: any;
  runningTasksCount: any;
  
  constructor(private router : Router, private taskService: TaskService, private userService: UserService){

  }

 ngOnInit(): void {
   console.log("Ds");
   this.company = this.userService.getCompany()
   this.taskService.findAllByQuary({companyId : this.company}).subscribe(
    ((res:any)=>{
      console.log("res from task ", res?.tasks)
      this.tasks = res?.tasks;
      this.completedTasksCount = this.tasks?.filter((task: any) => task.status === 'completed')?.length;
      this.runningTasksCount = this.tasks?.filter((task: any) => task.status === 'in-progress')?.length;
    })
   )
 }

  openCreateTask(){
    this.router.navigate([`/source/task-create`]);
  }
}
