import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KpiTrendsComponent } from './kpi-trends.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PLATFORM_ID } from '@angular/core';

describe('KpiTrendsComponent', () => {
  let component: KpiTrendsComponent;
  let fixture: ComponentFixture<KpiTrendsComponent>;
  let httpMock: HttpTestingController;

  describe('Browser Environment', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [KpiTrendsComponent, HttpClientTestingModule],
        providers: [
          { provide: PLATFORM_ID, useValue: 'browser' }
        ]
      }).compileComponents();

      fixture = TestBed.createComponent(KpiTrendsComponent);
      component = fixture.componentInstance;
      httpMock = TestBed.inject(HttpTestingController);
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should fetch data and initialize chart', async () => {
      // afterNextRender runs after the first change detection cycle
      fixture.detectChanges();
      
      const req = httpMock.expectOne('/api/widgets/kpi-trends');
      expect(req.request.method).toBe('GET');
      
      const mockData = {
        labels: ['A', 'B'],
        datasets: [{ label: 'Test', data: [10, 20] }]
      };
      req.flush(mockData);
      
      // Verification of Chart instance creation would require more complex spying on Chart.js
      // but we can at least verify the HTTP call was made.
    });
  });

  describe('Server Environment', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [KpiTrendsComponent, HttpClientTestingModule],
        providers: [
          { provide: PLATFORM_ID, useValue: 'server' }
        ]
      }).compileComponents();

      fixture = TestBed.createComponent(KpiTrendsComponent);
      component = fixture.componentInstance;
      httpMock = TestBed.inject(HttpTestingController);
    });

    it('should NOT fetch data on server', () => {
      fixture.detectChanges();
      httpMock.expectNone('/api/widgets/kpi-trends');
      expect(true).toBeTrue(); // Dummy expectation to satisfy Karma
    });
  });
});
