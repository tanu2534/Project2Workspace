import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrisReportComponent } from './entris-report.component';

describe('EntrisReportComponent', () => {
  let component: EntrisReportComponent;
  let fixture: ComponentFixture<EntrisReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EntrisReportComponent]
    });
    fixture = TestBed.createComponent(EntrisReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
