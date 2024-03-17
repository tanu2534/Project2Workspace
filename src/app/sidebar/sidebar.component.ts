import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  activeFeild: string = '';
  constructor(private router : Router){
    
  }
  
  ngOnInit(): void {
    console.log(this.router.url) ;
    const url =  (this.router.url).split('/')
    console.log(url[2]) ;
    this.activeFeild = 'board';

  }
  nevigateTo(way: string) {
  // throw new Error('Method not implemented.');
  
  this.router.navigate([`/source/${way}`]);
  this.activeFeild = way ;
  }

}
