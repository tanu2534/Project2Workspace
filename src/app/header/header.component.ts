import { Component } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  userName: string = 'Tanisha Soni';

  constructor(public userService: UserService) {
  }


  ngOnInit(): void {

    this.userName = this.userService.getName();
    this.userName = this.userService.capatializeFirstLetterAfterSpace(this.userName);
  }
}
