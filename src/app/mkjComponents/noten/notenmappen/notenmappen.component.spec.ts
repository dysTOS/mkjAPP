import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotenmappenComponent } from './notenmappen.component';

describe('NotenmappenComponent', () => {
  let component: NotenmappenComponent;
  let fixture: ComponentFixture<NotenmappenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotenmappenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotenmappenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
