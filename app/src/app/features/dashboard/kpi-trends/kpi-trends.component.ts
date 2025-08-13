import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule, Color, ScaleType } from '@swimlane/ngx-charts';
import { DashboardService } from '../../../core/services/dashboard.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-kpi-trends',
  standalone: true,
  imports: [CommonModule, NgxChartsModule, ReactiveFormsModule],
  templateUrl: './kpi-trends.component.html',
  styleUrls: ['./kpi-trends.component.css']
})
export class KpiTrendsComponent implements OnInit {
  private dashboardService = inject(DashboardService);
  private fb = inject(FormBuilder);

  chartData = signal<any[]>([]);
  isLoading = signal(true);

  filterForm = this.fb.group({
    q1: true,
    q2: true,
    q3: true,
    q4: true,
  });

  // Chart options
  view: [number, number] = [700, 400];
  legend: boolean = true;
  showXAxisLabel: boolean = true;
  showYAxisLabel: boolean = true;
  xAxisLabel: string = 'Month';
  yAxisLabel: string = 'Value';
  timeline: boolean = true;

  colorScheme: Color = {
    name: 'aurora',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  ngOnInit(): void {
    this.fetchChartData();

    this.filterForm.valueChanges.subscribe(() => {
      this.fetchChartData();
    });
  }

  fetchChartData(): void {
    this.isLoading.set(true);
    const selectedQuarters = Object.entries(this.filterForm.value)
      .filter(([, value]) => value)
      .map(([key]) => key.toUpperCase());

    this.dashboardService.getKpiTrends(selectedQuarters).subscribe(response => {
      this.chartData.set(this.transformDataForChart(response));
      this.isLoading.set(false);
    });
  }

  private transformDataForChart(apiResponse: any): any[] {
    if (!apiResponse || !apiResponse.labels || !apiResponse.datasets) {
      return [];
    }

    return apiResponse.datasets.map((dataset: any) => ({
      name: dataset.label,
      series: dataset.data.map((value: number, index: number) => ({
        name: apiResponse.labels[index],
        value: value
      }))
    }));
  }
}
