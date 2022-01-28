import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MkjDashboardComponent } from './mkj-dashboard.component';

describe('MkjDashboardComponent', () => {
  let component: MkjDashboardComponent;
  let fixture: ComponentFixture<MkjDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MkjDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MkjDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
