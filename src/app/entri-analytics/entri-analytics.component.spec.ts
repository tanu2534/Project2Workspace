import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntriAnalyticsComponent } from './entri-analytics.component';

describe('EntriAnalyticsComponent', () => {
  let component: EntriAnalyticsComponent;
  let fixture: ComponentFixture<EntriAnalyticsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EntriAnalyticsComponent]
    });
    fixture = TestBed.createComponent(EntriAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
