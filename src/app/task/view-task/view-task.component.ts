import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent {

  taskId : any = this.router.url.split('/').pop();

  constructor(private router : Router, private taskService: TaskService){
  }

 ngOnInit(): void {
   this.getTask(this.taskId)
 }

 getTask(id:any){
   this.taskService.getTaskById(id).subscribe(
     ((res:any)=>{
       console.log(res)
     })
   )
 }

}
