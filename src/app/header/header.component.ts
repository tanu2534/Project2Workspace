import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { UserService } from '../services/user.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userName: string = 'Tanisha Soni';
  pageTitle: string = 'Boards'; // Default title for the header

  // Mapping route names to human-readable titles
  routeTitles: { [key: string]: string } = {
    board: 'Boards',
    projects: 'Projects',
    task: 'Tasks',
    team: 'Team',
    deadline: 'Time Tracking',
    login: 'Log In',
    signIn: 'Sign In'
  };

  constructor(private router: Router, public userService: UserService) {}

  ngOnInit(): void {
    this.userName = this.userService.getName();
    this.userName = this.userService.capatializeFirstLetterAfterSpace(this.userName);

    // Initialize pageTitle based on the current URL immediately on load
    this.setPageTitle(this.router.url);

    // Subscribe to router events to update pageTitle when the route changes
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.setPageTitle(event.urlAfterRedirects);
      });
  }

  // Method to extract the current route and set the page title
  private setPageTitle(url: string) {
    const urlParts = url.split('/');
    if (urlParts.length > 2 && urlParts[1] === 'source') {
      this.pageTitle = this.routeTitles[urlParts[2]] || 'Boards'; // Set pageTitle based on route or default to 'Boards'
    }
  }
}
