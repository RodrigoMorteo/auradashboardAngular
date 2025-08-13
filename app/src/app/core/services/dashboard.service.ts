import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface SalesRecord {
  orderId: string;
  productName: string;
  saleDate: string;
  amount: number;
}

export interface PaginatedSalesResponse {
  data: SalesRecord[];
  hasMore: boolean;
}

export interface ActivityItem {
  id: string;
  user: string;
  action: string;
  timestamp: string;
}

export interface PaginatedActivityResponse {
  items: ActivityItem[];
  hasMore: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private http = inject(HttpClient);
  private readonly API_URL = 'http://localhost:3001/api/widgets';

  getSalesRecords(page: number, pageSize: number): Observable<PaginatedSalesResponse> {
    return this.http.get<PaginatedSalesResponse>(`${this.API_URL}/sales-records?page=${page}&pageSize=${pageSize}`);
  }

  getKpiTrends(quarters?: string[]): Observable<any> {
    let params = new HttpParams();
    if (quarters && quarters.length > 0) {
      params = params.set('quarters', quarters.join(','));
    }
    return this.http.get<any>(`${this.API_URL}/kpi-trends`, { params });
  }

  getActivityFeed(page: number, pageSize: number): Observable<PaginatedActivityResponse> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());
    return this.http.get<PaginatedActivityResponse>(`${this.API_URL}/activity-feed`, { params });
  }
}
