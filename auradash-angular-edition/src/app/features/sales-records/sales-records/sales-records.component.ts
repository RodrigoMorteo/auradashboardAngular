import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { HttpClient } from '@angular/common/http';

interface SalesRecord {
  orderId: string;
  productName: string;
  amount: number;
  saleDate: string;
  status?: string; // Status is not in the mock data, adding it as optional or mock it
}

@Component({
  selector: 'app-sales-records',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  template: `
    <div class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden text-slate-900">
      <div class="p-6 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
        <h3 class="text-lg font-semibold">Sales Records</h3>
        <span class="text-xs font-medium text-slate-400 uppercase tracking-wider">Drag rows to reorder</span>
      </div>
      
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-slate-50">
              <th (click)="sortBy('productName')" class="px-6 py-4 text-sm font-semibold text-slate-600 cursor-pointer hover:bg-slate-100 transition">Product</th>
              <th (click)="sortBy('amount')" class="px-6 py-4 text-sm font-semibold text-slate-600 cursor-pointer hover:bg-slate-100 transition text-right">Amount</th>
              <th (click)="sortBy('saleDate')" class="px-6 py-4 text-sm font-semibold text-slate-600 cursor-pointer hover:bg-slate-100 transition">Date</th>
              <th class="px-6 py-4 text-sm font-semibold text-slate-600">Status</th>
            </tr>
          </thead>
          <tbody cdkDropList (cdkDropListDropped)="drop($event)">
            <tr *ngFor="let record of records" cdkDrag class="border-b border-slate-100 hover:bg-slate-50 transition cursor-move bg-white">
              <td class="px-6 py-4 text-sm font-medium">{{ record.productName }}</td>
              <td class="px-6 py-4 text-sm text-right font-mono">{{ record.amount | currency }}</td>
              <td class="px-6 py-4 text-sm text-slate-500">{{ record.saleDate | date:'mediumDate' }}</td>
              <td class="px-6 py-4">
                <span [ngClass]="{
                  'bg-emerald-100 text-emerald-700': record.status === 'Completed',
                  'bg-amber-100 text-amber-700': record.status === 'Pending',
                  'bg-slate-100 text-slate-700': record.status === 'Shipped' || !record.status
                }" class="px-2.5 py-0.5 rounded-full text-xs font-bold">
                  {{ record.status || 'Shipped' }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class SalesRecordsComponent implements OnInit {
  records: SalesRecord[] = [];
  sortOrder: { [key: string]: 'asc' | 'desc' } = {};

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchRecords();
  }

  fetchRecords() {
    this.http.get<{data: SalesRecord[], hasMore: boolean}>('/api/widgets/sales-records').subscribe({
      next: (res) => this.records = res.data,
      error: () => {
        // Fallback mock data if API fails
        this.records = [
          { orderId: '1', productName: 'Aura Pro Laptop', amount: 1299, saleDate: '2026-01-01', status: 'Completed' },
          { orderId: '2', productName: 'Zenith Monitor', amount: 499, saleDate: '2026-01-02', status: 'Pending' },
          { orderId: '3', productName: 'Nova Keyboard', amount: 129, saleDate: '2026-01-03', status: 'Shipped' },
        ];
      }
    });
  }

  drop(event: CdkDragDrop<SalesRecord[]>) {
    moveItemInArray(this.records, event.previousIndex, event.currentIndex);
  }

  sortBy(key: keyof SalesRecord) {
    const order = this.sortOrder[key] === 'asc' ? 'desc' : 'asc';
    this.sortOrder[key] = order;

    this.records.sort((a: any, b: any) => {
      if (a[key] < b[key]) return order === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return order === 'asc' ? 1 : -1;
      return 0;
    });
  }
}