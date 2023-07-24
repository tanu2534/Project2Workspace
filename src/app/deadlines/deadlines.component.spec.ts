import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeadlinesComponent } from './deadlines.component';

describe('DeadlinesComponent', () => {
  let component: DeadlinesComponent;
  let fixture: ComponentFixture<DeadlinesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeadlinesComponent]
    });
    fixture = TestBed.createComponent(DeadlinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
