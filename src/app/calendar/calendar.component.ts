import { Component, OnInit } from '@angular/core';

interface CalendarDay {
  date: Date;
  isSameMonth: boolean;
  today: boolean;
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

  ngOnInit() {
    this.generateCalendar();
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
          today
        });
        day++;
        console.log("to", today)
      }
      calendarDays.push(week);
    }

    this.calendarDays = calendarDays;
  }
}
