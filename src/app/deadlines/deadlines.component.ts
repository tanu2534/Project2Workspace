import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TaskService } from '../services/task.service';
import { UserService } from '../services/user.service';
import { startOfDay, endOfDay } from 'date-fns';

// Import required Chart.js components
import { Chart, CategoryScale, LinearScale, BarController, BarElement, Title, Tooltip, Legend } from 'chart.js';

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
  company: any;
  tasks: any;
  iscal: boolean = true;  // Default to true (Calendar mode)
  displayedColumns: string[] = ['id', 'name', 'progress', 'color'];
  dataSource = new MatTableDataSource<UserData>(ELEMENT_DATA);
  completedTasksCount: any;
  runningTasksCount: any;
  isTask: boolean = true;

  constructor(private taskService: TaskService, private userService: UserService) {
    const today = new Date();
    const startOfToday = startOfDay(today);
    const endOfToday = endOfDay(today);

    this.company = this.userService.getCompany();
    this.taskService.findAllByQuary({ companyId: this.company }).subscribe(
      (res: any) => {
        console.log("res from task ", res?.tasks);
        this.tasks = res?.tasks;

        // Filter tasks that have today's deadline and are 'completed' or 'in-progress'
        this.applyDeadlineFilter(startOfToday, endOfToday);
      },
      (err: any) => {
        console.log(err);
        this.isTask = false;
      }
    );

    // Register all necessary Chart.js components, including BarController
    Chart.register(CategoryScale, LinearScale, BarController, BarElement, Title, Tooltip, Legend);
  }

  // Method to apply deadline and status filtering
  applyDeadlineFilter(startOfToday: Date, endOfToday: Date) {
    // Filter completed tasks that have today's deadline
    this.completedTasksCount = this.tasks?.filter((task: any) => {
      const taskDeadline = new Date(task.deadline);
      return task.status === 'completed' && taskDeadline >= startOfToday && taskDeadline <= endOfToday;
    })?.length;

    // Filter in-progress tasks that have today's deadline
    this.runningTasksCount = this.tasks?.filter((task: any) => {
      const taskDeadline = new Date(task.deadline);
      return task.status === 'in-progress' && taskDeadline >= startOfToday && taskDeadline <= endOfToday;
    })?.length;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openGraph() {
    this.iscal = !this.iscal; // Toggle the calendar/graph view
    if (!this.iscal && this.tasks && this.tasks.length) {
      console.log('Tasks are ready for the graph:', this.tasks);
      setTimeout(() => {
        this.createGraph();
      }, 100);  // Slight delay to ensure canvas is rendered
    } else {
      console.log('No tasks available or switching to calendar.');
    }
  }

  createGraph() {
    const ctx = document.getElementById('comparativeChart') as HTMLCanvasElement;

    // Check if the canvas element exists
    if (!ctx) {
      console.log('Canvas element not found.');
      return;
    }

    // Destroy existing chart instance if present
    const chartInstance = Chart.getChart('comparativeChart');
    if (chartInstance) {
      chartInstance.destroy();
    }

    // Task priorities and datasets
    const priorities = ['high', 'medium', 'low'];
    const deadlineData: number[] = [];
    const completedTasksData: number[] = [];

    // Initialize counters for each priority level
    priorities.forEach(priority => {
      // Count tasks with the specified priority
      const tasksWithPriority = this.tasks.filter((task: any) => task.priority === priority);

      // Count tasks with a deadline (in-progress or not completed)
      const tasksWithDeadline = tasksWithPriority.filter((task: any) => task.deadline && task.status !== 'completed').length;
      deadlineData.push(tasksWithDeadline);

      // Count completed tasks (tasks with an endDate)
      const completedTasks = tasksWithPriority.filter((task: any) => task.status === 'completed').length;
      completedTasksData.push(completedTasks);
    });

    // Create the chart
    const myChart = new Chart(ctx, {
      type: 'bar', // Bar chart
      data: {
        labels: priorities,  // X-axis labels (High, Medium, Low)
        datasets: [
          {
            label: 'Tasks with Deadline (In-Progress)',
            data: deadlineData,  // Data for tasks with deadlines
            backgroundColor: 'rgba(54, 162, 235, 0.6)',  // Blue color
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          },
          {
            label: 'Completed Tasks (End Date)',
            data: completedTasksData,  // Data for completed tasks
            backgroundColor: 'rgba(75, 192, 192, 0.6)',  // Green color
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,  // Start Y-axis at 0
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'Task Priorities: Deadline vs Completed'
          }
        }
      }
    });

    // Render the chart
    myChart.update();
  }
}

const ELEMENT_DATA: UserData[] = [
  { id: '1', name: 'John Doe', progress: '30%', color: 'red' },
  { id: '2', name: 'Jane Smith', progress: '60%', color: 'blue' },
  { id: '3', name: 'Bob Johnson', progress: '90%', color: 'green' },
];
