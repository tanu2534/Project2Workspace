import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-view-member',
  templateUrl: './view-member.component.html',
  styleUrls: ['./view-member.component.css']
})
export class ViewMemberComponent {

  constructor(public userService: UserService, private router: Router) { }

  memberId: any = this.router.url.split('/').pop();
  member: any;

  ngOnInit(): void {

    this.getM(this.memberId);
    
  }

  getM(id:any){
    this.userService.getUserById(id).subscribe((data)=>{
      this.member = data;
      console.log(this.member);
    })
  }

}
