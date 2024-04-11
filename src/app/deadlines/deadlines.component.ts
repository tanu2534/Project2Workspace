import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TaskService } from '../services/task.service';
import { UserService } from '../services/user.service';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}


@Component({
  selector: 'app-deadlines',
  templateUrl: './deadlines.component.html',
  styleUrls: ['./deadlines.component.css']
})
export class DeadlinesComponent {
  company: any;
  tasks: any;
  iscal : boolean = true;
  displayedColumns: string[] = ['id', 'name', 'progress', 'color'];
  dataSource = new MatTableDataSource<UserData>(ELEMENT_DATA);
  completedTasksCount: any;
  runningTasksCount: any;
  isTask: boolean  = true;


  constructor(private taskService: TaskService, private userService: UserService) {
    
    this.company = this.userService.getCompany()
    this.taskService.findAllByQuary({companyId : this.company, status: 'in-progress', startDate: new Date()}).subscribe(
     ((res:any)=>{
       console.log("res from task ", res?.tasks)
       this.tasks = res?.tasks;
       this.completedTasksCount = this.tasks?.filter((task: any) => task.status === 'completed')?.length;
       this.runningTasksCount = this.tasks?.filter((task: any) => task.status === 'in-progress')?.length;
     }), (err: any)=>{
       console.log(err);
       this.isTask = false
     }
    )
   }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

const ELEMENT_DATA: UserData[] = [
  { id: '1', name: 'John Doe', progress: '30%', color: 'red' },
  { id: '2', name: 'Jane Smith', progress: '60%', color: 'blue' },
  { id: '3', name: 'Bob Johnson', progress: '90%', color: 'green' },
];

