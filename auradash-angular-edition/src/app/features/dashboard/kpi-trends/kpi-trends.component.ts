import { Component, ElementRef, ViewChild, afterNextRender, Inject, PLATFORM_ID } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';

Chart.register(...registerables);

@Component({
  selector: 'app-kpi-trends',
  standalone: true,
  template: `
    <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-200 text-slate-900">
      <h3 class="text-lg font-semibold mb-4">KPI Trends</h3>
      <div class="relative h-64">
        <canvas #chartCanvas></canvas>
      </div>
    </div>
  `
})
export class KpiTrendsComponent {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;
  private chart: Chart | undefined;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    afterNextRender(() => {
      if (isPlatformBrowser(this.platformId)) {
        this.fetchDataAndInitChart();
      }
    });
  }

  private fetchDataAndInitChart() {
    this.http.get<any>('/api/widgets/kpi-trends').subscribe({
      next: (data) => this.initChart(data),
      error: () => this.initChart({
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Performance (Fallback)',
          data: [65, 59, 80, 81, 56, 55],
          fill: true,
          borderColor: '#0f172a',
          backgroundColor: 'rgba(15, 23, 42, 0.1)',
          tension: 0.4
        }]
      })
    });
  }

  private initChart(data: any) {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.labels,
        datasets: data.datasets.map((ds: any, index: number) => ({
          ...ds,
          fill: true,
          borderColor: index === 0 ? '#0f172a' : '#6366f1',
          backgroundColor: index === 0 ? 'rgba(15, 23, 42, 0.1)' : 'rgba(99, 102, 241, 0.1)',
          tension: 0.4
        }))
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              boxWidth: 12,
              usePointStyle: true,
              pointStyle: 'circle'
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0,0,0,0.05)'
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