import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}


@Component({
  selector: 'app-deadlines',
  templateUrl: './deadlines.component.html',
  styleUrls: ['./deadlines.component.css']
})
export class DeadlinesComponent {

  
  displayedColumns: string[] = ['id', 'name', 'progress', 'color'];
  dataSource = new MatTableDataSource<UserData>(ELEMENT_DATA);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

const ELEMENT_DATA: UserData[] = [
  { id: '1', name: 'John Doe', progress: '30%', color: 'red' },
  { id: '2', name: 'Jane Smith', progress: '60%', color: 'blue' },
  { id: '3', name: 'Bob Johnson', progress: '90%', color: 'green' },
];

