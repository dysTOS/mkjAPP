import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MkjRechnungComponent } from './mkj-rechnung.component';

describe('MkjRechnungComponent', () => {
  let component: MkjRechnungComponent;
  let fixture: ComponentFixture<MkjRechnungComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MkjRechnungComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MkjRechnungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
