import { Component, OnInit, inject, signal, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService, SalesRecord } from '../../../core/services/dashboard.service';
import { finalize } from 'rxjs';

type SortableColumn = 'orderId' | 'productName' | 'saleDate' | 'amount';

@Component({
  selector: 'app-sales-records',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sales-records.component.html',
  styleUrls: ['./sales-records.component.css']
})
export class SalesRecordsComponent implements OnInit {
  private dashboardService = inject(DashboardService);

  @Input() viewMode: 'full' | 'compact' = 'full';

  isLoading = signal(true);
  salesRecords = signal<SalesRecord[]>([]);
  currentPage = signal(1);
  hasMorePages = signal(true);
  sortColumn = signal<SortableColumn>('saleDate');
  sortDirection = signal<'asc' | 'desc'>('desc');

  get headerClasses() {
    return {
      'px-5': this.viewMode === 'full',
      'py-3': this.viewMode === 'full',
      'px-3': this.viewMode === 'compact',
      'py-2': this.viewMode === 'compact',
    };
  }

  get cellClasses() {
    return {
      'px-5': this.viewMode === 'full',
      'py-5': this.viewMode === 'full',
      'text-sm': this.viewMode === 'full',
      'px-3': this.viewMode === 'compact',
      'py-2': this.viewMode === 'compact',
      'text-xs': this.viewMode === 'compact',
    };
  }

  ngOnInit(): void {
    this.fetchSalesRecords();
  }

  fetchSalesRecords(): void {
    this.isLoading.set(true);
    const recordsToFetch = this.viewMode === 'compact' ? 5 : 10;

    this.dashboardService.getSalesRecords(this.currentPage(), recordsToFetch)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe(response => {
        const sortedData = this.sortData(response.data);
        this.salesRecords.set(sortedData);
        this.hasMorePages.set(this.viewMode === 'compact' ? false : response.hasMore);
      });
  }

  private sortData(data: SalesRecord[]): SalesRecord[] {
    return [...data].sort((a, b) => {
      const isAsc = this.sortDirection() === 'asc';
      const valA = a[this.sortColumn()];
      const valB = b[this.sortColumn()];

      if (valA < valB) return isAsc ? -1 : 1;
      if (valA > valB) return isAsc ? 1 : -1;
      return 0;
    });
  }

  changeSort(column: SortableColumn): void {
    if (this.sortColumn() === column) {
      this.sortDirection.update(dir => dir === 'asc' ? 'desc' : 'asc');
    } else {
      this.sortColumn.set(column);
      this.sortDirection.set('asc');
    }
    this.salesRecords.update(records => this.sortData(records));
  }

  nextPage(): void {
    if (!this.hasMorePages()) return;
    this.currentPage.update(page => page + 1);
    this.fetchSalesRecords();
  }

  previousPage(): void {
    if (this.currentPage() === 1) return;
    this.currentPage.update(page => page - 1);
    this.fetchSalesRecords();
  }

  getAriaSort(column: SortableColumn): 'ascending' | 'descending' | 'none' {
    if (this.sortColumn() === column) {
      return this.sortDirection() === 'asc' ? 'ascending' : 'descending';
    }
    return 'none';
  }
}