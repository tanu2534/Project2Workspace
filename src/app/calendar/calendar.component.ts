import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { UserService } from '../services/user.service';
import { startOfDay, endOfDay } from 'date-fns';

interface CalendarDay {
  date: Date;
  isSameMonth: boolean;
  today: boolean;
  clicked: boolean;
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  currentMonth: Date = new Date();
  weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  calendarDays: CalendarDay[][] = [];
  company: any;
  tasks: any;
  completedTasksCount: any;
  runningTasksCount: any;
  isTask: boolean = true;
  collected: any ;

  ngOnInit() {
    this.generateCalendar();
  }

  constructor(private taskService: TaskService, private userService: UserService) {
    const today = new Date();
    const startOfToday = startOfDay(today);
    const endOfToday = endOfDay(today);
    
   this.company = this.userService.getCompany()
   this.taskService.findAllByQuary({companyId : this.company, deadline : {
     $gte: startOfToday,
     $lte: endOfToday
   }}).subscribe(
    ((res:any)=>{
      console.log("res from task ", res?.tasks)
      this.tasks = res?.tasks;
      this.completedTasksCount = this.tasks?.filter((task: any) => task.status === 'completed')?.length;
      this.runningTasksCount = this.tasks?.filter((task: any) => task.status === 'in-progress')?.length;
    }), (err: any)=>{
      console.log(err);
      this.isTask = false
    }
   )
  }

  generateCalendar() {
    const startOfMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth(), 1);
    const endOfMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1, 0);

    const startDay = startOfMonth.getDay();
    const endDay = endOfMonth.getDay();

    let calendarDays: CalendarDay[][] = [];
    let day = 1 - startDay;

    for (let i = 0; i < 6; i++) {
      let week: CalendarDay[] = [];
      for (let j = 0; j < 7; j++) {
        const date = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth(), day);
        const today = date.toDateString() === new Date().toDateString();
        week.push({
          date,
          isSameMonth: date.getMonth() === this.currentMonth.getMonth(),
          today,
          clicked: false, 
        });
        day++;
        console.log("to", today)
      }
      calendarDays.push(week);
    }

    this.calendarDays = calendarDays;
  }


  handleDayClick(day: CalendarDay) {
    // Reset the 'clicked' property for all days
    this.calendarDays.forEach((week) => {
      week.forEach((d) => {
        d.clicked = false;
      });
    });
  
    // Set the 'clicked' property for the selected day
    day.clicked = true;
  
    let da = new Date(day.date);
    let today = new Date();
    // if (da >= today) {
      console.log('Clicked date:', new Date(day.date).toISOString());
      this.taskService.findAllByQuary({
        companyId: this.company,
        status: 'in-progress',
        deadline: this.formatDateString(da),
      }).subscribe(
        (res: any) => {
          this.isTask = true;
          console.log("res from clicked date ", res?.tasks);
          this.tasks = res?.tasks;
        },
        (err: any) => {
          console.log(err);
          this.isTask = false;
        }
      );
      // Do something with the clicked date
    // }
  }

  formatDateString(dateString: any) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}T00:00:00.000Z`;
  }
}
