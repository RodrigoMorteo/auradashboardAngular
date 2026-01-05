import { Component, OnInit, inject, signal, Input, computed, PLATFORM_ID, ViewChild, ElementRef, effect, OnDestroy } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { DashboardService } from '../../../core/services/dashboard.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-kpi-trends',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './kpi-trends.component.html',
  styleUrls: ['./kpi-trends.component.css']
})
export class KpiTrendsComponent implements OnInit, OnDestroy {
  private dashboardService = inject(DashboardService);
  private fb = inject(FormBuilder);

  @Input() viewMode: 'full' | 'compact' = 'full';
  isBrowser = signal(isPlatformBrowser(inject(PLATFORM_ID)));

  chartData = signal<any>(null);
  isLoading = signal(true);
  
  private chartInstance: any;

  @ViewChild('chartCanvas') set chartCanvasRef(element: ElementRef<HTMLCanvasElement>) {
    if (element && this.isBrowser()) {
      this.initChart(element.nativeElement);
    }
  }

  constructor() {
    effect(() => {
      const data = this.chartDataConfig();
      if (this.chartInstance) {
        this.chartInstance.data = data;
        this.chartInstance.update();
      }
    });
  }

  filterForm = this.fb.group({
    q1: true,
    q2: true,
    q3: true,
    q4: true,
  });

  public chartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
      }
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Month'
        }
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Value'
        }
      }
    }
  };

  public chartDataConfig = computed<any>(() => {
    const rawData = this.chartData();
    if (!rawData || !rawData.labels || !rawData.datasets) {
      return { labels: [], datasets: [] };
    }
    return {
      labels: rawData.labels,
      datasets: rawData.datasets.map((d: any) => ({
        label: d.label,
        data: d.data,
        tension: 0.4,
        fill: false
      }))
    };
  });

  ngOnInit(): void {
    if (this.viewMode === 'compact') {
      if (this.chartOptions.plugins?.legend) this.chartOptions.plugins.legend.display = false;
      if (this.chartOptions.scales?.['x']) this.chartOptions.scales['x'].display = false;
      if (this.chartOptions.scales?.['y']) this.chartOptions.scales['y'].display = false;
      this.filterForm.disable();
    }

    this.fetchChartData();

    this.filterForm.valueChanges.subscribe(() => {
      // The form is disabled in compact mode, so this will only fire in full mode.
      this.fetchChartData();
    });
  }

  ngOnDestroy(): void {
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }
  }

  private async initChart(canvas: HTMLCanvasElement): Promise<void> {
    if (this.chartInstance) this.chartInstance.destroy();
    
    const { Chart, registerables } = await import('chart.js');
    Chart.register(...registerables);

    this.chartInstance = new Chart(canvas, {
      type: 'line',
      data: this.chartDataConfig(),
      options: this.chartOptions
    });
  }

  fetchChartData(): void {
    this.isLoading.set(true);
    const selectedQuarters = Object.entries(this.filterForm.value)
      .filter(([, value]) => value)
      .map(([key]) => key.toUpperCase());

    this.dashboardService.getKpiTrends(selectedQuarters).subscribe(response => {
      this.chartData.set(response);
      this.isLoading.set(false);
    });
  }
}
