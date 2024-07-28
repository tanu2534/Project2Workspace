import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {
  users: any;

  constructor(private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    console.log(this.userService.getCompany())

   this.userService.getAllUsers({companyId : this.userService.getCompany()}).subscribe(
    (response: any) => {
      this.users = response.users;
      console.log(this.users)
    }
   )
  }

  openMem(row: any) {
    console.log("in board comp ",row);
   this.router.navigate([`/source/view-member/${row?.user?._id}` ])

  }

}
