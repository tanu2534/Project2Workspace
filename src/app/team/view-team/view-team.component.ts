import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TeamService } from 'src/app/services/team.service';
import { UserService } from 'src/app/services/user.service';

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

  constructor(private router: Router,
    private teamService: TeamService,
    public userService: UserService
  ) { }
  teamId : any = (this.router.url).split('/').pop()

  ngOnInit(): void {
     this.getT(this.teamId)
    
  }

  getT(id:any){
    this.teamService.getTeamById(id).subscribe(
      (response: any) => {
        console.log(response)
        this.team = response?.team
        this.teamLead = response?.teamLead
        this.members = response?.members
        this.teamData.members = response?.members
        this.teamData.teamLead = response?.teamLead
        this.teamData.team = response?.team
      }
    )
  }

}
