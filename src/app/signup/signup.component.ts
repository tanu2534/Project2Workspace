import { Component } from '@angular/core';
import { UserService } from '../services/user.service';

interface User {
  name: string;
  email: string;
  password: string;
  company?: string;
  role: string;
  teamName?: string;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {


  user: User = {
    name: '',
    email: '',
    password: '',
    company: '',
    role: '',
    teamName: ''
  };

  constructor(private userService: UserService) { }

  onSubmit() {
    this.userService.register(this.user)
      .subscribe(
        (response: any) => {
          console.log('Registration successful:', response);
          localStorage.setItem('userData', JSON.stringify(response));
          localStorage.setItem('token',JSON.stringify(response.token))
          // Handle successful registration
        }
      );
  }
}
