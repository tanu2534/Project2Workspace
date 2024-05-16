import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  activeFeild: string = '';
  com: any;
  constructor(private router : Router, private userService: UserService, private companyService : CompanyService) {
    
  }
  
  ngOnInit(): void {
    console.log(this.router.url) ;
    const url =  (this.router.url).split('/')
    console.log(url[2]) ;
    this.activeFeild = 'board';
    let com = this.userService.getCompany();
    console.log("from side ",this.com)
    this.getcom(com);

  }

  getcom(com:any){
    this.companyService.getCompanyById(com).subscribe(
      (res: any)=>{
        console.log("asdsd",res);
        this.com = res?.name;
      }
    )
  }
  nevigateTo(way: string) {
  // throw new Error('Method not implemented.');
  
  this.router.navigate([`/source/${way}`]);
  this.activeFeild = way ;
  }

}
