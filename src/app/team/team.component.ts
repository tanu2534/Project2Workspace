import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TeamService } from '../services/team.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent  {
  company: any;
  teams:any ;

  constructor(private router : Router, private teamService: TeamService, private userService: UserService) {
    
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
  }
  openCreateTeam(){
    this.router.navigate([`/source/team-create`]);
  }
}
