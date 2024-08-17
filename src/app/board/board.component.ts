import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { TaskService } from '../services/task.service';
import { startOfDay, endOfDay } from 'date-fns';

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

  constructor(private userService: UserService,
    private router: Router,
    private taskService : TaskService
  ) { }

  ngOnInit(): void {
    console.log(this.userService.getCompany(), this.userService.getUser()?._id);

    this.isadmin = (this.userService.getUser()?.role != 'team-lead' && this.userService.getUser()?.role != 'member');
    console.log("fghfgh  ", this.isadmin);


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
        }
      }).subscribe(
        (response: any) => {
          console.log("response foe tas is ",response)
          this.response = response?.tasks;
        }
      )
    }else{
      this.taskService.findAllByQuary({
        companyId: this.userService.getCompany,
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
