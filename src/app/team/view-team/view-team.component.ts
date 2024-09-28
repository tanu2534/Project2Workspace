import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TeamService } from 'src/app/services/team.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-team',
  templateUrl: './view-team.component.html',
  styleUrls: ['./view-team.component.css']
})
export class ViewTeamComponent {

  team: any;
  teamLead: any;
  members: any;
  teamData: any;
  isTeamLead: boolean = false;
  isAdmin: boolean = false;
  teamLeadId: any;

  constructor(private router: Router,
    private teamService: TeamService,
    public userService: UserService
  ) { }
  teamId : any = (this.router.url).split('/').pop()

  ngOnInit(): void {
     this.getT(this.teamId);

     const user = this.userService.getUser();
     this.isAdmin = user?.role !== 'team-lead' && user?.role !== 'member';
     this.isTeamLead = user?.role === 'team-lead';
     this.teamLeadId = user?._id
    
  }

  async addMember() {
    try {
      // Show loading popup
      Swal.fire({
        title: 'Loading...',
        text: 'Fetching members...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });
  
      const response: any = await this.userService.findUsers({
        company: this.userService.getCompany(),
        role: 'member',
        team: { $exists: false }
      }).toPromise();
  
      // Close the loading popup
      Swal.close();
  
      console.log("Members list:", response);
  
      const members = response?.employees?.map((member: any) => ({
        id: member._id,
        name: member.name
      }));
  
      const result = await Swal.fire({
        title: 'Select Member',
        html: this.createMemberSelectHtml(members),
        background: '#292929',
        color: '#fff',
        showCancelButton: true,
        confirmButtonText: 'Add Member',
        cancelButtonText: 'Cancel',
        buttonsStyling: true,
        customClass: {
          popup: 'custom-swal-popup',       // Custom class for popup
          confirmButton: 'custom-confirm-btn', // Class for Add Member button
          cancelButton: 'custom-cancel-btn'    // Class for Cancel button
        },
        didOpen: () => {
          const selectElement = document.getElementById('member-select') as HTMLSelectElement;
          this.initializeSingleSelect(selectElement);
        },
        preConfirm: () => this.getSelectedMember()
      });
      
  
      if (result.isConfirmed) {
        const selectedMemberId = result.value;  // Single ID
        console.log('Selected Member ID:', selectedMemberId);
        
        this.teamService.addmember({
          companyId : this.userService.getCompany(),
           teamId : this.teamId,
            userId : selectedMemberId 
        }).subscribe(
          (response: any) => {
            console.log( "this is resp ",response);
            this.getT(this.teamId);
          },
          (error) => {
            console.error('Error adding member:', error);
            Swal.fire('Error', 'Failed to add member. Please try again.', 'error');
          }
        )
        // TODO: Handle the selected member (e.g., call an API to add them)
      }
    } catch (error) {
      console.error('Error fetching members:', error);
      Swal.fire('Error', 'Failed to fetch members. Please try again.', 'error');
    }
  }
  
  private createMemberSelectHtml(members: { id: string, name: string }[]): string {
    const options = members.map(member => 
      `<option value="${member.id}">${member.name}</option>`
    ).join('');
  
    return `
      <select id="member-select" class="custom-select" style="width: 100%;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
      background-color: #424242;
      color: white;
      font-size: 16px;
      font-family: poppins;
      height: auto;
      overflow-y: auto;">
        <option style="
        color: white;"
        
        " value="" disabled selected>Select a member</option>
        ${options}
      </select>
    `;
  }
  
  // Single select behavior
  private initializeSingleSelect(selectElement: HTMLSelectElement) {
    selectElement.style.width = '100%';
    selectElement.style.height = 'auto';
  
    // Handle selection validation
    selectElement.addEventListener('change', () => {
      if (!selectElement.value) {
        Swal.showValidationMessage('Please select a member');
      }
    });
  }
  
  // Get selected single member
  private getSelectedMember(): string | false {
    const select = document.getElementById('member-select') as HTMLSelectElement;
    const selectedMember = select.value;
  
    if (!selectedMember) {
      Swal.showValidationMessage('Please select a member');
      return false;
    }
  
    return selectedMember;  // Return single selected member's ID
  }
  
  
  // private getSelectedMembers(): string[] | false {
  //   const select = document.getElementById('member-select') as HTMLSelectElement;
  //   const selectedMembers = Array.from(select.selectedOptions).map(option => option.value);
  
  //   if (selectedMembers.length === 0) {
  //     Swal.showValidationMessage('Please select at least one member');
  //     return false;
  //   }
  
  //   return selectedMembers;
  // }
  

  getT(id: any) {
    this.teamService.getTeamById(id).subscribe(
      (response: any) => {
        if (!response || !response.team) {
          console.error('Error fetching team:', response);
          return;
        }

        this.team = response.team;
        this.teamLead = response.teamLead;
        this.members = response.members;
        this.teamData = {
          members: response.members || [],
          teamLead: response.teamLead || null,
          team: response.team || null
        };
      },
      (error) => {
        console.error('Error fetching team:', error);
      }
    );
  }

  removeMember(memeber: any){

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
        this.userService.removeFromTeam({ companyId: this.userService.getCompany(), teamId: this.team?._id, userId: memeber?._id}).subscribe(response => {
          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "The member has been removed from the team.",
            icon: "success"
          });
          this.router.navigate([`/source/view-team/${this.team?._id}`]);  // Navigate back to the team page after deletion
        }, error => {
          swalWithBootstrapButtons.fire({
            title: "Error",
            text: "Failed to remove the member from team.",
            icon: "error"
          });
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "The member is safe in team :)",
          icon: "error"
        });
      }
    });

  }

}
