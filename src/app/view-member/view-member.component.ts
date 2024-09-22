import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-view-member',
  templateUrl: './view-member.component.html',
  styleUrls: ['./view-member.component.css']
})
export class ViewMemberComponent {
  isAdmin: boolean | undefined;
  isTeamLead : boolean | undefined;

  constructor(
    public userService: UserService, 
    private router: Router
  ) { }

  memberId: any = this.router.url.split('/').pop();
  member: any;

  ngOnInit(): void {
    this.getM(this.memberId);

    const a = this.userService.getUser();
    console.log(" this user ",a);
    this.isAdmin = (a?.role !== 'member' && a?.role !== 'team-lead');
    this.isTeamLead = (a?.role === 'team-lead');
  }

  getM(id: any) {
    this.userService.getUserById(id).subscribe((data) => {
      this.member = data;
      console.log(this.member);
    });
  }

  removeFromTeam(){

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
      title: "Remove Member From Team?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
      
    }).then((result) => {
      if (result.isConfirmed) {
        // Call service to delete member
        this.userService.removeMember(this.memberId).subscribe(response => {
          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "The member has been removed.",
            icon: "success"
          });
          this.router.navigate(['/team']); // Navigate back to the team page after deletion
        }, error => {
          swalWithBootstrapButtons.fire({
            title: "Error",
            text: "Failed to delete the member.",
            icon: "error"
          });
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "The member is safe :)",
          icon: "error"
        });
      }
    });

  }

  // Remove Member Functionality
  removeMember() {
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
      title: "Remove Member?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
      
    }).then((result) => {
      if (result.isConfirmed) {
        // Call service to delete member
        this.userService.removeMember(this.memberId).subscribe(response => {
          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "The member has been removed.",
            icon: "success"
          });
          this.router.navigate(['/team']); // Navigate back to the team page after deletion
        }, error => {
          swalWithBootstrapButtons.fire({
            title: "Error",
            text: "Failed to delete the member.",
            icon: "error"
          });
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "The member is safe :)",
          icon: "error"
        });
      }
    });
  }
}
