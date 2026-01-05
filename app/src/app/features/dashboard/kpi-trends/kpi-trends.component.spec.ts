import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KpiTrendsComponent } from './kpi-trends.component';
import { DashboardService } from '../../../core/services/dashboard.service';
import { of } from 'rxjs';
import { PLATFORM_ID } from '@angular/core';

describe('KpiTrendsComponent (Server)', () => {
  let component: KpiTrendsComponent;
  let fixture: ComponentFixture<KpiTrendsComponent>;
  let mockDashboardService: any;

  beforeEach(async () => {
    mockDashboardService = {
      getKpiTrends: jasmine.createSpy('getKpiTrends').and.returnValue(of({ labels: [], datasets: [] }))
    };

    await TestBed.configureTestingModule({
      imports: [KpiTrendsComponent],
      providers: [
        { provide: DashboardService, useValue: mockDashboardService },
        { provide: PLATFORM_ID, useValue: 'server' } // Mock Server Platform
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KpiTrendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should NOT initialize chart on server', async () => {
    // Spy on dynamic import? Hard to spy on language feature.
    // Instead, check if chartInstance is defined.
    // Use 'any' to access private property if needed or rely on public behavior.
    expect((component as any).chartInstance).toBeUndefined();
  });
});
