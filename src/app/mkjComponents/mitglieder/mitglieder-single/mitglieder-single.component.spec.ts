import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MitgliederSingleComponent } from './mitglieder-single.component';

describe('MitgliederSingleComponent', () => {
  let component: MitgliederSingleComponent;
  let fixture: ComponentFixture<MitgliederSingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MitgliederSingleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MitgliederSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
