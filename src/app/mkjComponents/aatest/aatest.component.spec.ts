import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AatestComponent } from './aatest.component';

describe('AatestComponent', () => {
  let component: AatestComponent;
  let fixture: ComponentFixture<AatestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AatestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AatestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
