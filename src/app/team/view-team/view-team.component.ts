import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-view-team',
  templateUrl: './view-team.component.html',
  styleUrls: ['./view-team.component.css']
})
export class ViewTeamComponent {

  constructor(private router: Router,
    private teamService: TeamService
  ) { }
  teamId : any = (this.router.url).split('/').pop()

  ngOnInit(): void {
     this.getT(this.teamId)
    
  }

  getT(id:any){
    this.teamService.getTeamById(id).subscribe(
      (response: any) => {
        console.log(response)
      }
    )
  }

}
