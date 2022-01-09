import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZeitraumPickerComponent } from './zeitraum-picker.component';

describe('ZeitraumPickerComponent', () => {
  let component: ZeitraumPickerComponent;
  let fixture: ComponentFixture<ZeitraumPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZeitraumPickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZeitraumPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
