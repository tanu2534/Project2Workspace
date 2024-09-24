import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TeamService } from '../services/team.service';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent  {
  company: any;
  teams:any ;
  isAdmin: boolean = false;
  isTeamlead: boolean = false;

  constructor(private router : Router, private teamService: TeamService, public userService: UserService) {
    
  }
  ngOnInit(){
    console.log("in ics team")
    this.company =  this.userService.getCompany();
    this.teamService.findAllByQuary({companyId: this.company}).subscribe(
      (response: any) => {
        // this.team = response
        console.log("team",response)
        this.teams = response ;
      }
    )

    const a = this.userService.getUser();
    console.log(" this user ",a);
    this.isAdmin = (a?.role !== 'member' && a?.role !== 'team-lead');
    this.isTeamlead = (a?.role === 'team-lead');
  }
  openCreateTeam(){
    this.router.navigate([`/source/team-create`]);
  }
  gotoViewTeam(team: any) {
    console.log("clicked team ", team)
    this.router.navigate([`/source/view-team/${team._id}`]);
  }


  removeTeam(team:any){
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
      title: "Dismiss Team?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      reverseButtons: true
      
    }).then((result) => {
      if (result.isConfirmed) {
       // Call service to delete member
        this.teamService.removeTeam({companyId : this.company, teamId : team?._id}).subscribe((response: any) => {
          swalWithBootstrapButtons.fire({
            title: "Dismissed!",
            text: "The Team has been Dismissed.",
            icon: "success"
          });
          this.router.navigate(['/source/team']); // Navigate back to the team page after deletion
        }, error => {
          swalWithBootstrapButtons.fire({
            title: "Error",
            text: "Failed to Dismiss the Team.",
            icon: "error"
          });
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "The Team is safe :)",
          icon: "error"
        });
      }
    });
  }

  
}
