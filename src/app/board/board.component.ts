import { Component } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {
  users: any;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    console.log(this.userService.getCompany())

   this.userService.getAllUsers({companyId : this.userService.getCompany()}).subscribe(
    (response: any) => {
      this.users = response.users;
      console.log(this.users)
    }
   )
  }

}
