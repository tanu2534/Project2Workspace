import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent {


  taskId : any = this.router.url.split('/').pop();
  task: any;
  isAdmin: boolean = false;
 isTeamLead: boolean = false;




  constructor(private router : Router, private taskService: TaskService, private userService: UserService) {
  }

 ngOnInit(): void {
   this.getTask(this.taskId);

   const user = this.userService.getUser();
   this.isAdmin = user?.role !== 'team-lead' && user?.role !== 'member';
   this.isTeamLead = user?.role === 'team-lead';
 }

 removeTask() {
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
    title: "Remove Task?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes",
    cancelButtonText: "No",
    reverseButtons: true
    
  }).then((result) => {
    if (result.isConfirmed) {
      // Call service to delete member
      this.taskService.deleteTask({ companyId: this.userService.getCompany(), taskId : this.taskId}).subscribe(response => {
        swalWithBootstrapButtons.fire({
          title: "Deleted!",
          text: "The Task has been removed",
          icon: "success"
        });
        this.router.navigate(['/source/task']);  // Navigate back to the team page after deletion
      }, error => {
        swalWithBootstrapButtons.fire({
          title: "Error",
          text: "Failed to remove the Task.",
          icon: "error"
        });
      });
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      swalWithBootstrapButtons.fire({
        title: "Cancelled",
        text: "The Task is safe :)",
        icon: "error"
      });
    }
  });

}

 getPriorityClass(): string {
  return `priority-${this.task.priority.toLowerCase()}`;
}

getStatusClass(): string {
  return `status-${this.task.status.toLowerCase().replace(' ', '-')}`;
}

 getTask(id:any){
   this.taskService.getTaskById(id).subscribe(
     ((res:any)=>{
       console.log(res)
       this.task = res;
     })
   )
 }

}
