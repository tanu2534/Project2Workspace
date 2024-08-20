import { Component, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './chart.component.html',
})
export class BarChartComponent implements OnChanges {
  chart: Chart | undefined;
  
  @Input() public data: any;
  @Input() public type: any;
  
  constructor(private elementRef: ElementRef) {
    Chart.register(...registerables);
    console.log("this is from constructor",this.data)
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] && !changes['data'].firstChange) {
      this.updateChart();
      console.log("this is from on changes",this.data)
    }
  }

  ngAfterViewInit() {
    this.createChart();
    console.log("this is from after view init",this.data)
  }

  private createChart() {
    const ctx = this.elementRef.nativeElement.querySelector('#myChart').getContext('2d');
    
    this.chart = new Chart(ctx, {
      type: this.type,
      data: this.data,
      options: {
        responsive: true,
        legend: {
          position: 'left', // You can change the position to 'left', 'right', etc.
        },
        tooltip: {
          enabled: true
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    console.log("this is from create chart",this.data)
  }

  private updateChart() {
    if (this.chart) {
      this.chart.data = this.data;
      this.chart.update();
    }
  }
}