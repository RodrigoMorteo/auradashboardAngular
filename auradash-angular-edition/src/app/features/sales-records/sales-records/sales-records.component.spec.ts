import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SalesRecordsComponent } from './sales-records.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';

describe('SalesRecordsComponent', () => {
  let component: SalesRecordsComponent;
  let fixture: ComponentFixture<SalesRecordsComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SalesRecordsComponent,
        HttpClientTestingModule,
        NoopAnimationsModule,
        DragDropModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SalesRecordsComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch records on init', () => {
    const mockResponse = {
      data: [
        { orderId: '1', productName: 'Test Product', amount: 100, saleDate: '2026-01-01' }
      ],
      hasMore: false
    };

    fixture.detectChanges(); // ngOnInit

    const req = httpMock.expectOne('/api/widgets/sales-records');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);

    expect(component.records.length).toBe(1);
    expect(component.records[0].productName).toBe('Test Product');
  });

  it('should use fallback data on error', () => {
    fixture.detectChanges();

    const req = httpMock.expectOne('/api/widgets/sales-records');
    req.error(new ErrorEvent('Network error'));

    expect(component.records.length).toBeGreaterThan(0);
    expect(component.records[0].status).toBeDefined();
  });

  it('should sort records by productName', () => {
    component.records = [
      { orderId: '1', productName: 'B', amount: 100, saleDate: '2026-01-01' },
      { orderId: '2', productName: 'A', amount: 200, saleDate: '2026-01-02' }
    ];

    component.sortBy('productName');
    expect(component.records[0].productName).toBe('A');
    expect(component.records[1].productName).toBe('B');

    component.sortBy('productName'); // toggle
    expect(component.records[0].productName).toBe('B');
    expect(component.records[1].productName).toBe('A');
  });
});
