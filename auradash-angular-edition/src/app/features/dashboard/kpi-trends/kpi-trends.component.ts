import { Component, ElementRef, ViewChild, afterNextRender } from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-kpi-trends',
  standalone: true,
  template: `
    <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <h3 class="text-lg font-semibold text-slate-900 mb-4">KPI Trends</h3>
      <div class="relative h-64">
        <canvas #chartCanvas></canvas>
      </div>
    </div>
  `
})
export class KpiTrendsComponent {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;
  private chart: Chart | undefined;

  constructor() {
    afterNextRender(() => {
      this.initChart();
    });
  }

  private initChart() {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Performance',
          data: [65, 59, 80, 81, 56, 55],
          fill: true,
          borderColor: '#0f172a',
          backgroundColor: 'rgba(15, 23, 42, 0.1)',
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              display: false
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        }
      }
    });
  }
}