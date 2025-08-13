import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-test-bed',
  standalone: true,
  templateUrl: './test-bed.component.html',
  imports: [CommonModule, NgxChartsModule],
  styleUrl: './test-bed.component.css',
})
export class TestBedComponent {
  private toastr = inject(ToastrService);

  // Sample data for ngx-charts
  chartData = [
    { name: 'Sales', value: 105000 },
    { name: 'Marketing', value: 78000 },
    { name: 'Development', value: 120000 },
    { name: 'Support', value: 45000 },
  ];

  showToast() {
    this.toastr.success(
      'The toastr library is working correctly!',
      'Success!'
    );
  }
}

