import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MkjDisplayFieldComponent } from './mkj-display-field.component';

describe('MkjDisplayFieldComponent', () => {
  let component: MkjDisplayFieldComponent;
  let fixture: ComponentFixture<MkjDisplayFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MkjDisplayFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MkjDisplayFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
