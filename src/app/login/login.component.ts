import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    // Additional initialization logic, if needed
  }

  onSubmit() {
    if (this.loginForm.valid) {
      // Handle login logic here
      console.log(this.loginForm.value);

      this.userService.login(this.loginForm.value).subscribe(
        (response: any) => {
          // Handle successful login
          console.log('Login successful:', response);
          // Redirect to the dashboard or any other page
          this.router.navigate(['/source/board']);
          localStorage.setItem('userData', JSON.stringify(response));
          localStorage.setItem('token', response.token);
        },
        (error) => {
          // Handle login error
          console.error('Login error:', error);
        } 
      );
    }
  }
}