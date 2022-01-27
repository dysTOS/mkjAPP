import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AusrueckungSingleComponent } from './ausrueckung-single.component';

describe('AusrueckungSingleComponent', () => {
  let component: AusrueckungSingleComponent;
  let fixture: ComponentFixture<AusrueckungSingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AusrueckungSingleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AusrueckungSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
