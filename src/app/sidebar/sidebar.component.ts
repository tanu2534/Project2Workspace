import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { UserService } from '../services/user.service';
import { CompanyService } from '../services/company.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  activeFeild: string = '';
  com: any;

  constructor(
    private router: Router, 
    private userService: UserService, 
    private companyService: CompanyService
  ) {}

  ngOnInit(): void {
    // Subscribe to router events to detect route changes
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd)) // Filter for navigation end events
      .subscribe((event: any) => {
        // Extract the current URL and update activeFeild
        const urlParts = event.urlAfterRedirects.split('/');
        if (urlParts.length > 2 && urlParts[1] === 'source') {
          this.activeFeild = urlParts[2]; // Set activeFeild to the last part of the URL after /source
        } else {
          this.activeFeild = ''; // Reset or handle default if necessary
        }
      });

    // Initial load - handle the first navigation
    const url = this.router.url.split('/');
    this.activeFeild = url.length > 2 && url[1] === 'source' ? url[2] : 'board';

    let com = this.userService.getCompany();
    this.getcom(com);
  }

  getcom(com: any) {
    this.companyService.getCompanyById(com).subscribe(
      (res: any) => {
        this.com = this.userService.capatializeFirstLetterAfterSpace(res?.name);
      }
    );
  }

  signIn() {
    this.router.navigate(['/register']);
  }

  nevigateTo(way: string) {
    this.router.navigate([`/source/${way}`]);
    this.activeFeild = way;
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
