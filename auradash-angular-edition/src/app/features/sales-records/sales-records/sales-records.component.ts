import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { HttpClient } from '@angular/common/http';

interface SalesRecord {
  id: number;
  product: string;
  amount: number;
  date: string;
  status: string;
}

@Component({
  selector: 'app-sales-records',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  template: `
    <div class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div class="p-6 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
        <h3 class="text-lg font-semibold text-slate-900">Sales Records</h3>
        <span class="text-xs font-medium text-slate-400 uppercase tracking-wider">Drag rows to reorder</span>
      </div>
      
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-slate-50">
              <th (click)="sortBy('product')" class="px-6 py-4 text-sm font-semibold text-slate-600 cursor-pointer hover:bg-slate-100 transition">Product</th>
              <th (click)="sortBy('amount')" class="px-6 py-4 text-sm font-semibold text-slate-600 cursor-pointer hover:bg-slate-100 transition text-right">Amount</th>
              <th (click)="sortBy('date')" class="px-6 py-4 text-sm font-semibold text-slate-600 cursor-pointer hover:bg-slate-100 transition">Date</th>
              <th (click)="sortBy('status')" class="px-6 py-4 text-sm font-semibold text-slate-600 cursor-pointer hover:bg-slate-100 transition">Status</th>
            </tr>
          </thead>
          <tbody cdkDropList (cdkDropListDropped)="drop($event)">
            <tr *ngFor="let record of records" cdkDrag class="border-b border-slate-100 hover:bg-slate-50 transition cursor-move bg-white">
              <td class="px-6 py-4 text-sm text-slate-900 font-medium">{{ record.product }}</td>
              <td class="px-6 py-4 text-sm text-slate-900 text-right font-mono">{{ record.amount | currency }}</td>
              <td class="px-6 py-4 text-sm text-slate-500">{{ record.date }}</td>
              <td class="px-6 py-4">
                <span [ngClass]="{
                  'bg-emerald-100 text-emerald-700': record.status === 'Completed',
                  'bg-amber-100 text-amber-700': record.status === 'Pending',
                  'bg-slate-100 text-slate-700': record.status === 'Shipped'
                }" class="px-2.5 py-0.5 rounded-full text-xs font-bold">
                  {{ record.status }}
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
    this.http.get<SalesRecord[]>('/api/sales').subscribe({
      next: (data) => this.records = data,
      error: () => {
        // Fallback mock data if API fails
        this.records = [
          { id: 1, product: 'Aura Pro Laptop', amount: 1299, date: '2026-01-01', status: 'Completed' },
          { id: 2, product: 'Zenith Monitor', amount: 499, date: '2026-01-02', status: 'Pending' },
          { id: 3, product: 'Nova Keyboard', amount: 129, date: '2026-01-03', status: 'Shipped' },
          { id: 4, product: 'Eclipse Mouse', amount: 79, date: '2026-01-04', status: 'Completed' },
          { id: 5, product: 'Aura Cloud Subscription', amount: 29.99, date: '2026-01-05', status: 'Completed' },
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

    this.records.sort((a, b) => {
      if (a[key] < b[key]) return order === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return order === 'asc' ? 1 : -1;
      return 0;
    });
  }
}