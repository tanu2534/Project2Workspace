import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../services/task.service';
import { UserService } from '../services/user.service';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  company: any;
  tasks: any;
  completedTasksCount: number = 0;
  runningTasksCount: number = 0;
  isAdmin: boolean = false;
  isTeamlead: boolean = false;
  graph: boolean = false;

  constructor(private router: Router, private taskService: TaskService, private userService: UserService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.company = this.userService.getCompany();
    this.taskService.findAllByQuary({ companyId: this.company }).subscribe((res: any) => {
      this.tasks = res?.tasks;
      this.completedTasksCount = this.tasks?.filter((task: any) => task.status === 'completed')?.length || 0;
      this.runningTasksCount = this.tasks?.filter((task: any) => task.status === 'in-progress')?.length || 0;
    });

    const user = this.userService.getUser();
    this.isAdmin = user?.role !== 'team-lead' && user?.role !== 'member';
    this.isTeamlead = user?.role === 'team-lead';
  }

  openGraph() {
    this.graph = !this.graph;
    if (this.graph && this.tasks && this.tasks.length) {
      setTimeout(() => {
        this.createGraph();
      }, 0);
    }
  }

  openCreateTask() {
    this.router.navigate(['/source/task-create']);
  }

  openTask(task: any) {
    this.router.navigate([`/source/view-task/${task?._id}`]);
  }

  createGraph() {
    const ctx = document.getElementById('comparativeChart') as HTMLCanvasElement;
  
    // Helper function to calculate the difference in days between two dates
    const calculateDaysSince = (startDate: string) => {
      const start = new Date(startDate);
      const today = new Date();
      const differenceInTime = today.getTime() - start.getTime();
      return Math.floor(differenceInTime / (1000 * 3600 * 24)); // Convert milliseconds to days
    };
  
    const taskNames = this.tasks.map((task: any) => task.name); // Task names as labels
    const daysSinceCreation = this.tasks.map((task: any) => calculateDaysSince(task.startDate)); // Number of days since task creation
    const priorities = this.tasks.map((task: any) => {
      if (task.priority === 'high') return 3;
      if (task.priority === 'medium') return 2;
      return 1;
    });
    const statuses = this.tasks.map((task: any) => task.status === 'completed' ? 1 : 0); // Status: Completed (1), In-Progress (0)
  
    // Destroy previous chart instance if exists to avoid overlay issues
    const chartInstance = Chart.getChart('comparativeChart');
    if (chartInstance) {
      chartInstance.destroy();
    }
  
    // Create the chart with relevant datasets
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: taskNames, // Task names on X-axis
        datasets: [
          {
            label: 'Days Since Creation',
            data: daysSinceCreation, // Number of days since task creation
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
            yAxisID: 'y1' // Assign this dataset to the left Y-axis (primary)
          },
          {
            label: 'Priority (High=3, Medium=2, Low=1)',
            data: priorities, // Priority as numerical data
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            type: 'line', // Change this to line chart for better visibility
            yAxisID: 'y2' // Assign this dataset to the right Y-axis (secondary)
          },
          {
            label: 'Status (Completed=1, In-Progress=0)',
            data: statuses, // Status: Completed (1) or In-Progress (0)
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            type: 'line', // Change this to line chart as well for clarity
            yAxisID: 'y2' // Assign this dataset to the right Y-axis (secondary)
          }
        ]
      },
      options: {
        scales: {
          y1: {
            beginAtZero: true,
            type: 'linear',
            position: 'left', // Left Y-axis for Days Since Creation
            title: {
              display: true,
              text: 'Days Since Creation'
            }
          },
          y2: {
            beginAtZero: true,
            type: 'linear',
            position: 'right', // Right Y-axis for Priority and Status
            grid: {
              drawOnChartArea: false // Do not draw grid lines for right axis to avoid clutter
            },
            title: {
              display: true,
              text: 'Priority & Status'
            }
          },
          x: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Tasks'
            }
          }
        }
      }
    });
  
    // Render the chart
    myChart.update();
  }
  
  
  
}
